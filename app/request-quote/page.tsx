import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';
import { EnquirySteps } from '@/components/cart/EnquirySteps';

export const metadata: Metadata = {
  title: 'Send an Enquiry / Request a Quote',
  description:
    'Send one enquiry for multiple pharmaceutical and industrial raw materials. Specify grade, quantity, packaging and delivery location — HCP replies with a formal quotation and COA.',
};

export default function RequestQuotePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="bg-hex-light absolute inset-0" aria-hidden="true" />
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-leaf/20 blur-3xl" aria-hidden="true" />
        <div className="container-x relative flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow eyebrow-light">Step 2 of 3</span>
            <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Send Your Enquiry</h1>
            <p className="mt-2 max-w-xl text-white/70">
              Share your details and we will email you a formal quotation with grade confirmation and COA.
            </p>
          </div>
          <EnquirySteps current={2} />
        </div>
      </section>

      <section className="bg-mist py-10 sm:py-14">
        <div className="container-x">
          <Suspense fallback={<div className="card h-96 animate-pulse" />}>
            <EnquiryForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
