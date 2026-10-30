import React from 'react';
import type { Metadata } from 'next';
import { getAllCategories } from '@/lib/products';
import { PageHero } from '@/components/ui/PageHero';
import { CategoryCard } from '@/components/home/CategoryGrid';

export const metadata: Metadata = {
  title: 'Product Categories',
  description:
    'Pharma & iodine compounds, industrial salts, surfactants, personal-care ingredients, oils & paraffins and starches — browse HCP raw materials by category.',
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Categories' }]}
        eyebrow="Browse by category"
        title="Raw Material Categories"
        description="Six product families covering pharmaceutical, personal-care, detergent and industrial requirements."
        image="/assets/photos/chemistry-flasks.jpg"
      />
      <section className="section bg-mist">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>
    </>
  );
}
