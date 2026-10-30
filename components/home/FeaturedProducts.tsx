import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, ProductRecord } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/button-styles';

const FEATURED_IDS = [
  'hcp-prod-01', // Boric Acid
  'hcp-prod-10', // Glycerin IP/USP
  'hcp-prod-07', // Light Liquid Paraffin
  'hcp-prod-17', // Propylene Glycol
  'hcp-prod-16', // Magnesium Sulphate IP
  'hcp-prod-13', // SLES Paste 70%
  'hcp-prod-28', // LABSA 90%
  'hcp-prod-32', // Zinc Oxide IP
];

export function FeaturedProducts() {
  const featured = FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is ProductRecord => Boolean(p));

  return (
    <section className="section bg-mist">
      <div className="container-x">
        <SectionHeading
          eyebrow="Most enquired"
          title="Popular raw materials"
          description="Add products to your cart and send one enquiry — we reply with price, availability and COA."
          action={
            <Link href="/products" className={buttonStyles('outline', 'md')}>
              Full catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
