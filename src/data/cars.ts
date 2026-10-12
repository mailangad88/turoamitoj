// PLACEHOLDER fleet: six sample cars so every page renders. Replace with your real cars.
export type BodyStyle = "suv" | "wagon" | "truck" | "crossover";

export type Car = {
  slug: string;
  name: string;
  year: number;
  body: BodyStyle;
  drive: "AWD" | "4WD";
  seats: number;
  ev: boolean;
  dailyRate: number;
  tires: "Winter (3PMSF)" | "All-weather (3PMSF)" | "M+S all-terrain";
  tractionLawReady: boolean;
  skiRack: boolean;
  milesPerDay: number;
  highlights: string[];
  summary: string;
  bestFor: string[];
  depositTier: "standard" | "premium";
};

export const cars: Car[] = [
  {
    slug: "subaru-outback-wilderness",
    name: "Subaru Outback Wilderness",
    year: 2024,
    body: "wagon",
    drive: "AWD",
    seats: 5,
    ev: false,
    dailyRate: 89,
    tires: "All-weather (3PMSF)",
    tractionLawReady: true,
    skiRack: true,
    milesPerDay: 200,
    highlights: ["9.5 in ground clearance", "Roof rack with ski mount", "X-Mode for snow"],
    summary:
      "The Colorado default. Quiet on I-70, tall enough for unplowed trailhead lots, and room for four skiers and their gear.",
    bestFor: ["Ski weekends", "Rocky Mountain National Park", "Couples and small groups"],
    depositTier: "standard",
  },
  {
    slug: "toyota-4runner-trd",
    name: "Toyota 4Runner TRD Off-Road",
    year: 2023,
    body: "suv",
    drive: "4WD",
    seats: 5,
    ev: false,
    dailyRate: 129,
    tires: "M+S all-terrain",
    tractionLawReady: true,
    skiRack: true,
    milesPerDay: 200,
    highlights: ["Part-time 4WD with low range", "All-terrain tires", "Roof box available"],
    summary:
      "For storm days and dirt roads. Body-on-frame 4WD, all-terrain tires and a roof box when the cargo area is full.",
    bestFor: ["Powder days", "Great Sand Dunes", "Moab runs"],
    depositTier: "premium",
  },
  {
    slug: "toyota-rav4-hybrid",
    name: "Toyota RAV4 Hybrid",
    year: 2024,
    body: "crossover",
    drive: "AWD",
    seats: 5,
    ev: false,
    dailyRate: 79,
    tires: "All-weather (3PMSF)",
    tractionLawReady: true,
    skiRack: true,
    milesPerDay: 200,
    highlights: ["About 38 mpg", "Electric rear axle AWD", "Easy city parking"],
    summary:
      "The efficient all-rounder. Cheap to fuel on long drives, sure-footed on snowy mornings, easy to park in LoDo.",
    bestFor: ["Monthly rentals", "Business trips", "Day trips to Golden and Boulder"],
    depositTier: "standard",
  },
  {
    slug: "jeep-grand-cherokee-l",
    name: "Jeep Grand Cherokee L",
    year: 2023,
    body: "suv",
    drive: "4WD",
    seats: 7,
    ev: false,
    dailyRate: 139,
    tires: "Winter (3PMSF)",
    tractionLawReady: true,
    skiRack: true,
    milesPerDay: 200,
    highlights: ["Three rows, seven seats", "Winter tires Oct to Apr", "Heated seats and wheel"],
    summary:
      "Seven seats and real winter tires. The family ski car, with room behind the third row for bags.",
    bestFor: ["Families", "Group ski trips", "Airport runs with luggage"],
    depositTier: "premium",
  },
  {
    slug: "tesla-model-y-awd",
    name: "Tesla Model Y Long Range",
    year: 2024,
    body: "crossover",
    drive: "AWD",
    seats: 5,
    ev: true,
    dailyRate: 99,
    tires: "All-weather (3PMSF)",
    tractionLawReady: true,
    skiRack: true,
    milesPerDay: 250,
    highlights: ["Dual-motor AWD", "Supercharging along I-70", "Delivered at 80% charge"],
    summary:
      "Dual-motor traction and no gas stops. Superchargers in Silverthorne, Frisco and Vail cover every major ski drive.",
    bestFor: ["Ski day trips", "Business travel", "EV-curious drivers"],
    depositTier: "standard",
  },
  {
    slug: "ford-maverick-hybrid-awd",
    name: "Ford Maverick AWD",
    year: 2024,
    body: "truck",
    drive: "AWD",
    seats: 5,
    ev: false,
    dailyRate: 85,
    tires: "M+S all-terrain",
    tractionLawReady: true,
    skiRack: false,
    milesPerDay: 200,
    highlights: ["4.5 ft bed", "Bike rack ready", "Tow hitch"],
    summary:
      "A small truck for moving days, bikes and camping gear. Open bed, hitch, and easy to drive in the city.",
    bestFor: ["Relocation", "Bikes and camping", "Monthly rentals"],
    depositTier: "standard",
  },
];

export function getCar(slug: string) {
  return cars.find((c) => c.slug === slug);
}
