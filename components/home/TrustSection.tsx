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
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-5 gap-4">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/assets/photos/qc-analyst.jpg"
                alt="Quality control analyst examining a sample"
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-12">
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-card">
                <Image src="/assets/photos/sample-tubes.jpg" alt="Labelled raw material sample tubes" fill sizes="25vw" className="object-cover" />
              </div>
              <div className="rounded-3xl bg-brand-gradient p-5 text-white shadow-brand">
                <p className="font-display text-3xl font-extrabold">100%</p>
                <p className="mt-1 text-sm text-white/85">Original manufacturer packaging &amp; seals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            className="!mb-8"
            eyebrow="Why HCP"
            title="Quality you can document, supply you can plan around"
            description="Haryana Chemical & Pharmaceuticals connects reputable chemical producers with formulators who need verified compliance, accurate paperwork and dependable dispatch."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, text, tone }) => (
              <div key={title} className="rounded-2xl border border-line p-5 transition-colors hover:border-brand-200 hover:bg-mist">
                <span
                  className={
                    tone === 'leaf'
                      ? 'flex h-10 w-10 items-center justify-center rounded-xl bg-leaf-50 text-leaf-dark'
                      : 'flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand'
                  }
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">{text}</p>
              </div>
            ))}
          </div>
          <Link href="/about" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
            More about HCP <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
