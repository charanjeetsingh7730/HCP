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
      <div className="container-x grid items-stretch gap-10 lg:gap-12 lg:grid-cols-2">
        {/* Left Column: Network Hubs */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <SectionHeading
              className="!mb-6"
              eyebrow="Supply network"
              title="Close to North India's pharma and chemical belts"
              description="Our Panchkula base sits next to the formulation and processing clusters of Himachal Pradesh, Punjab, Haryana and Chandigarh."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {HUBS.map((hub, i) => (
                <li key={hub.name} className="card p-4 sm:p-4.5 flex flex-col justify-between">
                  <div>
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
                      <h3 className="text-sm font-bold text-ink">{hub.name}</h3>
                    </div>
                    <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-wider text-leaf-dark">{hub.role}</p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-body">{hub.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Warehouse Image Card — matching left height */}
        <div className="relative h-full min-h-[440px] sm:min-h-[500px] lg:min-h-full overflow-hidden rounded-3xl shadow-lift flex flex-col justify-end">
          <Image
            src="/assets/photos/warehouse.jpg"
            alt="Organised warehouse with palletised stock ready for dispatch"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/45 to-transparent" />
          <div className="relative z-10 p-6 sm:p-8 text-white">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm mb-3">
              <Warehouse className="h-3.5 w-3.5" /> Panchkula Dispatch Terminal
            </span>
            <p className="font-display text-xl sm:text-2xl font-bold">Need it delivered to your plant?</p>
            <p className="mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-white/85">{HCP_COMPANY.serviceRegions.description}</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-navy transition-colors hover:bg-brand-50"
            >
              Talk to our dispatch desk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
