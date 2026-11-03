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
import { Reveal } from '@/components/ui/Reveal';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustSection />
      <ProcurementProcess />
      <ManufacturerStrip />
      <IndustriesPreview />
      <RegionalCoverage />
      <FaqPreview />
      <Reveal from="scale">
        <CtaBanner />
      </Reveal>
    </>
  );
}
