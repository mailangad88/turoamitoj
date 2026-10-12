import type { Metadata } from "next";
import { SeasonalPage } from "@/components/SeasonalPage";
import { photos } from "@/data/photos";

export const metadata: Metadata = {
  title: "Car rental for Rocky Mountain National Park",
  description: "Rent an AWD car in Denver for Rocky Mountain National Park, Trail Ridge Road and Bear Lake. Delivered, with timed-entry tips.",
  alternates: { canonical: "/rmnp" },
};

export default function Page() {
  return (
    <SeasonalPage
      path="/rmnp"
      photo={photos.rmnpNight}
      eyebrow="Road trips"
      title="Rocky Mountain National Park by car"
      lede="Estes Park is about 70 miles from Denver. A capable car gets you up Trail Ridge Road and to the trailheads before the lots fill."
      carFilter={(c) => c.drive === "AWD" || c.drive === "4WD"}
      carsHeading="Cars for the park"
      sections={[
        {
          heading: "Timed entry",
          body: (
            <p>
              The park has used timed-entry reservations in the busy summer and early fall months, with separate rules for the
              Bear Lake Road corridor. Check nps.gov/romo and recreation.gov for this year&apos;s dates before you book your car.
            </p>
          ),
        },
        {
          heading: "Trail Ridge Road",
          body: (
            <p>
              Trail Ridge Road crosses the Continental Divide and tops out above 12,000 feet. It usually opens late May and closes
              in October with the first big snow. Fill up in Estes Park or Grand Lake; there&apos;s no fuel inside the park.
            </p>
          ),
        },
      ]}
      faqs={[]}
    />
  );
}
