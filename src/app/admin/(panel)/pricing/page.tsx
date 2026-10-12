import { listFleet } from "@/lib/fleet";
import { lengthDiscounts, addOns, usd } from "@/lib/pricing";
import { zones } from "@/data/zones";
import { coloradoFees, deposit, salesTaxRate } from "@/config/site";
import { AdminTitle, Panel } from "@/components/admin/ui";
import { RatesForm } from "@/components/admin/RatesForm";
import { saveRatesAction } from "../../actions";

export const metadata = { title: "Pricing" };

export default async function PricingPage() {
  const fleet = await listFleet();
  return (
    <>
      <AdminTitle title="Pricing" sub="Daily rates and deposits change here. The rest is set in the site's code for now; ask Claude to change it." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Daily rates">
          <RatesForm action={saveRatesAction} cars={fleet.map((c) => ({ slug: c.slug, name: c.name, dailyRate: c.dailyRate, depositTier: c.depositTier }))} deposits={deposit} />
        </Panel>
        <Panel title="Length discounts">
          <Table rows={lengthDiscounts.map((d) => [`${d.minDays}+ days`, `${Math.round(d.rate * 100)}% off the base rental`])} />
        </Panel>
        <Panel title="Delivery fees (each way)">
          <Table rows={zones.map((z) => [z.name, z.fee === null ? (z.available ? "By quote" : "Not offered") : z.fee === 0 ? "Free" : usd(z.fee)])} />
        </Panel>
        <Panel title="Add-ons">
          <Table rows={addOns.map((a) => [a.label, `${usd(a.perDay)} / day${a.maxTotal ? `, max ${usd(a.maxTotal)}` : ""}`])} />
        </Panel>
        <Panel title="Taxes and state fees">
          <Table
            rows={[
              ["Colorado daily rental fee", `${usd(coloradoFees.dailyRentalFee)} / day`],
              ["Congestion impact fee", `${usd(coloradoFees.congestionImpactFee)} / day`],
              ["Applies to", `Rentals of ${coloradoFees.maxDaysSubjectToFee} days or less`],
              ["Sales tax (estimate)", `${(salesTaxRate * 100).toFixed(2)}%`],
            ]}
          />
        </Panel>
      </div>
    </>
  );
}

function Table({ rows }: { rows: string[][] }) {
  return (
    <table className="w-full text-[14px]">
      <tbody className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <tr key={k}>
            <td className="py-2 text-ink-soft">{k}</td>
            <td className="py-2 text-right font-medium">{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
