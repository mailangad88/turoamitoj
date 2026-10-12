import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { photos } from "@/data/photos";
import { CtaBand } from "@/components/CtaBand";
import { zones } from "@/data/zones";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Delivery areas and fees",
  description: "Where we deliver rental cars in the Denver metro, and what it costs: Denver core, Aurora, Lakewood, Boulder, Golden and mountain towns.",
  alternates: { canonical: "/delivery-areas" },
};

export default function Page() {
  return (
    <>
      <PageHeader photo={photos.denverSkyline} eyebrow="Delivery" title="Delivery areas and fees" lede={`Free pickup at our home base in ${site.pickupArea}, or delivery to your door or hotel. Fees are per trip leg: delivery and return are charged separately.`} />
      <section className="wrap mt-10">
        <div className="overflow-x-auto rounded-lg border border-line bg-panel">
          <table className="w-full min-w-[560px] text-left text-[15px]">
            <thead className="bg-cream/70 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              <tr><th className="px-4 py-3">Zone</th><th className="px-4 py-3">Areas</th><th className="px-4 py-3 text-right">Each way</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {zones.map((z) => (
                <tr key={z.id} className={z.available ? "" : "text-muted"}>
                  <td className="px-4 py-3 font-semibold">{z.name}</td>
                  <td className="px-4 py-3">{z.areas}{z.note && <span className="block text-[13px] text-muted">{z.note}</span>}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{!z.available ? "Not yet" : z.fee === null ? "Quote" : z.fee === 0 ? "Free" : `$${z.fee}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[14px] text-muted">{site.hours}. Late-night handoffs by arrangement.</p>
      </section>
      <CtaBand />
    </>
  );
}
