import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, ProductRecord } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/button-styles';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

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
    <section className="section relative isolate overflow-hidden bg-brand-100">
      {/* Lab photo washed in brand blue & leaf green */}
      <ParallaxImage src="/assets/photos/chemistry-flasks.jpg" imageClassName="opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-100/90 via-brand-50/85 to-leaf-100/90" aria-hidden="true" />
      <div className="container-x">
        <Reveal>
        <SectionHeading
          eyebrow="Most Enquired"
          title={
            <>
              Popular <span className="text-gradient">Raw Materials</span>
            </>
          }
          description="Add products to your cart and send one enquiry — we reply with price, availability and COA."
          action={
            <Link href="/products" className={buttonStyles('outline', 'md')}>
              Full Catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
