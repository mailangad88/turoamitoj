import { listFleet } from "@/lib/fleet";
import { toDenverLocal } from "@/lib/time";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { AdminBookingForm } from "@/components/admin/BookingForm";
import { createBookingAction } from "../../../actions";

export const metadata = { title: "Add booking" };

export default async function NewBooking({ searchParams }: { searchParams: Promise<{ car?: string; date?: string }> }) {
  const sp = await searchParams;
  const fleet = await listFleet();
  const start = sp.date && /^\d{4}-\d{2}-\d{2}$/.test(sp.date) ? `${sp.date}T10:00` : toDenverLocal(new Date(Date.now() + 86400_000)).slice(0, 11) + "10:00";
  const endDate = new Date(`${start.slice(0, 10)}T12:00:00Z`);
  endDate.setUTCDate(endDate.getUTCDate() + 3);
  return (
    <>
      <AdminTitle title="Add a booking or block" sub="Turo trips go here too, so the website never offers dates a Turo guest already has." />
      <Panel>
        <AdminBookingForm
          action={createBookingAction}
          cars={fleet}
          submitLabel="Save booking"
          initial={{
            carSlug: fleet.some((c) => c.slug === sp.car) ? sp.car! : (fleet[0]?.slug ?? ""),
            source: "turo",
            status: "confirmed",
            start,
            end: `${endDate.toISOString().slice(0, 10)}T10:00`,
            guestName: "",
            guestEmail: "",
            guestPhone: "",
            notes: "",
          }}
        />
      </Panel>
    </>
  );
}
