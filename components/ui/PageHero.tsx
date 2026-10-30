import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs: Crumb[];
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

/** Shared inner-page header: navy band with hexagon texture, breadcrumb and optional photo. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  imageAlt = '',
  actions,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/60" />
        </>
      )}
      <div className="bg-hex-light absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-light/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-leaf/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-x py-12 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
            {breadcrumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" aria-hidden="true" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow eyebrow-light">{eyebrow}</span>}
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{description}</p>}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
