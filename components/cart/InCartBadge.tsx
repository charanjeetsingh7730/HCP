'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { useCart } from './CartContext';

/** Small "In cart" tick shown on product cards once the product has been added. */
export function InCartBadge({ productId, className }: { productId: string; className?: string }) {
  const { hasItem, ready } = useCart();
  if (!ready || !hasItem(productId)) return null;
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full bg-leaf px-2 py-0.5 text-[11px] font-semibold text-white shadow-soft',
        className
      )}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
      In cart
    </span>
  );
}
