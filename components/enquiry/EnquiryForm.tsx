'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import {
  Plus,
  Trash2,
  AlertCircle,
  Building2,
  PackageCheck,
  Truck,
  Send,
  ShoppingCart,
  ChevronDown,
  Lock,
} from 'lucide-react';
import {
  BUYER_TYPES,
  CUSTOM_PRODUCT_ID,
  QUANTITY_UNITS,
  QuotationFormData,
  QuotationFormSchema,
  QuoteItem,
} from '@/lib/schemas';
import { PRODUCTS, ProductRecord } from '@/data/products';
import { displayGrade, displayMakes, getProductBySlug } from '@/lib/products';
import { ProductImage } from '@/components/products/ProductImage';
import { CartItem, defaultUnitFor, useCart } from '@/components/cart/CartContext';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { HCP_COMPANY } from '@/data/company';

function itemFromProduct(p: ProductRecord): QuoteItem {
  return {
    productId: p.id,
    productName: p.name,
    grade: displayGrade(p),
    quantity: '1',
    unit: defaultUnitFor(p),
    preferredMake: displayMakes(p),
    intendedApplication: '',
  };
}

function itemFromCart(c: CartItem): QuoteItem {
  return {
    productId: c.productId,
    productName: c.name,
    grade: c.grade,
    quantity: c.quantity || '1',
    unit: c.unit,
    preferredMake: c.preferredMake,
    intendedApplication: '',
  };
}

