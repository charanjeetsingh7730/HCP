import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { buttonStyles } from '@/components/ui/button-styles';
import { MoleculeDecor } from '@/components/ui/MoleculeDecor';

export function CtaBanner() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-gradient animate-gradient-pan px-6 py-12 text-white shadow-lift sm:px-12 sm:py-16 lg:px-16">
          <Image src="/assets/photos/lab-glassware.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-15 mix-blend-luminosity" />
          <div className="bg-hex-light absolute inset-0 -z-10" aria-hidden="true" />
          <MoleculeDecor tone="light" className="absolute -right-10 -top-10 -z-10 h-64 w-64 animate-[spin_80s_linear_infinite]" />
          <div className="animate-aurora absolute -bottom-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Have a Requirement List? Get One Consolidated Quotation.
              </h2>
              <p className="mt-4 max-w-xl text-white/85">
                Send all your raw materials in a single enquiry. We confirm grade, availability and price — with COA —
                straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-2 lg:items-end">
              <Link href="/request-quote" className={buttonStyles('outline', 'lg', 'w-full sm:w-auto border-white bg-white text-navy hover:bg-brand-50 hover:text-navy')}>
                Send an Enquiry <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/90">
                <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <Phone className="h-4 w-4" /> {HCP_COMPANY.contact.phoneDisplay[0]}
                </a>
                <a href={`mailto:${HCP_COMPANY.contact.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
                  <Mail className="h-4 w-4" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
