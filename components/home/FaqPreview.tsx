import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { FAQS } from '@/data/faqs';
import { HCP_COMPANY } from '@/data/company';
import { buttonStyles } from '@/components/ui/button-styles';
import { Reveal } from '@/components/ui/Reveal';

export function FaqPreview() {
  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-mist to-white" aria-hidden="true" />
      <div className="bg-dots mask-radial absolute inset-0 -z-10 opacity-40" aria-hidden="true" />
      <div className="animate-aurora absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl" aria-hidden="true" />
      <div className="container-x grid items-start gap-10 lg:gap-12 lg:grid-cols-12">
        <Reveal from="left" className="lg:sticky lg:top-28 lg:col-span-5">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl text-ink">Questions Buyers Ask Us</h2>
            <p className="mt-3 text-sm sm:text-base text-body">Grades, documentation, packaging and how the enquiry process works.</p>
          </div>

          <div className="mt-6 sm:mt-8 rounded-3xl bg-brand-soft p-6 border border-brand-100">
            <MessageCircleQuestion className="h-8 w-8 text-brand" />
            <p className="mt-3 font-display text-lg font-bold text-ink">Still Have a Question?</p>
            <p className="mt-1 text-sm text-body">Talk to our procurement desk about grades, documents, packaging or scheduled delivery.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/contact" className={buttonStyles('primary', 'sm')}>
                Contact Us
              </Link>
              <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className={buttonStyles('outline', 'sm')}>
                {HCP_COMPANY.contact.phoneDisplay[0]}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" className="lg:col-span-7">
          <Accordion items={FAQS.slice(0, 5)} />
          <div className="mt-5 pt-1">
            <Link href="/faq" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
              See All Questions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
