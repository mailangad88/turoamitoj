import { site } from "@/config/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="30" height="20" viewBox="0 0 30 20" aria-hidden="true">
        <path d="M1 18 L9 7 L13 12 L19 3 L29 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M17 6 L19 3 L21 6" fill="none" stroke="#d6a032" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[19px] font-semibold tracking-tight">{site.name}</span>
    </span>
  );
}
