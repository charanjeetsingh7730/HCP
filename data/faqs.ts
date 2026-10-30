import { HCP_COMPANY } from './company';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'faq-order',
    question: 'How do I enquire for one or more products?',
    answer:
      'Click "Add to Cart" on every product you need, then open your cart to set quantity and unit for each. Click "Proceed to Send Enquiry", fill in your company and delivery details and submit. There is no online payment — your enquiry is emailed to our sales desk and we reply with a formal quotation.',
  },
  {
    id: 'faq-grade',
    question: 'How are IP, BP, USP and Technical grades handled?',
    answer:
      'Pharmacopoeial grades (IP — Indian Pharmacopoeia, BP — British Pharmacopoeia, USP — United States Pharmacopeia) are supplied for pharmaceutical and personal-care use where monograph compliance is required. Technical grades such as Zinc Oxide Technical or Boric Acid Technical are meant for industrial uses like rubber, ceramics and paints. Technical grades are never offered as a substitute for pharmacopoeial grades.',
  },
  {
    id: 'faq-coa',
    question: 'Can I get a Certificate of Analysis (COA) before ordering?',
    answer:
      'Yes. Keep the "Send Certificate of Analysis" option ticked on the enquiry form. We share the manufacturer\'s representative or batch-specific COA covering assay, impurity limits and physical description along with the quotation.',
  },
  {
    id: 'faq-make',
    question: 'Which manufacturers do you source from?',
    answer:
      'Each product page lists its documented make — for example Godrej for Glycerin and SLES, Proto Chemical for iodine compounds, Indo Borax for Boric Acid, Savita for liquid paraffins, Manali for Propylene Glycol and Sukhjit for starches. Where the make shows "Confirmed on enquiry" (e.g. Copper Sulphate, Caustic Soda), we confirm the current producer and lot specification in the quotation.',
  },
  {
    id: 'faq-availability',
    question: 'How do you confirm stock and price?',
    answer:
      'Chemical prices and availability change with the market, so we do not show automated stock levels or prices online. After your enquiry, our team checks warehouse stock and manufacturer dispatch schedules and quotes a price valid for a stated period.',
  },
  {
    id: 'faq-packaging',
    question: 'What packaging sizes are available?',
    answer:
      'Products are supplied in original manufacturer packaging — typically 25 kg / 50 kg lined HDPE bags for powders (Boric Acid, Starch IP, Zinc Oxide) and 210–250 kg drums for liquids (Propylene Glycol, Glycerin, SLES, LABSA). Bulk tanker loads can be arranged for large liquid volumes.',
  },
  {
    id: 'faq-regions',
    question: 'Which regions do you deliver to?',
    answer:
      'Our main delivery network covers Panchkula, Chandigarh, Mohali, Derabassi (Punjab) and Baddi (Himachal Pradesh). We also arrange freight for buyers across Haryana, Punjab, Himachal Pradesh and neighbouring states.',
  },
  {
    id: 'faq-custom',
    question: 'Can I ask for a product that is not in your catalogue?',
    answer: `Yes. On the enquiry form click "Product not in catalogue" and type the material name, grade and quantity — or email us at ${HCP_COMPANY.contact.email}. We regularly source additional raw materials through our manufacturer network.`,
  },
];
