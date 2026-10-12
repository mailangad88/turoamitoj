import { notFound } from "next/navigation";
import { getBooking, sourceLabel, type BookingStatus } from "@/lib/bookings";
import { listFleet } from "@/lib/fleet";
import { getZone } from "@/data/zones";
import { addOns, usd } from "@/lib/pricing";
import { formatDenver, toDenverLocal } from "@/lib/time";
import { AdminTitle, Notice, Panel, StatusBadge, TextLink } from "@/components/admin/ui";
import { AdminBookingForm } from "@/components/admin/BookingForm";
import { deleteBookingAction, setStatusAction, updateBookingAction } from "../../../actions";

export const metadata = { title: "Booking" };

const next: Record<BookingStatus, { status: BookingStatus; label: string; primary?: boolean }[]> = {
  request: [
    { status: "confirmed", label: "Confirm", primary: true },
    { status: "declined", label: "Decline" },
  ],
  confirmed: [
    { status: "completed", label: "Mark returned", primary: true },
    { status: "cancelled", label: "Cancel" },
  ],
  declined: [{ status: "request", label: "Reopen" }],
  cancelled: [{ status: "confirmed", label: "Reinstate" }],
  completed: [],
};

export default async function BookingPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const b = await getBooking(id);
  if (!b) notFound();
  const fleet = await listFleet();
  const car = fleet.find((c) => c.slug === b.carSlug);
  const zone = b.zone ? getZone(b.zone) : undefined;
  const days = Math.max(1, Math.ceil((b.endsAt.getTime() - b.startsAt.getTime() - 59 * 60000) / 86400_000));

  return (
    <>
      <p className="mb-2 text-[14px]">
        <TextLink href="/admin/bookings">← Bookings</TextLink>
      </p>
      <AdminTitle
        title={`${b.guestName || "No name"} · ${car?.name ?? b.carSlug}`}
        sub={`${formatDenver(b.startsAt, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })} to ${formatDenver(b.endsAt, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })} · ${days} day${days === 1 ? "" : "s"}`}
        action={<StatusBadge status={b.status} />}
      />
      {error && <Notice tone="error">{error}</Notice>}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Panel title="Edit">
          <AdminBookingForm
            // Remount when the booking changes elsewhere (a status button), so the fields show the saved values.
            key={`${b.status}-${b.carSlug}-${b.startsAt.getTime()}-${b.endsAt.getTime()}`}
            action={updateBookingAction}
            cars={fleet}
            submitLabel="Save changes"
            initial={{
              id: b.id,
              carSlug: b.carSlug,
              source: b.source,
              status: b.status,
              start: toDenverLocal(b.startsAt),
              end: toDenverLocal(b.endsAt),
              guestName: b.guestName,
              guestEmail: b.guestEmail,
              guestPhone: b.guestPhone,
              notes: b.notes,
            }}
          />
        </Panel>
        <div className="space-y-6">
          {next[b.status].length > 0 && (
            <Panel title="Next step">
              <div className="flex flex-wrap gap-2">
                {next[b.status].map((n) => (
                  <form key={n.status} action={setStatusAction}>
                    <input type="hidden" name="id" value={b.id} />
                    <input type="hidden" name="status" value={n.status} />
                    <button className={n.primary ? "btn-brand py-2.5" : "btn-ghost py-2.5"}>{n.label}</button>
                  </form>
                ))}
              </div>
              {b.status === "request" && (
                <p className="mt-3 text-[13px] text-muted">Confirming holds the car on the website. Then reply to the guest with the payment link and ID check.</p>
              )}
            </Panel>
          )}
          <Panel title="Details">
            <dl className="space-y-2.5 text-[14px]">
              <Row k="Type" v={sourceLabel[b.source]} />
              {b.guestEmail && <Row k="Email" v={<a className="underline" href={`mailto:${b.guestEmail}`}>{b.guestEmail}</a>} />}
              {b.guestPhone && <Row k="Phone" v={<a className="underline" href={`tel:${b.guestPhone}`}>{b.guestPhone}</a>} />}
              {b.driverAge && <Row k="Driver age" v={b.driverAge} />}
              {zone && <Row k="Delivery" v={zone.name} />}
              {b.address && <Row k="Address" v={b.address} />}
              {b.addOns.length > 0 && <Row k="Add-ons" v={b.addOns.map((a) => addOns.find((x) => x.id === a)?.label ?? a).join(", ")} />}
              {b.quoteTotal !== null && <Row k="Quoted total" v={usd(b.quoteTotal)} />}
              {b.deposit !== null && <Row k="Deposit" v={usd(b.deposit)} />}
              <Row k="Received" v={formatDenver(b.createdAt)} />
            </dl>
          </Panel>
          <form action={deleteBookingAction}>
            <input type="hidden" name="id" value={b.id} />
            <button className="text-[13px] font-medium text-rust underline underline-offset-4">Delete this booking</button>
          </form>
        </div>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}
