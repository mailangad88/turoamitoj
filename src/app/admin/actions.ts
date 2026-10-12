"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authConfigured, createSession, passwordMatches, SESSION_COOKIE, SESSION_HOURS } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin-guard";
import { conflicts, createBooking, deleteBooking, getBooking, sources, statuses, updateBooking, type BookingStatus } from "@/lib/bookings";
import { listFleet, saveCar } from "@/lib/fleet";
import { formatDenver, fromDenverLocal } from "@/lib/time";
import type { Car } from "@/data/cars";

export type FormState = { error?: string; ok?: boolean };

// ---------- Session ----------

export async function login(_: FormState, form: FormData): Promise<FormState> {
  if (!authConfigured()) return { error: "Admin isn't set up yet. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET in Vercel." };
  const password = String(form.get("password") ?? "");
  const secret = process.env.ADMIN_SESSION_SECRET!;
  if (!(await passwordMatches(password, process.env.ADMIN_PASSWORD!, secret))) {
    await new Promise((r) => setTimeout(r, 700)); // slow down guessing
    return { error: "That password isn't right." };
  }
  (await cookies()).set(SESSION_COOKIE, await createSession(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_HOURS * 3600,
  });
  const next = String(form.get("next") ?? "");
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

// ---------- Bookings ----------

function describeClash(list: Awaited<ReturnType<typeof conflicts>>) {
  const b = list[0];
  return `Those dates overlap ${b.guestName || "a booking"} (${formatDenver(b.startsAt)} to ${formatDenver(b.endsAt)}).`;
}

const bookingForm = z.object({
  carSlug: z.string().min(1, "Pick a car"),
  source: z.enum(sources),
  status: z.enum(statuses),
  start: z.string().min(1, "Add a start time"),
  end: z.string().min(1, "Add an end time"),
  guestName: z.string().trim().max(120).default(""),
  guestEmail: z.string().trim().max(200).default(""),
  guestPhone: z.string().trim().max(40).default(""),
  notes: z.string().max(4000).default(""),
});

function refreshBookings() {
  revalidatePath("/admin", "layout");
  revalidatePath("/cars");
}

export async function createBookingAction(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = bookingForm.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the form." };
  const v = parsed.data;
  const startsAt = fromDenverLocal(v.start);
  const endsAt = fromDenverLocal(v.end);
  if (!startsAt || !endsAt || endsAt <= startsAt) return { error: "The end has to be after the start." };
  if (v.status === "confirmed") {
    const clash = await conflicts(v.carSlug, startsAt, endsAt);
    if (clash.length) return { error: describeClash(clash) };
  }
  const b = await createBooking({
    carSlug: v.carSlug,
    source: v.source,
    status: v.status,
    startsAt,
    endsAt,
    guestName: v.guestName || (v.source === "block" ? "Blocked" : v.source === "turo" ? "Turo guest" : ""),
    guestEmail: v.guestEmail,
    guestPhone: v.guestPhone,
    notes: v.notes,
  });
  refreshBookings();
  redirect(`/admin/bookings/${b.id}`);
}

export async function updateBookingAction(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const current = await getBooking(id);
  if (!current) return { error: "That booking no longer exists." };
  const parsed = bookingForm.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the form." };
  const v = parsed.data;
  const startsAt = fromDenverLocal(v.start);
  const endsAt = fromDenverLocal(v.end);
  if (!startsAt || !endsAt || endsAt <= startsAt) return { error: "The end has to be after the start." };
  if (v.status === "confirmed" || v.status === "completed") {
    const clash = await conflicts(v.carSlug, startsAt, endsAt, id);
    if (clash.length) return { error: describeClash(clash) };
  }
  await updateBooking(id, {
    carSlug: v.carSlug,
    source: v.source,
    status: v.status,
    startsAt,
    endsAt,
    guestName: v.guestName,
    guestEmail: v.guestEmail,
    guestPhone: v.guestPhone,
    notes: v.notes,
  });
  refreshBookings();
  return { ok: true };
}

export async function setStatusAction(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const status = z.enum(statuses).parse(form.get("status")) as BookingStatus;
  const b = await getBooking(id);
  if (!b) redirect("/admin/bookings");
  if (status === "confirmed") {
    const clash = await conflicts(b.carSlug, b.startsAt, b.endsAt, id);
    if (clash.length) redirect(`/admin/bookings/${id}?error=${encodeURIComponent(describeClash(clash))}`);
  }
  await updateBooking(id, { status });
  refreshBookings();
  redirect(`/admin/bookings/${id}`);
}

export async function deleteBookingAction(form: FormData) {
  await requireAdmin();
  await deleteBooking(String(form.get("id") ?? ""));
  refreshBookings();
  redirect("/admin/bookings");
}

// ---------- Fleet and pricing ----------

const lines = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const carForm = z.object({
  previousSlug: z.string().default(""),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Web address: lowercase letters, numbers and dashes only"),
  name: z.string().trim().min(2, "Add the car's name").max(80),
  year: z.coerce.number().int().min(1990).max(2100),
  color: z.string().trim().max(40).default(""),
  body: z.enum(["suv", "wagon", "truck", "crossover", "boxy"]),
  drive: z.enum(["AWD", "4WD"]),
  seats: z.coerce.number().int().min(2).max(9),
  dailyRate: z.coerce.number().int().min(1, "Add a daily rate").max(2000),
  depositTier: z.enum(["standard", "premium"]),
  tires: z.string().trim().max(60).default(""),
  milesPerDay: z.coerce.number().int().min(0).max(2000),
  summary: z.string().trim().max(600).default(""),
  highlights: z.string().default(""),
  bestFor: z.string().default(""),
  sortOrder: z.coerce.number().int().default(0),
});

export async function saveCarAction(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = carForm.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Check the form." };
  const v = parsed.data;
  const fleet = await listFleet();
  if (v.slug !== v.previousSlug && fleet.some((c) => c.slug === v.slug)) return { error: "Another car already uses that web address." };
  const car: Car = {
    slug: v.slug,
    name: v.name,
    year: v.year,
    color: v.color,
    body: v.body,
    drive: v.drive,
    seats: v.seats,
    ev: form.get("ev") === "on",
    dailyRate: v.dailyRate,
    depositTier: v.depositTier,
    tires: v.tires,
    tractionLawReady: form.get("tractionLawReady") === "on",
    skiRack: form.get("skiRack") === "on",
    milesPerDay: v.milesPerDay,
    summary: v.summary,
    highlights: lines(v.highlights),
    bestFor: lines(v.bestFor),
  };
  await saveCar(car, { active: form.get("active") === "on", sortOrder: v.sortOrder, previousSlug: v.previousSlug || undefined });
  revalidateTag("fleet");
  revalidatePath("/", "layout");
  redirect(`/admin/fleet?saved=${encodeURIComponent(car.name)}`);
}

export async function saveRatesAction(_: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const fleet = await listFleet();
  for (const car of fleet) {
    const raw = form.get(`rate:${car.slug}`);
    if (raw === null) continue;
    const rate = Number(raw);
    if (!Number.isInteger(rate) || rate < 1 || rate > 2000) return { error: `Check the rate for ${car.name}.` };
    const tier = form.get(`deposit:${car.slug}`) === "standard" ? "standard" : "premium";
    const { active, sortOrder, ...data } = car;
    if (rate !== car.dailyRate || tier !== car.depositTier) await saveCar({ ...data, dailyRate: rate, depositTier: tier }, { active, sortOrder });
  }
  revalidateTag("fleet");
  revalidatePath("/", "layout");
  return { ok: true };
}
