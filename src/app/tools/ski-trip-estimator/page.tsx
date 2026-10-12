import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SkiEstimator } from "@/components/tools/SkiEstimator";
import { getFleet } from "@/lib/fleet";

export const metadata: Metadata = {
  title: "Ski trip cost estimator",
  description: "Estimate the car and fuel cost of a ski trip from Denver to Breckenridge, Keystone, Vail, Copper or Winter Park, split per skier.",
  alternates: { canonical: "/tools/ski-trip-estimator" },
};

export default async function Page() {
  const cars = await getFleet();
  return (
    <>
      <PageHeader eyebrow="Tool" title="What will the ski trip cost?" lede="Pick a resort, days and group size. We pick the cheapest car that fits everyone and their skis." />
      <section className="wrap mt-10"><SkiEstimator cars={cars} /></section>
    </>
  );
}
