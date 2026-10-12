"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/admin/actions";
import { sourceLabel, sources, statusLabel, statuses, type BookingSource, type BookingStatus } from "@/lib/booking-meta";

type Values = {
  id?: string;
  carSlug: string;
  source: BookingSource;
  status: BookingStatus;
  start: string;
  end: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes: string;
};

export function AdminBookingForm({
  action,
  cars,
  initial,
  submitLabel,
}: {
  action: (s: FormState, f: FormData) => Promise<FormState>;
  cars: { slug: string; name: string }[];
  initial: Values;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});
  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      {initial.id && <input type="hidden" name="id" value={initial.id} />}
      <Field label="Car">
        <select name="carSlug" defaultValue={initial.carSlug} className="field">
          {cars.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Type">
        <select name="source" defaultValue={initial.source} className="field">
          {sources.map((s) => (
            <option key={s} value={s}>
              {sourceLabel[s]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Pickup (Denver time)">
        <input type="datetime-local" name="start" defaultValue={initial.start} required className="field" />
      </Field>
      <Field label="Return (Denver time)">
        <input type="datetime-local" name="end" defaultValue={initial.end} required className="field" />
      </Field>
      <Field label="Status">
        <select name="status" defaultValue={initial.status} className="field">
          {statuses.map((s) => (
            <option key={s} value={s}>
              {statusLabel[s]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Guest name">
        <input name="guestName" defaultValue={initial.guestName} className="field" />
      </Field>
      <Field label="Email">
        <input name="guestEmail" type="email" defaultValue={initial.guestEmail} className="field" />
      </Field>
      <Field label="Phone">
        <input name="guestPhone" defaultValue={initial.guestPhone} className="field" />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Notes">
          <textarea name="notes" rows={3} defaultValue={initial.notes} className="field" placeholder="Turo trip number, handoff details, damage notes…" />
        </Field>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button className="btn-brand" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </button>
        {state.error && <p className="text-[14px] font-medium text-rust">{state.error}</p>}
        {state.ok && <p className="text-[14px] font-medium text-pine">Saved.</p>}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
