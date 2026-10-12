import Link from "next/link";
import type { GuideMeta } from ".";

export const meta: GuideMeta = {
  slug: "denver-to-breckenridge-drive",
  title: "Denver to Breckenridge: the drive, the traffic, and when to leave",
  description:
    "A local's guide to driving from Denver to Breckenridge in ski season: the route, the Eisenhower Tunnel, weekend traffic patterns, and what to have in the car.",
  cluster: "Ski season",
  updated: "2026-10-12",
  readMinutes: 6,
};

export default function Body() {
  return (
    <>
      <p>
        Breckenridge is about 80 miles from downtown Denver. On a clear weekday morning that&apos;s under two hours. On a
        powder Saturday it can be twice that. The difference is almost entirely when you leave.
      </p>
      <h2>The route</h2>
      <ol>
        <li>West on I-70 from Denver through the foothills, past Idaho Springs and Georgetown.</li>
        <li>Through the Eisenhower-Johnson Memorial Tunnel, the highest point of the drive at over 11,000 feet.</li>
        <li>Down into Silverthorne, then exit 203 onto CO-9 south through Frisco to Breckenridge.</li>
      </ol>
      <p>
        Fuel up or charge in Denver or Silverthorne. There are few services between Idaho Springs and the tunnel, and you
        don&apos;t want to be low when traffic stops.
      </p>
      <h2>When to leave</h2>
      <ul>
        <li><strong>Saturday and holiday mornings westbound</strong> are the worst. Leaving Denver before 6:30am usually beats the rush.</li>
        <li><strong>Sunday afternoons eastbound</strong> back up from the tunnel to Idaho Springs. Leave the mountains before 1pm or after 7pm.</li>
        <li><strong>Weekdays</strong> are the easy win. Midweek ski days mean empty roads and shorter lift lines.</li>
      </ul>
      <h2>Weather and closures</h2>
      <p>
        Storms can close the tunnel or Vail Pass, and the Traction Law is often active from September to May. Check COtrip.org
        before you leave and again in Idaho Springs. Read our{" "}
        <Link href="/guides/colorado-traction-law-rental-car">Traction Law guide</Link> so you know what your car needs.
      </p>
      <h2>What to have in the car</h2>
      <ul>
        <li>An ice scraper and a full washer-fluid tank (road grime is constant on I-70).</li>
        <li>Water, snacks and a warm layer in case traffic stops.</li>
        <li>A roof box or rack if you have more than two sets of skis.</li>
      </ul>
      <p>
        Our <Link href="/ski-rental-denver">ski cars</Link> come with rated tires, a scraper, and a rack or roof box. Use the{" "}
        <Link href="/tools/ski-trip-estimator">ski trip estimator</Link> to price your trip.
      </p>
    </>
  );
}
