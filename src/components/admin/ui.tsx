import Link from "next/link";
import type { BookingSource, BookingStatus } from "@/lib/booking-meta";
import { sourceLabel, statusLabel } from "@/lib/booking-meta";

export function AdminTitle({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-[28px] font-bold leading-tight">{title}</h1>
        {sub && <p className="mt-1 text-[15px] text-muted">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

const statusStyle: Record<BookingStatus, string> = {
  request: "bg-brand-tint text-brand-ink",
  confirmed: "bg-pine-tint text-pine",
  completed: "bg-[#ececec] text-ink-soft",
  declined: "bg-rust-tint text-rust",
  cancelled: "bg-rust-tint text-rust",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${statusStyle[status]}`}>{statusLabel[status]}</span>;
}

export function SourceTag({ source }: { source: BookingSource }) {
  return <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{sourceLabel[source].split(" (")[0]}</span>;
}

export function Panel({ title, children, action }: { title?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-line bg-white">
      {title && (
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <h2 className="font-display text-[17px] font-bold">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "error" | "ok"; children: React.ReactNode }) {
  const cls = tone === "error" ? "bg-rust-tint text-rust" : tone === "ok" ? "bg-pine-tint text-pine" : "bg-brand-tint text-ink";
  return <p className={`mb-5 rounded-lg px-4 py-3 text-[14px] font-medium ${cls}`}>{children}</p>;
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-semibold underline decoration-brand decoration-2 underline-offset-4">
      {children}
    </Link>
  );
}
