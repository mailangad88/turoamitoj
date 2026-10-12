import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { bookingRequestSchema } from "@/lib/booking";
import { getFleetCar } from "@/lib/fleet";
import { conflicts, createBooking } from "@/lib/bookings";
import { getDb } from "@/lib/db/client";
import { fromDenverLocal } from "@/lib/time";
import { getZone } from "@/data/zones";
import { quote, rentalDays, usd, type AddOnId } from "@/lib/pricing";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Check the form." }, { status: 422 });
  }
  const r = parsed.data;
  if (r.website) return NextResponse.json({ ok: true, emailed: false }); // bot

  const car = await getFleetCar(r.car);
  const zone = getZone(r.zone);
  const startsAt = fromDenverLocal(r.start);
  const endsAt = fromDenverLocal(r.end);
  const days = startsAt && endsAt ? rentalDays(startsAt, endsAt) : 0;
  if (!car || !zone || !startsAt || !endsAt || !days) {
    return NextResponse.json({ ok: false, error: "That car, delivery area or date range isn't available." }, { status: 422 });
  }
  if (startsAt.getTime() < Date.now() - 3600_000) {
    return NextResponse.json({ ok: false, error: "Pick a pickup time in the future." }, { status: 422 });
  }

  const db = await getDb().catch((err) => {
    console.error("Database unavailable for booking request", err);
    return null;
  });
  if (db && (await conflicts(car.slug, startsAt, endsAt)).length) {
    return NextResponse.json(
      { ok: false, error: `The ${car.name} is already booked for part of those dates. Try other dates or another car.` },
      { status: 409 },
    );
  }
  const fee = zone.fee ?? 0;
  const q = quote({ car, days, deliveryFee: fee, returnFee: fee, addOns: r.addons as AddOnId[] });

  const summary = [
    `New booking request: ${car.name}`,
    `${r.start} → ${r.end} (${days} days)`,
    `Delivery: ${zone.name}${r.address ? `, ${r.address}` : ""}`,
    `Add-ons: ${r.addons.join(", ") || "none"}`,
    `Quoted total: ${usd(q.total)} (deposit ${usd(q.deposit)})`,
    `Guest: ${r.name} · ${r.email} · ${r.phone} · age ${r.driverAge}`,
    r.notes ? `Notes: ${r.notes}` : "",
    `Review and confirm: ${site.url}/admin/bookings`,
  ]
    .filter(Boolean)
    .join("\n");

  let saved = false;
  if (db) {
    try {
      await createBooking({
        carSlug: car.slug,
        startsAt,
        endsAt,
        status: "request",
        source: "website",
        guestName: r.name,
        guestEmail: r.email,
        guestPhone: r.phone,
        driverAge: r.driverAge,
        zone: zone.id,
        address: r.address,
        addOns: r.addons,
        quoteTotal: q.total,
        deposit: q.deposit,
        notes: r.notes,
      });
      saved = true;
    } catch (err) {
      console.error("Saving booking request failed", err);
    }
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;
  let emailed = false;
  if (key && to && from) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: r.email, subject: `Booking request: ${car.name}, ${days} days`, text: summary }),
    });
    emailed = res.ok;
    if (!res.ok) console.error("Resend failed", res.status, await res.text());
  } else {
    console.log(summary);
  }
  if (!saved && !emailed) console.warn("Booking request was neither saved nor emailed; it exists only in this log line.");
  return NextResponse.json({ ok: true, emailed, saved });
}
