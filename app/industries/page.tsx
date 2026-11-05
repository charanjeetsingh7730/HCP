import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Info, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { getAllIndustries, getAllProducts, displayGrade } from '@/lib/products';
import { PageHero } from '@/components/ui/PageHero';
import { ProductImage } from '@/components/products/ProductImage';
import { buttonStyles } from '@/components/ui/button-styles';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Raw materials for pharmaceutical formulators, personal-care brands, detergent manufacturers, rubber & coatings units, and water treatment & agriculture.',
};

export default function IndustriesPage() {
  const industries = getAllIndustries();
  const allProducts = getAllProducts();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        eyebrow="Industries we serve"
        title="Raw Materials Matched to Your Industry"
        description="Each sector has its own grade, documentation and packaging needs. Here is what we recommend — and why."
        image="/assets/photos/laboratory.jpg"
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {industries.map((ind) => (
            <a
              key={ind.id}
              href={`#${ind.slug}`}
              className="inline-flex min-h-8 items-center rounded-full border border-line bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-body shadow-soft backdrop-blur transition-colors hover:border-brand hover:text-brand"
            >
              {ind.shortTitle}
            </a>
          ))}
        </div>
      </PageHero>

      {industries.map((ind, idx) => {
        const recommended = allProducts.filter((p) => ind.recommendedProductSlugs.includes(p.slug));
        const reversed = idx % 2 === 1;
        return (
          <section
            key={ind.id}
            id={ind.slug}
            className={clsx(
              'scroll-mt-24 pt-14 sm:pt-[4.5rem]',
              idx === industries.length - 1 ? 'pb-[6.5rem] sm:pb-[9.5rem]' : 'pb-14 sm:pb-[4.5rem]',
              reversed ? 'bg-mist' : 'bg-white'
            )}
          >
            <div className="container-x grid items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Left Column: Visual & Compliance Badges */}
              <div className={clsx('relative flex flex-col justify-between h-full', reversed && 'lg:order-2')}>
                <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-[350px] xl:h-[380px] overflow-hidden rounded-3xl shadow-lift shrink-0">
                  <Image src={ind.image} alt={ind.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-body shadow-soft">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-navy">Quality &amp; Monograph Compliance</span>
                      <span className="mt-1 block text-xs leading-relaxed text-body">{ind.complianceNotes}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 font-medium text-body shadow-soft">
                      <CheckCircle2 className="h-4 w-4 text-leaf shrink-0" /> Factory Sealed
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 font-medium text-body shadow-soft">
                      <ShieldCheck className="h-4 w-4 text-brand shrink-0" /> Batch COA Support
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Content & Recommended Products */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span className="eyebrow">
                    {String(idx + 1).padStart(2, '0')} · {ind.shortTitle}
                  </span>
                  <h2 className="mt-2.5 text-2xl font-bold sm:text-3xl text-ink">{ind.title}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-body">{ind.description}</p>

                  <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-muted">What buyers need</h3>
                  <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
                    {ind.keyProcurementNeeds.map((need) => (
                      <li key={need} className="flex items-start gap-2 text-xs sm:text-sm text-ink">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                        {need}
                      </li>
                    ))}
                  </ul>

                  <h3 className="mt-5 text-xs font-bold uppercase tracking-wider text-muted">Recommended products ({recommended.length})</h3>
                  <ul className="mt-2.5 grid gap-2 grid-cols-2 sm:grid-cols-3">
                    {recommended.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.slug}`}
                          className="group flex items-center gap-2.5 rounded-xl border border-line bg-white p-2 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
                        >
                          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                            <ProductImage product={p} size="thumb" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-xs font-semibold text-ink group-hover:text-brand">{p.name}</span>
                            <span className="block truncate text-[11px] text-muted">{displayGrade(p)}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-1">
                  <Link href={`/request-quote?industry=${encodeURIComponent(ind.shortTitle)}`} className={buttonStyles('primary', 'md')}>
                    Enquire for {ind.shortTitle} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
