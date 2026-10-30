import { z } from 'zod';

export const QUANTITY_UNITS = [
  'KG',
  'Metric Ton (MT)',
  'Liters',
  'Drums (210L / 250KG)',
  'Bags (25kg / 50kg)',
  'Not Sure — Please Advise',
] as const;

export type QuantityUnit = (typeof QUANTITY_UNITS)[number];

export const BUYER_TYPES = [
  'Pharmaceutical Formulator',
  'Cosmetics & Personal Care Manufacturer',
  'Soap & Detergent Manufacturer',
  'Industrial & Chemical Processor',
  'Distributor / Procurement Firm',
  'Academic / Research Institution',
  'Other Commercial Buyer',
] as const;

/** productId value used when a buyer asks for a material that is not in the catalogue. */
export const CUSTOM_PRODUCT_ID = 'custom';

export const QuoteItemSchema = z.object({
  productId: z.string().min(1, 'Please select a product'),
  productName: z.string().trim().min(2, 'Please enter the product name'),
  grade: z.string().trim().min(1, 'Please specify the grade (or "Not sure")'),
  quantity: z.string().trim().min(1, 'Please enter quantity'),
  unit: z.enum(QUANTITY_UNITS),
  preferredMake: z.string().optional(),
  intendedApplication: z.string().optional(),
});

export const QuotationFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name'),
  companyName: z.string().trim().min(2, 'Please enter your company name'),
  businessEmail: z.string().trim().email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,18}$/, 'Please enter a valid phone number'),
  city: z.string().trim().min(2, 'Please enter your city'),
  country: z.string().min(1, 'Country is required'),
  buyerType: z.enum(BUYER_TYPES),
  items: z.array(QuoteItemSchema).min(1, 'Add at least one product to your enquiry'),
  packagingPreference: z.string().optional(),
  deliveryLocation: z.string().trim().min(2, 'Please enter the delivery location'),
  requiresCOA: z.boolean(),
  additionalNotes: z.string().optional(),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'Please accept to continue' }),
  }),
});

export type QuoteItem = z.infer<typeof QuoteItemSchema>;
export type QuotationFormData = z.infer<typeof QuotationFormSchema>;

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{7,18}$/, 'Please enter a valid phone number'),
  company: z.string().optional(),
  subject: z.string().trim().min(3, 'Please enter a subject'),
  message: z.string().trim().min(10, 'Please write at least 10 characters'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
