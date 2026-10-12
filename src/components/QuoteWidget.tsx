"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Car } from "@/data/cars";
import { zones } from "@/data/zones";
import { addOns, quote, rentalDays, usd, type AddOnId } from "@/lib/pricing";
import { toLocalInput } from "@/lib/search";
import { coloradoFees } from "@/config/site";

type Props = {
  car: Pick<Car, "slug" | "name" | "dailyRate" | "depositTier" | "skiRack">;
  initial?: { start?: string; end?: string; zone?: string };
  bookingEngineUrl: string | null;
};

function defaults() {
  const s = new Date();
  s.setDate(s.getDate() + 7);
  s.setHours(10, 0, 0, 0);
  const e = new Date(s);
  e.setDate(e.getDate() + 3);
  return { start: toLocalInput(s), end: toLocalInput(e) };
}

export function QuoteWidget({ car, initial, bookingEngineUrl }: Props) {
  const d = useMemo(defaults, []);
  const [start, setStart] = useState(initial?.start || d.start);
  const [end, setEnd] = useState(initial?.end || d.end);
  const [zoneId, setZoneId] = useState(initial?.zone || "core");
  const [selected, setSelected] = useState<AddOnId[]>([]);

  const days = rentalDays(new Date(start), new Date(end));
  const zone = zones.find((z) => z.id === zoneId);
  const fee = zone?.fee ?? 0;
  const q = days ? quote({ car, days, deliveryFee: fee, returnFee: fee, addOns: selected }) : null;

  const params = new URLSearchParams({ car: car.slug, start, end, zone: zoneId });
  if (selected.length) params.set("addons", selected.join(","));

  const toggle = (id: AddOnId) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="card p-5">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[26px] font-semibold tabular-nums">{usd(car.dailyRate)}</span>
        <span className="text-[13px] text-muted">per day before fees</span>
      </div>
      <div className="mt-4 grid gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="q-start" className="label">Pickup</label>
            <input id="q-start" type="datetime-local" className="field px-2 text-[14px]" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <label htmlFor="q-end" className="label">Return</label>
            <input id="q-end" type="datetime-local" className="field px-2 text-[14px]" value={end} min={start} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>
        <div>
          <label htmlFor="q-zone" className="label">Delivery and return</label>
          <select id="q-zone" className="field" value={zoneId} onChange={(e) => setZoneId(e.target.value)}>
            {zones.filter((z) => z.available && z.fee !== null).map((z) => (
              <option key={z.id} value={z.id}>
                {z.name} {z.fee ? `(+$${z.fee} each way)` : "(free)"}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="label">Add-ons</legend>
          <div className="grid gap-1.5">
            {addOns
              .filter((a) => a.id !== "ski-box" || car.skiRack)
              .map((a) => (
                <label key={a.id} className="flex cursor-pointer items-center gap-2.5 text-[14px]">
                  <input type="checkbox" id={`addon-${a.id}`} checked={selected.includes(a.id)} onChange={() => toggle(a.id)} className="h-4 w-4 accent-[#14223a]" />
                  <span className="flex-1">{a.label}</span>
                  <span className="tabular-nums text-muted">${a.perDay}/day</span>
                </label>
              ))}
          </div>
        </fieldset>
      </div>

      {q ? (
        <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-[14px]">
          {q.lines.map((l) => (
            <div key={l.label} className="flex justify-between gap-3">
              <dt className="text-navy-soft">{l.label}</dt>
              <dd className="tabular-nums">{usd(l.amount)}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-3">
            <dt className="text-navy-soft">Sales tax (estimate)</dt>
            <dd className="tabular-nums">{usd(q.tax)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-navy-soft">
              Colorado rental fees
              {q.coloradoFees === 0 && <span className="block text-[12px] text-pine">Exempt: rental over 30 days</span>}
            </dt>
            <dd className="tabular-nums">{usd(q.coloradoFees)}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-line pt-2 text-[16px] font-semibold">
            <dt>Total for {q.days} days</dt>
            <dd className="tabular-nums">{usd(q.total)}</dd>
          </div>
          <p className="pt-1 text-[12px] text-muted">
            Plus a refundable {usd(q.deposit)} deposit hold. Colorado fees are ${(coloradoFees.dailyRentalFee + coloradoFees.congestionImpactFee).toFixed(2)}/day for rentals of 30 days or less.
          </p>
        </dl>
      ) : (
        <p className="mt-5 rounded-md bg-rust-tint px-3 py-2 text-[14px] text-rust">Choose a return time after pickup to see your price.</p>
      )}

      {bookingEngineUrl ? (
        <a href={bookingEngineUrl} className="btn-gold mt-5 w-full">Book this car</a>
      ) : (
        <Link href={q ? `/book?${params.toString()}` : "#"} aria-disabled={!q} className={`btn-gold mt-5 w-full ${q ? "" : "pointer-events-none opacity-60"}`}>
          Request this car
        </Link>
      )}
      <p className="mt-2 text-center text-[12px] text-muted">No charge until we confirm your dates.</p>
    </div>
  );
}
