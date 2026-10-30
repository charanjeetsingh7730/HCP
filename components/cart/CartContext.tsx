'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ProductRecord } from '@/data/products';
import { QuantityUnit } from '@/lib/schemas';
import { displayGrade, displayMakes } from '@/lib/products';

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  grade: string;
  preferredMake: string;
  image?: string;
  quantity: string;
  unit: QuantityUnit;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  ready: boolean;
  addItem: (product: ProductRecord, options?: { quantity?: string; unit?: QuantityUnit }) => void;
  updateItem: (productId: string, patch: Partial<Pick<CartItem, 'quantity' | 'unit' | 'grade'>>) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  hasItem: (productId: string) => boolean;
}

const STORAGE_KEY = 'hcp_enquiry_cart_v2';
const CartContext = createContext<CartContextType | undefined>(undefined);

/** Default unit based on the catalogue packaging (drums for liquids, bags for powders). */
export function defaultUnitFor(product: ProductRecord): QuantityUnit {
  const pack = (product.packagingType || '').toLowerCase();
  if (pack.includes('drum')) return 'Drums (210L / 250KG)';
  if (pack.includes('bag')) return 'Bags (25kg / 50kg)';
  return 'KG';
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [items, ready]);

  const addItem = useCallback<CartContextType['addItem']>((product, options) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === product.id)) return prev;
      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          grade: displayGrade(product),
          preferredMake: displayMakes(product),
          image: product.image,
          quantity: options?.quantity ?? '1',
          unit: options?.unit ?? defaultUnitFor(product),
        },
      ];
    });
  }, []);

  const updateItem = useCallback<CartContextType['updateItem']>((productId, patch) => {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, ...patch } : i)));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      count: items.length,
      ready,
      addItem,
      updateItem,
      removeItem,
      clearCart,
      hasItem: (id: string) => items.some((i) => i.productId === id),
    }),
    [items, ready, addItem, updateItem, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
