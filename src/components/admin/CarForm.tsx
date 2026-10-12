"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/actions";
import type { FleetCar } from "@/lib/fleet";

export function CarForm({ action, car, isNew }: { action: (s: FormState, f: FormData) => Promise<FormState>; car: FleetCar; isNew: boolean }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="previousSlug" value={isNew ? "" : car.slug} />
      <Section title="The basics">
        <F label="Name" className="sm:col-span-2">
          <input name="name" defaultValue={car.name} required className="field" placeholder="Jeep Grand Cherokee L" />
        </F>
        <F label="Year">
          <input name="year" type="number" defaultValue={car.year} className="field" />
        </F>
        <F label="Color">
          <input name="color" defaultValue={car.color} className="field" />
        </F>
        <F label="Body">
          <select name="body" defaultValue={car.body} className="field">
            <option value="suv">SUV</option>
            <option value="boxy">Boxy SUV (Wrangler, Bronco)</option>
            <option value="crossover">Crossover</option>
            <option value="wagon">Wagon</option>
            <option value="truck">Truck</option>
          </select>
        </F>
        <F label="Drive">
          <select name="drive" defaultValue={car.drive} className="field">
            <option value="4WD">4WD</option>
            <option value="AWD">AWD</option>
          </select>
        </F>
        <F label="Seats">
          <input name="seats" type="number" min={2} max={9} defaultValue={car.seats} className="field" />
        </F>
        <F label="Web address" hint={`/cars/${car.slug || "…"}`}>
          <input name="slug" defaultValue={car.slug} required className="field font-mono text-[14px]" placeholder="jeep-grand-cherokee-l" />
        </F>
      </Section>

      <Section title="Price and rules">
        <F label="Daily rate ($)">
          <input name="dailyRate" type="number" min={1} defaultValue={car.dailyRate} className="field" />
        </F>
        <F label="Deposit">
          <select name="depositTier" defaultValue={car.depositTier} className="field">
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </F>
        <F label="Miles included per day">
          <input name="milesPerDay" type="number" min={0} defaultValue={car.milesPerDay} className="field" />
        </F>
        <F label="Tires">
          <input name="tires" defaultValue={car.tires} className="field" placeholder="M+S all-season" />
        </F>
        <div className="flex flex-wrap gap-x-6 gap-y-3 sm:col-span-2">
          <Check name="tractionLawReady" label="Traction Law ready" checked={car.tractionLawReady} />
          <Check name="skiRack" label="Takes a ski rack or roof box" checked={car.skiRack} />
          <Check name="ev" label="Electric" checked={car.ev} />
        </div>
      </Section>

      <Section title="On the car's page">
        <F label="Summary" className="sm:col-span-2">
          <textarea name="summary" rows={3} defaultValue={car.summary} className="field" />
        </F>
        <F label="Highlights (one per line)">
          <textarea name="highlights" rows={4} defaultValue={car.highlights.join("\n")} className="field" />
        </F>
        <F label="Best for (one per line)">
          <textarea name="bestFor" rows={4} defaultValue={car.bestFor.join("\n")} className="field" />
        </F>
      </Section>

      <Section title="Listing">
        <div className="flex items-center sm:col-span-1">
          <Check name="active" label="Show this car on the website" checked={car.active} />
        </div>
        <F label="Order on the site (lower shows first)">
          <input name="sortOrder" type="number" defaultValue={car.sortOrder} className="field" />
        </F>
      </Section>

      <div className="flex flex-wrap items-center gap-4">
        <button className="btn-brand" disabled={pending}>
          {pending ? "Saving…" : isNew ? "Add car" : "Save car"}
        </button>
        {state.error && <p className="text-[14px] font-medium text-rust">{state.error}</p>}
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-line bg-white p-5">
      <legend className="px-1 font-display text-[16px] font-bold">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function F({ label, hint, className = "", children }: { label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
      {children}
      {hint && <span className="mt-1 block font-mono text-[12px] text-muted">{hint}</span>}
    </label>
  );
}

function Check({ name, label, checked }: { name: string; label: string; checked: boolean }) {
  return (
    <label className="inline-flex items-center gap-2 text-[15px]">
      <input type="checkbox" name={name} defaultChecked={checked} className="h-4 w-4 accent-[#ff7a00]" />
      {label}
    </label>
  );
}
