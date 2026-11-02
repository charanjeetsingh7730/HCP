'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { Search, ArrowRight, CornerDownLeft, X } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { searchProducts, displayGrade, displayMakes } from '@/lib/products';
import { ProductImage } from '@/components/products/ProductImage';

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => (query.trim() ? searchProducts(query) : PRODUCTS).slice(0, 8), [query]);

  useEffect(() => setActive(0), [query]);

  // Global Ctrl/Cmd + K shortcut and Escape listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === 'Escape' && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) setQuery('');
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (slug: string) => {
    onOpenChange(false);
    router.push(`/products/${slug}`);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onOpenChange(false);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) go(results[active].slug);
      else if (query.trim()) {
        onOpenChange(false);
        router.push(`/products?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search products">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-modal"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 shrink-0 text-brand" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search by product, grade, manufacturer or use…"
                autoFocus
                aria-label="Search products"
                className="h-16 w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={() => (query ? setQuery('') : onOpenChange(false))}
                className="rounded-lg p-1.5 text-muted hover:bg-mist hover:text-ink"
                aria-label={query ? 'Clear search' : 'Close search'}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
              {results.length > 0 ? (
                results.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    data-index={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(p.slug)}
                    className={clsx(
                      'flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors',
                      i === active ? 'bg-brand-50' : 'hover:bg-mist'
                    )}
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line">
                      <ProductImage product={p} size="thumb" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-ink">{p.name}</span>
                      <span className="block truncate text-xs text-muted">
                        {displayGrade(p)} · {displayMakes(p)}
                      </span>
                    </span>
                    <ArrowRight className={clsx('h-4 w-4 shrink-0 text-brand transition-opacity', i === active ? 'opacity-100' : 'opacity-0')} />
                  </button>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm font-semibold text-ink">No products match “{query}”</p>
                  <p className="mt-1 text-sm text-muted">We source beyond our catalogue — describe your requirement in an enquiry.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line bg-mist px-5 py-2.5 text-[11px] text-muted">
              <span>↑ ↓ to navigate · Esc to close</span>
              <span className="inline-flex items-center gap-1">
                <CornerDownLeft className="h-3 w-3" /> to open
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
