"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/actions";

type Row = { slug: string; name: string; dailyRate: number; depositTier: "standard" | "premium" };

export function RatesForm({ action, cars, deposits }: { action: (s: FormState, f: FormData) => Promise<FormState>; cars: Row[]; deposits: { standard: number; premium: number } }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  return (
    <form action={formAction}>
      <div className="divide-y divide-line">
        {cars.map((c) => (
          <div key={c.slug} className="grid grid-cols-[minmax(0,1fr)_110px_150px] items-center gap-3 py-2.5">
            <span className="truncate text-[14px] font-semibold">{c.name}</span>
            <label className="flex items-center gap-1.5">
              <span className="text-muted">$</span>
              <input name={`rate:${c.slug}`} type="number" min={1} defaultValue={c.dailyRate} className="field py-2" aria-label={`${c.name} daily rate`} />
            </label>
            <select name={`deposit:${c.slug}`} defaultValue={c.depositTier} className="field py-2" aria-label={`${c.name} deposit`}>
              <option value="standard">${deposits.standard} deposit</option>
              <option value="premium">${deposits.premium} deposit</option>
            </select>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button className="btn-brand py-2.5" disabled={pending}>
          {pending ? "Saving…" : "Save rates"}
        </button>
        {state.error && <p className="text-[14px] font-medium text-rust">{state.error}</p>}
        {state.ok && <p className="text-[14px] font-medium text-pine">Saved. The website shows the new rates.</p>}
      </div>
    </form>
  );
}
