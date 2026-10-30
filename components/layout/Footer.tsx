import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, FileCheck2, Truck } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';
import { buttonStyles } from '@/components/ui/button-styles';

const COMPANY_LINKS = [
  { href: '/about', label: 'About HCP' },
  { href: '/industries', label: 'Industries We Serve' },
  { href: '/manufacturers', label: 'Manufacturers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/cart', label: 'Enquiry Cart' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/70">
      <div className="bg-hex-light absolute inset-0" aria-hidden="true" />

      {/* Assurance strip */}
      <div className="relative border-b border-white/10">
        <div className="container-x grid gap-6 py-8 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'IP / BP / USP grades', text: 'Pharmacopoeial and technical grades kept strictly separate' },
            { icon: FileCheck2, title: 'COA on request', text: 'Manufacturer batch Certificate of Analysis with your quote' },
            { icon: Truck, title: 'Regional delivery', text: 'Panchkula, Chandigarh, Derabassi, Baddi & North India' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand-light ring-1 ring-white/10">
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

      <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block" aria-label={`${HCP_COMPANY.legalName} — Home`}>
            <Image src="/assets/logo/logo-white.svg" alt={HCP_COMPANY.legalName} width={2456} height={550} className="h-11 w-auto" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{HCP_COMPANY.description}</p>
          <p className="mt-4 font-display text-sm font-semibold text-leaf">“{HCP_COMPANY.tagline}”</p>
          <Link href="/request-quote" className={buttonStyles('primary', 'md', 'mt-6')}>
            Send an Enquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Product Categories</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PRODUCT_CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link href={`/categories/${cat.slug}`} className="transition-colors hover:text-white">
                  {cat.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="font-semibold text-brand-light hover:text-white">
                All {PRODUCTS.length} products →
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Get in Touch</h2>
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
              <a href={`mailto:${HCP_COMPANY.contact.email}`} className="break-all transition-colors hover:text-white">
                {HCP_COMPANY.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {HCP_COMPANY.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Supply
            </Link>
            <a href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
