// Rental times are Denver wall-clock times. These helpers convert between a datetime-local
// string ("2026-12-19T10:00") read as America/Denver and a real instant, whatever the server's zone.

export const TZ = "America/Denver";

function offsetMinutes(at: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** "2026-12-19T10:00" in Denver → Date. Returns null for anything unparseable. */
export function fromDenverLocal(local: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(local);
  if (!m) return null;
  const guess = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  // Two passes settle the offset even on DST change days.
  let t = guess - offsetMinutes(new Date(guess)) * 60000;
  t = guess - offsetMinutes(new Date(t)) * 60000;
  return new Date(t);
}

/** Date → "2026-12-19T10:00" in Denver, for datetime-local inputs. */
export function toDenverLocal(d: Date) {
  const local = new Date(d.getTime() + offsetMinutes(d) * 60000);
  return local.toISOString().slice(0, 16);
}

export function formatDenver(d: Date, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) {
  return new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts }).format(d);
}

/** Half-open ranges [aStart, aEnd) and [bStart, bEnd) share time. A return at 10:00 and a pickup at 10:00 don't clash. */
export function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && bStart < aEnd;
}
