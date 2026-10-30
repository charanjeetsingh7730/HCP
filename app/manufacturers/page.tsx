import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Factory, ArrowUpRight, Info } from 'lucide-react';
import { getAllManufacturers } from '@/lib/products';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Manufacturers',
  description:
    'Documented manufacturer sources for HCP raw materials — Godrej, Indo Borax, Savita, Proto Chemical, Manali Petrochemicals, Sukhjit, Shree Shyam Group and more.',
};

export default function ManufacturersPage() {
  const manufacturers = getAllManufacturers();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturers' }]}
        eyebrow="Sourcing transparency"
        title="Manufacturers We Source From"
        description="Every product in our catalogue lists its documented make, so you know exactly where your raw material comes from."
        image="/assets/photos/process-plant.jpg"
      />

      <section className="section bg-mist">
        <div className="container-x">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-brand-100 bg-white p-5 text-sm text-body">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <p>
              HCP is an independent trading, procurement and supply firm. Manufacturer names identify the documented
              production source of each material; trademarks belong to their respective owners.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturers.map((m) => (
              <Link key={m.id} href={`/manufacturers/${m.slug}`} className="group card card-hover flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 font-display text-lg font-extrabold text-brand">
                    {m.name.charAt(0)}
                  </span>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-body">
                    {m.productCount} {m.productCount === 1 ? 'product' : 'products'}
                  </span>
                </div>
                <h2 className="mt-5 text-lg font-bold group-hover:text-brand">{m.name}</h2>
                {m.formalName && m.formalName !== m.name && <p className="text-xs text-muted">{m.formalName}</p>}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{m.overview}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  <Factory className="h-4 w-4" /> View products
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
