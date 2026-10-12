import { unstable_cache } from "next/cache";
import { cars as staticCars, type Car } from "@/data/cars";
import { getDb } from "./db/client";

export type FleetCar = Car & { active: boolean; sortOrder: number };

type Row = { slug: string; data: Car | string; active: boolean; sort_order: number };

function fromRow(r: Row): FleetCar {
  const data = typeof r.data === "string" ? (JSON.parse(r.data) as Car) : r.data;
  return { ...data, slug: r.slug, active: r.active, sortOrder: r.sort_order };
}

/** Every car, including hidden ones, straight from the database. Admin only. */
export async function listFleet(): Promise<FleetCar[]> {
  const db = await getDb();
  if (!db) return staticCars.map((c, i) => ({ ...c, active: true, sortOrder: i }));
  const rows = await db.query<Row>("select slug, data, active, sort_order from cars order by sort_order, slug");
  return rows.map(fromRow);
}

async function loadPublicFleet(): Promise<Car[]> {
  try {
    return (await listFleet()).filter((c) => c.active);
  } catch (err) {
    console.error("Fleet query failed, using the built-in list", err);
    return staticCars;
  }
}

// Public pages read through a cache that the admin clears on every save (revalidateTag("fleet")).
export const getFleet = unstable_cache(loadPublicFleet, ["public-fleet"], { tags: ["fleet"], revalidate: 600 });

export async function getFleetCar(slug: string) {
  return (await getFleet()).find((c) => c.slug === slug);
}

export async function saveCar(car: Car, opts: { active: boolean; sortOrder: number; previousSlug?: string }) {
  const db = await getDb();
  if (!db) throw new Error("No database connected");
  const prev = opts.previousSlug ?? car.slug;
  const existing = await db.query("select 1 from cars where slug = $1", [prev]);
  if (existing.length) {
    await db.query("update cars set slug = $1, data = $2::jsonb, active = $3, sort_order = $4, updated_at = now() where slug = $5", [
      car.slug,
      JSON.stringify(car),
      opts.active,
      opts.sortOrder,
      prev,
    ]);
  } else {
    await db.query("insert into cars (slug, data, active, sort_order) values ($1, $2::jsonb, $3, $4)", [car.slug, JSON.stringify(car), opts.active, opts.sortOrder]);
  }
}
