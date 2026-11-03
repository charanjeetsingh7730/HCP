import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Factory } from 'lucide-react';
import { clsx } from 'clsx';
import { ProductRecord } from '@/data/products';
import { displayGrade, displayMakes, isPharmaGrade } from '@/lib/products';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { ProductImage } from './ProductImage';

export interface ProductCardProps {
  product: ProductRecord;
  viewMode?: 'grid' | 'list';
}

export function GradeBadge({ product, className }: { product: ProductRecord; className?: string }) {
  const pharma = isPharmaGrade(product);
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
        pharma ? 'bg-leaf-50 text-leaf-dark ring-1 ring-leaf/20' : 'bg-brand-50 text-brand-dark ring-1 ring-brand/15',
        className
      )}
    >
      {displayGrade(product)}
    </span>
  );
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const href = `/products/${product.slug}`;

  if (viewMode === 'list') {
    return (
      <div className="group card flex flex-col gap-4 p-3 transition-all duration-300 hover:border-brand-200 hover:shadow-card sm:flex-row sm:items-center sm:p-4">
        <Link href={href} className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32" aria-label={`View details for ${product.name}`}>
          <ProductImage product={product} size="thumb" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <GradeBadge product={product} />
            <span className="text-[11px] font-medium text-muted">#{product.catalogNumber}</span>
          </div>
          <Link href={href}>
            <h3 className="truncate text-base font-bold text-ink transition-colors group-hover:text-brand">{product.name}</h3>
          </Link>
          <p className="mt-1 line-clamp-1 text-sm text-body">{product.commonUses.slice(0, 3).join(' · ')}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
            <Factory className="h-3.5 w-3.5 text-brand-light" />
            {displayMakes(product)}
          </p>
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
          <AddToCartButton product={product} compact />
          <Link href={href} className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-brand">
            View details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="group card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden border-b border-line/60 bg-slate-50/30" aria-label={`View details for ${product.name}`}>
        <ProductImage product={product} />
        <span className="absolute left-3 top-3 z-10 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-navy shadow-soft ring-1 ring-black/5">
          #{product.catalogNumber}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5">
          <GradeBadge product={product} />
        </div>
        <Link href={href} className="focus-visible:outline-none">
          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{product.commonUses.join(', ')}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Factory className="h-3.5 w-3.5 shrink-0 text-brand-light" />
          <span className="truncate">{displayMakes(product)}</span>
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors hover:text-brand">
            Details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </article>
  );
}
