import React from 'react';
import Link from 'next/link';
import { Factory, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MANUFACTURERS } from '@/data/manufacturers';

// 6 premier flagship manufacturers — keeping the homepage trust strip focused, sleek & symmetric
const FEATURED_SLUGS = [
  'godrej',        // Glycerin IP/USP, SLS, SLES
  'savita',        // Liquid Paraffins IP, White Oils
  'proto-chemical',// Pharma Iodine, Potassium Iodide IP
  'indo-borex',    // Boric Acid IP
  'manali',        // Propylene Glycol IP/USP
  'sukhjit',       // Starch IP, Sorbitol 70%
];

const SPECIALTY_MAP: Record<string, string> = {
  'godrej': 'Glycerin IP & Surfactants',
  'savita': 'Liquid Paraffins IP',
  'proto-chemical': 'Pharma Iodine & Iodates',
  'indo-borex': 'Boric Acid IP',
  'manali': 'Propylene Glycol IP/USP',
  'sukhjit': 'Starch IP & Sorbitol',
};

export function ManufacturerStrip() {
  const featured = FEATURED_SLUGS.map((slug) => {
    const found = MANUFACTURERS.find((m) => m.slug === slug);
    return {
      ...found!,
      specialty: SPECIALTY_MAP[slug] || 'Pharma & Industrial',
    };
  }).filter(Boolean);

  return (
    <section className="border-y border-line/80 bg-mist/60 py-7 sm:py-9" aria-label="Manufacturer sources">
      <div className="container-x">
        {/* Header Row: Title & Link */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-soft">
              <Factory className="h-3.5 w-3.5 text-brand" />
              Manufacturer Sources
            </span>
            <span className="text-xs sm:text-sm text-body">
              Procuring directly from India’s established producers with batch COA.
            </span>
          </div>

          <Link
            href="/manufacturers"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand transition-colors hover:text-brand-dark shrink-0"
          >
            All 15 Manufacturers
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Symmetrical Cards: 6-cols desktop, 3-cols tablet, 2-cols mobile */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-3.5">
          {featured.map((m) => (
            <Link
              key={m.id}
              href={`/manufacturers/${m.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-line bg-white p-3.5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 font-display text-xs font-bold text-brand ring-1 ring-brand/15 transition-colors group-hover:bg-brand group-hover:text-white">
                  {m.name.charAt(0)}
                </span>
                <span className="rounded bg-leaf-50 px-1.5 py-0.5 text-[10px] font-semibold text-leaf-dark">
                  COA Verified
                </span>
              </div>

              <div className="mt-2.5 min-w-0">
                <h3 className="truncate font-display text-sm font-bold text-ink transition-colors group-hover:text-brand">
                  {m.name}
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-muted">
                  {m.specialty}
                </p>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-1.5 text-[10px] text-muted">
                <span>{m.productCount} {m.productCount === 1 ? 'material' : 'materials'}</span>
                <ArrowUpRight className="h-3 w-3 text-brand opacity-0 transition-all -translate-x-0.5 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>

        {/* Micro Trust Indicators */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] sm:text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-leaf shrink-0" />
            100% original manufacturer seals
          </span>
          <span className="hidden sm:inline text-line">•</span>
          <span>Manufacturer batch COA with quotation</span>
          <span className="hidden sm:inline text-line">•</span>
          <span>Direct dispatch to Baddi, Derabassi, Panchkula &amp; North India</span>
        </div>
      </div>
    </section>
  );
}
