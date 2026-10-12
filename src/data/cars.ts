// Current fleet. Tire type, seat count and daily rates are assumptions to confirm (see docs/PLACEHOLDERS.md).
export type BodyStyle = "suv" | "wagon" | "truck" | "crossover" | "boxy";

export type Car = {
  slug: string;
  name: string;
  year: number;
  body: BodyStyle;
  drive: "AWD" | "4WD";
  seats: number;
  ev: boolean;
  dailyRate: number;
  tires: string;
  tractionLawReady: boolean;
  skiRack: boolean;
  milesPerDay: number;
  highlights: string[];
  summary: string;
  bestFor: string[];
  color: string;
  depositTier: "standard" | "premium";
};

export const cars: Car[] = [
  {
    slug: "jeep-grand-cherokee-l",
    name: "Jeep Grand Cherokee L",
    year: 2022,
    color: "Dark purple",
    body: "suv",
    drive: "4WD",
    seats: 7,
    ev: false,
    dailyRate: 129,
    tires: "M+S all-season",
    tractionLawReady: true,
    skiRack: true,
    milesPerDay: 200,
    highlights: ["Three rows of seats", "Quadra-Trac 4x4", "Roof rails for skis or a roof box"],
    summary:
      "Three rows and real 4x4 for the whole crew. Add the roof box for skis, and settle in for a quiet, comfortable drive up I-70.",
    bestFor: ["Families and groups", "Ski trips with gear", "Airport runs with luggage"],
    depositTier: "premium",
  },
  {
    slug: "jeep-wrangler-unlimited-willys",
    name: "Jeep Wrangler Unlimited Willys",
    year: 2022,
    color: "Dark grey",
    body: "boxy",
    drive: "4WD",
    seats: 5,
    ev: false,
    dailyRate: 119,
    tires: "M+S mud-terrain",
    tractionLawReady: true,
    skiRack: false,
    milesPerDay: 200,
    highlights: ["Four doors, five seats", "Command-Trac part-time 4x4 with low range", "Mud-terrain tires"],
    summary:
      "The Colorado classic. Four doors, part-time 4x4 and mud-terrain tires for dirt roads, trailheads and summer passes.",
    bestFor: ["National parks and dirt roads", "Summer road trips", "Moab and Great Sand Dunes"],
    depositTier: "premium",
  },
];

export function getCar(slug: string) {
  return cars.find((c) => c.slug === slug);
}
