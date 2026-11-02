import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { INDUSTRY_SECTORS } from '@/data/industries';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/button-styles';

export function IndustriesPreview() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries we serve"
          title="Trusted by formulators across sectors"
          description="Recommended raw materials and grade guidance for each industry we supply."
          action={
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
              View all industries <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRY_SECTORS.map((ind) => (
            <Link
              key={ind.id}
              href={`/industries#${ind.slug}`}
              className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ind.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="flex items-start justify-between gap-2 text-base font-bold leading-snug">
                  {ind.shortTitle}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h3>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-body">{ind.description}</p>
                <p className="mt-3 text-xs font-semibold text-leaf-dark">
                  {ind.recommendedProductSlugs.length} recommended products
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/industries" className={buttonStyles('outline', 'md', 'w-full sm:w-auto')}>
            View all industries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
