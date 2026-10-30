import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { FAQS } from '@/data/faqs';
import { HCP_COMPANY } from '@/data/company';
import { buttonStyles } from '@/components/ui/button-styles';

export function FaqPreview() {
  return (
    <section className="section bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Questions buyers ask us</h2>
          <p className="mt-4 text-body">Grades, documentation, packaging and how the enquiry process works.</p>
          <div className="mt-8 rounded-3xl bg-brand-soft p-6">
            <MessageCircleQuestion className="h-8 w-8 text-brand" />
            <p className="mt-3 font-display text-lg font-bold text-ink">Still have a question?</p>
            <p className="mt-1 text-sm text-body">Talk to our team about grades, documents, packaging or delivery.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/contact" className={buttonStyles('primary', 'sm')}>
                Contact us
              </Link>
              <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className={buttonStyles('outline', 'sm')}>
                {HCP_COMPANY.contact.phoneDisplay[0]}
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={FAQS.slice(0, 5)} />
          <Link href="/faq" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
            See all questions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
