import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ShieldCheck, FileCheck2, Truck } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { PRODUCTS } from '@/data/products';

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
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white/70">
      {/* Molecule-network pattern, brightest at the top and fading out */}
      <div className="bg-molecule-light animate-pattern-drift absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" aria-hidden="true" />
      <div className="animate-aurora absolute -bottom-40 -right-40 -z-10 h-96 w-96 rounded-full bg-leaf/20 blur-3xl [animation-delay:-7s]" aria-hidden="true" />
      <div className="absolute -top-40 left-1/2 -z-10 -translate-x-1/2" aria-hidden="true">
        <div className="animate-aurora h-80 w-[48rem] rounded-full bg-brand/30 blur-3xl" />
      </div>
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" aria-hidden="true" />

      {/* Assurance strip */}
      <div className="relative border-b border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="container-x grid gap-6 py-8 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'IP / BP / USP Grades', text: 'Pharmacopoeial and technical grades kept strictly separate' },
            { icon: FileCheck2, title: 'COA on Request', text: 'Manufacturer batch Certificate of Analysis with your quote' },
            { icon: Truck, title: 'Regional Delivery', text: 'Panchkula, Chandigarh, Derabassi, Baddi & North India' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
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

      <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block" aria-label={`${HCP_COMPANY.legalName} — Home`}>
            <Image src="/assets/logo/logo-white.svg" alt={HCP_COMPANY.legalName} width={2456} height={550} className="h-11 w-auto" />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{HCP_COMPANY.description}</p>
          <p className="mt-4 font-display text-sm font-semibold text-leaf">“{HCP_COMPANY.tagline}”</p>
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
                All {PRODUCTS.length} Products →
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
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 pb-24 sm:pb-6 text-xs text-white/50 sm:flex-row">
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
    </footer>
  );
}
