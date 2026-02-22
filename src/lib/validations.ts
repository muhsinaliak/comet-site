import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
});

export const quoteFormSchema = z.object({
  companyName: z.string().min(2).max(200),
  contactPerson: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  position: z.string().optional(),
  projectDescription: z.string().min(10).max(5000),
  preferredContactMethod: z.enum(["email", "phone"]),
  deadline: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
