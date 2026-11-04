import React from 'react';
import Link from 'next/link';
import { Eye, Factory } from 'lucide-react';
import { clsx } from 'clsx';
import { ProductRecord } from '@/data/products';
import { displayGrade, displayMakes, isPharmaGrade } from '@/lib/products';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { InCartBadge } from '@/components/cart/InCartBadge';
import { buttonStyles } from '@/components/ui/button-styles';
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

/**
 * Product card. The whole card opens the product page (stretched link on the title), while the
 * action buttons sit above that link so "View Details" and "Add to Cart / View Cart" stay clickable.
 */
export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const href = `/products/${product.slug}`;

  if (viewMode === 'list') {
    return (
      <div className="group card relative flex flex-col gap-4 p-3 transition-all duration-300 hover:border-brand-200 hover:shadow-card sm:flex-row sm:items-center sm:p-4">
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">
          <ProductImage product={product} size="thumb" />
          <InCartBadge productId={product.id} className="absolute right-2 top-2 z-10" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <GradeBadge product={product} />
            <span className="text-[11px] font-medium text-muted">#{product.catalogNumber}</span>
          </div>
          <h3 className="truncate text-base font-bold text-ink transition-colors group-hover:text-brand">
            <Link
              href={href}
              className="rounded after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-brand/20"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-body">{product.commonUses.slice(0, 3).join(' · ')}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
            <Factory className="h-3.5 w-3.5 text-brand-light" />
            {displayMakes(product)}
          </p>
        </div>
        <div className="relative z-10 grid shrink-0 grid-cols-2 gap-2 border-t border-line pt-3 sm:flex sm:flex-col sm:items-stretch sm:border-0 sm:pt-0">
          <Link href={href} className={buttonStyles('outline', 'sm', 'w-full')} aria-label={`View details for ${product.name}`}>
            <Eye className="h-4 w-4" />
            View Details
          </Link>
          <AddToCartButton product={product} compact className="w-full" />
        </div>
      </div>
    );
  }

  return (
    <article className="group card relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
      <div className="relative block aspect-[4/3] overflow-hidden border-b border-line/60 bg-slate-50/30">
        <ProductImage product={product} />
        <span className="absolute left-3 top-3 z-10 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-navy shadow-soft ring-1 ring-black/5">
          #{product.catalogNumber}
        </span>
        <InCartBadge productId={product.id} className="absolute right-3 top-3 z-10" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5">
          <GradeBadge product={product} />
        </div>
        <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-brand/20"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{product.commonUses.join(', ')}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <Factory className="h-3.5 w-3.5 shrink-0 text-brand-light" />
          <span className="truncate">{displayMakes(product)}</span>
        </p>

        <div className="relative z-10 mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link href={href} className={buttonStyles('outline', 'sm', 'w-full px-2')} aria-label={`View details for ${product.name}`}>
            <Eye className="h-4 w-4 shrink-0" />
            View Details
          </Link>
          <AddToCartButton product={product} compact className="w-full px-2" />
        </div>
      </div>
    </article>
  );
}
