import { describe, expect, it } from "vitest";
import { fromDenverLocal, overlaps, toDenverLocal } from "./time";

describe("Denver time", () => {
  it("reads winter times as MST (UTC-7)", () => {
    expect(fromDenverLocal("2026-12-19T10:00")?.toISOString()).toBe("2026-12-19T17:00:00.000Z");
  });
  it("reads summer times as MDT (UTC-6)", () => {
    expect(fromDenverLocal("2026-07-04T10:00")?.toISOString()).toBe("2026-07-04T16:00:00.000Z");
  });
  it("round-trips across the November clock change", () => {
    for (const local of ["2026-11-01T00:30", "2026-11-01T03:00", "2026-11-02T10:00"]) {
      expect(toDenverLocal(fromDenverLocal(local)!)).toBe(local);
    }
  });
  it("rejects junk", () => {
    expect(fromDenverLocal("next tuesday")).toBeNull();
  });
});

describe("overlaps", () => {
  const d = (s: string) => new Date(s);
  it("lets a return and the next pickup share a time", () => {
    expect(overlaps(d("2026-01-01T10:00Z"), d("2026-01-03T10:00Z"), d("2026-01-03T10:00Z"), d("2026-01-05T10:00Z"))).toBe(false);
  });
  it("catches a one-hour overlap", () => {
    expect(overlaps(d("2026-01-01T10:00Z"), d("2026-01-03T11:00Z"), d("2026-01-03T10:00Z"), d("2026-01-05T10:00Z"))).toBe(true);
  });
});
