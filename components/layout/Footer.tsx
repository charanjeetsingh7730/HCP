import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, FileCheck2, Truck } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { FooterBackground } from './FooterBackground';

const COMPANY_LINKS = [
  { href: '/about', label: 'About HCP' },
  { href: '/industries', label: 'Industries We Serve' },
  { href: '/manufacturers', label: 'Manufacturers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/cart', label: 'Enquiry Cart' },
];

// Seamless liquid-surface paths: one period every 720 units, drawn across a double-width (2880) canvas
const liquid = (amp: number, shift: number) => {
  let d = `M0 ${32 + shift}`;
  for (let x = 0; x < 2880; x += 720) {
    d += ` C ${x + 180} ${32 + shift - amp}, ${x + 540} ${32 + shift + amp}, ${x + 720} ${32 + shift}`;
  }
  return `${d} V64 H0 Z`;
};
const LIQUID_FRONT = liquid(14, 14);
const LIQUID_MID = liquid(18, 4);
const LIQUID_BACK = liquid(22, -6);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate text-white/70">
      {/* Deep-water edge: three navy layers drifting at different speeds for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-full h-12 overflow-hidden sm:h-20"
        aria-hidden="true"
      >
        <svg
          className="animate-wave-slide absolute bottom-0 left-0 h-full w-[200%] [animation-direction:reverse] [animation-duration:28s] motion-reduce:animate-none"
          viewBox="0 0 2880 64"
          preserveAspectRatio="none"
        >
          <path d={LIQUID_BACK} fill="#023F85" fillOpacity="0.25" />
        </svg>
        <svg
          className="animate-wave-slide absolute bottom-0 left-0 h-full w-[200%] [animation-duration:20s] motion-reduce:animate-none"
          viewBox="0 0 2880 64"
          preserveAspectRatio="none"
        >
          <path d={LIQUID_MID} fill="#02336D" fillOpacity="0.55" />
        </svg>
        <svg
          className="animate-wave-slide absolute bottom-0 left-0 h-full w-[200%] [animation-duration:14s] motion-reduce:animate-none"
          viewBox="0 0 2880 64"
          preserveAspectRatio="none"
        >
          <path d={LIQUID_FRONT} fill="#011733" />
        </svg>
      </div>

      <div className="relative isolate overflow-hidden">
        <FooterBackground />

        {/* Assurance strip */}
        <div className="relative">
          <div className="container-x grid gap-3 pb-2 pt-8 sm:grid-cols-3 sm:gap-5 sm:pb-4 sm:pt-10">
            {[
              {
                icon: ShieldCheck,
                title: 'IP / BP / USP Grades',
                text: 'Pharmacopoeial and technical grades kept strictly separate',
              },
              {
                icon: FileCheck2,
                title: 'COA on Request',
                text: 'Manufacturer batch Certificate of Analysis with your quote',
              },
              {
                icon: Truck,
                title: 'Regional Delivery',
                text: 'Panchkula, Chandigarh, Derabassi, Baddi & North India',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md sm:p-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-leaf text-white shadow-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-x relative grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:gap-10 sm:py-14 lg:grid-cols-12">
          <div className="col-span-2 md:col-span-1 lg:col-span-4">
            <Link href="/" className="inline-block" aria-label={`${HCP_COMPANY.legalName} — Home`}>
              <Image
                src="/assets/logo/logo-white.svg"
                alt={HCP_COMPANY.legalName}
                width={2456}
                height={550}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{HCP_COMPANY.description}</p>
            <p className="mt-4 font-display text-sm font-semibold text-leaf">“{HCP_COMPANY.tagline}”</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="footer-heading">Product Categories</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCT_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="footer-link">
                    {cat.shortName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="font-semibold text-brand-light hover:text-white">
                  All {PRODUCTS.length} Products →
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="footer-heading">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 lg:col-span-3">
            <h2 className="footer-heading">Get in Touch</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                <span className="leading-relaxed">{HCP_COMPANY.address.formatted}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                <span className="flex flex-col gap-1">
                  {HCP_COMPANY.contact.phoneNumbers.map((phone, i) => (
                    <a key={phone} href={`tel:+91${phone}`} className="transition-colors hover:text-white">
                      {HCP_COMPANY.contact.phoneDisplay[i]}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                <a
                  href={`mailto:${HCP_COMPANY.contact.email}`}
                  className="break-all transition-colors hover:text-white"
                >
                  {HCP_COMPANY.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-navy-950/60 backdrop-blur-md">
          <div className="container-x flex flex-col items-center justify-between gap-3 pb-16 pt-5 text-center text-xs sm:pb-6 sm:pt-6 sm:text-left text-white/50 sm:flex-row">
            <p>
              © {year} {HCP_COMPANY.legalName}. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms of Supply
              </Link>
              <a href="/sitemap.xml" className="transition-colors hover:text-white">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
