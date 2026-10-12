import { notFound } from "next/navigation";
import { listFleet, type FleetCar } from "@/lib/fleet";
import { AdminTitle, TextLink } from "@/components/admin/ui";
import { CarForm } from "@/components/admin/CarForm";
import { saveCarAction } from "../../../actions";

export const metadata = { title: "Edit car" };

const blank: FleetCar = {
  slug: "",
  name: "",
  year: new Date().getFullYear(),
  color: "",
  body: "suv",
  drive: "4WD",
  seats: 5,
  ev: false,
  dailyRate: 99,
  depositTier: "standard",
  tires: "M+S all-season",
  tractionLawReady: true,
  skiRack: false,
  milesPerDay: 200,
  summary: "",
  highlights: [],
  bestFor: [],
  active: false,
  sortOrder: 10,
};

export default async function EditCar({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isNew = slug === "new";
  const car = isNew ? blank : (await listFleet()).find((c) => c.slug === slug);
  if (!car) notFound();
  return (
    <>
      <p className="mb-2 text-[14px]">
        <TextLink href="/admin/fleet">← Fleet</TextLink>
      </p>
      <AdminTitle title={isNew ? "Add a car" : car.name} sub={isNew ? "New cars start hidden, so you can finish the details before guests see it." : undefined} />
      <div className="max-w-3xl">
        <CarForm action={saveCarAction} car={car} isNew={isNew} />
      </div>
    </>
  );
}
