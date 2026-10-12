"use client";

import { useState } from "react";
import { checkTraction, tractionSeason, type TireType } from "@/lib/traction";

const tires: { id: TireType; label: string }[] = [
  { id: "winter", label: "Winter (mountain-snowflake symbol)" },
  { id: "all-weather", label: "All-weather" },
  { id: "m+s", label: "M+S (mud and snow)" },
  { id: "summer", label: "Summer or performance" },
  { id: "unknown", label: "Not sure" },
];

const treads = [
  { v: "", label: "Not measured" },
  { v: "0.125", label: "4/32 in (worn)" },
  { v: "0.1875", label: "6/32 in (3/16, the minimum)" },
  { v: "0.25", label: "8/32 in" },
  { v: "0.3125", label: "10/32 in (near new)" },
];

export function TractionChecker() {
  const [tire, setTire] = useState<TireType>("m+s");
  const [tread, setTread] = useState("0.25");
  const [chains, setChains] = useState(false);
  const r = checkTraction({ tire, treadInches: tread ? Number(tread) : null, hasChainsOrSocks: chains });
  const inSeason = tractionSeason(new Date());

  return (
    <div className="card grid gap-6 p-6 md:grid-cols-2">
      <div className="grid gap-4">
        <div>
          <label htmlFor="tl-tire" className="label">Tire type (check the sidewall)</label>
          <select id="tl-tire" className="field" value={tire} onChange={(e) => setTire(e.target.value as TireType)}>
            {tires.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="tl-tread" className="label">Tread depth</label>
          <select id="tl-tread" className="field" value={tread} onChange={(e) => setTread(e.target.value)}>
            {treads.map((t) => <option key={t.v} value={t.v}>{t.label}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2.5 text-[15px]">
          <input id="tl-chains" type="checkbox" checked={chains} onChange={(e) => setChains(e.target.checked)} className="h-4 w-4 accent-[#14223a]" />
          Carrying chains or snow socks
        </label>
      </div>
      <div role="status" aria-live="polite" className={`rounded-lg p-5 ${r.compliant ? "bg-pine-tint" : "bg-rust-tint"}`}>
        <p className={`font-display text-[24px] font-semibold ${r.compliant ? "text-pine" : "text-rust"}`}>{r.compliant ? "Compliant" : "Not compliant"}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-navy-soft">{r.reason}</p>
        <p className="mt-4 text-[13px] text-muted">
          {inSeason ? "The Traction Law season is on now (Sept 1 to May 31). Check COtrip.org for active alerts." : "Outside the Sept 1 to May 31 season, but CDOT can activate it any time it snows."}
        </p>
      </div>
    </div>
  );
}
