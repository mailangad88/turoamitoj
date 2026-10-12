"use client";

import { usePathname } from "next/navigation";

// The public header and footer, everywhere except the admin.
export function SiteChrome({ header, footer, children }: { header: React.ReactNode; footer: React.ReactNode; children: React.ReactNode }) {
  const admin = usePathname()?.startsWith("/admin");
  if (admin) return <>{children}</>;
  return (
    <>
      {header}
      <main id="main">{children}</main>
      {footer}
    </>
  );
}
