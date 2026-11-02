'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from './CartContext';

const HIDDEN_ON = ['/cart', '/request-quote', '/thank-you'];

/** Floating mini-cart shortcut shown while browsing once the cart has items. */
export function CartTray() {
  const pathname = usePathname();
  const { items, count, ready } = useCart();
  const visible = ready && count > 0 && !HIDDEN_ON.includes(pathname);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6"
        >
          <Link
            href="/cart"
            className="group flex items-center gap-3 rounded-2xl bg-navy-900 p-2.5 pr-4 text-white shadow-modal ring-1 ring-white/10 transition-colors hover:bg-navy-800"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1 text-[11px] font-bold ring-2 ring-navy-900">
                {count}
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">
                {count} {count === 1 ? 'product' : 'products'} in cart
              </span>
              <span className="block truncate text-xs text-white/70">
                {items.map((i) => i.name).join(', ')}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-light group-hover:text-white">
              View Cart <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
