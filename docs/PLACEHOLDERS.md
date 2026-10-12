# Placeholders to replace before launch

| Item | Current placeholder | File |
|---|---|---|
| Phone, email | (720) 555-0142, hello@example.com | `src/config/site.ts` |
| Home base for free pickup | Central Park, Denver | `src/config/site.ts`, `src/data/zones.ts` |
| Turo and Google ratings | hidden until filled in | `src/config/site.ts` |
| Fleet details | real cars (2022 Grand Cherokee L, 2022 Wrangler Unlimited Willys); daily rates ($129, $119), seat count (7 on the Grand Cherokee L), tire types and roof rails are assumptions | `src/data/cars.ts` |
| Car photos | silhouettes marked "Photo coming" | `src/components/CarSilhouette.tsx` |
| Delivery fees | $35 / $50 / $70 each way | `src/data/zones.ts` |
| Sales tax rate | 8.81% estimate | `src/config/site.ts` (confirm with an accountant) |
| Deposits | $500 for both Jeeps | `src/config/site.ts` |
| Policies: age, mileage, cancellation, tickets, young-driver fee | sample terms | `src/data/faq.ts`, `src/app/pricing-and-policies/page.tsx` |
| Add-on prices, length discounts | sample prices | `src/lib/pricing.ts` |
| About page story | sample copy | `src/app/about/page.tsx` |
| Monthly terms (2,500 miles, swaps) | sample terms | `src/app/monthly-car-rental-denver/page.tsx` |

Facts that are verified (Oct 2026) and should be re-checked each July: Colorado daily rental fee $2.44 and congestion impact fee $3.13 (Colorado DOR), Traction Law rules (CDOT, Nov 2025).
