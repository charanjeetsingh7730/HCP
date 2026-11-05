import React from 'react';
import type { Metadata } from 'next';
import { HCP_COMPANY } from '@/data/company';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Haryana Chemical & Pharmaceuticals (HCP) collects and uses information submitted through enquiries and contact forms.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Effective October 2026 · ${HCP_COMPANY.legalName}`}
      />
      <section className="bg-mist pt-12 pb-24 sm:pt-16 sm:pb-36">
        <div className="container-x">
          <article className="prose-legal card mx-auto max-w-3xl space-y-3 p-6 sm:p-10">
            <h2>1. About this website</h2>
            <p>
              This website lets businesses browse our raw material catalogue and send enquiries for quotations. We do not sell
              online and do not collect payment card or bank details.
            </p>

            <h2>2. Information we collect</h2>
            <p>When you send an enquiry or contact message, we collect:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Your name, company name, email address and phone number.</li>
              <li>Your city and delivery location.</li>
              <li>Products, grades, quantities, packaging preferences and any notes you add.</li>
            </ul>
            <p>
              Products you add to the enquiry cart are stored only in your own browser (local storage) until you send the
              enquiry or clear the cart.
            </p>

            <h2>3. How we use it</h2>
            <p>
              We use this information only to prepare quotations, confirm availability and documentation (such as COA), arrange
              delivery and reply to your questions. Your enquiry is emailed to our sales desk, and a copy may be emailed to you.
              We treat purchase volumes and formulation details as confidential and do not sell or rent your information to
              third parties.
            </p>

            <h2>4. Retention and your choices</h2>
            <p>
              Enquiry records are kept for business, accounting and traceability purposes. You can ask us to review, correct or
              delete your contact details at any time:
            </p>
            <div className="rounded-2xl border border-line bg-mist p-5 text-sm text-ink">
              <p className="font-semibold">{HCP_COMPANY.legalName}</p>
              <p>{HCP_COMPANY.address.formatted}</p>
              <p>Email: {HCP_COMPANY.contact.email}</p>
              <p>Phone: {HCP_COMPANY.contact.phoneDisplay.join(' / ')}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
