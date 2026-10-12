import Link from "next/link";
import type { GuideMeta } from ".";
import { TractionFlowchart } from "@/components/diagrams/TractionFlowchart";

export const meta: GuideMeta = {
  slug: "colorado-traction-law-rental-car",
  title: "Colorado's Traction Law for rental car drivers",
  description:
    "What the 2025 Traction Law update means if you're renting a car for I-70: tire types, the 3/16 inch tread rule, chains, and the fine.",
  cluster: "Ski season",
  updated: "2026-10-12",
  readMinutes: 5,
};

export default function Body() {
  return (
    <>
      <p>
        If you drive I-70 into the mountains between September and May, Colorado&apos;s Traction Law applies to you. Rental
        counters rarely mention it, and the rules changed in late 2025. Here&apos;s what you need to know before you pick up a car.
      </p>
      <h2>When and where it applies</h2>
      <p>
        The Traction Law is in effect every year from September 1 to May 31 on the I-70 mountain corridor between Dotsero and
        Morrison. CDOT can also switch it on for other state highways when the weather turns. Overhead signs tell you when
        it&apos;s active.
      </p>
      <h2>What your car needs</h2>
      <p>Under CDOT&apos;s November 2025 update, every passenger vehicle needs one of these:</p>
      <ul>
        <li>Winter tires (the mountain-snowflake symbol), all-weather tires, or mud-and-snow (M+S) tires, <strong>with at least 3/16 inch of tread</strong>; or</li>
        <li>Chains or an approved alternative traction device, such as snow socks, on two or more drive tires.</li>
      </ul>
      <p>
        The big change: <strong>AWD or 4WD on its own no longer counts.</strong> A four-wheel-drive SUV on worn or summer
        tires is not compliant. The tires are what matter.
      </p>
      <TractionFlowchart />
      <h2>What happens if you&apos;re not compliant</h2>
      <p>
        The fine is $50 plus a $17 surcharge. If your car blocks the road because of inadequate equipment, the penalty is much
        larger. The real cost is usually the lost day: a car sliding on Floyd Hill can close the road for everyone.
      </p>
      <h2>How to check a rental car</h2>
      <ol>
        <li>Look at the tire sidewall for the mountain-snowflake symbol or &quot;M+S&quot;.</li>
        <li>Measure tread with a gauge. 3/16 inch is about 5 millimeters.</li>
        <li>If either check fails, ask for snow socks or chains before you leave the city.</li>
      </ol>
      <p>
        Every car we rent runs rated tires and we measure tread at each handoff. You can check any car yourself with our{" "}
        <Link href="/tools/traction-law-checker">Traction Law checker</Link>, or browse{" "}
        <Link href="/ski-rental-denver">cars set up for ski trips</Link>.
      </p>
      <p className="text-[14px] text-muted">
        Source: CDOT, &quot;New Traction Law requirements&quot;, November 2025. Rules can change; check codot.gov before you travel.
      </p>
    </>
  );
}
