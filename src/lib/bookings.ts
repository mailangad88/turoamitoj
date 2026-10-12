import { getDb } from "./db/client";

import { holdingStatuses, type BookingSource, type BookingStatus } from "./booking-meta";

export * from "./booking-meta";

export type Booking = {
  id: string;
  carSlug: string;
  startsAt: Date;
  endsAt: Date;
  status: BookingStatus;
  source: BookingSource;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  driverAge: string;
  zone: string;
  address: string;
  addOns: string[];
  quoteTotal: number | null;
  deposit: number | null;
  notes: string;
  createdAt: Date;
};

type Row = {
  id: string;
  car_slug: string;
  starts_at: Date | string;
  ends_at: Date | string;
  status: BookingStatus;
  source: BookingSource;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  driver_age: string;
  zone: string;
  address: string;
  add_ons: string[] | string;
  quote_total: string | number | null;
  deposit: string | number | null;
  notes: string;
  created_at: Date | string;
};

const cols =
  "id, car_slug, starts_at, ends_at, status, source, guest_name, guest_email, guest_phone, driver_age, zone, address, add_ons, quote_total, deposit, notes, created_at";

function fromRow(r: Row): Booking {
  const num = (v: string | number | null) => (v === null ? null : Number(v));
  return {
    id: r.id,
    carSlug: r.car_slug,
    startsAt: new Date(r.starts_at),
    endsAt: new Date(r.ends_at),
    status: r.status,
    source: r.source,
    guestName: r.guest_name,
    guestEmail: r.guest_email,
    guestPhone: r.guest_phone,
    driverAge: r.driver_age,
    zone: r.zone,
    address: r.address,
    addOns: typeof r.add_ons === "string" ? JSON.parse(r.add_ons) : r.add_ons,
    quoteTotal: num(r.quote_total),
    deposit: num(r.deposit),
    notes: r.notes,
    createdAt: new Date(r.created_at),
  };
}

async function db() {
  const d = await getDb();
  if (!d) throw new Error("No database connected");
  return d;
}

export type NewBooking = Omit<Booking, "id" | "createdAt" | "addOns" | "quoteTotal" | "deposit" | "guestEmail" | "guestPhone" | "driverAge" | "zone" | "address" | "notes"> &
  Partial<Pick<Booking, "addOns" | "quoteTotal" | "deposit" | "guestEmail" | "guestPhone" | "driverAge" | "zone" | "address" | "notes">>;

export async function createBooking(b: NewBooking): Promise<Booking> {
  const id = crypto.randomUUID();
  const [row] = await (await db()).query<Row>(
    `insert into bookings (id, car_slug, starts_at, ends_at, status, source, guest_name, guest_email, guest_phone, driver_age, zone, address, add_ons, quote_total, deposit, notes)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::jsonb,$14,$15,$16) returning ${cols}`,
    [
      id,
      b.carSlug,
      b.startsAt.toISOString(),
      b.endsAt.toISOString(),
      b.status,
      b.source,
      b.guestName,
      b.guestEmail ?? "",
      b.guestPhone ?? "",
      b.driverAge ?? "",
      b.zone ?? "",
      b.address ?? "",
      JSON.stringify(b.addOns ?? []),
      b.quoteTotal ?? null,
      b.deposit ?? null,
      b.notes ?? "",
    ],
  );
  return fromRow(row);
}

export async function getBooking(id: string) {
  const rows = await (await db()).query<Row>(`select ${cols} from bookings where id = $1`, [id]);
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function listBookings(opts: { status?: BookingStatus; upcomingOnly?: boolean; limit?: number } = {}) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (opts.status) {
    params.push(opts.status);
    where.push(`status = $${params.length}`);
  }
  if (opts.upcomingOnly) where.push("ends_at >= now()");
  params.push(opts.limit ?? 200);
  const rows = await (await db()).query<Row>(
    `select ${cols} from bookings ${where.length ? `where ${where.join(" and ")}` : ""} order by starts_at asc limit $${params.length}`,
    params,
  );
  return rows.map(fromRow);
}

/** Bookings that touch [from, to), for the calendar. Declined and cancelled ones are left out. */
export async function bookingsBetween(from: Date, to: Date) {
  const rows = await (await db()).query<Row>(
    `select ${cols} from bookings where starts_at < $2 and ends_at > $1 and status not in ('declined','cancelled') order by starts_at`,
    [from.toISOString(), to.toISOString()],
  );
  return rows.map(fromRow);
}

/** Bookings that hold this car during [start, end), ignoring `exceptId` (the booking being edited). */
export async function conflicts(carSlug: string, start: Date, end: Date, exceptId?: string) {
  const rows = await (await db()).query<Row>(
    `select ${cols} from bookings where car_slug = $1 and starts_at < $3 and ends_at > $2 and status = any($4::text[]) and id <> $5 order by starts_at`,
    [carSlug, start.toISOString(), end.toISOString(), holdingStatuses, exceptId ?? ""],
  );
  return rows.map(fromRow);
}

/** Slugs of cars that are held for any part of [start, end). */
export async function unavailableCars(start: Date, end: Date) {
  const d = await getDb();
  if (!d) return new Set<string>();
  const rows = await d.query<{ car_slug: string }>(
    "select distinct car_slug from bookings where starts_at < $2 and ends_at > $1 and status = any($3::text[])",
    [start.toISOString(), end.toISOString(), holdingStatuses],
  );
  return new Set(rows.map((r) => r.car_slug));
}

export async function updateBooking(id: string, patch: Partial<Pick<Booking, "status" | "notes" | "startsAt" | "endsAt" | "carSlug" | "guestName" | "guestEmail" | "guestPhone" | "source">>) {
  const map: Record<string, [string, (v: never) => unknown]> = {
    status: ["status", (v) => v],
    notes: ["notes", (v) => v],
    startsAt: ["starts_at", (v: Date) => v.toISOString()],
    endsAt: ["ends_at", (v: Date) => v.toISOString()],
    carSlug: ["car_slug", (v) => v],
    guestName: ["guest_name", (v) => v],
    guestEmail: ["guest_email", (v) => v],
    guestPhone: ["guest_phone", (v) => v],
    source: ["source", (v) => v],
  };
  const sets: string[] = [];
  const params: unknown[] = [];
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined || !map[k]) continue;
    params.push(map[k][1](v as never));
    sets.push(`${map[k][0]} = $${params.length}`);
  }
  if (!sets.length) return;
  params.push(id);
  await (await db()).query(`update bookings set ${sets.join(", ")}, updated_at = now() where id = $${params.length}`, params);
}

export async function deleteBooking(id: string) {
  await (await db()).query("delete from bookings where id = $1", [id]);
}
