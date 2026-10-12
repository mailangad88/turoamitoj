// Colorado Traction Law (CDOT, updated November 2025). In effect Sept 1 to May 31 on I-70
// between Dotsero and Morrison, and on other highways when CDOT activates it.
export type TireType = "winter" | "all-weather" | "m+s" | "summer" | "unknown";

export type TractionInput = {
  tire: TireType;
  treadInches: number | null; // null = not measured
  hasChainsOrSocks: boolean;
};

export type TractionResult = {
  compliant: boolean;
  reason: string;
};

export const MIN_TREAD = 3 / 16;

export function checkTraction({ tire, treadInches, hasChainsOrSocks }: TractionInput): TractionResult {
  const ratedTire = tire === "winter" || tire === "all-weather" || tire === "m+s";
  const enoughTread = treadInches !== null && treadInches >= MIN_TREAD;

  if (ratedTire && enoughTread) {
    return { compliant: true, reason: "Rated tires with at least 3/16 inch of tread meet the Traction Law." };
  }
  if (hasChainsOrSocks) {
    return {
      compliant: true,
      reason: "Compliant only once chains or an approved traction device are fitted to two or more drive tires.",
    };
  }
  if (!ratedTire) {
    return {
      compliant: false,
      reason: "The tires aren't winter, all-weather or M+S rated, and AWD alone no longer counts. Carry chains or traction socks.",
    };
  }
  return {
    compliant: false,
    reason: treadInches === null
      ? "Tread depth is unknown. Measure it with a tread gauge; you need at least 3/16 inch."
      : "Tread is under 3/16 inch. Replace the tires or carry chains or traction socks.",
  };
}

export function tractionSeason(date: Date): boolean {
  const m = date.getMonth(); // 0 = Jan
  return m >= 8 || m <= 4; // Sept through May
}
