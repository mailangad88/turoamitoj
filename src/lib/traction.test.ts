import { describe, expect, it } from "vitest";
import { checkTraction, tractionSeason } from "./traction";

describe("checkTraction", () => {
  it("passes rated tires with enough tread", () => {
    expect(checkTraction({ tire: "m+s", treadInches: 0.25, hasChainsOrSocks: false }).compliant).toBe(true);
  });
  it("fails summer tires without a device, even on AWD", () => {
    expect(checkTraction({ tire: "summer", treadInches: 0.3, hasChainsOrSocks: false }).compliant).toBe(false);
  });
  it("fails worn rated tires", () => {
    expect(checkTraction({ tire: "winter", treadInches: 0.125, hasChainsOrSocks: false }).compliant).toBe(false);
  });
  it("passes with chains as the fallback", () => {
    expect(checkTraction({ tire: "summer", treadInches: null, hasChainsOrSocks: true }).compliant).toBe(true);
  });
});

describe("tractionSeason", () => {
  it("covers September through May", () => {
    expect(tractionSeason(new Date(2026, 8, 1))).toBe(true);
    expect(tractionSeason(new Date(2026, 4, 31))).toBe(true);
    expect(tractionSeason(new Date(2026, 6, 4))).toBe(false);
  });
});
