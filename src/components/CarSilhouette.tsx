import type { BodyStyle } from "@/data/cars";

// Simple side profiles, one per body style. Placeholders until the real photo shoot.
const paths: Record<BodyStyle, string> = {
  suv: "M14 62 L22 40 Q25 33 33 33 L118 33 Q126 33 132 40 L146 52 L176 56 Q186 58 186 66 L186 74 L14 74 Z",
  wagon: "M12 64 L28 44 Q33 37 42 37 L124 37 Q132 37 138 43 L150 54 L178 58 Q188 60 188 68 L188 74 L12 74 Z",
  crossover: "M14 64 L34 44 Q41 37 52 37 L118 37 Q128 37 136 44 L148 55 L176 59 Q186 61 186 68 L186 74 L14 74 Z",
  truck: "M12 74 L12 52 L70 52 L70 40 Q72 34 80 34 L118 34 Q126 34 132 41 L144 53 L178 57 Q188 59 188 67 L188 74 Z",
};

export function CarSilhouette({ body, className = "" }: { body: BodyStyle; className?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={className} aria-hidden="true">
      <line x1="0" y1="82" x2="200" y2="82" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
      <path d={paths[body]} fill="currentColor" />
      {body !== "truck" && <path d="M40 41 L112 41 L122 52 L32 52 Z" fill="#f6f1e7" opacity="0.18" />}
      <circle cx="52" cy="74" r="11" fill="currentColor" />
      <circle cx="52" cy="74" r="5" fill="#f6f1e7" opacity="0.5" />
      <circle cx="152" cy="74" r="11" fill="currentColor" />
      <circle cx="152" cy="74" r="5" fill="#f6f1e7" opacity="0.5" />
    </svg>
  );
}
