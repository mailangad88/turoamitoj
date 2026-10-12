import { cars as seedCars } from "@/data/cars";
import type { Db } from "./client";

// Idempotent schema. Runs once per server process, so a fresh database sets itself up on first use.
// Car details live in `data` (the same shape as src/data/cars.ts); the columns beside it are the ones we filter on.
const ddl = [
  `create table if not exists cars (
    slug text primary key,
    data jsonb not null,
    active boolean not null default true,
    sort_order integer not null default 0,
    updated_at timestamptz not null default now()
  )`,
  `create table if not exists bookings (
    id text primary key,
    car_slug text not null references cars(slug) on update cascade,
    starts_at timestamptz not null,
    ends_at timestamptz not null,
    status text not null check (status in ('request','confirmed','declined','cancelled','completed')),
    source text not null check (source in ('website','turo','direct','block')),
    guest_name text not null default '',
    guest_email text not null default '',
    guest_phone text not null default '',
    driver_age text not null default '',
    zone text not null default '',
    address text not null default '',
    add_ons jsonb not null default '[]'::jsonb,
    quote_total numeric(10,2),
    deposit numeric(10,2),
    notes text not null default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (ends_at > starts_at)
  )`,
  `create index if not exists bookings_car_time on bookings (car_slug, starts_at, ends_at)`,
  `create index if not exists bookings_status on bookings (status, starts_at)`,
];

export async function ensureSchema(db: Db) {
  for (const stmt of ddl) await db.query(stmt);
  const [{ n }] = await db.query<{ n: number }>("select count(*)::int as n from cars");
  if (n === 0) {
    for (const [i, car] of seedCars.entries()) {
      await db.query("insert into cars (slug, data, active, sort_order) values ($1, $2::jsonb, true, $3) on conflict do nothing", [
        car.slug,
        JSON.stringify(car),
        i,
      ]);
    }
  }
}
