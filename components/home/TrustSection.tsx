import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, FileCheck2, Factory, Scale, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Strict grade segregation',
    text: 'Pharmacopoeial (IP, BP, USP) and technical grades are sourced and supplied separately — never interchanged.',
    tone: 'leaf',
  },
  {
    icon: FileCheck2,
    title: 'COA & batch documentation',
    text: 'Manufacturer Certificates of Analysis confirm assay, impurity limits and appearance for each lot.',
    tone: 'brand',
  },
  {
    icon: Factory,
    title: 'Traceable manufacturer sources',
    text: 'Every product lists its documented make — Godrej, Savita, Proto Chemical, Manali, Sukhjit and more.',
    tone: 'brand',
  },
  {
    icon: Scale,
    title: 'Honest, enquiry-based pricing',
    text: 'No fabricated online prices. Each quote reflects real volumes, packaging and freight to your plant.',
    tone: 'leaf',
  },
];

export function TrustSection() {
  return (
    <section className="section overflow-hidden bg-white">
      <div className="container-x grid items-stretch gap-10 lg:gap-14 lg:grid-cols-2">
        {/* Left Column: Image & Badge Collage — stretched to match content height */}
        <div className="relative order-2 lg:order-1 h-full flex flex-col">
          <div className="grid grid-cols-5 gap-3.5 sm:gap-4 h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
            <div className="relative col-span-3 h-full min-h-[360px] sm:min-h-[420px] lg:min-h-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lift">
              <Image
                src="/assets/photos/qc-analyst.jpg"
                alt="Quality control analyst examining a sample"
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="col-span-2 flex flex-col justify-between gap-3.5 sm:gap-4 h-full">
              <div className="relative flex-1 min-h-[160px] sm:min-h-[200px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-card">
                <Image
                  src="/assets/photos/sample-tubes.jpg"
                  alt="Labelled raw material sample tubes"
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="rounded-2xl sm:rounded-3xl bg-brand-gradient p-4 sm:p-5 text-white shadow-brand shrink-0">
                <p className="font-display text-2xl sm:text-3xl font-extrabold">100%</p>
                <p className="mt-1 text-xs sm:text-sm leading-snug text-white/90">Original manufacturer packaging &amp; seals</p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                  <ShieldCheck className="h-3 w-3 text-leaf-100" /> Monograph Verified
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content & 4 Pillars — balanced vertical spacing */}
        <div className="order-1 lg:order-2 flex flex-col justify-between h-full">
          <div>
            <SectionHeading
              className="!mb-6"
              eyebrow="Why HCP"
              title="Quality you can document, supply you can plan around"
              description="Haryana Chemical & Pharmaceuticals connects reputable chemical producers with formulators who need verified compliance, accurate paperwork and dependable dispatch."
            />
            <div className="grid gap-3.5 sm:grid-cols-2">
              {PILLARS.map(({ icon: Icon, title, text, tone }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-line bg-white p-4 sm:p-4.5 transition-colors hover:border-brand-200 hover:bg-mist flex flex-col justify-between"
                >
                  <div>
                    <span
                      className={
                        tone === 'leaf'
                          ? 'flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-50 text-leaf-dark'
                          : 'flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand'
                      }
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <h3 className="mt-3 text-sm sm:text-base font-bold text-ink">{title}</h3>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-body">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-2">
            <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
              More about HCP <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
