'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileCheck2,
  PhoneCall,
  Info,
  PackageSearch,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { HCP_COMPANY } from '@/data/company';
import { getRelatedProducts } from '@/lib/products';
import { QUANTITY_UNITS } from '@/lib/schemas';
import { buttonStyles } from '@/components/ui/button-styles';
import { ProductImage } from '@/components/products/ProductImage';
import { ProductCard } from '@/components/products/ProductCard';
import { useCart } from './CartContext';
import { EnquirySteps } from './EnquirySteps';
import { HeroBackground } from '@/components/ui/HeroBackground';

export function CartView() {
  const { items, ready, updateItem, removeItem, clearCart } = useCart();

  const suggestions = useMemo(() => {
    if (!items.length) return [];
    const inCart = new Set(items.map((i) => i.productId));
    const first = PRODUCTS.find((p) => p.id === items[0].productId);
    if (!first) return [];
    return getRelatedProducts(first, 12)
      .filter((p) => !inCart.has(p.id))
      .slice(0, 4);
  }, [items]);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-brand-100 bg-brand-50">
        <HeroBackground variant="compact" />
        <div className="container-x flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">Step 1 of 3</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">Your Enquiry Cart</h1>
            <p className="mt-2 max-w-xl text-body">
              Review products and quantities. There is no online payment — HCP will reply with price, availability and COA.
            </p>
          </div>
          <EnquirySteps current={1} />
        </div>
      </section>

      <section className="bg-mist pb-28 pt-10 sm:pt-14 lg:pb-14">
        <div className="container-x">
          {!ready ? (
            <div className="card h-64 animate-pulse" />
          ) : items.length === 0 ? (
            <div className="card mx-auto max-w-2xl px-6 py-14 text-center sm:px-12">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                <ShoppingCart className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-2xl font-bold">Your cart is empty</h2>
              <p className="mx-auto mt-2 max-w-md text-body">
                Add the raw materials you need from our catalogue, then send one enquiry for all of them.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/products" className={buttonStyles('primary', 'lg')}>
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/request-quote" className={buttonStyles('outline', 'lg')}>
                  Describe a Custom Requirement
                </Link>
              </div>
              <div className="mt-10 border-t border-line pt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Popular categories</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {PRODUCT_CATEGORIES.map((c) => (
                    <Link key={c.id} href={`/categories/${c.slug}`} className="chip hover:border-brand hover:text-brand">
                      {c.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Items */}
              <div className="min-w-0 lg:col-span-8">
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
                    <h2 className="text-lg font-bold">
                      {items.length} {items.length === 1 ? 'product' : 'products'}
                    </h2>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" /> Clear cart
                    </button>
                  </div>

                  <ul className="divide-y divide-line">
                    {items.map((item) => {
                      const product = PRODUCTS.find((p) => p.id === item.productId);
                      return (
                        <li key={item.productId} className="flex gap-3.5 p-4 sm:gap-4 sm:p-6">
                          <Link
                            href={`/products/${item.slug}`}
                            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line sm:h-24 sm:w-28"
                            aria-label={`View details for ${item.name}`}
                          >
                            {product && <ProductImage product={product} size="thumb" />}
                          </Link>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <Link href={`/products/${item.slug}`} className="font-display text-base font-bold text-ink hover:text-brand">
                                  {item.name}
                                </Link>
                                <p className="mt-1 text-xs text-muted">
                                  Grade: <span className="font-medium text-body">{item.grade}</span> · Make:{' '}
                                  <span className="font-medium text-body">{item.preferredMake}</span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.productId)}
                                className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:max-w-md [&>*]:min-w-0">
                              <label className="block">
                                <span className="label">Quantity</span>
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  value={item.quantity}
                                  onChange={(e) => updateItem(item.productId, { quantity: e.target.value })}
                                  className="field h-10 py-2"
                                  aria-label={`Quantity for ${item.name}`}
                                />
                              </label>
                              <label className="block">
                                <span className="label">Unit</span>
                                <select
                                  value={item.unit}
                                  onChange={(e) =>
                                    updateItem(item.productId, { unit: e.target.value as (typeof QUANTITY_UNITS)[number] })
                                  }
                                  className="field h-10 cursor-pointer py-2"
                                  aria-label={`Unit for ${item.name}`}
                                >
                                  {QUANTITY_UNITS.map((u) => (
                                    <option key={u} value={u}>
                                      {u}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <Link href="/products" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark">
                  <ArrowLeft className="h-4 w-4" /> Continue adding products
                </Link>
              </div>

              {/* Summary */}
              <aside className="min-w-0 lg:col-span-4">
                <div className="card sticky top-28 p-6">
                  <h2 className="text-lg font-bold">Enquiry Summary</h2>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-body">Products</dt>
                      <dd className="font-semibold text-ink">{items.length}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-body">Price</dt>
                      <dd className="font-semibold text-leaf-dark">Quoted by HCP</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-body">Payment</dt>
                      <dd className="font-semibold text-ink">Not required now</dd>
                    </div>
                  </dl>

                  <Link href="/request-quote" className={buttonStyles('primary', 'lg', 'mt-6 w-full')}>
                    Proceed to Send Enquiry <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-xs leading-relaxed text-brand-dark">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    Next, share your contact and delivery details. Your enquiry with all {items.length}{' '}
                    {items.length === 1 ? 'product' : 'products'} is emailed to our sales desk.
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-line pt-5 text-sm text-body">
                    <li className="flex gap-2.5">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-leaf" /> Grade confirmed against IP / BP / USP
                    </li>
                    <li className="flex gap-2.5">
                      <FileCheck2 className="h-5 w-5 shrink-0 text-brand" /> Batch COA shared with the quotation
                    </li>
                    <li className="flex gap-2.5">
                      <PhoneCall className="h-5 w-5 shrink-0 text-brand" />
                      <span>
                        Prefer to call?{' '}
                        <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className="font-semibold text-ink hover:text-brand">
                          {HCP_COMPANY.contact.phoneDisplay[0]}
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="mt-16">
              <div className="mb-6 flex items-center gap-2">
                <PackageSearch className="h-5 w-5 text-brand" />
                <h2 className="text-xl font-bold">Frequently enquired together</h2>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {suggestions.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile: keep the next step in reach while scrolling a long cart */}
      {ready && items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 pr-16 shadow-[0_-8px_24px_rgba(1,23,51,0.08)] backdrop-blur-md [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
          <Link href="/request-quote" className={buttonStyles('primary', 'md', 'w-full')}>
            Proceed to Send Enquiry ({items.length}) <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </>
  );
}
