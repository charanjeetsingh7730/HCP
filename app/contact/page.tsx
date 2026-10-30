import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, ShoppingCart, ArrowRight, Navigation } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { PageHero } from '@/components/ui/PageHero';
import { ContactForm } from '@/components/enquiry/ContactForm';
import { buttonStyles } from '@/components/ui/button-styles';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Contact Haryana Chemical & Pharmaceuticals, ${HCP_COMPANY.address.formatted}. Call ${HCP_COMPANY.contact.phoneDisplay.join(' / ')} or email ${HCP_COMPANY.contact.email}.`,
};

const mapQuery = encodeURIComponent(`${HCP_COMPANY.address.formatted}, India`);

export default function ContactPage() {
  const cards = [
    {
      icon: Phone,
      title: 'Call us',
      lines: HCP_COMPANY.contact.phoneNumbers.map((p, i) => ({ label: HCP_COMPANY.contact.phoneDisplay[i], href: `tel:+91${p}` })),
    },
    {
      icon: Mail,
      title: 'Email us',
      lines: [{ label: HCP_COMPANY.contact.email, href: `mailto:${HCP_COMPANY.contact.email}` }],
    },
    {
      icon: MapPin,
      title: 'Visit us',
      lines: [{ label: HCP_COMPANY.address.formatted, href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}` }],
    },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="Get in touch"
        title="Contact Our Sales Desk"
        description="Questions about grades, prices, COA or delivery? Call, email or send us a message."
        image="/assets/photos/logistics-fleet.jpg"
      />

      <section className="bg-mist py-12 sm:py-16">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="card p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <div className="mt-2 space-y-1">
                  {lines.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith('http') ? '_blank' : undefined}
                      rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block break-words text-sm font-medium text-body hover:text-brand"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="card p-6 sm:p-8 lg:col-span-7">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <p className="mb-6 mt-1 text-sm text-body">We will reply by email or phone.</p>
              <ContactForm />
            </div>

            <div className="flex flex-col gap-6 lg:col-span-5">
              <div className="card overflow-hidden">
                <iframe
                  title="HCP location on Google Maps"
                  src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex items-center justify-between gap-3 p-5">
                  <p className="text-sm text-body">{HCP_COMPANY.address.formatted}</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles('outline', 'sm', 'shrink-0')}
                  >
                    <Navigation className="h-4 w-4" /> Directions
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-brand-gradient p-6 text-white shadow-brand">
                <ShoppingCart className="h-7 w-7" />
                <p className="mt-3 font-display text-lg font-bold">Enquiring for several products?</p>
                <p className="mt-1 text-sm text-white/85">
                  Add them to your cart and send one enquiry with quantities — it reaches our team by email.
                </p>
                <Link
                  href="/products"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:bg-brand-50"
                >
                  Browse products <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
