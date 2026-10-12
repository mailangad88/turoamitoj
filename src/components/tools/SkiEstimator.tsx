"use client";

import Link from "next/link";
import { useState } from "react";
import { cars } from "@/data/cars";
import { quote, usd } from "@/lib/pricing";
import { getZone } from "@/data/zones";

// Approximate one-way road miles from downtown Denver.
const resorts = [
  { id: "winter-park", name: "Winter Park", miles: 67 },
  { id: "keystone", name: "Keystone", miles: 75 },
  { id: "breckenridge", name: "Breckenridge", miles: 80 },
  { id: "copper", name: "Copper Mountain", miles: 78 },
  { id: "vail", name: "Vail", miles: 100 },
];

// Rough fuel economy for the estimate. EV figure is cost per mile at home-charging prices.
const mpg: Record<string, number> = {
  "jeep-grand-cherokee-l": 21,
  "jeep-wrangler-unlimited-willys": 19,
};
const GAS_PRICE = 3.4; // assumption, $/gallon
const EV_COST_PER_MILE = 0.07; // assumption

export function SkiEstimator() {
  const [resort, setResort] = useState("breckenridge");
  const [days, setDays] = useState(4);
  const [people, setPeople] = useState(4);
  const [base, setBase] = useState<"mountain" | "denver">("mountain");

  const r = resorts.find((x) => x.id === resort)!;
  const candidates = cars.filter((c) => c.seats >= people && c.skiRack).sort((a, b) => a.dailyRate - b.dailyRate);
  const car = candidates[0];
  const needsBox = people >= 3;
  const zone = getZone("core")!;
  const q = car ? quote({ car, days, deliveryFee: zone.fee ?? 0, returnFee: zone.fee ?? 0, addOns: needsBox ? ["ski-box"] : [] }) : null;
  const miles = base === "mountain" ? r.miles * 2 + 20 * days : r.miles * 2 * days;
  const fuel = car ? (car.ev ? miles * EV_COST_PER_MILE : (miles / (mpg[car.slug] ?? 22)) * GAS_PRICE) : 0;

  return (
    <div className="card grid gap-6 p-6 md:grid-cols-2">
      <div className="grid gap-4">
        <div>
          <label htmlFor="se-resort" className="label">Resort</label>
          <select id="se-resort" className="field" value={resort} onChange={(e) => setResort(e.target.value)}>
            {resorts.map((x) => <option key={x.id} value={x.id}>{x.name} (~{x.miles} mi from Denver)</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="se-days" className="label">Days with the car</label>
            <input id="se-days" type="number" min={1} max={30} className="field" value={days} onChange={(e) => setDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))} />
          </div>
          <div>
            <label htmlFor="se-people" className="label">Skiers</label>
            <input id="se-people" type="number" min={1} max={7} className="field" value={people} onChange={(e) => setPeople(Math.max(1, Math.min(7, Number(e.target.value) || 1)))} />
          </div>
        </div>
        <fieldset>
          <legend className="label">Where are you staying?</legend>
          <div className="flex flex-col gap-2 text-[15px]">
            <label className="flex items-center gap-2"><input type="radio" id="se-base-m" name="base" checked={base === "mountain"} onChange={() => setBase("mountain")} className="accent-[#14223a]" /> In the mountains (one round trip)</label>
            <label className="flex items-center gap-2"><input type="radio" id="se-base-d" name="base" checked={base === "denver"} onChange={() => setBase("denver")} className="accent-[#14223a]" /> In Denver (day trips each day)</label>
          </div>
        </fieldset>
      </div>
      <div className="rounded-lg bg-cream p-5" role="status" aria-live="polite">
        {car && q ? (
          <>
            <p className="eyebrow">Recommended</p>
            <p className="mt-1 font-display text-[22px] font-semibold">{car.name}</p>
            <p className="text-[14px] text-muted">{car.seats} seats · {car.drive}{needsBox ? " · with roof box" : ""}</p>
            <dl className="mt-4 space-y-1.5 text-[15px]">
              <div className="flex justify-between"><dt>Rental, all in</dt><dd className="tabular-nums">{usd(q.total)}</dd></div>
              <div className="flex justify-between"><dt>{car.ev ? "Charging" : "Fuel"} for ~{miles} miles</dt><dd className="tabular-nums">{usd(Math.round(fuel))}</dd></div>
              <div className="flex justify-between border-t border-line pt-2 font-semibold"><dt>Per skier</dt><dd className="tabular-nums">{usd(Math.round((q.total + fuel) / people))}</dd></div>
            </dl>
            <Link href={`/cars/${car.slug}`} className="btn-gold mt-5 w-full">See this car</Link>
            <p className="mt-3 text-[12px] text-muted">Estimate with Denver-core delivery, gas at ${GAS_PRICE.toFixed(2)}/gal. Excludes lift tickets and parking.</p>
          </>
        ) : (
          <p className="text-[15px]">No single car seats {people} with skis. Book two cars, or call us for a group quote.</p>
        )}
      </div>
    </div>
  );
}
