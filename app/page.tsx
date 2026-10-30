import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ManufacturerStrip } from '@/components/home/ManufacturerStrip';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { TrustSection } from '@/components/home/TrustSection';
import { ProcurementProcess } from '@/components/home/ProcurementProcess';
import { IndustriesPreview } from '@/components/home/IndustriesPreview';
import { RegionalCoverage } from '@/components/home/RegionalCoverage';
import { FaqPreview } from '@/components/home/FaqPreview';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ManufacturerStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustSection />
      <ProcurementProcess />
      <IndustriesPreview />
      <RegionalCoverage />
      <FaqPreview />
      <CtaBanner />
    </>
  );
}
