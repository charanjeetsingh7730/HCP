import React from 'react';
import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { buttonStyles } from '@/components/ui/button-styles';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-brand-soft py-20">
      <div className="bg-hex absolute inset-0" aria-hidden="true" />
      <div className="container-x relative text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-brand shadow-card">
          <FlaskConical className="h-9 w-9" />
        </span>
        <p className="mt-6 font-display text-6xl font-extrabold text-gradient">404</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">This page could not be found</h1>
        <p className="mx-auto mt-3 max-w-md text-body">
          The product or page you are looking for may have moved. Try the catalogue or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/products" className={buttonStyles('primary', 'lg')}>
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className={buttonStyles('outline', 'lg')}>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
