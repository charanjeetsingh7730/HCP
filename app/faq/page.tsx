import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { PageHero } from '@/components/ui/PageHero';
import { FAQS } from '@/data/faqs';
import { HCP_COMPANY } from '@/data/company';
import { buttonStyles } from '@/components/ui/button-styles';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'How to enquire, IP/BP/USP vs technical grades, COA documentation, packaging sizes and delivery regions — answers from Haryana Chemical & Pharmaceuticals.',
};

export default function FaqPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        eyebrow="Help centre"
        title="Frequently Asked Questions"
        description="Everything about enquiries, grades, documentation, packaging and delivery."
      />

      <section className="section bg-mist">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Accordion items={FAQS} allowMultiple />
          </div>
          <aside className="lg:col-span-4">
            <div className="card sticky top-28 p-6">
              <h2 className="text-lg font-bold">Didn&apos;t find your answer?</h2>
              <p className="mt-2 text-sm text-body">Our team can help with technical and commercial questions.</p>
              <div className="mt-5 space-y-3 text-sm">
                <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className="flex items-center gap-2 font-semibold text-ink hover:text-brand">
                  <Phone className="h-4 w-4 text-leaf" /> {HCP_COMPANY.contact.phoneDisplay[0]}
                </a>
                <a href={`mailto:${HCP_COMPANY.contact.email}`} className="flex items-center gap-2 break-all font-semibold text-ink hover:text-brand">
                  <Mail className="h-4 w-4 text-brand" /> {HCP_COMPANY.contact.email}
                </a>
              </div>
              <Link href="/contact" className={buttonStyles('primary', 'md', 'mt-6 w-full')}>
                Send a message <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
