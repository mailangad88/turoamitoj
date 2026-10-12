import { describe, expect, it } from "vitest";
import { quote, rentalDays } from "./pricing";

const car = { dailyRate: 100, depositTier: "standard" as const };

describe("rentalDays", () => {
  it("counts started days with a grace period", () => {
    const start = new Date("2026-12-18T10:00:00");
    expect(rentalDays(start, new Date("2026-12-20T10:00:00"))).toBe(2);
    expect(rentalDays(start, new Date("2026-12-20T10:45:00"))).toBe(2);
    expect(rentalDays(start, new Date("2026-12-20T11:30:00"))).toBe(3);
  });
  it("returns 0 for an end before the start", () => {
    expect(rentalDays(new Date("2026-12-20"), new Date("2026-12-18"))).toBe(0);
  });
});

describe("quote", () => {
  it("adds Colorado fees and tax on short rentals", () => {
    const q = quote({ car, days: 2, deliveryFee: 35, returnFee: 0, addOns: [] });
    expect(q.subtotal).toBe(235);
    expect(q.coloradoFees).toBeCloseTo(11.14);
    expect(q.tax).toBeCloseTo(20.7);
    expect(q.total).toBeCloseTo(266.84);
    expect(q.deposit).toBe(300);
  });

  it("applies the weekly discount and caps add-ons", () => {
    const q = quote({ car, days: 7, deliveryFee: 0, returnFee: 0, addOns: ["ski-box"] });
    expect(q.discountLabel).toBe("Weekly");
    expect(q.subtotal).toBe(700 - 105 + 90);
  });

  it("drops daily fees and tax past 30 days", () => {
    const q = quote({ car, days: 31, deliveryFee: 0, returnFee: 0, addOns: [] });
    expect(q.coloradoFees).toBe(0);
    expect(q.tax).toBe(0);
    expect(q.total).toBe(3100 - 930);
  });
});
