import type { Metadata } from "next";
import Link from "next/link";
import { SeasonalPage } from "@/components/SeasonalPage";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Car rental for Red Rocks concerts",
  description: "Rent a car for a Red Rocks Amphitheatre show, delivered to your Denver hotel. Parking tips and driving times.",
  alternates: { canonical: "/red-rocks" },
};

export default function Page() {
  return (
    <SeasonalPage
      path="/red-rocks"
      photo={photos.redRocks}
      eyebrow="Concert season"
      title="Getting to Red Rocks by car"
      lede="Red Rocks is about 15 miles west of downtown Denver in Morrison. A car means no shuttle line at midnight and a detour to Golden or Evergreen before the show."
      carFilter={(c) => c.seats >= 5}
      carsHeading="Cars for a group of four or five"
      sections={[
        {
          heading: "Parking and arrival",
          body: (
            <ul>
              <li>Lots open well before doors and fill on big shows. Arrive early and tailgate.</li>
              <li>The upper lots mean fewer stairs; the lower lots mean a faster exit.</li>
              <li>Leaving takes time after a sellout. Plan 45 minutes to clear the park.</li>
            </ul>
          ),
        },
        {
          heading: "Pick a designated driver",
          body: (
            <p>
              Morrison Road and the park roads are dark and winding. Decide who&apos;s driving before you go. Our{" "}
              <Link href="/guides">guides</Link> cover more Denver events.
            </p>
          ),
        },
      ]}
      faqs={[]}
    />
  );
}
