// PLACEHOLDER delivery zones and fees. Each fee is one way; delivery and return are charged separately.
export type Zone = {
  id: string;
  name: string;
  areas: string;
  fee: number | null; // null = by quote
  available: boolean;
  note?: string;
};

export const zones: Zone[] = [
  {
    id: "pickup",
    name: "Pickup at our lot",
    areas: "Central Park, Denver",
    fee: 0,
    available: true,
    note: "Free. Self check-in with a lockbox code.",
  },
  {
    id: "core",
    name: "Denver core",
    areas: "Downtown, LoDo, RiNo, Capitol Hill, Cherry Creek, Highlands, Union Station",
    fee: 35,
    available: true,
  },
  {
    id: "metro",
    name: "Metro",
    areas: "Aurora, Lakewood, Englewood, Littleton, Wheat Ridge, Arvada",
    fee: 50,
    available: true,
  },
  {
    id: "front-range",
    name: "Boulder and Golden",
    areas: "Boulder, Golden, Broomfield, Louisville",
    fee: 70,
    available: true,
  },
  {
    id: "dia",
    name: "Denver International Airport",
    areas: "Terminal meeting points",
    fee: null,
    available: false,
    note: "Not offered yet. Take the A Line to Central Park station and we'll meet you there.",
  },
  {
    id: "mountains",
    name: "Mountain towns",
    areas: "Summit County, Vail, Winter Park, Estes Park",
    fee: null,
    available: true,
    note: "By quote.",
  },
];

export function getZone(id: string) {
  return zones.find((z) => z.id === id);
}
