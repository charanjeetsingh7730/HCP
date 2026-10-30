import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllCategories, getCategoryBySlug, getProductsByCategory } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { PageHero } from '@/components/ui/PageHero';
import { buttonStyles } from '@/components/ui/button-styles';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category not found' };
  return { title: category.name, description: category.longDescription };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.id);
  const others = getAllCategories().filter((c) => c.id !== category.id);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/categories' }, { label: category.shortName }]}
        eyebrow={`${products.length} products`}
        title={category.name}
        description={category.longDescription}
        image={category.image}
        actions={
          <Link href="/request-quote" className={buttonStyles('primary', 'lg')}>
            Send an Enquiry <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <section className="bg-mist py-12 sm:py-16">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-10">
            <h2 className="text-xl font-bold">Other categories</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {others.map((c) => (
                <Link key={c.id} href={`/categories/${c.slug}`} className="chip hover:border-brand hover:text-brand">
                  {c.shortName} <span className="text-muted">({c.catalogCount})</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
