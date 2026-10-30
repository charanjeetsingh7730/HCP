import React from 'react';
import Link from 'next/link';
import { MANUFACTURERS } from '@/data/manufacturers';

/** Text-only manufacturer strip — brand names identify product sources; logos are not reproduced. */
export function ManufacturerStrip() {
  return (
    <section className="border-y border-line bg-white py-8" aria-label="Manufacturer sources">
      <div className="container-x flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
        <p className="shrink-0 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted lg:text-left">
          Sourced from established
          <br className="hidden lg:block" /> manufacturers
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start">
          {MANUFACTURERS.map((m) => (
            <li key={m.id}>
              <Link
                href={`/manufacturers/${m.slug}`}
                className="font-display text-base font-bold text-navy/45 transition-colors hover:text-brand"
              >
                {m.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
