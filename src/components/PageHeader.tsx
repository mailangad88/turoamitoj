import Image from "next/image";
import type { Photo } from "@/data/photos";
import { PhotoCredit } from "./PhotoCredit";

type Props = { eyebrow: string; title: string; lede?: string; children?: React.ReactNode; photo?: Photo };

export function PageHeader({ eyebrow, title, lede, children, photo }: Props) {
  if (photo) return <PhotoHeader {...{ eyebrow, title, lede, children, photo }} />;
  return (
    <section className="border-b border-line">
      <div className="wrap py-12 sm:py-16">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="max-w-3xl font-display text-[34px] font-semibold leading-[1.08] tracking-tight sm:text-[48px]">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-navy-soft">{lede}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

// Full-bleed photo header. The navy wash keeps cream type readable whatever the photo does.
function PhotoHeader({ eyebrow, title, lede, children, photo }: Props & { photo: Photo }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-cream">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: photo.focus ?? "50% 50%" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/90 via-navy/65 to-navy/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy/80 to-transparent" />
      <div className="wrap pb-14 pt-16 sm:pb-20 sm:pt-24">
        <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-gold">{eyebrow}</p>
        <h1 className="max-w-3xl font-display text-[36px] font-semibold leading-[1.05] tracking-tight sm:text-[54px]">{title}</h1>
        {lede && <p className="mt-4 max-w-2xl text-[18px] leading-relaxed text-cream/85">{lede}</p>}
        {children && <div className="mt-8 text-navy">{children}</div>}
      </div>
      <PhotoCredit photo={photo} className="absolute bottom-3 right-3" />
    </section>
  );
}
