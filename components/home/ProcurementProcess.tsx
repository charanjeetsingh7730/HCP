import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, Send, FileCheck2, ArrowRight, Clock } from 'lucide-react';
import { buttonStyles } from '@/components/ui/button-styles';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';

const STEPS = [
  { icon: Search, title: 'Find Your Products', text: 'Search the catalogue by chemical name, grade, manufacturer or application.' },
  { icon: ShoppingCart, title: 'Add to Cart', text: 'Add every material you need and set the quantity and unit in your enquiry cart.' },
  {
    icon: Send,
    title: 'Send One Enquiry',
    text: 'Share your company and delivery details. No payment — the enquiry is emailed to our desk.',
  },
  {
    icon: FileCheck2,
    title: 'Receive Your Quotation',
    text: 'We confirm grade and stock, then email the price, delivery terms and batch COA.',
  },
];

export function ProcurementProcess() {
  return (
    <section className="section relative isolate overflow-hidden bg-navy-950 text-white">
      {/* Calm navy backdrop with two soft brand glows */}
      <div className="absolute -left-40 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-leaf/15 blur-3xl" aria-hidden="true" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading, photo and CTA */}
        <Reveal from="left" className="lg:col-span-5">
          <span className="eyebrow eyebrow-light">How It Works</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
            From Cart to Quotation in <span className="text-leaf">Four Steps</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
            Built for purchase teams: one enquiry for many products, answered with real prices and documents.
          </p>

          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-white/10">
            <Image
              src="/assets/photos/qc-pipette.jpg"
              alt="Lab technician pipetting samples into a test-tube rack"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-navy sm:bottom-5 sm:left-5">
              <Clock className="h-4 w-4 text-leaf-dark" />
              Quotation with COA, straight to your inbox
            </div>
          </div>

          <Link href="/products" className={buttonStyles('primary', 'lg', 'mt-8 w-full shadow-none sm:w-auto')}>
            Start Browsing <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        {/* Right: numbered steps */}
        <Stagger as="ol" className="relative lg:col-span-7">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <StaggerItem
              as="li"
              key={title}
              className="group relative flex gap-5 border-b border-white/10 py-6 first:pt-0 last:border-b-0 last:pb-0 sm:gap-7"
            >
              <span className="w-12 shrink-0 font-display text-4xl font-extrabold leading-none text-white/15 sm:w-20 transition-colors duration-300 group-hover:text-leaf sm:text-6xl">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-light ring-1 ring-white/15 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
                </div>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
