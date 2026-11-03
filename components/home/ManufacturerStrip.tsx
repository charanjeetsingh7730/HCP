import React from 'react';
import Link from 'next/link';
import { Factory, ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { MANUFACTURERS } from '@/data/manufacturers';
import { PRODUCTS } from '@/data/products';
import { buttonStyles } from '@/components/ui/button-styles';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';

// 6 premier flagship manufacturers — keeping the homepage trust section focused
const FEATURED_SLUGS = [
  'godrej', // Glycerin IP/USP, SLS, SLES
  'savita', // Liquid Paraffins IP, White Oils
  'proto-chemical', // Pharma Iodine, Potassium Iodide IP
  'indo-borex', // Boric Acid IP
  'manali', // Propylene Glycol IP/USP
  'sukhjit', // Starch IP, Sorbitol 70%
];

const SPECIALTY_MAP: Record<string, string> = {
  godrej: 'Glycerin IP & Surfactants',
  savita: 'Liquid Paraffins IP',
  'proto-chemical': 'Pharma Iodine & Iodates',
  'indo-borex': 'Boric Acid IP',
  manali: 'Propylene Glycol IP/USP',
  sukhjit: 'Starch IP & Sorbitol',
};

// Alternating brand / leaf monogram tiles
const MONOGRAM_TONES = ['from-brand to-brand-light', 'from-leaf-dark to-leaf'];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export function ManufacturerStrip() {
  const featured = FEATURED_SLUGS.map((slug) => MANUFACTURERS.find((m) => m.slug === slug))
    .filter((m): m is (typeof MANUFACTURERS)[number] => Boolean(m))
    .map((m) => ({ ...m, specialty: SPECIALTY_MAP[m.slug] || 'Pharma & Industrial' }));

  const stats = [
    { value: MANUFACTURERS.length, label: 'Manufacturers' },
    { value: PRODUCTS.length, label: 'Products' },
    { value: '100%', label: 'Original Seals' },
  ];

  return (
    <section className="section relative isolate overflow-hidden bg-brand-soft" aria-label="Manufacturer sources">
      {/* Soft brand wash between the dark "How It Works" band and the white industries section */}
      <div className="absolute -right-32 -top-20 -z-10 h-96 w-96 rounded-full bg-brand-light/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-leaf/15 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />

      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Intro */}
        <Reveal from="left" className="lg:col-span-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-soft">
            <Factory className="h-3.5 w-3.5" />
            Manufacturer Sources
          </span>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Sourced Direct From India&apos;s <span className="text-gradient">Trusted Producers</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-body">
            Every product carries its documented make and ships in the manufacturer&apos;s original sealed packing, with batch COA.
          </p>

          <dl className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-white p-3 text-center shadow-soft">
                <dd className="font-display text-xl font-extrabold text-navy sm:text-2xl">{s.value}</dd>
                <dt className="mt-0.5 text-[11px] text-muted sm:text-xs">{s.label}</dt>
              </div>
            ))}
          </dl>

          <Link href="/manufacturers" className={buttonStyles('primary', 'md', 'mt-6 w-full sm:w-auto')}>
            All {MANUFACTURERS.length} Manufacturers <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Featured manufacturer cards */}
        <div className="lg:col-span-8">
          <Stagger className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3">
            {featured.map((m, i) => (
              <StaggerItem key={m.id}>
                <Link
                  href={`/manufacturers/${m.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <span
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-150"
                    aria-hidden="true"
                  />
                  <div className="relative flex items-start justify-between gap-2">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-base font-extrabold text-white shadow-brand ${
                        MONOGRAM_TONES[i % 2]
                      }`}
                    >
                      {initials(m.name)}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-brand opacity-0 transition-all group-hover:opacity-100" />
                  </div>
                  <h3 className="relative mt-4 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand">
                    {m.name}
                  </h3>
                  <p className="relative mt-0.5 text-sm text-body">{m.specialty}</p>
                  <div className="relative mt-4 flex items-center justify-between border-t border-line pt-3 text-xs">
                    <span className="font-semibold text-muted">
                      {m.productCount} {m.productCount === 1 ? 'Material' : 'Materials'}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-leaf-50 px-2 py-0.5 font-semibold text-leaf-dark">
                      <ShieldCheck className="h-3 w-3" /> COA Verified
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-body lg:justify-start">
            {['100% Original Manufacturer Seals', 'Batch COA with Quotation', 'Dispatch to Baddi, Derabassi & North India'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-leaf" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
