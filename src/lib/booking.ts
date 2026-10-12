import { z } from "zod";

export const bookingRequestSchema = z.object({
  car: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  zone: z.string().min(1),
  addons: z.array(z.string()).default([]),
  address: z.string().max(300).optional().default(""),
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a phone number").max(30),
  driverAge: z.enum(["25+", "21-24"]),
  notes: z.string().max(2000).optional().default(""),
  website: z.string().max(0).optional().default(""), // honeypot: real people leave it empty
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;
