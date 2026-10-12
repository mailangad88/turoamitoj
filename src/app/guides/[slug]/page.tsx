import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/content/guides";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { abs, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/config/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.meta.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return { title: g.meta.title, description: g.meta.description, alternates: { canonical: `/guides/${g.meta.slug}` }, openGraph: { type: "article" } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const { meta, Body } = g;
  return (
    <>
      <article className="wrap py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted">
          <Link href="/guides" className="hover:text-navy">Guides</Link> / {meta.cluster}
        </nav>
        <p className="eyebrow mb-3">{meta.cluster} · {meta.readMinutes} min read · Updated {new Date(meta.updated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
        <h1 className="max-w-3xl font-display text-[34px] font-semibold leading-[1.1] tracking-tight sm:text-[46px]">{meta.title}</h1>
        <div className="prose-site mt-8">
          <Body />
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.title,
          description: meta.description,
          dateModified: meta.updated,
          mainEntityOfPage: abs(`/guides/${meta.slug}`),
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Guides", path: "/guides" }, { name: meta.title, path: `/guides/${meta.slug}` }])} />
      <CtaBand />
    </>
  );
}
