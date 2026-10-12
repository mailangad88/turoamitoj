import Link from "next/link";
import { listBookings, statuses, statusLabel, type BookingStatus } from "@/lib/bookings";
import { listFleet } from "@/lib/fleet";
import { getDb } from "@/lib/db/client";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { BookingRow } from "@/components/admin/BookingRow";

export const metadata = { title: "Bookings" };

export default async function BookingsPage({ searchParams }: { searchParams: Promise<{ status?: string; past?: string }> }) {
  const sp = await searchParams;
  const status = statuses.includes(sp.status as BookingStatus) ? (sp.status as BookingStatus) : undefined;
  const past = sp.past === "1";
  const db = await getDb().catch(() => null);
  const [list, fleet] = await Promise.all([db ? listBookings({ status, upcomingOnly: !past, limit: 300 }) : [], listFleet()]);
  const names = Object.fromEntries(fleet.map((c) => [c.slug, c.name]));
  const tabs: { label: string; status?: BookingStatus }[] = [{ label: "All" }, ...statuses.map((s) => ({ label: statusLabel[s], status: s }))];
  const href = (s?: BookingStatus, p = past) => {
    const q = new URLSearchParams();
    if (s) q.set("status", s);
    if (p) q.set("past", "1");
    const str = q.toString();
    return `/admin/bookings${str ? `?${str}` : ""}`;
  };

  return (
    <>
      <AdminTitle
        title="Bookings"
        sub="Website requests, Turo trips and anything else that holds a car."
        action={
          <Link href="/admin/bookings/new" className="btn-brand py-2.5">
            Add booking or block
          </Link>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <Link
            key={t.label}
            href={href(t.status)}
            className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium ${status === t.status ? "border-ink bg-ink text-cream" : "border-line bg-white hover:border-ink/40"}`}
          >
            {t.label}
          </Link>
        ))}
        <Link href={href(status, !past)} className="ml-auto text-[13px] font-medium underline underline-offset-4">
          {past ? "Hide past trips" : "Include past trips"}
        </Link>
      </div>
      <Panel>
        {list.length ? (
          <ul className="-my-3 divide-y divide-line">
            {list.map((b) => (
              <BookingRow key={b.id} b={b} car={names[b.carSlug]} />
            ))}
          </ul>
        ) : (
          <p className="text-[15px] text-muted">Nothing here yet.</p>
        )}
      </Panel>
    </>
  );
}
