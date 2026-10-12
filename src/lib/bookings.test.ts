import { beforeAll, describe, expect, it, vi } from "vitest";

// next/cache only works inside Next; the fleet module imports it for the public cache.
vi.mock("next/cache", () => ({ unstable_cache: <T,>(fn: T) => fn }));

process.env.LOCAL_DB = "memory";
delete process.env.DATABASE_URL;
delete process.env.POSTGRES_URL;

const { getDb } = await import("./db/client");
const { conflicts, createBooking, listBookings, unavailableCars, updateBooking, bookingsBetween } = await import("./bookings");
const { listFleet, saveCar } = await import("./fleet");

const at = (s: string) => new Date(s);

describe("bookings in Postgres (PGlite)", () => {
  beforeAll(async () => {
    expect((await getDb())?.kind).toBe("pglite");
  });

  it("seeds the fleet on first use", async () => {
    const fleet = await listFleet();
    expect(fleet.map((c) => c.slug)).toEqual(["jeep-grand-cherokee-l", "jeep-wrangler-unlimited-willys"]);
  });

  it("holds a car only once a booking is confirmed", async () => {
    const car = "jeep-grand-cherokee-l";
    const req = await createBooking({ carSlug: car, startsAt: at("2027-01-10T17:00Z"), endsAt: at("2027-01-14T17:00Z"), status: "request", source: "website", guestName: "Ada" });
    expect(await conflicts(car, at("2027-01-12T17:00Z"), at("2027-01-13T17:00Z"))).toHaveLength(0);

    await updateBooking(req.id, { status: "confirmed" });
    expect(await conflicts(car, at("2027-01-12T17:00Z"), at("2027-01-13T17:00Z"))).toHaveLength(1);
    // Editing the booking itself isn't a clash with itself.
    expect(await conflicts(car, at("2027-01-12T17:00Z"), at("2027-01-13T17:00Z"), req.id)).toHaveLength(0);
    // Back-to-back is fine.
    expect(await conflicts(car, at("2027-01-14T17:00Z"), at("2027-01-16T17:00Z"))).toHaveLength(0);

    const busy = await unavailableCars(at("2027-01-13T00:00Z"), at("2027-01-20T00:00Z"));
    expect([...busy]).toEqual([car]);
  });

  it("treats a Turo block like a confirmed trip and lists it on the calendar", async () => {
    const car = "jeep-wrangler-unlimited-willys";
    await createBooking({ carSlug: car, startsAt: at("2027-02-01T17:00Z"), endsAt: at("2027-02-03T17:00Z"), status: "confirmed", source: "turo", guestName: "Turo guest" });
    expect(await conflicts(car, at("2027-02-02T17:00Z"), at("2027-02-05T17:00Z"))).toHaveLength(1);
    const feb = await bookingsBetween(at("2027-02-01T07:00Z"), at("2027-03-01T07:00Z"));
    expect(feb.map((b) => b.source)).toEqual(["turo"]);
  });

  it("filters the list by status", async () => {
    const confirmed = await listBookings({ status: "confirmed" });
    expect(confirmed.every((b) => b.status === "confirmed")).toBe(true);
    expect(confirmed.length).toBe(2);
  });

  it("renames a car without losing its bookings", async () => {
    const [gc] = await listFleet();
    const { active, sortOrder, ...data } = gc;
    await saveCar({ ...data, slug: "grand-cherokee-l", dailyRate: 139 }, { active, sortOrder, previousSlug: gc.slug });
    const fleet = await listFleet();
    expect(fleet.find((c) => c.slug === "grand-cherokee-l")?.dailyRate).toBe(139);
    const all = await listBookings({ status: "confirmed" });
    expect(all.some((b) => b.carSlug === "grand-cherokee-l")).toBe(true);
  });
});
