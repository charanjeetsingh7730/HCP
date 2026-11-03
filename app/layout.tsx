import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/components/cart/CartContext';
import { ToastProvider } from '@/components/ui/Toast';
import { CartTray } from '@/components/cart/CartTray';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { HCP_COMPANY } from '@/data/company';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Haryana Chemical & Pharmaceuticals | Pharma & Industrial Raw Materials Supplier',
    template: '%s | Haryana Chemical & Pharmaceuticals',
  },
  description:
    'Haryana Chemical & Pharmaceuticals (HCP), Panchkula — trading, procurement and supply of IP/BP/USP pharmaceutical and technical-grade industrial raw materials across Panchkula, Chandigarh, Derabassi, Baddi and North India.',
  keywords: [
    'pharmaceutical raw material supplier Panchkula',
    'chemical supplier Baddi',
    'chemical supplier Derabassi',
    'Boric Acid IP',
    'Potassium Iodide IP',
    'Glycerin IP',
    'Light Liquid Paraffin IP',
    'SLES 28%',
    'LABSA 90%',
    'Propylene Glycol USP',
    'Haryana Chemical and Pharmaceuticals',
  ],
  authors: [{ name: HCP_COMPANY.legalName }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hcpchem.com'),
  openGraph: {
    title: 'Haryana Chemical & Pharmaceuticals — Quality Chemicals for a Better Tomorrow',
    description:
      'Pharmaceutical (IP/BP/USP) and industrial raw materials from established manufacturers, with COA support and regional delivery across North India.',
    siteName: HCP_COMPANY.legalName,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/assets/photos/hero-lab.jpg', width: 1920, height: 1281, alt: HCP_COMPANY.legalName }],
  },
  icons: {
    icon: '/assets/logo/logo-mark.svg',
    apple: '/assets/logo/logo-mark.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#023F85',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>

        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CartTray />
            <ScrollToTop />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
