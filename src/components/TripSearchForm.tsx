"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { zones } from "@/data/zones";
import { rentalDays } from "@/lib/pricing";
import { toLocalInput, tripQuery } from "@/lib/search";

function defaults() {
  const s = new Date();
  s.setDate(s.getDate() + 7);
  s.setHours(10, 0, 0, 0);
  const e = new Date(s);
  e.setDate(e.getDate() + 3);
  return { start: toLocalInput(s), end: toLocalInput(e) };
}

export function TripSearchForm({ compact = false, initial }: { compact?: boolean; initial?: { start?: string; end?: string; zone?: string } }) {
  const router = useRouter();
  const d = useMemo(defaults, []);
  const [start, setStart] = useState(initial?.start || d.start);
  const [end, setEnd] = useState(initial?.end || d.end);
  const [zone, setZone] = useState(initial?.zone || "core");
  const days = rentalDays(new Date(start), new Date(end));

  return (
    <form
      className={`grid gap-3 ${compact ? "sm:grid-cols-[1fr_1fr_1fr_auto]" : "sm:grid-cols-2"} items-end`}
      onSubmit={(e) => {
        e.preventDefault();
        if (!days) return;
        router.push(`/cars${tripQuery({ start, end, zone })}`);
      }}
    >
      <div>
        <label htmlFor="trip-start" className="label">Pickup</label>
        <input id="trip-start" type="datetime-local" className="field" value={start} onChange={(e) => setStart(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="trip-end" className="label">Return</label>
        <input id="trip-end" type="datetime-local" className="field" value={end} min={start} onChange={(e) => setEnd(e.target.value)} required />
      </div>
      <div className={compact ? "" : "sm:col-span-2"}>
        <label htmlFor="trip-zone" className="label">Delivery</label>
        <select id="trip-zone" className="field" value={zone} onChange={(e) => setZone(e.target.value)}>
          {zones.filter((z) => z.available).map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
              {z.fee === 0 ? " (free)" : z.fee ? ` (+$${z.fee} each way)` : " (by quote)"}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={`btn-gold ${compact ? "" : "sm:col-span-2"} py-3.5 text-[16px]`} disabled={!days}>
        {days ? `Show cars for ${days} day${days === 1 ? "" : "s"}` : "Return must be after pickup"}
      </button>
    </form>
  );
}