const EMPTY_CUSTOM: QuoteItem = {
  productId: CUSTOM_PRODUCT_ID,
  productName: '',
  grade: 'Not sure',
  quantity: '',
  unit: 'KG',
  preferredMake: '',
  intendedApplication: '',
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

function SectionTitle({ icon: Icon, step, title, text }: { icon: React.ElementType; step: number; title: string; text: string }) {
  return (
    <div className="mb-6 flex items-start gap-4 border-b border-line pb-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Section {step}</p>
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-0.5 text-sm text-body">{text}</p>
      </div>
    </div>
  );
}

export function EnquiryForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { items: cartItems, ready, addItem, removeItem, updateItem, clearCart } = useCart();
  const { success, error: toastError } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const initialised = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);

  // Bring the failure message into view (the submit button may be far below it, e.g. on mobile)
  useEffect(() => {
    if (submitError) errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [submitError]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<QuotationFormData>({
    resolver: zodResolver(QuotationFormSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      businessEmail: '',
      phoneNumber: '',
      city: '',
      country: 'India',
      buyerType: 'Pharmaceutical Formulator',
      items: [],
      packagingPreference: '',
      deliveryLocation: '',
      requiresCOA: true,
      additionalNotes: '',
      consentPrivacy: true,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  // Rows added on this page get a product picker; rows that came from the cart do not.
  const [pickerRows, setPickerRows] = useState<Set<string>>(new Set());
  const pendingPicker = useRef(false);
  useEffect(() => {
    if (!pendingPicker.current || !fields.length) return;
    pendingPicker.current = false;
    const last = fields[fields.length - 1].id;
    setPickerRows((prev) => new Set(prev).add(last));
  }, [fields]);

  // Keep quantity, unit and grade edits in sync with the cart, so "Back to cart" keeps them
  useEffect(() => {
    const sub = watch((value, { name }) => {
      const m = name?.match(/^items\.(\d+)\.(quantity|unit|grade)$/);
      if (!m) return;
      const item = value.items?.[Number(m[1])];
      if (!item?.productId || item.productId === CUSTOM_PRODUCT_ID) return;
      const key = m[2] as 'quantity' | 'unit' | 'grade';
      updateItem(item.productId, { [key]: item[key] });
    });
    return () => sub.unsubscribe();
  }, [watch, updateItem]);

  // Seed the form once from the cart and any ?product= / ?coa= / ?industry= link parameters.
  useEffect(() => {
    if (!ready || initialised.current) return;
    initialised.current = true;

    const seeded: QuoteItem[] = cartItems.map(itemFromCart);
    const linked = params.get('product') ? getProductBySlug(params.get('product')!) : undefined;
    if (linked && !seeded.some((i) => i.productId === linked.id)) {
      seeded.push(itemFromProduct(linked));
      addItem(linked);
    }

    const industry = params.get('industry');
    reset({
      ...getValues(),
      items: seeded.length ? seeded : [EMPTY_CUSTOM],
      requiresCOA: params.get('coa') === '1' ? true : getValues('requiresCOA'),
      additionalNotes: industry ? `Industry: ${industry}\n` : getValues('additionalNotes'),
    });
  }, [ready, cartItems, params, addItem, reset, getValues]);

  const onProductChange = (index: number, productId: string) => {
    const previous = getValues(`items.${index}.productId`);
    if (productId === CUSTOM_PRODUCT_ID) {
      setValue(`items.${index}`, { ...EMPTY_CUSTOM, quantity: getValues(`items.${index}.quantity`) });
    } else {
      const p = PRODUCTS.find((x) => x.id === productId);
      if (p) {
        setValue(`items.${index}`, {
          ...itemFromProduct(p),
          quantity: getValues(`items.${index}.quantity`) || '1',
        });
        addItem(p);
      }
    }
    if (previous && previous !== CUSTOM_PRODUCT_ID && previous !== productId) removeItem(previous);
  };

  const onRemove = (index: number) => {
    const id = getValues(`items.${index}.productId`);
    if (id && id !== CUSTOM_PRODUCT_ID) removeItem(id);
    remove(index);
  };

  const onSubmit = async (data: QuotationFormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || 'Could not send your enquiry.');

      clearCart();
      success('Enquiry sent', `Reference ${json.referenceId}`);
      // Keep personal details out of the URL (history, logs, analytics): hand them over in sessionStorage
      try {
        sessionStorage.setItem(
          'hcp_last_enquiry',
          JSON.stringify({
            ref: json.referenceId,
            name: data.fullName,
            // Only promise a copy by email when the server actually emailed the enquiry
            email: json.emailed ? data.businessEmail : null,
          })
        );
      } catch {
        // storage unavailable: the thank-you page falls back to a generic message
      }
      const qs = new URLSearchParams({ ref: json.referenceId, count: String(data.items.length) });
      router.push(`/thank-you?${qs.toString()}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error. Please try again.';
      setSubmitError(msg);
      toastError('Enquiry not sent', msg);
    }
  };

  const itemsWatch = watch('items');
  const usedIds = new Set(itemsWatch?.map((i) => i.productId));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="min-w-0 space-y-6 lg:col-span-8">
        {submitError && (
          <div ref={errorRef} role="alert" className="flex scroll-mt-28 items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold">Your enquiry was not sent</p>
              <p className="mt-0.5">
                {submitError} You can also reach us at{' '}
                <a className="font-semibold underline" href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`}>
                  {HCP_COMPANY.contact.phoneDisplay[0]}
                </a>
                .
              </p>
            </div>
          </div>
        )}

        {/* 1. Products */}
        <section className="card p-5 sm:p-7">
          <SectionTitle
            icon={PackageCheck}
            step={1}
            title={`Products in this enquiry (${fields.length})`}
            text="Check the quantity, unit and grade for each product. Add anything else you need."
          />

          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {fields.map((field, index) => {
              const current = itemsWatch?.[index];
              const isCustom = current?.productId === CUSTOM_PRODUCT_ID;
              const product = PRODUCTS.find((p) => p.id === current?.productId);
              const itemErrors = errors.items?.[index];
              const showPicker = pickerRows.has(field.id) || !current?.productId;
              return (
                <div key={field.id} className="p-4 transition-colors hover:bg-mist/40 sm:p-5">
                  {/* Product row: thumbnail, name, make, remove */}
                  <div className="flex items-start gap-3.5">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-white shadow-soft sm:h-16 sm:w-16">
                      {product ? (
                        <ProductImage product={product} size="thumb" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-mist">
                          <PackageCheck className="h-6 w-6 text-brand/60" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                            Product {index + 1}
                            {product?.catalogNumber && (
                              <span className="font-medium normal-case tracking-normal"> · Cat #{product.catalogNumber}</span>
                            )}
                          </p>
                          <h3 className="truncate font-display text-base font-bold text-ink">
                            {product
                              ? product.name
                              : isCustom
                                ? current?.productName || 'Product not in catalogue'
                                : 'Choose a product'}
                          </h3>
                          {product && (
                            <p className="mt-0.5 truncate text-xs text-muted">
                              Make: <span className="font-medium text-body">{displayMakes(product)}</span>
                              {product.packagingType && <span> · {product.packagingType}</span>}
                            </p>
                          )}
                        </div>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label={`Remove ${current?.productName || `product ${index + 1}`}`}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 sm:pl-[5.125rem]">
                    {/* Product picker only for rows added on this page (cart items are already chosen) */}
                    {showPicker && (
                      <div>
                        <label className="label" htmlFor={`item-${index}-product`}>
                          Product *
                        </label>
                        <select
                          id={`item-${index}-product`}
                          value={current?.productId ?? ''}
                          onChange={(e) => onProductChange(index, e.target.value)}
                          className={clsx('field cursor-pointer', itemErrors?.productId && 'field-error')}
                        >
                          <option value="" disabled>
                            Choose a product…
                          </option>
                          {PRODUCTS.map((p) => (
                            <option key={p.id} value={p.id} disabled={usedIds.has(p.id) && current?.productId !== p.id}>
                              {p.name} — {displayGrade(p)} ({displayMakes(p)})
                            </option>
                          ))}
                          <option value={CUSTOM_PRODUCT_ID}>+ Other product (not in catalogue)</option>
                        </select>
                        <FieldError message={itemErrors?.productId?.message} />
                      </div>
                    )}

                    {isCustom && (
                      <div>
                        <label className="label" htmlFor={`item-${index}-name`}>
                          Product name *
                        </label>
                        <input
                          id={`item-${index}-name`}
                          {...register(`items.${index}.productName`)}
                          placeholder="Name of the chemical / raw material"
                          className={clsx('field', itemErrors?.productName && 'field-error')}
                        />
                        <FieldError message={itemErrors?.productName?.message} />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 [&>*]:min-w-0">
                      <div>
                        <label className="label" htmlFor={`item-${index}-qty`}>
                          Quantity *
                        </label>
                        <input
                          id={`item-${index}-qty`}
                          inputMode="decimal"
                          {...register(`items.${index}.quantity`)}
                          placeholder="e.g. 500"
                          className={clsx('field font-semibold text-navy', itemErrors?.quantity && 'field-error')}
                        />
                        <FieldError message={itemErrors?.quantity?.message} />
                      </div>
                      <div>
                        <label className="label" htmlFor={`item-${index}-unit`}>
                          Unit *
                        </label>
                        <select id={`item-${index}-unit`} {...register(`items.${index}.unit`)} className="field cursor-pointer">
                          {QUANTITY_UNITS.map((u) => (
                            <option key={u} value={u}>
                              {u}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="label" htmlFor={`item-${index}-grade`}>
                          Grade *
                        </label>
                        <input
                          id={`item-${index}-grade`}
                          {...register(`items.${index}.grade`)}
                          placeholder="IP / BP / USP / Technical"
                          className={clsx('field', itemErrors?.grade && 'field-error')}
                        />
                        <FieldError message={itemErrors?.grade?.message} />
                      </div>
                    </div>

                    {/* Optional details stay folded away to keep the form short */}
                    <details className="group/opt">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark [&::-webkit-details-marker]:hidden">
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open/opt:rotate-180" />
                        Preferred make &amp; end use (optional)
                      </summary>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                          <label className="label" htmlFor={`item-${index}-make`}>
                            Preferred manufacturer / make
                          </label>
                          <input
                            id={`item-${index}-make`}
                            {...register(`items.${index}.preferredMake`)}
                            placeholder="e.g. Godrej, Savita, Indo Borex"
                            className="field"
                          />
                        </div>
                        <div>
                          <label className="label" htmlFor={`item-${index}-use`}>
                            End application / intended use
                          </label>
                          <input
                            id={`item-${index}-use`}
                            {...register(`items.${index}.intendedApplication`)}
                            placeholder="e.g. ointment base, hand wash"
                            className="field"
                          />
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              );
            })}
          </div>

          {errors.items?.message && <FieldError message={errors.items.message} />}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                // Add an empty row with a product picker, so the buyer chooses what to add
                pendingPicker.current = true;
                append({ ...EMPTY_CUSTOM, productId: '', productName: '', grade: '', quantity: '1' });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-dashed border-brand/40 px-4 py-2.5 text-sm font-semibold text-brand hover:border-brand hover:bg-brand-50"
            >
              <Plus className="h-4 w-4" /> Add another product
            </button>
            <button
              type="button"
              onClick={() => append(EMPTY_CUSTOM)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-body hover:bg-mist"
            >
              <Plus className="h-4 w-4" /> Product not in catalogue
            </button>
          </div>
        </section>

        {/* 2. Contact */}
        <section className="card p-5 sm:p-7">
          <SectionTitle icon={Building2} step={2} title="Your details" text="We will send the quotation to these contact details." />
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="fullName">
                Full name *
              </label>
              <input id="fullName" autoComplete="name" {...register('fullName')} className={clsx('field', errors.fullName && 'field-error')} />
              <FieldError message={errors.fullName?.message} />
            </div>
            <div>
              <label className="label" htmlFor="companyName">
                Company name *
              </label>
              <input
                id="companyName"
                autoComplete="organization"
                {...register('companyName')}
                className={clsx('field', errors.companyName && 'field-error')}
              />
              <FieldError message={errors.companyName?.message} />
            </div>
            <div>
              <label className="label" htmlFor="businessEmail">
                Email *
              </label>
              <input
                id="businessEmail"
                type="email"
                autoComplete="email"
                {...register('businessEmail')}
                className={clsx('field', errors.businessEmail && 'field-error')}
              />
              <FieldError message={errors.businessEmail?.message} />
            </div>
            <div>
              <label className="label" htmlFor="phoneNumber">
                Phone / WhatsApp *
              </label>
              <input
                id="phoneNumber"
                type="tel"
                autoComplete="tel"
                {...register('phoneNumber')}
                placeholder="+91"
                className={clsx('field', errors.phoneNumber && 'field-error')}
              />
              <FieldError message={errors.phoneNumber?.message} />
            </div>
            <div>
              <label className="label" htmlFor="city">
                City *
              </label>
              <input id="city" autoComplete="address-level2" {...register('city')} className={clsx('field', errors.city && 'field-error')} />
              <FieldError message={errors.city?.message} />
            </div>
            <div>
              <label className="label" htmlFor="buyerType">
                Business type *
              </label>
              <select id="buyerType" {...register('buyerType')} className="field cursor-pointer">
                {BUYER_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* 3. Delivery */}
        <section className="card p-5 sm:p-7">
          <SectionTitle icon={Truck} step={3} title="Delivery & documents" text="Tell us where to deliver and what documentation you need." />
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="deliveryLocation">
                Delivery location *
              </label>
              <input
                id="deliveryLocation"
                {...register('deliveryLocation')}
                placeholder="e.g. Baddi, Himachal Pradesh"
                className={clsx('field', errors.deliveryLocation && 'field-error')}
              />
              <FieldError message={errors.deliveryLocation?.message} />
            </div>
            <div>
              <label className="label" htmlFor="packagingPreference">
                Packaging preference
              </label>
              <input
                id="packagingPreference"
                {...register('packagingPreference')}
                placeholder="e.g. 50 kg bags, 250 kg drums"
                className="field"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="additionalNotes">
                Additional requirements
              </label>
              <textarea
                id="additionalNotes"
                rows={4}
                {...register('additionalNotes')}
                placeholder="Specifications, delivery schedule, tender reference…"
                className="field"
              />
            </div>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-leaf-50/60 p-4 sm:col-span-2">
              <input type="checkbox" {...register('requiresCOA')} className="mt-0.5 h-4 w-4 accent-[#23874A]" />
              <span className="text-sm text-ink">
                <strong>Send Certificate of Analysis (COA)</strong>
                <span className="block text-body">Include the manufacturer&apos;s batch test report with the quotation.</span>
              </span>
            </label>
            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" {...register('consentPrivacy')} className="mt-0.5 h-4 w-4 accent-[#0474C2]" />
                <span className="text-xs leading-relaxed text-body">
                  I agree that HCP may use these details to respond to my enquiry, as described in the{' '}
                  <Link href="/privacy" className="font-semibold text-brand underline">
                    privacy policy
                  </Link>
                  . Grade, availability and price are confirmed in the formal quotation.
                </span>
              </label>
              <FieldError message={errors.consentPrivacy?.message} />
            </div>
          </div>
        </section>
      </div>

      {/* Summary */}
      <aside className="min-w-0 lg:col-span-4">
        <div className="card sticky top-28 overflow-hidden">
          <div className="bg-brand-gradient p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Enquiry summary</p>
            <p className="mt-1 font-display text-2xl font-bold">
              {fields.length} {fields.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          <ul className="max-h-72 divide-y divide-line overflow-y-auto px-6">
            {itemsWatch?.map((it, i) => {
              const prod = PRODUCTS.find((p) => p.id === it.productId);
              return (
                <li key={fields[i]?.id ?? i} className="flex items-center gap-3 py-3 text-sm">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-line bg-white shadow-soft">
                    {prod ? (
                      <ProductImage product={prod} size="thumb" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-mist text-brand">
                        <PackageCheck className="h-5 w-5 text-brand/60" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{it.productName || 'Unnamed product'}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      <span className="font-medium text-body">{it.quantity || '—'} {it.unit}</span> · {it.grade}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line p-6">
            <Button type="submit" size="lg" isLoading={isSubmitting} rightIcon={<Send className="h-4 w-4" />} className="w-full">
              Send Enquiry
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
              <Lock className="h-3.5 w-3.5" /> No payment required · emailed to our sales desk
            </p>
            <Link
              href="/cart"
              className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
            >
              <ShoppingCart className="h-4 w-4" /> Back to cart
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Need help? Call{' '}
          <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className="font-semibold text-ink">
            {HCP_COMPANY.contact.phoneDisplay[0]}
          </a>
        </p>
      </aside>
    </form>
  );
}
