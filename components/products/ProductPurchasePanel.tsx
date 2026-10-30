'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Send, ShoppingCart, Check } from 'lucide-react';
import { ProductRecord } from '@/data/products';
import { QUANTITY_UNITS, QuantityUnit } from '@/lib/schemas';
import { defaultUnitFor, useCart } from '@/components/cart/CartContext';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { buttonStyles } from '@/components/ui/button-styles';

/** Quantity + unit picker with Add to Cart / View Cart and a direct "Enquire now" path. */
export function ProductPurchasePanel({ product }: { product: ProductRecord }) {
  const router = useRouter();
  const { addItem, hasItem, items, updateItem, ready } = useCart();
  const inCart = ready && hasItem(product.id);
  const cartItem = items.find((i) => i.productId === product.id);

  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState<QuantityUnit>(defaultUnitFor(product));

  const qty = inCart && cartItem ? cartItem.quantity : quantity;
  const u = inCart && cartItem ? cartItem.unit : unit;

  const setQty = (v: string) => (inCart ? updateItem(product.id, { quantity: v }) : setQuantity(v));
  const setU = (v: QuantityUnit) => (inCart ? updateItem(product.id, { unit: v }) : setUnit(v));

  const enquireNow = () => {
    if (!inCart) addItem(product, { quantity, unit });
    router.push('/request-quote');
  };

  return (
    <div className="rounded-2xl border border-line bg-mist p-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="label">Quantity</span>
          <input
            type="text"
            inputMode="decimal"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="field bg-white"
          />
        </label>
        <label className="block">
          <span className="label">Unit</span>
          <select value={u} onChange={(e) => setU(e.target.value as QuantityUnit)} className="field cursor-pointer bg-white">
            {QUANTITY_UNITS.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <AddToCartButton product={product} size="lg" quantity={quantity} unit={unit} className="w-full" />
        <button type="button" onClick={enquireNow} className={buttonStyles('secondary', 'lg', 'w-full')}>
          <Send className="h-4 w-4" /> Enquire Now
        </button>
      </div>

      {inCart ? (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-leaf-dark">
          <Check className="h-4 w-4" /> In your cart — quantity changes are saved automatically.{' '}
          <Link href="/cart" className="underline">
            Go to cart
          </Link>
        </p>
      ) : (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
          <ShoppingCart className="h-3.5 w-3.5" /> Add several products, then send one enquiry. No payment online.
        </p>
      )}
    </div>
  );
}
