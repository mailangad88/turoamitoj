# Denver direct-booking car rental site

Marketing site and booking front end for a Denver car rental business: mountain-ready AWD and 4x4 cars, delivered. Turo stays a second channel.

Plan: https://claude.ai/artifact/RxfHE5iUWSjR5SZEZDDPXx

## Stack

- Next.js 15 (App Router) on Vercel, TypeScript, Tailwind CSS
- Icons: Lucide (ISC). Fonts: Saira, Instrument Sans, Geist Mono (Google Fonts, OFL)
- Diagrams: [diagram-design](https://github.com/cathrynlavery/diagram-design) (MIT), vendored as a project skill in `.claude/skills/diagram-design`

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # pricing and Traction Law logic
npm run build
```

Copy `.env.example` to `.env.local` to set the site URL, a hosted booking engine URL, or Resend email for booking requests.

## Where things live

| What | Where |
|---|---|
| Business name, phone, Turo/Google badges, fees, tax rate | `src/config/site.ts` |
| Fleet | `src/data/cars.ts` |
| Delivery zones and fees | `src/data/zones.ts` |
| FAQ | `src/data/faq.ts` |
| Guides (blog) | `src/content/guides/` |
| Pricing rules, discounts, add-ons | `src/lib/pricing.ts` |
| Traction Law logic | `src/lib/traction.ts` |
| Booking request API | `src/app/api/booking-request/route.ts` |
| System diagram | `docs/diagrams/system.html` |

## Booking, phase by phase

1. **Now:** "Request this car" sends a booking request (emailed via Resend when configured, otherwise logged). You confirm and send a payment link.
2. **Hosted engine:** set `NEXT_PUBLIC_BOOKING_ENGINE_URL` (FleetWire or similar) and every Book button goes there.
3. **Own engine (about week 9):** Postgres, Stripe deposits and Identity, admin, Turo extension and CSV import.

Everything marked PLACEHOLDER needs a real answer before launch. See `docs/PLACEHOLDERS.md`.

## Photos and motion

- Scenery photos come from Unsplash under the Unsplash License and are listed in `src/data/photos.ts`, with credits on each hero and on `/credits`. None of them show our own cars; swap in real fleet photos as they're shot.
- The homepage route animation is a [Remotion](https://www.remotion.dev) composition (`src/remotion/RouteToMountains.tsx`) played live with `@remotion/player`. Remotion is free for individuals and companies with up to 3 employees; a larger company needs a [company license](https://www.remotion.pro/license).

## Admin

Sign in at `/admin` to run the business side:

- **Overview**: new requests to answer and the next two weeks of pickups and returns.
- **Bookings**: every website request, Turo trip, direct booking and block. Confirm or decline requests, edit dates, add notes.
- **Calendar**: one row per car for the month. Tap an empty day to add a booking or a Turo block.
- **Fleet**: add cars, edit details, hide a car from the site.
- **Pricing**: daily rates and deposit tier per car. Discounts, delivery fees and add-ons are shown here and still set in code.

A confirmed booking (or a Turo block) holds the car: the website shows it as booked for those dates and refuses new requests that overlap. Requests don't hold the car, so two guests can ask for the same dates and you choose.

Setup on Vercel:

1. Storage → Create Database → Neon (Postgres), connected to this project. It sets `DATABASE_URL`, and the tables and current fleet are created on first use.
2. Settings → Environment Variables: `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (32+ random characters).
3. Redeploy.

Locally, `npm run dev` uses a built-in Postgres (PGlite) stored in `.data/pglite`, so no setup is needed beyond the two admin variables in `.env.local`.
