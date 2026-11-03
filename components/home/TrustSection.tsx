import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, FileCheck2, Factory, Scale, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Strict Grade Segregation',
    text: 'Pharmacopoeial (IP, BP, USP) and technical grades are sourced and supplied separately — never interchanged.',
  },
  {
    icon: FileCheck2,
    title: 'COA & Batch Documentation',
    text: 'Manufacturer Certificates of Analysis confirm assay, impurity limits and appearance for each lot.',
  },
  {
    icon: Factory,
    title: 'Traceable Manufacturer Sources',
    text: 'Every product lists its documented make — Godrej, Savita, Proto Chemical, Manali, Sukhjit and more.',
  },
  {
    icon: Scale,
    title: 'Honest, Enquiry-Based Pricing',
    text: 'No fabricated online prices. Each quote reflects real volumes, packaging and freight to your plant.',
  },
];

// Alternating icon tones for the pillar list
const ICON_TONES = ['bg-brand-50 text-brand', 'bg-leaf-50 text-leaf-dark'];

export function TrustSection() {
  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line to-transparent" aria-hidden="true" />
      <div className="absolute -right-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand-light/10 blur-3xl" aria-hidden="true" />

      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Photo with stat overlay */}
        <Reveal from="left" className="order-2 lg:order-1 lg:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/assets/photos/qc-analyst.jpg"
              alt="Quality control analyst examining a sample"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-leaf px-3 py-1 text-xs font-semibold text-white shadow-soft">
              <ShieldCheck className="h-3.5 w-3.5" /> Monograph Verified
            </span>
            <div className="absolute inset-x-5 bottom-5 flex items-end gap-4 text-white sm:inset-x-6 sm:bottom-6">
              <p className="font-display text-5xl font-extrabold leading-none sm:text-6xl">100%</p>
              <p className="pb-1 text-sm leading-snug text-white/85">
                Original Manufacturer
                <br />
                Packaging &amp; Seals
              </p>
            </div>
          </div>
        </Reveal>

        {/* Copy + pillars as an open list (no boxes) */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <Reveal from="right">
            <SectionHeading
              className="!mb-8"
              eyebrow="Why HCP"
              title={
                <>
                  Quality You Can <span className="text-gradient">Document</span>, Supply You Can Plan Around
                </>
              }
              description="Haryana Chemical & Pharmaceuticals connects reputable chemical producers with formulators who need verified compliance, accurate paperwork and dependable dispatch."
            />
          </Reveal>

          <Stagger className="grid gap-x-8 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <StaggerItem key={title} className="group flex gap-4 border-t border-line py-5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${ICON_TONES[i % 2]}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-body">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Link
            href="/about"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            More About HCP <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
