'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, ShieldCheck, FileCheck2, FlaskConical, Truck } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { MANUFACTURERS } from '@/data/manufacturers';
import { buttonStyles } from '@/components/ui/button-styles';

const QUICK_SEARCHES = ['Boric Acid', 'Glycerin', 'Liquid Paraffin', 'SLES', 'Zinc Oxide'];

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  const stats = [
    { value: PRODUCTS.length, label: 'Raw materials' },
    { value: MANUFACTURERS.length, label: 'Manufacturer sources' },
    { value: 'IP · BP · USP', label: 'Pharma grades' },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-soft">
      <div className="bg-hex absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute -left-32 top-0 -z-10 h-96 w-96 rounded-full bg-brand-light/15 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-leaf/15 blur-3xl" aria-hidden="true" />

      <div className="container-x grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* Copy */}
        <div className="animate-fade-up lg:col-span-6">
          <span className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-navy shadow-soft backdrop-blur">
            <span className="h-2 w-2 shrink-0 rounded-full bg-leaf" />
            <span>Trading · Procurement · Supply — Panchkula, Haryana</span>
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl xl:text-6xl">
            Pharmaceutical &amp; Industrial <span className="text-gradient">Raw Materials</span>, Sourced Right.
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-body">
            IP, BP, USP and technical-grade chemicals from established manufacturers — with batch COA support and dependable
            delivery to Baddi, Derabassi, Chandigarh and across North India.
          </p>

          <form onSubmit={submit} className="mt-8 max-w-xl" role="search">
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-2 shadow-card focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
              <Search className="ml-2 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chemical, grade, manufacturer…"
                aria-label="Search products"
                className="h-11 w-full min-w-0 bg-transparent text-sm sm:text-[15px] text-ink placeholder:text-muted focus:outline-none"
              />
              <button type="submit" className={buttonStyles('primary', 'md', 'shrink-0')}>
                Search
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted">Popular:</span>
              {QUICK_SEARCHES.map((q) => (
                <Link
                  key={q}
                  href={`/products?q=${encodeURIComponent(q)}`}
                  className="rounded-full border border-line bg-white/70 px-2.5 py-1 font-medium text-body transition-colors hover:border-brand hover:text-brand"
                >
                  {q}
                </Link>
              ))}
            </div>
          </form>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className={buttonStyles('primary', 'lg')}>
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/request-quote" className={buttonStyles('outline', 'lg')}>
              Send an Enquiry
            </Link>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-2 sm:gap-4 border-t border-line pt-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[11px] sm:text-xs text-muted">{s.label}</dt>
                <dd className="mt-1 font-display text-base font-extrabold text-navy sm:text-xl lg:text-2xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-[4/5] max-w-md sm:aspect-square lg:max-w-none">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/60">
              <Image
                src="/assets/photos/hero-lab.jpg"
                alt="Scientists testing pharmaceutical raw material samples in a laboratory"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
            </div>

            <div className="absolute left-2 top-4 w-48 sm:-left-8 sm:top-8 sm:w-56 animate-float rounded-2xl border border-white/70 bg-white/95 p-3 sm:p-4 shadow-lift backdrop-blur">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-leaf-50 text-leaf-dark">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-ink">Grade assured</p>
                  <p className="text-[11px] sm:text-xs text-muted">IP / BP / USP / Technical</p>
                </div>
              </div>
            </div>

            <div className="absolute right-2 bottom-16 w-52 sm:-right-6 sm:bottom-24 sm:w-60 animate-float rounded-2xl border border-white/70 bg-white/95 p-3 sm:p-4 shadow-lift backdrop-blur [animation-delay:1.5s]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <FileCheck2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-ink">COA with quotation</p>
                  <p className="text-[11px] sm:text-xs text-muted">Manufacturer batch reports</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2 sm:bottom-6 sm:left-6">
              {[
                { icon: FlaskConical, label: 'Pharma & industrial' },
                { icon: Truck, label: 'North India delivery' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur"
                >
                  <Icon className="h-3.5 w-3.5" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
