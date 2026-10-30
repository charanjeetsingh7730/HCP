import React from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Send, FileCheck2, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/button-styles';

const STEPS = [
  { icon: Search, title: 'Find your products', text: 'Search the catalogue by chemical name, grade, manufacturer or application.' },
  { icon: ShoppingCart, title: 'Add to cart', text: 'Add every material you need and set the quantity and unit in your enquiry cart.' },
  {
    icon: Send,
    title: 'Send one enquiry',
    text: 'Share your company and delivery details. No payment — the enquiry is emailed to our desk.',
  },
  {
    icon: FileCheck2,
    title: 'Receive your quotation',
    text: 'We confirm grade and stock, then email the price, delivery terms and batch COA.',
  },
];

export function ProcurementProcess() {
  return (
    <section className="section relative overflow-hidden bg-navy-900 text-white">
      <div className="bg-hex-light absolute inset-0" aria-hidden="true" />
      <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-light/20 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="How it works"
          title="From cart to quotation in four steps"
          description="Built for purchase teams: one enquiry for many products, answered with real prices and documents."
        />

        <div className="relative">
          <div
            className="absolute left-[12%] right-[12%] top-14 hidden h-px bg-gradient-to-r from-brand-light/0 via-brand-light/50 to-leaf/0 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient shadow-brand">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/products" className={buttonStyles('primary', 'lg')}>
            Start Browsing <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/cart" className={buttonStyles('light', 'lg')}>
            <ShoppingCart className="h-4 w-4" /> View Cart
          </Link>
        </div>
      </div>
    </section>
  );
}
