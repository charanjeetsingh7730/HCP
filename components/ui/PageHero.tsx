import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { HeroBackground } from '@/components/ui/HeroBackground';

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

/**
 * Shared inner-page header. Uses the same light brand mesh, hexagon texture and cursor spotlight as
 * the home hero so every page feels like one system. An optional photo sits in the home page's
 * arch (flask) frame on large screens; on mobile it is hidden so the content starts sooner.
 */
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
    <section className="relative isolate overflow-hidden border-b border-brand-100 bg-brand-50">
      <HeroBackground variant="compact" />

      <div
        className={`container-x grid items-center gap-10 py-10 sm:py-14 lg:py-16 ${image ? 'lg:grid-cols-12 lg:gap-8' : ''}`}
      >
        <div className={`animate-fade-up ${image ? 'lg:col-span-7 xl:col-span-8' : 'max-w-3xl'}`}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded-full border border-brand/10 bg-white/70 px-3.5 py-1.5 text-xs text-muted shadow-soft backdrop-blur">
              {breadcrumbs.map((crumb, i) => (
                <li key={`${crumb.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted/60" aria-hidden="true" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-brand">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="truncate font-semibold text-navy">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] xl:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-body sm:text-lg">{description}</p>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
          {children}
        </div>

        {image && (
          <div className="relative hidden lg:col-span-5 lg:block xl:col-span-4">
            <div className="relative mx-auto w-full max-w-[17rem] xl:max-w-[18.5rem]">
              {/* Ripples behind the photo, like on the home hero */}
              <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                {[0, 1].map((r) => (
                  <span
                    key={r}
                    className="animate-ripple absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/20 motion-reduce:hidden"
                    style={{ animationDelay: `${r * -3.9}s` }}
                  />
                ))}
              </div>
              <div
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[2rem] border-2 border-dashed border-brand/30"
                aria-hidden="true"
              />
              <div className="absolute -inset-2 rounded-t-full rounded-b-[2.1rem] bg-brand-gradient opacity-20 blur-2xl" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] shadow-lift ring-8 ring-white">
                <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1280px) 18.5rem, 17rem" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
