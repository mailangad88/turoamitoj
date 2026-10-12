import type { Photo } from "@/data/photos";

export function PhotoCredit({ photo, className = "" }: { photo: Photo; className?: string }) {
  return (
    <a
      href={`${photo.page}?utm_source=direct_site&utm_medium=referral`}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-full bg-black/35 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/80 backdrop-blur hover:text-white ${className}`}
    >
      Photo · {photo.credit} / Unsplash
    </a>
  );
}
