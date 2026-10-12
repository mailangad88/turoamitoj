import Link from "next/link";
import type { Booking } from "@/lib/bookings";
import { formatDenver } from "@/lib/time";
import { usd } from "@/lib/pricing";
import { SourceTag, StatusBadge } from "./ui";

export function BookingRow({ b, car }: { b: Booking; car?: string }) {
  return (
    <li>
      <Link href={`/admin/bookings/${b.id}`} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 hover:bg-[#fafafa]">
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold">
            {b.guestName || "No name"} · {car ?? b.carSlug}
          </p>
          <p className="text-[13px] text-muted">
            {formatDenver(b.startsAt)} to {formatDenver(b.endsAt)}
            {b.quoteTotal !== null && ` · quoted ${usd(b.quoteTotal)}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SourceTag source={b.source} />
          <StatusBadge status={b.status} />
        </div>
      </Link>
    </li>
  );
}
