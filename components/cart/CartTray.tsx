'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ArrowRight, X } from 'lucide-react';
import { useCart } from './CartContext';

const HIDDEN_ON = ['/cart', '/request-quote', '/thank-you'];

/** 
 * Compact, dismissible floating mini-cart shortcut.
 * Placed to the left of the Scroll-to-Top button on desktop, 
 * and above it on mobile, leaving the bottom-right corner dedicated to Scroll-to-Top.
 */
export function CartTray() {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [dismissed, setDismissed] = useState(false);
  const [prevCount, setPrevCount] = useState(count);

  // If user adds a new item to the cart, re-show the tray
  useEffect(() => {
    if (count > prevCount) {
      setDismissed(false);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  const visible = ready && count > 0 && !dismissed && !HIDDEN_ON.includes(pathname);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="fixed bottom-16 right-4 sm:bottom-6 sm:right-20 z-40 max-w-[calc(100vw-5rem)]"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-navy-950/95 py-1.5 pl-2 pr-1.5 text-white shadow-modal backdrop-blur-md ring-1 ring-black/20">
            {/* Clickable Cart Link */}
            <Link
              href="/cart"
              className="group flex items-center gap-2.5 min-w-0"
              aria-label={`View cart with ${count} items`}
            >
              {/* Icon & Count Pill */}
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white shadow-sm">
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-leaf px-1 text-[10px] font-bold text-white ring-2 ring-navy-950">
                  {count}
                </span>
              </span>

              {/* Compact Label */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-white whitespace-nowrap">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
                <span className="text-white/40">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-brand-light transition-colors group-hover:text-white whitespace-nowrap">
                  View <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            {/* Separator */}
            <span className="h-4 w-px bg-white/20" aria-hidden="true" />

            {/* Close / Dismiss Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDismissed(true);
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label="Dismiss cart popup"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
