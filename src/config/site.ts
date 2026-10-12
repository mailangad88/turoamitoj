// Business settings. Every value marked PLACEHOLDER needs a real answer before launch.
export const site = {
  name: "Ridgeline Rentals", // PLACEHOLDER brand name
  shortName: "Ridgeline",
  tagline: "Mountain-ready cars, delivered anywhere in Denver.",
  description:
    "Direct-booking car rentals in Denver: AWD and 4x4 cars on winter-rated tires with ski racks, delivered to your door or hotel. Book direct and skip the platform fees.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "(720) 555-0142", // PLACEHOLDER (555 numbers are reserved for fiction)
  email: "hello@example.com", // PLACEHOLDER
  city: "Denver",
  region: "CO",
  pickupArea: "Central Park, Denver", // PLACEHOLDER home base for free pickup
  hours: "Handoffs 6am to 10pm, every day",
  // Fill these in from your Turo host profile. Leave null to hide the badge.
  turo: {
    profileUrl: null as string | null,
    rating: null as number | null,
    trips: null as number | null,
  },
  google: {
    profileUrl: null as string | null,
    rating: null as number | null,
    reviews: null as number | null,
  },
  bookingEngineUrl: process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL || null,
};

// Colorado fees, July 2026 to June 2027 (Colorado DOR). Both adjust each July.
// Apply to rentals of 30 days or less. Filed monthly on form DR 1777.
export const coloradoFees = {
  dailyRentalFee: 2.44,
  congestionImpactFee: 3.13,
  maxDaysSubjectToFee: 30,
  effective: "July 2026 to June 2027",
};

// PLACEHOLDER: confirm the combined state + Denver rate (and any rental-specific tax)
// with an accountant before taking payments. Shown to guests as an estimate.
export const salesTaxRate = 0.0881;

export const deposit = {
  standard: 300,
  premium: 500, // larger 4x4s and anything over $120/day
};
