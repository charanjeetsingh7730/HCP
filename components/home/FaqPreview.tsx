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
      <div className="container-x grid items-stretch gap-10 lg:gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl text-ink">Questions buyers ask us</h2>
            <p className="mt-3 text-sm sm:text-base text-body">Grades, documentation, packaging and how the enquiry process works.</p>
          </div>

          <div className="mt-6 sm:mt-8 rounded-3xl bg-brand-soft p-6 border border-brand-100">
            <MessageCircleQuestion className="h-8 w-8 text-brand" />
            <p className="mt-3 font-display text-lg font-bold text-ink">Still have a question?</p>
            <p className="mt-1 text-sm text-body">Talk to our procurement desk about grades, documents, packaging or scheduled delivery.</p>
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

        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <Accordion items={FAQS.slice(0, 5)} />
          <div className="mt-5 pt-1">
            <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
              See all questions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
