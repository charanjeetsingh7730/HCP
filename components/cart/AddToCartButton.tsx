'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { ProductRecord } from '@/data/products';
import { QuantityUnit } from '@/lib/schemas';
import { useCart } from './CartContext';
import { useToast } from '@/components/ui/Toast';
import { buttonStyles, ButtonSize } from '@/components/ui/button-styles';

interface AddToCartButtonProps {
  product: ProductRecord;
  size?: ButtonSize;
  quantity?: string;
  unit?: QuantityUnit;
  className?: string;
  compact?: boolean;
}

/** "Add to Cart" until the product is in the cart, then becomes a "View Cart" link. */
export function AddToCartButton({ product, size = 'sm', quantity, unit, className, compact }: AddToCartButtonProps) {
  const { addItem, hasItem, ready } = useCart();
  const { success } = useToast();
  const inCart = ready && hasItem(product.id);

  if (inCart) {
    return (
      <Link
        href="/cart"
        className={buttonStyles('success', size, className)}
        aria-label={`${product.name} is in your cart — view cart`}
      >
        <ShoppingCart className="h-4 w-4" />
        View Cart
        {!compact && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, { quantity, unit });
        success('Added to cart', product.name, { label: 'View cart & send enquiry', href: '/cart' });
      }}
      className={buttonStyles('primary', size, clsx(className))}
      aria-label={`Add ${product.name} to cart`}
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </button>
  );
}
