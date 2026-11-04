import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enquiry Sent',
  description: 'Your enquiry has reached the HCP sales desk. We reply with a formal quotation and COA.',
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
