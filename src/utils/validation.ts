import { z } from 'zod';

/** Indian mobile numbers: optional +91 / 91 / 0 prefix, then 10 digits starting 6–9. Spaces and hyphens allowed. */
export function isValidIndianPhone(value: string): boolean {
  const compact = value.replace(/[\s-]/g, '');
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(compact);
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(80, 'Name is too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('Please enter a valid email address, e.g. name@example.com.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your phone number.')
    .refine(isValidIndianPhone, 'Please enter a valid 10-digit Indian mobile number, e.g. 98765 43210.'),
  service: z.string().min(1, 'Please choose the service you need.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please add a few details (at least 10 characters).')
    .max(1500, 'Message is too long (1500 characters max).'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
