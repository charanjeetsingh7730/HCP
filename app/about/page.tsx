import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, BadgeIndianRupee, Truck, FlaskConical, MapPin, ArrowRight, FileCheck2, Download, Phone } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { PRODUCTS } from '@/data/products';
import { MANUFACTURERS } from '@/data/manufacturers';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/button-styles';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Haryana Chemical & Pharmaceuticals (HCP), Panchkula — trading, procurement and supply of chemical and pharmaceutical raw materials from trusted manufacturers across North India.',
};

// "Why choose HCP" — from the official HCP product profile
const WHY = [
  { icon: ShieldCheck, title: 'Trusted quality', text: 'Raw materials sourced from leading, established manufacturers.' },
  { icon: BadgeIndianRupee, title: 'Competitive pricing', text: 'Efficient procurement and reliable, regular supply volumes.' },
  { icon: Truck, title: 'Timely delivery', text: 'Dispatch across North India from our Panchkula base.' },
  { icon: FlaskConical, title: 'Wide grade range', text: 'Industrial, technical and pharmacopoeial (IP, BP, USP) grades.' },
  { icon: FileCheck2, title: 'Documentation support', text: 'COA, monograph compliance and specification details on request.' },
  { icon: MapPin, title: 'Regional focus', text: 'Serving Panchkula, Chandigarh, Derabassi, Baddi and nearby areas.' },
];

export default function AboutPage() {
  const stats = [
    { value: PRODUCTS.length, label: 'Catalogue products' },
    { value: PRODUCT_CATEGORIES.length, label: 'Product categories' },
    { value: MANUFACTURERS.length, label: 'Manufacturer sources' },
    { value: HCP_COMPANY.serviceRegions.primaryHubs.length, label: 'Key supply hubs' },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        eyebrow={HCP_COMPANY.pillars.join(' · ')}
        title="Your Partner in Chemical & Pharma Solutions"
        description="We procure quality chemical and pharmaceutical raw materials from trusted manufacturers to supply industries, pharma companies and commercial buyers across Panchkula, Chandigarh, Derabassi and Baddi."
        image="/assets/photos/qc-pipette.jpg"
      />

      {/* Story */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{HCP_COMPANY.legalName}</h2>
            <p className="mt-5 text-lg leading-relaxed text-body">{HCP_COMPANY.description}</p>
            <p className="mt-4 leading-relaxed text-body">
              We help purchase teams match the right grade to their formulation, obtain manufacturer batch documentation and
              plan deliveries to their plant — with supply always subject to availability, applicable grade, specification and
              batch documentation.
            </p>
            <p className="mt-6 font-display text-xl font-bold text-leaf-dark">“{HCP_COMPANY.tagline}”</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className={buttonStyles('primary', 'lg')}>
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={buttonStyles('outline', 'lg')}>
                Contact Us
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-3xl shadow-lift">
              <Image src="/assets/photos/warehouse-aisle.jpg" alt="Raw material warehouse" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-mist p-5">
                <p className="font-display text-3xl font-extrabold text-navy">{s.value}</p>
                <p className="mt-1 text-sm text-body">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HCP */}
      <section className="section bg-mist">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Why choose HCP" title="What our buyers rely on us for" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card card-hover p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile + contact */}
      <section className="section bg-white">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-line shadow-lift">
            <Image
              src="/assets/branding/hcp-infographic.png"
              alt="HCP product profile with product list, makes and uses"
              width={1024}
              height={1536}
              className="h-auto w-full"
            />
          </div>
          <div>
            <span className="eyebrow">Product profile</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Our product profile at a glance</h2>
            <p className="mt-4 text-body">
              A one-page overview of our key products, their makes and typical uses — handy to share with your purchase or QA
              team.
            </p>
            <a href="/assets/branding/hcp-infographic.png" download className={buttonStyles('outline', 'lg', 'mt-6')}>
              <Download className="h-4 w-4" /> Download product profile
            </a>

            <div className="mt-10 rounded-3xl bg-navy-900 p-6 text-white sm:p-8">
              <p className="font-display text-lg font-bold">Visit or call us</p>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-brand-light" />
                  {HCP_COMPANY.address.formatted}
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-leaf" />
                  {HCP_COMPANY.contact.phoneDisplay.join('  ·  ')}
                </li>
              </ul>
              <Link href="/contact" className={buttonStyles('primary', 'md', 'mt-6')}>
                Get directions & contact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
