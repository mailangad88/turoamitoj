import type { Metadata } from "next";
import Link from "next/link";
import { SeasonalPage } from "@/components/SeasonalPage";
import { TractionFlowchart } from "@/components/diagrams/TractionFlowchart";

export const metadata: Metadata = {
  title: "Ski car rental in Denver: AWD with ski racks",
  description:
    "Rent an AWD or 4x4 with a ski rack and Traction Law-ready tires in Denver, delivered to your door or hotel. Breckenridge, Vail, Keystone, Winter Park.",
  alternates: { canonical: "/ski-rental-denver" },
};

export default function Page() {
  return (
    <SeasonalPage
      path="/ski-rental-denver"
      eyebrow="Ski season · September to May"
      title="Ski car rentals in Denver, ready for I-70"
      lede="AWD and 4x4 cars with racks or roof boxes and rated tires measured at every handoff. Delivered the night before so you can leave at dawn."
      carFilter={(c) => c.skiRack}
      carsHeading="Cars with ski racks"
      sections={[
        {
          heading: "Why rent for skiing from us",
          body: (
            <>
              <p>
                Airport counter cars often arrive on worn all-season tires, and since CDOT&apos;s 2025 update AWD alone no longer
                satisfies the Traction Law. Every car here runs winter, all-weather or M+S tires with at least 3/16 inch of tread,
                and we check it at handoff.
              </p>
              <ul>
                <li>Roof rails on the Grand Cherokee L; roof box free on trips of 5 days or more.</li>
                <li>Snow socks available as an add-on for storm days.</li>
                <li>Delivered the evening before to your hotel or home, so you can beat the Saturday traffic.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Drive times from Denver",
          body: (
            <ul>
              <li><strong>Winter Park:</strong> about 67 miles via I-70 and US-40 over Berthoud Pass.</li>
              <li><strong>Keystone and Breckenridge:</strong> about 75 to 80 miles via I-70 and the Eisenhower Tunnel.</li>
              <li><strong>Vail:</strong> about 100 miles via I-70 and Vail Pass.</li>
            </ul>
          ),
        },
        {
          heading: "The Traction Law in one picture",
          body: (
            <>
              <TractionFlowchart />
              <p className="mt-4">
                Read the full <Link href="/guides/colorado-traction-law-rental-car">Traction Law guide</Link>, or plan your drive with{" "}
                <Link href="/guides/denver-to-breckenridge-drive">Denver to Breckenridge: when to leave</Link>.
              </p>
            </>
          ),
        },
      ]}
      aside={
        <div className="card p-5">
          <h2 className="font-display text-[18px] font-semibold">Price your ski trip</h2>
          <p className="mt-2 text-[14px] text-navy-soft">Resort, days and group size in, car and total cost out.</p>
          <Link href="/tools/ski-trip-estimator" className="btn-gold mt-4 w-full">Open the estimator</Link>
        </div>
      }
      faqs={[
        { q: "Do your cars have snow tires?", a: "Every car runs winter, all-weather or M+S tires with at least 3/16 inch of tread, which meets the Traction Law." },
        { q: "Can I put skis inside the car?", a: "Two pairs fit inside the Grand Cherokee L with a seat folded. For three or more skiers, use the roof rack or add a roof box." },
        { q: "What if I-70 closes on my pickup day?", a: "We change your dates for free when CDOT closes I-70 or the tunnel." },
      ]}
    />
  );
}
