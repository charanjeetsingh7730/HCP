import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { INDUSTRY_SECTORS } from '@/data/industries';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { buttonStyles } from '@/components/ui/button-styles';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';

export function IndustriesPreview() {
  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <div className="bg-dots mask-radial absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="animate-aurora absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-leaf/10 blur-3xl" aria-hidden="true" />
      <div className="container-x">
        <Reveal>
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Trusted by Formulators Across Sectors"
          description="Recommended raw materials and grade guidance for each industry we supply."
          action={
            <Link href="/industries" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
              View All Industries <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRY_SECTORS.map((ind) => (
            <StaggerItem key={ind.id} className="flex">
            <Link
              href={`/industries#${ind.slug}`}
              className="group card w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
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
                  {ind.recommendedProductSlugs.length} Recommended Products
                </p>
              </div>
            </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/industries" className={buttonStyles('outline', 'md', 'w-full sm:w-auto')}>
            View All Industries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
