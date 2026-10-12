import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-guard";
import { getDb } from "@/lib/db/client";
import { AdminNav } from "@/components/admin/AdminNav";
import { logout } from "../actions";

export const metadata: Metadata = { title: { default: "Admin", template: "%s · Admin" }, robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const db = await getDb().catch(() => null);
  return (
    <div className="min-h-screen bg-[#f4f3f1] lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
      <aside className="bg-ink text-cream lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center justify-between gap-3 px-4 py-4 lg:block lg:px-5 lg:py-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="rounded-md bg-white px-1.5 py-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/rnd-emblem-120.png" alt="" className="h-7 w-auto" />
            </span>
            <span className="font-display text-[15px] font-extrabold uppercase italic leading-tight">
              Rent and <span className="text-brand">Drive</span>
            </span>
          </Link>
          <form action={logout} className="lg:hidden">
            <button className="text-[13px] text-cream/70 hover:text-cream">Sign out</button>
          </form>
        </div>
        <AdminNav />
        <div className="hidden px-5 pt-8 lg:block">
          <Link href="/" className="block text-[13px] text-cream/60 hover:text-cream">
            View the website ↗
          </Link>
          <form action={logout} className="mt-3">
            <button className="text-[13px] text-cream/60 hover:text-cream">Sign out</button>
          </form>
        </div>
      </aside>
      <div className="min-w-0">
        {!db && (
          <div className="bg-rust px-4 py-2.5 text-[14px] text-white sm:px-8">
            No database is connected, so nothing you change here can be saved. In Vercel, open Storage and create a Postgres
            database (Neon) for this project, then redeploy.
          </div>
        )}
        {db?.kind === "pglite" && process.env.NODE_ENV === "production" && (
          <div className="bg-brand-tint px-4 py-2.5 text-[14px] text-ink sm:px-8">Using a temporary local database. Connect Postgres before going live.</div>
        )}
        <div className="px-4 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}
