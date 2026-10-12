// Labels and enums shared by the admin's client forms and the server. No database code here.

export const statuses = ["request", "confirmed", "declined", "cancelled", "completed"] as const;
export const sources = ["website", "turo", "direct", "block"] as const;
export type BookingStatus = (typeof statuses)[number];
export type BookingSource = (typeof sources)[number];

export const statusLabel: Record<BookingStatus, string> = {
  request: "New request",
  confirmed: "Confirmed",
  declined: "Declined",
  cancelled: "Cancelled",
  completed: "Completed",
};

export const sourceLabel: Record<BookingSource, string> = {
  website: "Website",
  turo: "Turo trip",
  direct: "Direct (phone, text)",
  block: "Blocked (maintenance or personal)",
};

/** Statuses that hold the car. Requests don't, so two guests can ask for the same dates and you pick. */
export const holdingStatuses: BookingStatus[] = ["confirmed", "completed"];
