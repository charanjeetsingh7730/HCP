'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Copy, Check, Phone, Mail, ArrowRight, FileCheck2, Search, Send } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { buttonStyles } from '@/components/ui/button-styles';
import { EnquirySteps } from '@/components/cart/EnquirySteps';

function ThankYouContent() {
  const params = useSearchParams();
  const ref = params.get('ref');
  const name = params.get('name');
  const email = params.get('email');
  const count = Number(params.get('count') || '1');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!ref) return;
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — reference stays visible on screen
    }
  };

  const steps = [
    { icon: Search, title: 'We check availability', text: 'Our team confirms grade, manufacturer batch and stock for each product.' },
    { icon: FileCheck2, title: 'You get a quotation', text: 'Price, packaging, delivery terms and COA are sent to your email.' },
    { icon: Send, title: 'Confirm & dispatch', text: 'Once you approve, we schedule delivery to your plant or warehouse.' },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card overflow-hidden text-center">
        <div className="bg-brand-soft px-6 pb-10 pt-12 sm:px-12">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-leaf shadow-card ring-8 ring-leaf/10">
            <CheckCircle2 className="h-10 w-10" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">Thank you{name ? `, ${name.split(' ')[0]}` : ''}!</h1>
          <p className="mx-auto mt-3 max-w-lg text-body">
            Your enquiry for{' '}
            <strong className="text-ink">
              {count} {count === 1 ? 'product' : 'products'}
            </strong>{' '}
            has been sent to our sales desk.
            {email && (
              <>
                {' '}
                A copy is on its way to <strong className="text-ink">{email}</strong>.
              </>
            )}
          </p>

          {ref && (
            <div className="mx-auto mt-8 flex max-w-sm items-center justify-between gap-3 rounded-2xl border border-line bg-white px-5 py-4 text-left">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Enquiry reference</p>
                <p className="mt-0.5 font-mono text-lg font-bold tracking-wider text-navy">{ref}</p>
              </div>
              <button type="button" onClick={copy} className={buttonStyles('outline', 'sm')}>
                {copied ? <Check className="h-4 w-4 text-leaf" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6 border-t border-line p-6 text-left sm:grid-cols-3 sm:p-8">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-bold text-ink">
                {i + 1}. {title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-body">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 border-t border-line p-6">
          <Link href="/products" className={buttonStyles('primary', 'lg')}>
            Continue Browsing <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/" className={buttonStyles('outline', 'lg')}>
            Back to Home
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-body sm:flex-row sm:gap-6">
        <span>Urgent requirement?</span>
        <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-brand">
          <Phone className="h-4 w-4 text-leaf" /> {HCP_COMPANY.contact.phoneDisplay[0]}
        </a>
        <a href={`mailto:${HCP_COMPANY.contact.email}`} className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-brand">
          <Mail className="h-4 w-4 text-brand" /> {HCP_COMPANY.contact.email}
        </a>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="bg-hex-light absolute inset-0" aria-hidden="true" />
        <div className="container-x relative flex justify-center py-8">
          <EnquirySteps current={3} />
        </div>
      </section>
      <section className="bg-mist py-12 sm:py-16">
        <div className="container-x">
          <Suspense fallback={<div className="card mx-auto h-96 max-w-3xl animate-pulse" />}>
            <ThankYouContent />
          </Suspense>
        </div>
      </section>
    </>
  );
}
