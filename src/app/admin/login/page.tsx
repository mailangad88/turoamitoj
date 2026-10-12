import type { Metadata } from "next";
import { authConfigured } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <span className="rounded-xl bg-white px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/rnd-logo-transparent.png" alt="Rent and Drive" className="h-24 w-auto" />
          </span>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-2xl">
          <h1 className="font-display text-[24px] font-bold">Admin</h1>
          {authConfigured() ? (
            <LoginForm next={next ?? ""} />
          ) : (
            <div className="mt-3 space-y-3 text-[15px] text-ink-soft">
              <p>Admin sign-in isn&apos;t set up yet. Add these in Vercel under Settings, Environment Variables, then redeploy:</p>
              <ul className="list-disc space-y-1 pl-5 font-mono text-[13px]">
                <li>ADMIN_PASSWORD</li>
                <li>ADMIN_SESSION_SECRET (32+ random characters)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
