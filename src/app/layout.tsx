import type { Metadata, Viewport } from "next";
import { Saira, Instrument_Sans, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import { JsonLd } from "@/components/JsonLd";
import { businessSchema } from "@/lib/schema";
import { site } from "@/config/site";
import "./globals.css";

// Saira echoes the logo's wide, italic lettering.
const display = Saira({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"], style: ["normal", "italic"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | 4x4 Jeep rentals delivered in Denver`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website", locale: "en_US", images: [{ url: "/brand/rnd-logo.png", width: 1024, height: 1024, alt: site.name }] },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-panel focus:px-3 focus:py-2">
          Skip to content
        </a>
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
        <JsonLd data={businessSchema()} />
      </body>
    </html>
  );
}
