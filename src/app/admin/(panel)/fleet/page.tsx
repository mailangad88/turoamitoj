import Link from "next/link";
import { listFleet } from "@/lib/fleet";
import { usd } from "@/lib/pricing";
import { AdminTitle, Notice } from "@/components/admin/ui";
import { CarSilhouette } from "@/components/CarSilhouette";

export const metadata = { title: "Fleet" };

export default async function FleetPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const fleet = await listFleet();
  return (
    <>
      <AdminTitle
        title="Fleet"
        sub="What guests see on the website. Hidden cars stay in your records but drop off the site."
        action={
          <Link href="/admin/fleet/new" className="btn-brand py-2.5">
            Add a car
          </Link>
        }
      />
      {saved && <Notice tone="ok">Saved {saved}. The website shows the change now.</Notice>}
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {fleet.map((c) => (
          <Link key={c.slug} href={`/admin/fleet/${c.slug}`} className="flex gap-4 rounded-xl border border-line bg-white p-4 transition hover:border-ink/30">
            <div className="flex h-20 w-28 shrink-0 items-end justify-center rounded-lg bg-gradient-to-b from-[#f1f0ee] to-[#dedcd8] pb-2">
              <CarSilhouette body={c.body} className="w-24 text-ink" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="truncate font-display text-[17px] font-bold">{c.name}</p>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${c.active ? "bg-pine-tint text-pine" : "bg-[#ececec] text-muted"}`}>
                  {c.active ? "Listed" : "Hidden"}
                </span>
              </div>
              <p className="text-[13px] text-muted">
                {c.year} · {c.color} · {c.seats} seats · {c.drive}
              </p>
              <p className="mt-2 text-[15px] font-semibold">{usd(c.dailyRate)} / day</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
