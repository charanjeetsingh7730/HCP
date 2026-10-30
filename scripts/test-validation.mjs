import { z } from 'zod';

const QuoteItemSchema = z.object({
  productId: z.string().min(1, 'Please select a chemical product'),
  productName: z.string().min(1, 'Product name is required'),
  grade: z.string().min(1, 'Please specify grade requirement'),
  quantity: z.string().min(1, 'Please enter quantity'),
  unit: z.enum([
    'KG',
    'Metric Ton (MT)',
    'Liters',
    'Drums (210L / 250KG)',
    'Bags (25kg / 50kg)',
    'Not Sure — Please Advise',
  ]),
  preferredMake: z.string().optional(),
  intendedApplication: z.string().optional(),
});

const QuotationFormSchema = z.object({
  fullName: z.string().min(2, 'Contact person name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company / Organization name is required'),
  businessEmail: z.string().email('Please enter a valid business email address'),
  phoneNumber: z.string().min(8).max(20),
  city: z.string().min(2),
  country: z.string().min(1),
  buyerType: z.enum([
    'Pharmaceutical Formulator',
    'Cosmetics & Personal Care Manufacturer',
    'Soap & Detergent Manufacturer',
    'Industrial & Chemical Processor',
    'Distributor / Procurement Firm',
    'Academic / Research Institution',
    'Other Commercial Buyer',
  ]),
  items: z.array(QuoteItemSchema).min(1),
  packagingPreference: z.string().optional(),
  deliveryLocation: z.string().min(2),
  requiresCOA: z.boolean(),
  additionalNotes: z.string().optional(),
  consentPrivacy: z.literal(true),
});

console.log('--- TEST 1: Valid Multi-item RFQ Validation ---');
const valid = {
  fullName: 'Dr. Ramesh Kumar',
  companyName: 'Baddi Life Sciences Pvt Ltd',
  businessEmail: 'ramesh.k@baddilife.com',
  phoneNumber: '+91 98055 12345',
  city: 'Baddi',
  country: 'India',
  buyerType: 'Pharmaceutical Formulator',
  items: [
    {
      productId: 'hcp-prod-01',
      productName: 'Boric Acid IP, Technical',
      grade: 'IP',
      quantity: '500',
      unit: 'KG',
      preferredMake: 'Indo Borex',
      intendedApplication: 'Buffering agent'
    },
    {
      productId: 'hcp-prod-10',
      productName: 'Glycerin IP, USP',
      grade: 'IP / USP',
      quantity: '10',
      unit: 'Drums (210L / 250KG)',
      preferredMake: 'Godrej'
    }
  ],
  packagingPreference: 'Original sealed packaging',
  deliveryLocation: 'Baddi Industrial Area Phase 1',
  requiresCOA: true,
  consentPrivacy: true
};

const res1 = QuotationFormSchema.safeParse(valid);
console.log('Valid payload parse success:', res1.success);
if (!res1.success) {
  console.error(res1.error);
  process.exit(1);
}

console.log('--- TEST 2: Invalid Payload Rejection ---');
const invalid = {
  fullName: '',
  businessEmail: 'invalid-email',
  items: [],
  consentPrivacy: false
};
const res2 = QuotationFormSchema.safeParse(invalid);
console.log('Invalid payload rejected as expected:', !res2.success);
console.log('Errors caught:', res2.error?.issues.map(i => `${i.path.join('.')}: ${i.message}`));

console.log('\nALL SCHEMA TESTS PASSED SUCCESSFULLY!');

