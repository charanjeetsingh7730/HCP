import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, FlaskConical, Sparkles, HeartHandshake, Droplets, Layers, ArrowUpRight, ArrowRight } from 'lucide-react';
import { PRODUCT_CATEGORIES, ProductCategory } from '@/data/categories';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MoleculeDecor } from '@/components/ui/MoleculeDecor';
import { Reveal, Stagger, StaggerItem } from '@/components/ui/Reveal';

export const categoryIconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  FlaskConical,
  Sparkles,
  HeartHandshake,
  Droplets,
  Layers,
};

export function CategoryCard({ category, large }: { category: ProductCategory; large?: boolean }) {
  const Icon = categoryIconMap[category.iconName] || FlaskConical;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-3xl bg-navy-900 text-white shadow-card transition-shadow hover:shadow-lift sm:min-h-[320px]"
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/20" />

      <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
        <Icon className="h-5 w-5" />
      </div>
      <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy shadow-soft">
        {category.catalogCount} Products
      </span>

      <div className="relative p-6">
        <h3 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">{category.shortName}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">{category.description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light transition-colors group-hover:text-white">
          Explore Range <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function CategoryGrid() {
  return (
    <section className="section relative isolate overflow-hidden bg-white">
      <div className="bg-dots mask-radial absolute inset-x-0 top-0 -z-10 h-[28rem] opacity-70" aria-hidden="true" />
      <div className="animate-aurora absolute -right-40 top-10 -z-10 h-80 w-80 rounded-full bg-brand-light/10 blur-3xl" aria-hidden="true" />
      <MoleculeDecor className="absolute -right-8 top-8 -z-10 hidden h-44 w-44 animate-[spin_120s_linear_infinite] md:block" />
      <div className="container-x">
        <Reveal>
        <SectionHeading
          eyebrow="Product Categories"
          title="Raw Materials for Every Formulation"
          description="From pharmacopoeial excipients and iodine compounds to surfactants and bulk alkalis — grouped the way procurement teams buy."
          action={
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_CATEGORIES.map((cat, i) => (
            <StaggerItem key={cat.id} className={i === 0 || i === 3 ? 'lg:col-span-2' : ''}>
              <CategoryCard category={cat} large={i === 0 || i === 3} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
