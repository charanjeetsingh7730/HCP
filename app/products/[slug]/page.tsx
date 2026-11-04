import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, ShieldCheck, FileCheck2, Truck, Info, ArrowRight, Mail, Factory } from 'lucide-react';
import {
  getProductBySlug,
  getAllProducts,
  getRelatedProducts,
  displayGrade,
  displayMakes,
  getFormula,
  isPharmaGrade,
} from '@/lib/products';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { HCP_COMPANY } from '@/data/company';
import { ProductCard, GradeBadge } from '@/components/products/ProductCard';
import { ProductImage } from '@/components/products/ProductImage';
import { ProductPurchasePanel } from '@/components/products/ProductPurchasePanel';
import { buttonStyles } from '@/components/ui/button-styles';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.seoTitle.replace(/\s*\|\s*HCP.*$/i, ''),
    description: product.seoDescription,
    openGraph: {
      title: `${product.name} | ${HCP_COMPANY.legalName}`,
      description: product.seoDescription,
      images: [{ url: product.image ?? '/assets/photos/lab-glassware.jpg' }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const formula = getFormula(product);
  const categories = PRODUCT_CATEGORIES.filter((c) => product.categoryIds.includes(c.id));
  const primaryCategory = categories[0];

  const facts = [
    { label: 'Grade', value: displayGrade(product) },
    product.strength && { label: 'Strength', value: product.strength },
    formula && { label: 'Formula', value: formula },
    { label: 'Manufacturer', value: displayMakes(product) },
    product.packagingType && { label: 'Packaging', value: product.packagingType },
    { label: 'Category', value: categories.map((c) => c.shortName).join(', ') },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <div className="relative isolate overflow-hidden border-b border-brand-100 bg-brand-soft">
        <div className="bg-hex mask-fade-left absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
        <nav aria-label="Breadcrumb" className="container-x py-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
            <li>
              <Link href="/" className="hover:text-brand">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <Link href="/products" className="hover:text-brand">
                Products
              </Link>
            </li>
            {primaryCategory && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href={`/categories/${primaryCategory.slug}`} className="hover:text-brand">
                    {primaryCategory.shortName}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-ink">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <section className="bg-white py-10 sm:py-14">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="group relative aspect-square overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <ProductImage product={product} size="detail" priority />
                <span className="absolute left-4 top-4 z-10 rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy shadow-soft ring-1 ring-black/5">
                  Catalogue #{product.catalogNumber}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: ShieldCheck, label: isPharmaGrade(product) ? 'Pharmacopoeial grade' : 'Grade verified' },
                  { icon: FileCheck2, label: 'COA on request' },
                  { icon: Truck, label: 'North India delivery' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border border-line p-3">
                    <Icon className="mx-auto h-5 w-5 text-brand" />
                    <p className="mt-1.5 text-[11px] font-semibold leading-tight text-body">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <GradeBadge product={product} className="text-xs" />
              {formula && (
                <span className="rounded-full bg-mist px-2.5 py-0.5 font-mono text-xs font-semibold text-navy ring-1 ring-line">
                  {formula}
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{product.name}</h1>
            {product.aliases.length > 0 && <p className="mt-2 text-sm text-muted">Also known as: {product.aliases.join(', ')}</p>}
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-body">
              <Factory className="h-4 w-4 text-brand-light" />
              Make: <strong className="text-ink">{displayMakes(product)}</strong>
              {product.manufacturerConfirmed && (
                <span className="rounded-full bg-leaf-50 px-2 py-0.5 text-[11px] font-semibold text-leaf-dark">Documented source</span>
              )}
            </p>

            <div className="mt-6">
              <ProductPurchasePanel product={product} />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold">Applications</h2>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {product.commonUses.map((use) => (
                  <li key={use} className="flex items-start gap-2.5 text-[15px] text-body">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" />
                    {use}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold">Product details</h2>
              <dl className="mt-3 overflow-hidden rounded-2xl border border-line">
                {facts.map((f, i) => (
                  <div key={f.label} className={i % 2 ? 'grid grid-cols-3 bg-white' : 'grid grid-cols-3 bg-mist'}>
                    <dt className="px-4 py-3 text-sm text-muted">{f.label}</dt>
                    <dd className="col-span-2 px-4 py-3 text-sm font-semibold text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {product.supplyNotes && (
              <div className="mt-6 flex gap-3 rounded-2xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-dark">
                <Info className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="leading-relaxed">{product.supplyNotes}</p>
              </div>
            )}

            <p className="mt-6 text-xs leading-relaxed text-muted">{HCP_COMPANY.disclaimer}</p>
          </div>
        </div>
      </section>

      {/* COA band */}
      <section className="bg-white pb-14">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 text-white sm:p-10">
            <div className="bg-hex-light absolute inset-0" aria-hidden="true" />
            <div className="relative grid items-center gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-white">Need the COA or specification sheet first?</h2>
                <p className="mt-2 text-white/70">
                  We share the manufacturer&apos;s Certificate of Analysis and SDS for {product.name} with your quotation.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link href={`/request-quote?product=${product.slug}&coa=1`} className={buttonStyles('primary', 'lg')}>
                  Request COA &amp; Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`mailto:${HCP_COMPANY.contact.email}?subject=${encodeURIComponent(`Specification enquiry: ${product.name}`)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light hover:text-white"
                >
                  <Mail className="h-4 w-4" /> Email technical desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-mist py-14 sm:py-16">
          <div className="container-x">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">You may also need</span>
                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Related raw materials</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
                All products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
