import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { buttonStyles } from '@/components/ui/button-styles';

export function CtaBanner() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16 lg:px-16">
          <Image src="/assets/photos/lab-glassware.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-15 mix-blend-luminosity" />
          <div className="bg-hex-light absolute inset-0 -z-10" aria-hidden="true" />
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Have a requirement list? Get one consolidated quotation.
              </h2>
              <p className="mt-4 max-w-xl text-white/85">
                Send all your raw materials in a single enquiry. We confirm grade, availability and price — with COA —
                straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-2 lg:items-end">
              <Link href="/request-quote" className={buttonStyles('outline', 'lg', 'border-white bg-white text-navy hover:bg-brand-50 hover:text-navy')}>
                Send an Enquiry <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
                <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <Phone className="h-4 w-4" /> {HCP_COMPANY.contact.phoneDisplay[0]}
                </a>
                <a href={`mailto:${HCP_COMPANY.contact.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <Mail className="h-4 w-4" /> Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
