import { coloradoFees, deposit, salesTaxRate } from "@/config/site";
import type { Car } from "@/data/cars";

export type AddOnId = "ski-box" | "child-seat" | "traction-socks" | "cooler" | "extra-driver";

export const addOns: { id: AddOnId; label: string; perDay: number; maxTotal?: number }[] = [
  { id: "ski-box", label: "Roof ski box", perDay: 15, maxTotal: 90 },
  { id: "child-seat", label: "Child seat", perDay: 10, maxTotal: 60 },
  { id: "traction-socks", label: "Snow socks (traction device)", perDay: 5, maxTotal: 30 },
  { id: "cooler", label: "Cooler", perDay: 5, maxTotal: 25 },
  { id: "extra-driver", label: "Extra driver", perDay: 10, maxTotal: 60 },
];

// Length discounts, applied to the base rental only.
export const lengthDiscounts = [
  { minDays: 28, rate: 0.3, label: "Monthly" },
  { minDays: 7, rate: 0.15, label: "Weekly" },
  { minDays: 3, rate: 0.05, label: "3+ days" },
];

export type QuoteInput = {
  car: Pick<Car, "dailyRate" | "depositTier">;
  days: number;
  deliveryFee: number; // one way
  returnFee: number; // one way
  addOns: AddOnId[];
};

export type QuoteLine = { label: string; amount: number };

export type Quote = {
  days: number;
  lines: QuoteLine[];
  subtotal: number;
  tax: number;
  coloradoFees: number;
  total: number;
  deposit: number;
  discountLabel: string | null;
};

const round = (n: number) => Math.round(n * 100) / 100;

export function rentalDays(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  if (!Number.isFinite(ms) || ms <= 0) return 0;
  // Each started 24 hours counts as a day, with a 59-minute grace period.
  return Math.max(1, Math.ceil((ms - 59 * 60 * 1000) / (24 * 60 * 60 * 1000)));
}

export function quote(input: QuoteInput): Quote {
  const days = Math.max(1, Math.floor(input.days));
  const base = input.car.dailyRate * days;
  const discount = lengthDiscounts.find((d) => days >= d.minDays) ?? null;
  const discountAmount = discount ? round(base * discount.rate) : 0;

  const lines: QuoteLine[] = [{ label: `$${input.car.dailyRate} × ${days} day${days === 1 ? "" : "s"}`, amount: base }];
  if (discount) lines.push({ label: `${discount.label} discount (${discount.rate * 100}%)`, amount: -discountAmount });

  for (const id of input.addOns) {
    const a = addOns.find((x) => x.id === id);
    if (!a) continue;
    const amount = Math.min(a.perDay * days, a.maxTotal ?? Infinity);
    lines.push({ label: a.label, amount });
  }
  if (input.deliveryFee > 0) lines.push({ label: "Delivery", amount: input.deliveryFee });
  if (input.returnFee > 0) lines.push({ label: "Return pickup", amount: input.returnFee });

  const subtotal = round(lines.reduce((s, l) => s + l.amount, 0));
  // Rentals over 30 days are exempt from Colorado's daily fees and short-term sales tax.
  const shortTerm = days <= coloradoFees.maxDaysSubjectToFee;
  const tax = shortTerm ? round(subtotal * salesTaxRate) : 0;
  const coFees = shortTerm ? round((coloradoFees.dailyRentalFee + coloradoFees.congestionImpactFee) * days) : 0;

  return {
    days,
    lines,
    subtotal,
    tax,
    coloradoFees: coFees,
    total: round(subtotal + tax + coFees),
    deposit: deposit[input.car.depositTier],
    discountLabel: discount?.label ?? null,
  };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 });
