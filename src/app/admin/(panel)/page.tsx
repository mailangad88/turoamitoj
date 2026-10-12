import Link from "next/link";
import { listBookings } from "@/lib/bookings";
import { listFleet } from "@/lib/fleet";
import { getDb } from "@/lib/db/client";
import { formatDenver } from "@/lib/time";
import { AdminTitle, Panel, TextLink } from "@/components/admin/ui";
import { BookingRow } from "@/components/admin/BookingRow";

export default async function Overview() {
  const db = await getDb().catch(() => null);
  const fleet = await listFleet();
  const names = Object.fromEntries(fleet.map((c) => [c.slug, c.name]));
  const [requests, upcoming] = db
    ? await Promise.all([listBookings({ status: "request", upcomingOnly: true }), listBookings({ status: "confirmed", upcomingOnly: true })])
    : [[], []];

  // Pickups and returns in the next two weeks, in time order.
  const now = Date.now();
  const horizon = now + 14 * 86400_000;
  const moves = upcoming
    .flatMap((b) => [
      { b, at: b.startsAt, kind: "Pickup" as const },
      { b, at: b.endsAt, kind: "Return" as const },
    ])
    .filter((m) => m.at.getTime() >= now && m.at.getTime() <= horizon)
    .sort((a, b) => a.at.getTime() - b.at.getTime());

  const onTripNow = upcoming.filter((b) => b.startsAt.getTime() <= now && b.endsAt.getTime() > now).length;

  return (
    <>
      <AdminTitle title="Overview" sub={formatDenver(new Date(), { weekday: "long", month: "long", day: "numeric" })} />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat label="New requests" value={requests.length} href="/admin/bookings?status=request" highlight={requests.length > 0} />
        <Stat label="Out on a trip now" value={onTripNow} href="/admin/calendar" />
        <Stat label="Cars listed" value={fleet.filter((c) => c.active).length} href="/admin/fleet" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Requests to answer" action={<TextLink href="/admin/bookings?status=request">All</TextLink>}>
          {requests.length ? (
            <ul className="divide-y divide-line">
              {requests.map((b) => (
                <BookingRow key={b.id} b={b} car={names[b.carSlug]} />
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-muted">No new requests. Requests from the website land here.</p>
          )}
        </Panel>
        <Panel title="Next 14 days" action={<TextLink href="/admin/calendar">Calendar</TextLink>}>
          {moves.length ? (
            <ul className="divide-y divide-line">
              {moves.map((m) => (
                <li key={`${m.b.id}-${m.kind}`} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <p className="text-[15px] font-semibold">
                      {m.kind} · {names[m.b.carSlug] ?? m.b.carSlug}
                    </p>
                    <p className="text-[13px] text-muted">
                      {m.b.guestName || "No name"} {m.b.address ? `· ${m.b.address}` : m.b.zone ? `· ${m.b.zone}` : ""}
                    </p>
                  </div>
                  <Link href={`/admin/bookings/${m.b.id}`} className="shrink-0 text-right text-[14px] font-medium">
                    {formatDenver(m.at, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-muted">No pickups or returns in the next two weeks.</p>
          )}
        </Panel>
      </div>
    </>
  );
}

function Stat({ label, value, href, highlight }: { label: string; value: number; href: string; highlight?: boolean }) {
  return (
    <Link href={href} className={`rounded-xl border p-5 transition hover:border-ink/30 ${highlight ? "border-brand bg-brand-tint" : "border-line bg-white"}`}>
      <p className="text-[13px] font-medium text-muted">{label}</p>
      <p className="mt-1 font-display text-[34px] font-bold leading-none">{value}</p>
    </Link>
  );
}
