import type { Metadata } from 'next';
import { CartView } from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'Enquiry Cart',
  description: 'Review the raw materials in your enquiry cart, set quantities and send a single enquiry to HCP.',
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
