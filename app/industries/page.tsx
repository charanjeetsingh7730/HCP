import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Info } from 'lucide-react';
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
              className="rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
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
          <section key={ind.id} id={ind.slug} className={clsx('scroll-mt-24 py-16 sm:py-20', reversed ? 'bg-mist' : 'bg-white')}>
            <div className="container-x grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
              <div className={clsx('relative', reversed && 'lg:order-2')}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
                  <Image src={ind.image} alt={ind.title} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-body">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  {ind.complianceNotes}
                </div>
              </div>

              <div>
                <span className="eyebrow">
                  {String(idx + 1).padStart(2, '0')} · {ind.shortTitle}
                </span>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{ind.title}</h2>
                <p className="mt-3 text-body">{ind.description}</p>

                <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-muted">What buyers need</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {ind.keyProcurementNeeds.map((need) => (
                    <li key={need} className="flex items-start gap-2 text-sm text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                      {need}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-sm font-bold uppercase tracking-wider text-muted">Recommended products ({recommended.length})</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {recommended.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-line bg-white p-2 transition-colors hover:border-brand-200 hover:bg-brand-50/40"
                      >
                        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                          <ProductImage product={p} size="thumb" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-ink group-hover:text-brand">{p.name}</span>
                          <span className="block truncate text-xs text-muted">{displayGrade(p)}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link href={`/request-quote?industry=${encodeURIComponent(ind.shortTitle)}`} className={buttonStyles('primary', 'md', 'mt-8')}>
                  Enquire for {ind.shortTitle} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
