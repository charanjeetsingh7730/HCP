import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { ProductRecord } from '@/data/products';
import { getFormula } from '@/lib/products';

interface ProductImageProps {
  product: ProductRecord;
  size?: 'thumb' | 'card' | 'detail';
  priority?: boolean;
  className?: string;
}

export function ProductImage({ product, size = 'card', priority, className }: ProductImageProps) {
  const sizes =
    size === 'detail'
      ? '(min-width: 1024px) 45vw, 100vw'
      : size === 'thumb'
      ? '96px'
      : '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw';

  if (!product.image) {
    const formula = getFormula(product);
    return (
      <div
        className={clsx(
          'relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-brand-50/60 via-white to-leaf-50/60 text-center select-none',
          className
        )}
        role="img"
        aria-label={`${product.name}${formula ? ` (${formula})` : ''}`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-line">
          <span className="font-display text-xl font-bold text-navy-800">
            {formula ? formula.slice(0, 4) : product.catalogNumber}
          </span>
        </div>
        <span className="mt-2.5 max-w-[85%] text-xs font-bold text-ink line-clamp-1">
          {product.name}
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
          {product.grade}
        </span>
      </div>
    );
  }

  // Consistent, clean studio presentation across ALL products with object-fit: contain
  // Prevents image clipping, blur, or awkward cropping.
  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-white',
        size === 'detail'
          ? 'p-6 sm:p-10 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40'
          : size === 'thumb'
          ? 'p-1.5 bg-slate-50/70'
          : 'p-4 sm:p-5 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30',
        className
      )}
    >
      <div className="relative h-full w-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-105">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain drop-shadow-[0_4px_12px_rgba(2,39,84,0.06)] select-none"
        />
      </div>
    </div>
  );
}
