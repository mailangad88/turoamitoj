import { rentalDays } from "./pricing";

export type TripSearch = { start: string; end: string; zone: string };

export function parseTrip(params: Record<string, string | string[] | undefined>): (TripSearch & { days: number }) | null {
  const get = (k: string) => (typeof params[k] === "string" ? (params[k] as string) : "");
  const start = get("start");
  const end = get("end");
  const zone = get("zone") || "pickup";
  if (!start || !end) return null;
  const days = rentalDays(new Date(start), new Date(end));
  if (!days) return null;
  return { start, end, zone, days };
}

export function tripQuery(t: Partial<TripSearch>) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(t)) if (v) q.set(k, v);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export function toLocalInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
