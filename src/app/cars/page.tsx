import type { Metadata } from "next";
import Link from "next/link";
import { cars } from "@/data/cars";
import { CarCard } from "@/components/CarCard";
import { PageHeader } from "@/components/PageHeader";
import { TripSearchForm } from "@/components/TripSearchForm";
import { parseTrip } from "@/lib/search";

export const metadata: Metadata = {
  title: "AWD and 4x4 rental cars in Denver",
  description: "Every car in our Denver fleet, with seats, drive, tires and the all-in price for your dates. Delivery across the metro.",
  alternates: { canonical: "/cars" },
};

type Filter = "all" | "7-seats" | "ski";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ski", label: "Ski rack" },
  { id: "7-seats", label: "7 seats" },
];

export default async function CarsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const trip = parseTrip(params);
  const f = (typeof params.filter === "string" ? params.filter : "all") as Filter;
  const list = cars.filter((c) =>
    f === "7-seats" ? c.seats >= 7 : f === "ski" ? c.skiRack : true,
  );
  const qs = (filter: Filter) => {
    const q = new URLSearchParams();
    if (trip) {
      q.set("start", trip.start);
      q.set("end", trip.end);
      q.set("zone", trip.zone);
    }
    if (filter !== "all") q.set("filter", filter);
    const s = q.toString();
    return s ? `?${s}` : "";
  };

  return (
    <>
      <PageHeader
        eyebrow="The fleet"
        title="Cars built for Colorado"
        lede={
          trip
            ? `Showing all-in prices for ${trip.days} days, including delivery, Colorado fees and tax.`
            : "Pick your dates to see the all-in price for every car."
        }
      >
        <div className="card max-w-4xl p-4 sm:p-5">
          <TripSearchForm compact initial={trip ?? undefined} />
        </div>
      </PageHeader>
      <section className="wrap mt-8">
        <nav aria-label="Filter cars" className="mb-6 flex flex-wrap gap-2">
          {filters.map((x) => (
            <Link
              key={x.id}
              href={`/cars${qs(x.id)}`}
              aria-current={f === x.id ? "page" : undefined}
              className={`rounded-full border px-4 py-1.5 text-[14px] font-medium ${
                f === x.id ? "border-navy bg-navy text-cream" : "border-line bg-panel text-navy hover:border-navy/40"
              }`}
            >
              {x.label}
            </Link>
          ))}
        </nav>
        {list.length ? (
          <div className="grid max-w-4xl gap-5 sm:grid-cols-2">
            {list.map((c) => (
              <CarCard key={c.slug} car={c} trip={trip} />
            ))}
          </div>
        ) : (
          <p className="text-navy-soft">No cars match that filter yet.</p>
        )}
      </section>
    </>
  );
}
