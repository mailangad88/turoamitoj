import Image from "next/image";

// The RND emblem from the logo file, with the wordmark set in type so it stays sharp at header size.
export function Logo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={onDark ? "rounded-md bg-white px-1.5 py-1" : ""}>
        <Image src="/brand/rnd-emblem-120.png" alt="" width={235} height={120} className="h-9 w-auto" priority />
      </span>
      <span className="font-display text-[17px] font-extrabold uppercase italic leading-none tracking-tight sm:text-[19px]">
        Rent and <span className="text-brand">Drive</span>
      </span>
    </span>
  );
}
