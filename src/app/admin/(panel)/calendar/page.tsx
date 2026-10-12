import Link from "next/link";
import { bookingsBetween, type Booking } from "@/lib/bookings";
import { listFleet } from "@/lib/fleet";
import { getDb } from "@/lib/db/client";
import { formatDenver, fromDenverLocal } from "@/lib/time";
import { AdminTitle } from "@/components/admin/ui";

export const metadata = { title: "Calendar" };

const denverDay = (d: Date) => formatDenver(d, { year: "numeric", month: "2-digit", day: "2-digit" }); // MM/DD/YYYY
const ymd = (d: Date) => {
  const [m, day, y] = denverDay(d).split("/");
  return `${y}-${m}-${day}`;
};

const barStyle = (b: Booking) => {
  if (b.status === "request") return "border border-dashed border-brand-ink bg-brand-tint text-brand-ink";
  if (b.source === "block") return "bg-[repeating-linear-gradient(135deg,#d9d7d3_0_6px,#e8e6e2_6px_12px)] text-ink-soft";
  if (b.source === "turo") return "bg-[#5b3d78] text-white";
  if (b.source === "direct") return "bg-pine text-white";
  return "bg-brand text-ink";
};

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ month?: string }> }) {
  const sp = await searchParams;
  const today = ymd(new Date());
  const month = sp.month && /^\d{4}-\d{2}$/.test(sp.month) ? sp.month : today.slice(0, 7);
  const [y, m] = month.split("-").map(Number);
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const from = fromDenverLocal(`${month}-01T00:00`)!;
  const nextMonth = m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, "0")}`;
  const prevMonth = m === 1 ? `${y - 1}-12` : `${y}-${String(m - 1).padStart(2, "0")}`;
  const to = fromDenverLocal(`${nextMonth}-01T00:00`)!;

  const db = await getDb().catch(() => null);
  const [fleet, bookings] = await Promise.all([listFleet(), db ? bookingsBetween(from, to) : []]);
  const dayIndex = (d: Date) => {
    const s = ymd(d);
    if (s < `${month}-01`) return -1;
    if (s >= `${nextMonth}-01`) return days;
    return Number(s.slice(8, 10)) - 1;
  };
  const label = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 15)));
  const cols = `minmax(130px,170px) repeat(${days}, minmax(26px,1fr))`;

  return (
    <>
      <AdminTitle
        title="Calendar"
        sub="Tap an empty day to add a booking or block."
        action={
          <div className="flex items-center gap-2">
            <Link href={`/admin/calendar?month=${prevMonth}`} className="btn-ghost px-3 py-2" aria-label="Previous month">
              ←
            </Link>
            <span className="min-w-[150px] text-center font-display text-[18px] font-bold">{label}</span>
            <Link href={`/admin/calendar?month=${nextMonth}`} className="btn-ghost px-3 py-2" aria-label="Next month">
              →
            </Link>
          </div>
        }
      />
      <div className="mb-4 flex flex-wrap gap-4 text-[13px]">
        <Legend cls="bg-brand" label="Website (confirmed)" />
        <Legend cls="border border-dashed border-brand-ink bg-brand-tint" label="Request" />
        <Legend cls="bg-[#5b3d78]" label="Turo trip" />
        <Legend cls="bg-pine" label="Direct" />
        <Legend cls="bg-[#d9d7d3]" label="Blocked" />
      </div>
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <div className="min-w-[960px]">
          <div className="grid border-b border-line text-center text-[11px] text-muted" style={{ gridTemplateColumns: cols }}>
            <div />
            {Array.from({ length: days }, (_, i) => {
              const date = `${month}-${String(i + 1).padStart(2, "0")}`;
              const wd = new Date(`${date}T12:00:00Z`).getUTCDay();
              return (
                <div key={i} className={`py-2 ${date === today ? "font-bold text-brand-ink" : ""} ${wd === 0 || wd === 6 ? "bg-[#faf9f7]" : ""}`}>
                  <div>{"SMTWTFS"[wd]}</div>
                  <div className="text-[13px] text-ink">{i + 1}</div>
                </div>
              );
            })}
          </div>
          {fleet.map((car) => {
            const mine = bookings.filter((b) => b.carSlug === car.slug);
            // Stack overlapping bars (two requests for the same dates) into lanes.
            const lanes: number[] = [];
            const placed = mine.map((b) => {
              const s = Math.max(0, dayIndex(b.startsAt));
              const e = Math.min(days, dayIndex(b.endsAt) + 1);
              let lane = lanes.findIndex((end) => end <= s);
              if (lane === -1) lane = lanes.push(0) - 1;
              lanes[lane] = e;
              return { b, s, e, lane };
            });
            const rows = Math.max(1, lanes.length);
            return (
              <div key={car.slug} className="grid border-b border-line last:border-0" style={{ gridTemplateColumns: cols, gridTemplateRows: `repeat(${rows}, 34px)` }}>
                <div className="flex items-center px-3 text-[13px] font-semibold" style={{ gridRow: `1 / ${rows + 1}` }}>
                  <span className="truncate">{car.name}</span>
                </div>
                {Array.from({ length: days }, (_, i) => (
                  <Link
                    key={i}
                    href={`/admin/bookings/new?car=${car.slug}&date=${month}-${String(i + 1).padStart(2, "0")}`}
                    aria-label={`Add booking for ${car.name} on ${month}-${i + 1}`}
                    className="border-l border-line/60 hover:bg-brand-tint/60"
                    style={{ gridColumn: i + 2, gridRow: `1 / ${rows + 1}` }}
                  />
                ))}
                {placed.map(({ b, s, e, lane }) => (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    title={`${b.guestName} · ${formatDenver(b.startsAt)} to ${formatDenver(b.endsAt)}`}
                    className={`relative z-10 my-1 truncate rounded-md px-2 text-[12px] font-semibold leading-[26px] ${barStyle(b)}`}
                    style={{ gridColumn: `${s + 2} / ${e + 2}`, gridRow: lane + 1 }}
                  >
                    {b.guestName || (b.source === "block" ? "Blocked" : "Booking")}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-5 rounded ${cls}`} />
      {label}
    </span>
  );
}
