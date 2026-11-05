import React from 'react';
import type { Metadata } from 'next';
import { getAllProducts, getAllCategories, getAllManufacturers } from '@/lib/products';
import { ProductDirectory } from '@/components/products/ProductDirectory';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Products — Pharmaceutical & Industrial Raw Materials',
  description:
    'Browse 39 pharmaceutical (IP/BP/USP) and industrial raw materials from HCP — boric acid, iodine compounds, glycerin, liquid paraffin, SLES, LABSA, zinc oxide, starches and more.',
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        eyebrow="Product catalogue"
        title="Pharmaceutical & Industrial Raw Materials"
        description={`${products.length} materials from established manufacturers. Filter by grade, category or make, add to cart and send one enquiry.`}
        image="/assets/photos/lab-glassware.jpg"
      />
      <section className="bg-mist pt-10 pb-[5.5rem] sm:pt-14 sm:pb-[8.5rem]">
        <div className="container-x">
          <ProductDirectory initialProducts={products} categories={getAllCategories()} manufacturers={getAllManufacturers()} />
        </div>
      </section>
    </>
  );
}
