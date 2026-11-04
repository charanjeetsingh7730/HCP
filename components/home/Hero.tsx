'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Search, ArrowRight, FileCheck2, FlaskConical, Factory, ShieldCheck } from 'lucide-react';
import { PRODUCTS, ProductRecord } from '@/data/products';
import { MANUFACTURERS } from '@/data/manufacturers';
import { buttonStyles } from '@/components/ui/button-styles';
import { CountUp } from '@/components/ui/CountUp';
import { HeroBackground } from '@/components/ui/HeroBackground';

const QUICK_SEARCHES = ['Boric Acid', 'Glycerin', 'Liquid Paraffin', 'SLES', 'Zinc Oxide'];

// Real catalogue items shown as floating cards around the hero photo
const SHOWCASE_SLUGS = ['glycerin-ip-usp-godrej', 'iodine-ip', 'boric-acid'];

// Positions of the floating product cards (mobile stays inside the frame, desktop breaks out of it)
const CARD_POSITIONS = [
  'left-0 top-[12%] sm:-left-6 lg:-left-12',
  'right-0 top-[42%] sm:-right-6 lg:-right-10',
  'left-0 bottom-[26%] sm:-left-4 lg:-left-8',
];

const SOURCED_FROM = ['Godrej', 'Savita', 'Proto Chemical', 'Manali', 'Sukhjit'];

export function Hero() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  const showcase = SHOWCASE_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter(
    (p): p is ProductRecord => Boolean(p)
  );

  const stats = [
    { icon: FlaskConical, value: PRODUCTS.length, suffix: '+', label: 'Raw Materials' },
    { icon: Factory, value: MANUFACTURERS.length, suffix: '', label: 'Manufacturers' },
    { icon: ShieldCheck, value: 'IP · BP · USP', suffix: '', label: 'Pharma Grades' },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-50">
      {/* Background: soft brand mesh + hexagon pattern from the logo, brighter around the cursor */}
      <HeroBackground />

      <div className="container-x grid items-center gap-14 pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div className="animate-fade-up lg:col-span-6">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold text-navy shadow-soft backdrop-blur sm:text-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf" />
            </span>
            Trading · Procurement · Supply — Panchkula, Haryana
          </span>

          <h1 className="mt-6 text-[2.15rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem]">
            Pharmaceutical &amp; Industrial <span className="text-gradient">Raw Materials</span>,{' '}
            <span className="relative inline-block whitespace-nowrap">
              Sourced Right.
              <svg
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-leaf sm:-bottom-3"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 11 C 60 3, 140 3, 200 8 S 280 13, 298 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg">
            IP, BP, USP and technical-grade chemicals from established manufacturers — with batch COA support and dependable
            delivery to Baddi, Derabassi, Chandigarh and across North India.
          </p>

          <form onSubmit={submit} className="mt-7 max-w-xl" role="search">
            <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-2 shadow-card focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
              <Search className="ml-2 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chemical or grade…"
                aria-label="Search products"
                className="h-11 w-full min-w-0 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none sm:text-[15px]"
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
                  className="inline-flex min-h-8 items-center rounded-full border border-line bg-white/80 px-3 py-1.5 font-medium text-body transition-colors hover:border-brand hover:text-brand"
                >
                  {q}
                </Link>
              ))}
            </div>
          </form>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className={buttonStyles('primary', 'lg', 'w-full sm:w-auto')}>
              Browse Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/request-quote" className={buttonStyles('outline', 'lg', 'w-full sm:w-auto')}>
              Send an Enquiry
            </Link>
          </div>

          <dl className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-line rounded-2xl border border-white bg-white/80 shadow-soft backdrop-blur">
            {stats.map(({ icon: Icon, value, suffix, label }) => (
              <div key={label} className="flex min-w-0 flex-col gap-1 p-2.5 sm:flex-row sm:items-center sm:gap-3 sm:p-4">
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand sm:flex">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <dd className="font-display text-lg font-extrabold leading-none text-navy sm:text-xl">
                    {typeof value === 'number' ? (
                      <>
                        <CountUp to={value} />
                        {suffix}
                      </>
                    ) : (
                      <span className="text-[13px] sm:text-base">{value}</span>
                    )}
                  </dd>
                  <dt className="mt-1 text-[11px] text-muted sm:text-xs">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[26rem] lg:max-w-[28rem]">
            {/* Ripples spreading out from behind the photo, like a drop hitting liquid */}
            <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              {[0, 1, 2].map((r) => (
                <span
                  key={r}
                  className="animate-ripple absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/25 sm:h-[34rem] sm:w-[34rem]"
                  style={{ animationDelay: `${r * -2.6}s` }}
                />
              ))}
            </div>

            {/* Offset dashed outline echoing the arch */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full rounded-b-[2.5rem] border-2 border-dashed border-brand/30 sm:translate-x-5 sm:translate-y-5"
              aria-hidden="true"
            />
            <div className="absolute -inset-2 rounded-t-full rounded-b-[2.6rem] bg-brand-gradient opacity-20 blur-2xl" aria-hidden="true" />

            {/* Arch-shaped photo — echoes a laboratory flask silhouette */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-lift ring-8 ring-white">
              <Image
                src="/assets/photos/hero-lab.jpg"
                alt="Scientists testing pharmaceutical raw material samples in a laboratory"
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">Sourced From</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SOURCED_FROM.map((name) => (
                    <span
                      key={name}
                      className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur sm:text-xs"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating product cards from the catalogue */}
            {showcase.map((p, i) => (
              <motion.div
                key={p.id}
                className={`absolute z-10 ${CARD_POSITIONS[i]} ${i === 2 ? 'hidden sm:block' : ''}`}
                initial={reduce ? false : { opacity: 0, y: 16, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex w-[9.75rem] animate-float items-center gap-2 rounded-2xl border border-white/80 bg-white/95 p-1.5 pr-2.5 shadow-lift backdrop-blur transition-colors hover:border-brand-200 sm:w-[12.5rem] sm:gap-2.5 sm:p-2.5 sm:pr-3"
                  style={{ animationDelay: `${i * -2}s` }}
                >
                  <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-mist ring-1 ring-line sm:h-12 sm:w-12">
                    {p.image && <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold text-ink transition-colors group-hover:text-brand sm:text-sm">
                      {p.name.replace(/,.*$/, '')}
                    </span>
                    <span className="mt-0.5 inline-block max-w-full truncate rounded bg-leaf-50 px-1.5 py-0.5 text-[10px] font-semibold text-leaf-dark">
                      {p.grade}
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* COA badge */}
            <motion.div
              className="absolute -top-2 right-0 z-10 sm:-right-4 lg:-right-8"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="flex items-center gap-2 rounded-full bg-leaf px-3 py-2 text-xs font-semibold text-white shadow-lift sm:px-4">
                <FileCheck2 className="h-4 w-4" />
                COA with Every Quote
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
