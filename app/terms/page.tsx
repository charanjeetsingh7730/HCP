import React from 'react';
import type { Metadata } from 'next';
import { HCP_COMPANY } from '@/data/company';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Supply',
  description: 'Terms covering product information, enquiries, quotations, grades and COA for Haryana Chemical & Pharmaceuticals (HCP).',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Supply' }]}
        eyebrow="Legal"
        title="Terms of Enquiry & Supply"
        description={`Effective October 2026 · ${HCP_COMPANY.legalName}`}
      />
      <section className="bg-mist py-12 sm:py-16">
        <div className="container-x">
          <article className="prose-legal card mx-auto max-w-3xl space-y-3 p-6 sm:p-10">
            <h2>1. Enquiries are not orders</h2>
            <p>
              This website is a product catalogue and enquiry service. Adding products to the cart or sending an enquiry does
              not create a contract of sale. A sale is confirmed only by a written quotation, proforma invoice or purchase order
              accepted by HCP.
            </p>

            <h2>2. Product information, grades and suitability</h2>
            <p className="font-medium text-ink">{HCP_COMPANY.disclaimer}</p>
            <p>
              The buyer is responsible for making sure the grade ordered (IP, BP, USP or Technical) meets the regulatory and
              monograph requirements of their product. Technical grades are not interchangeable with pharmacopoeial grades.
            </p>

            <h2>3. Certificates of Analysis</h2>
            <p>
              Where requested, we provide Certificates of Analysis issued by the manufacturer or an accredited laboratory.
              Buyers should carry out their own incoming identity and assay checks under their quality system before releasing
              material to production.
            </p>

            <h2>4. Prices, validity and delivery</h2>
            <p>
              Prices depend on market conditions, quantity, packaging and freight. Each quotation states its validity period and
              delivery terms (for example ex-warehouse Panchkula or delivered to the buyer&apos;s plant).
            </p>

            <h2>5. Trademarks</h2>
            <p>
              Manufacturer and brand names are used only to identify the source of products and remain the property of their
              respective owners.
            </p>

            <p className="border-t border-line pt-4 text-xs text-muted">
              Terms agreed in a final quotation, purchase order or contract take precedence over this page.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
