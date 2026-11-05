import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { getAllManufacturers, getManufacturerBySlug, getProductsByManufacturer } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { PageHero } from '@/components/ui/PageHero';
import { buttonStyles } from '@/components/ui/button-styles';

interface ManufacturerPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllManufacturers().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: ManufacturerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const m = getManufacturerBySlug(slug);
  if (!m) return { title: 'Manufacturer not found' };
  return { title: `${m.name} products`, description: m.overview };
}

export default async function ManufacturerDetailPage({ params }: ManufacturerPageProps) {
  const { slug } = await params;
  const manufacturer = getManufacturerBySlug(slug);
  if (!manufacturer) notFound();

  const products = getProductsByManufacturer(manufacturer.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturers', href: '/manufacturers' }, { label: manufacturer.name }]}
        eyebrow={manufacturer.associationStatus}
        title={manufacturer.formalName || manufacturer.name}
        description={manufacturer.overview}
        actions={
          <Link href="/request-quote" className={buttonStyles('primary', 'lg')}>
            Enquire for {manufacturer.name} products <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-mist pt-12 pb-24 sm:pt-16 sm:pb-36">
        <div className="container-x">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm text-body">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
            <p>{manufacturer.disclaimer}</p>
          </div>
          <h2 className="mb-5 text-xl font-bold">
            {products.length} {products.length === 1 ? 'product' : 'products'} from {manufacturer.name}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Link href="/manufacturers" className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
            ← All manufacturers
          </Link>
        </div>
      </section>
    </>
  );
}
