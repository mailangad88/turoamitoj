import Link from "next/link";
import type { Car } from "@/data/cars";
import { CarSilhouette } from "./CarSilhouette";
import { quote, usd } from "@/lib/pricing";
import { tripQuery, type TripSearch } from "@/lib/search";
import { getZone } from "@/data/zones";

export function CarCard({ car, trip }: { car: Car; trip?: (TripSearch & { days: number }) | null }) {
  const zone = trip ? getZone(trip.zone) : undefined;
  const fee = zone?.fee ?? 0;
  const q = trip ? quote({ car, days: trip.days, deliveryFee: fee, returnFee: fee, addOns: [] }) : null;

  return (
    <article className="card flex flex-col overflow-hidden">
      <Link href={`/cars/${car.slug}${trip ? tripQuery(trip) : ""}`} className="group flex flex-1 flex-col">
        <div className="relative flex aspect-[16/9] items-end justify-center bg-gradient-to-b from-[#e9e1d0] to-[#ddd2bc] px-6 pb-3">
          <CarSilhouette body={car.body} className="w-[78%] text-navy transition group-hover:translate-x-1" />
          <span className="absolute left-3 top-3 rounded-full bg-panel/90 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            Photo coming
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="font-display text-[19px] font-semibold leading-tight text-navy">{car.name}</h3>
            <p className="mt-0.5 text-[13px] text-muted">{car.year} · {car.color} · {car.tires}</p>
          </div>
          <ul className="flex flex-wrap gap-1.5 text-[12px] font-medium">
            <li className="rounded bg-navy/5 px-2 py-1">{car.seats} seats</li>
            <li className="rounded bg-navy/5 px-2 py-1">{car.drive}</li>
            {car.tractionLawReady && <li className="rounded bg-pine-tint px-2 py-1 text-pine">Traction Law ready</li>}
            {car.ev && <li className="rounded bg-navy/5 px-2 py-1">Electric</li>}
          </ul>
          <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-3">
            {q ? (
              <div>
                <div className="font-display text-[22px] font-semibold tabular-nums">{usd(q.total)}</div>
                <div className="text-[12px] text-muted">all-in for {q.days} days, fees and tax included</div>
              </div>
            ) : (
              <div>
                <div className="font-display text-[22px] font-semibold tabular-nums">
                  {usd(car.dailyRate)}
                  <span className="text-[14px] font-normal text-muted"> / day</span>
                </div>
                <div className="text-[12px] text-muted">before fees; pick dates for the all-in price</div>
              </div>
            )}
            <span className="btn-gold px-4 py-2 text-[14px]">View</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
