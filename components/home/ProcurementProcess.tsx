import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Send, FileCheck2, ArrowRight, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/button-styles';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';

const STEPS = [
  {
    step: '01',
    icon: Search,
    title: 'Find Your Products',
    text: 'Search the catalogue by chemical name, grade, manufacturer or application.',
  },
  {
    step: '02',
    icon: ShoppingCart,
    title: 'Add to Cart',
    text: 'Add every material you need and set the quantity and unit in your enquiry cart.',
  },
  {
    step: '03',
    icon: Send,
    title: 'Send One Enquiry',
    text: 'Share your company and delivery details. No payment — the enquiry is emailed to our desk.',
  },
  {
    step: '04',
    icon: FileCheck2,
    title: 'Receive Your Quotation',
    text: 'We confirm grade and stock, then email the price, delivery terms and batch COA.',
  },
];

export function ProcurementProcess() {
  return (
    <section className="section relative isolate overflow-hidden bg-[#01142F] text-white">
      {/* Background ambient lighting - clean deep corporate navy without messy photo textures */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#01142F] via-[#021F47] to-[#01142F]"
        aria-hidden="true"
      />
      {/* Soft central brand spotlight */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(4,146,219,0.24),transparent_70%)]"
        aria-hidden="true"
      />
      {/* Bottom emerald accent glow (echoing HCP green) */}
      <div
        className="absolute -bottom-24 -left-20 -z-10 h-80 w-80 rounded-full bg-leaf/15 blur-3xl"
        aria-hidden="true"
      />
      {/* Subtle hexagon lattice texture softly faded at edges */}
      <div className="bg-hex-light mask-radial absolute inset-0 -z-10 opacity-30" aria-hidden="true" />

      {/* Top and Bottom subtle accent borders */}
      <div
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-light/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-light/20 to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="How It Works"
            title="From Cart to Quotation in Four Steps"
            description="Built for purchase teams: one enquiry for many products, answered with real prices and documents."
          />
        </Reveal>

        <div className="relative mt-2">
          {/* Subtle horizontal connecting trail for desktop */}
          <div
            className="pointer-events-none absolute left-12 right-12 top-14 -z-0 hidden lg:block"
            aria-hidden="true"
          >
            <div className="h-[2px] w-full bg-gradient-to-r from-brand-light/20 via-brand-light/40 to-leaf/30" />
            <div className="absolute inset-0 h-[2px] w-1/4 animate-sweep bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>

          <Stagger as="ol" className="relative mx-auto grid max-w-xl gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ step, icon: Icon, title, text }, i) => (
              <StaggerItem
                as="li"
                key={title}
                className={[
                  'group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300',
                  'hover:-translate-y-1 hover:border-brand-light/50 hover:bg-white/[0.08] hover:shadow-[0_12px_32px_rgba(4,116,194,0.22)]',
                ].join(' ')}
              >
                {/* Connecting arrow pill between cards on desktop */}
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute -right-3.5 top-14 z-20 hidden h-7 w-7 items-center justify-center rounded-full border border-brand-light/40 bg-[#021F47] text-brand-light shadow-md lg:flex"
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-brand ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                    <span
                      className="font-display text-3xl font-extrabold tracking-tight text-white/20 transition-colors duration-300 group-hover:text-brand-light/60"
                      aria-hidden="true"
                    >
                      {step}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="font-display text-base font-bold text-white transition-colors duration-200 group-hover:text-brand-light sm:text-lg">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-brand-light/80">
                  <span className="font-semibold uppercase tracking-wider">Step {i + 1}</span>
                  <span className="text-white/40 group-hover:text-white/70 transition-colors">Phase {i + 1}/4</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Action buttons and trust note */}
        <Reveal className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-4 sm:max-w-none">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <Link href="/products" className={buttonStyles('primary', 'lg', 'w-full sm:w-auto shadow-brand')}>
              Start Browsing <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
            <Link
              href="/cart"
              className={buttonStyles('light', 'lg', 'w-full sm:w-auto border-white/20 bg-white/10 text-white hover:bg-white/20')}
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" /> View Cart
            </Link>
          </div>

          <p className="flex items-center gap-2 text-xs text-white/60">
            <Clock className="h-3.5 w-3.5 text-leaf" />
            <span>Average quotation turnaround: <strong>under 2 hours</strong> during standard business hours</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
