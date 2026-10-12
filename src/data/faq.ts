import { coloradoFees, deposit } from "@/config/site";

export const faq: { q: string; a: string }[] = [
  {
    q: "How old do I need to be to rent?",
    a: "25 or older with a valid driver's license held for at least two years. Drivers aged 21 to 24 can rent our crossovers with a young-driver fee.",
  },
  {
    q: "How much is the security deposit?",
    a: `$${deposit.standard} for most cars and $${deposit.premium} for larger 4x4s. It's a hold on your card placed 24 hours before pickup and released after we check the car back in.`,
  },
  {
    q: "Are your cars legal under Colorado's Traction Law?",
    a: "Yes. Every car runs winter, all-weather or M+S tires, and we measure tread at each handoff to make sure it's at least 3/16 inch. AWD alone no longer counts under the law, so tires are what matter.",
  },
  {
    q: "What fees will I see at checkout?",
    a: `Your rate, any add-ons and delivery, Colorado and Denver sales tax, and Colorado's per-day rental fees ($${(coloradoFees.dailyRentalFee + coloradoFees.congestionImpactFee).toFixed(2)} a day for ${coloradoFees.effective}). Rentals over 30 days are exempt from the daily fees and short-term sales tax. We show the all-in total before you book.`,
  },
  {
    q: "Do you deliver to Denver International Airport?",
    a: "Not yet. Take the A Line one stop from the airport side to Central Park station and we'll meet you there, or we deliver to your hotel or home anywhere in our delivery zones.",
  },
  {
    q: "How do tolls work?",
    a: "E-470 and the Express Lanes bill by license plate. We pass tolls through at cost with no admin fee, and they show on your final receipt.",
  },
  {
    q: "How many miles are included?",
    a: "200 miles a day on most cars (250 on the Tesla), pooled across your trip. Extra miles are $0.40 each.",
  },
  {
    q: "What happens if I cancel?",
    a: "Full refund up to 72 hours before pickup. Inside 72 hours we keep one day's rate. Weather closures on I-70 get a free date change.",
  },
  {
    q: "Is my insurance covered?",
    a: "Many personal auto policies and some credit cards cover rental cars, but check yours. You can also choose one of our protection plans at checkout.",
  },
];
