"use client";

import { useState } from "react";
import type { Car } from "@/data/cars";
import { quote, usd } from "@/lib/pricing";

export function TuroVsDirect({ cars }: { cars: Car[] }) {
  const [slug, setSlug] = useState(cars[0].slug);
  const [days, setDays] = useState(3);
  const [turoTotal, setTuroTotal] = useState("");
  const car = cars.find((c) => c.slug === slug)!;
  const direct = quote({ car, days, deliveryFee: 0, returnFee: 0, addOns: [] });
  const turo = Number(turoTotal);
  const diff = turo > 0 ? turo - direct.total : null;

  return (
    <div className="card grid gap-6 p-6 md:grid-cols-2">
      <div className="grid gap-4">
        <div>
          <label htmlFor="tvd-car" className="label">Car</label>
          <select id="tvd-car" className="field" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {cars.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tvd-days" className="label">Days</label>
          <input id="tvd-days" type="number" min={1} max={60} className="field" value={days} onChange={(e) => setDays(Math.max(1, Math.min(60, Number(e.target.value) || 1)))} />
        </div>
        <div>
          <label htmlFor="tvd-turo" className="label">Turo checkout total for the same dates ($)</label>
          <input id="tvd-turo" type="number" inputMode="decimal" min={0} className="field" placeholder="Copy it from Turo's checkout page" value={turoTotal} onChange={(e) => setTuroTotal(e.target.value)} />
        </div>
      </div>
      <div className="rounded-lg bg-cream p-5" role="status" aria-live="polite">
        <dl className="space-y-2 text-[15px]">
          <div className="flex justify-between"><dt>Direct, all in (pickup)</dt><dd className="font-semibold tabular-nums">{usd(direct.total)}</dd></div>
          <div className="flex justify-between"><dt>Turo, as you entered it</dt><dd className="tabular-nums">{turo > 0 ? usd(turo) : "—"}</dd></div>
        </dl>
        {diff !== null && (
          <p className={`mt-4 font-display text-[22px] font-semibold ${diff > 0 ? "text-pine" : "text-ink"}`}>
            {diff > 0 ? `You save ${usd(Math.round(diff))} booking direct` : "Turo is cheaper for these dates"}
          </p>
        )}
        <p className="mt-4 text-[12px] text-muted">
          Turo&apos;s trip fees and protection prices change by trip, so we compare against the real total you see there rather than guessing.
        </p>
      </div>
    </div>
  );
}
