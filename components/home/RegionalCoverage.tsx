import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight, Warehouse } from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { SectionHeading } from '@/components/ui/SectionHeading';

const HUBS = [
  { name: 'Panchkula, Haryana', role: 'Head office & warehouse', detail: 'Plot No. 260, HSIIDC, Alipur Barwala — dispatch base for all consignments.' },
  { name: 'Baddi, Himachal Pradesh', role: 'Pharma formulation cluster', detail: 'Scheduled supply of IP-grade excipients and actives to pharmaceutical units.' },
  { name: 'Derabassi, Punjab', role: 'Chemical & detergent corridor', detail: 'Drum and pallet loads of surfactants, alkalis and industrial salts.' },
  { name: 'Chandigarh & Mohali', role: 'Commercial & life sciences', detail: 'Deliveries to manufacturers, contract packers and laboratories.' },
];

export function RegionalCoverage() {
  return (
    <section className="section bg-mist">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            className="!mb-8"
            eyebrow="Supply network"
            title="Close to North India's pharma and chemical belts"
            description="Our Panchkula base sits next to the formulation and processing clusters of Himachal Pradesh, Punjab, Haryana and Chandigarh."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {HUBS.map((hub, i) => (
              <li key={hub.name} className="card p-5">
                <div className="flex items-center gap-2">
                  <span
                    className={
                      i === 0
                        ? 'flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white'
                        : 'flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand'
                    }
                  >
                    {i === 0 ? <Warehouse className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                  </span>
                  <h3 className="text-sm font-bold">{hub.name}</h3>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-leaf-dark">{hub.role}</p>
                <p className="mt-1 text-sm leading-relaxed text-body">{hub.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
          <Image
            src="/assets/photos/warehouse.jpg"
            alt="Organised warehouse with palletised stock ready for dispatch"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
            <p className="font-display text-xl font-bold sm:text-2xl">Need it delivered to your plant?</p>
            <p className="mt-1 max-w-md text-sm text-white/80">{HCP_COMPANY.serviceRegions.description}</p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-navy hover:bg-brand-50"
            >
              Talk to our dispatch desk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
