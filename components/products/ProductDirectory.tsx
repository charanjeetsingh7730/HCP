'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { Search, LayoutGrid, List, RotateCcw, SlidersHorizontal, X, FlaskConical } from 'lucide-react';
import { ProductRecord } from '@/data/products';
import { ProductCategory } from '@/data/categories';
import { Manufacturer } from '@/data/manufacturers';
import { searchProducts } from '@/lib/products';
import { ProductCard } from './ProductCard';
import { Tabs } from '@/components/ui/Tabs';
import { buttonStyles } from '@/components/ui/button-styles';

interface ProductDirectoryProps {
  initialProducts: ProductRecord[];
  categories: ProductCategory[];
  manufacturers: Manufacturer[];
}

const GRADES = [
  { id: 'all', label: 'All grades' },
  { id: 'ip', label: 'IP — Indian Pharmacopoeia' },
  { id: 'bp', label: 'BP — British Pharmacopoeia' },
  { id: 'usp', label: 'USP — US Pharmacopeia' },
  { id: 'technical', label: 'Technical / Industrial' },
];

type SortKey = 'catalog' | 'name-asc' | 'name-desc';

function FilterPanel({
  grade,
  setGrade,
  make,
  setMake,
  manufacturers,
}: {
  grade: string;
  setGrade: (v: string) => void;
  make: string;
  setMake: (v: string) => void;
  manufacturers: Manufacturer[];
}) {
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="text-sm font-bold text-ink">Grade</legend>
        <div className="mt-3 space-y-1">
          {GRADES.map((g) => (
            <label
              key={g.id}
              className={clsx(
                'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                grade === g.id ? 'bg-brand-50 font-semibold text-brand-dark' : 'text-body hover:bg-mist'
              )}
            >
              <input
                type="radio"
                name="grade"
                value={g.id}
                checked={grade === g.id}
                onChange={() => setGrade(g.id)}
                className="h-4 w-4 accent-[#0474C2]"
              />
              {g.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="make-filter" className="text-sm font-bold text-ink">
          Manufacturer
        </label>
        <select id="make-filter" value={make} onChange={(e) => setMake(e.target.value)} className="field mt-3 cursor-pointer">
          <option value="all">All manufacturers</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name} ({m.productCount})
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl bg-brand-soft p-5">
        <FlaskConical className="h-6 w-6 text-brand" />
        <p className="mt-2 text-sm font-bold text-ink">Can&apos;t find a material?</p>
        <p className="mt-1 text-xs leading-relaxed text-body">We source beyond this list. Tell us what you need in an enquiry.</p>
        <Link href="/request-quote" className={buttonStyles('primary', 'sm', 'mt-4')}>
          Send custom enquiry
        </Link>
      </div>
    </div>
  );
}

function ProductDirectoryContent({ initialProducts, categories, manufacturers }: ProductDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [grade, setGrade] = useState(searchParams.get('grade') || 'all');
  const [make, setMake] = useState(searchParams.get('make') || 'all');
  const [sortBy, setSortBy] = useState<SortKey>('catalog');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Pick up searches started elsewhere (header search, hero) while already on this page.
  const urlQuery = searchParams.get('q') || '';
  const urlCategory = searchParams.get('category') || 'all';
  // Compare trimmed values so the URL sync never strips a space the user is still typing.
  useEffect(() => setQuery((prev) => (prev.trim() === urlQuery ? prev : urlQuery)), [urlQuery]);
  useEffect(() => setCategory(urlCategory), [urlCategory]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (category !== 'all') params.set('category', category);
    if (grade !== 'all') params.set('grade', grade);
    if (make !== 'all') params.set('make', make);
    const qs = params.toString();
    const next = qs ? `/products?${qs}` : '/products';
    if (next !== `${window.location.pathname}${window.location.search}`) router.replace(next, { scroll: false });
  }, [query, category, grade, make, router]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  const reset = () => {
    setQuery('');
    setCategory('all');
    setGrade('all');
    setMake('all');
    setSortBy('catalog');
  };

  const filtered = useMemo(() => searchProducts(query, category, grade, make, sortBy), [query, category, grade, make, sortBy]);

  const categoryTabs = useMemo(
    () => [
      { id: 'all', label: 'All', count: initialProducts.length },
      ...categories.map((c) => ({ id: c.id, label: c.shortName, count: c.catalogCount })),
    ],
    [initialProducts.length, categories]
  );

  const activeFilters = [
    query.trim() && { key: 'q', label: `“${query.trim()}”`, clear: () => setQuery('') },
    category !== 'all' && {
      key: 'category',
      label: categories.find((c) => c.id === category)?.shortName ?? category,
      clear: () => setCategory('all'),
    },
    grade !== 'all' && { key: 'grade', label: GRADES.find((g) => g.id === grade)?.label ?? grade, clear: () => setGrade('all') },
    make !== 'all' && { key: 'make', label: make, clear: () => setMake('all') },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <FilterPanel grade={grade} setGrade={setGrade} make={make} setMake={setMake} manufacturers={manufacturers} />
        </div>
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="card p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, alias, grade, manufacturer or use…"
                aria-label="Search products"
                className="field pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setDrawerOpen(true)} className={buttonStyles('outline', 'md', 'lg:hidden')}>
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                aria-label="Sort products"
                className="field h-11 w-auto cursor-pointer py-0"
              >
                <option value="catalog">Catalogue order</option>
                <option value="name-asc">Name A → Z</option>
                <option value="name-desc">Name Z → A</option>
              </select>
              <div className="hidden items-center rounded-xl border border-line p-1 sm:flex">
                {(['grid', 'list'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    aria-label={mode === 'grid' ? 'Grid view' : 'List view'}
                    aria-pressed={viewMode === mode}
                    className={clsx('rounded-lg p-2 transition-colors', viewMode === mode ? 'bg-navy text-white' : 'text-muted hover:text-ink')}
                  >
                    {mode === 'grid' ? <LayoutGrid className="h-4 w-4" /> : <List className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Tabs
            className="mt-4 border-t border-line pt-4"
            tabs={categoryTabs}
            activeId={category}
            onChange={setCategory}
            layoutId="directory-category"
            label="Product category"
          />
        </div>

        {/* Result meta */}
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-body">
          <span>
            Showing <strong className="text-ink">{filtered.length}</strong> of {initialProducts.length} products
          </span>
          {activeFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={f.clear}
              className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-dark hover:bg-brand-100"
            >
              {f.label} <X className="h-3 w-3" />
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink">
              <RotateCcw className="h-3.5 w-3.5" /> Clear all
            </button>
          )}
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className={viewMode === 'grid' ? 'mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'mt-5 space-y-3'}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="card mt-5 px-6 py-14 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand">
              <FlaskConical className="h-6 w-6" />
            </span>
            <h3 className="mt-4 text-lg font-bold">No products match these filters</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-body">
              Try a different spelling or clear the filters. If you need a material we haven&apos;t listed, send us a custom
              enquiry.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={reset} className={buttonStyles('outline', 'md')}>
                Clear filters
              </button>
              <Link href="/request-quote" className={buttonStyles('primary', 'md')}>
                Send custom enquiry
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 340 }}
              className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-modal"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <p className="font-display text-lg font-bold">Filters</p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg p-2 text-muted hover:bg-mist"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-y-auto p-5">
                <FilterPanel grade={grade} setGrade={setGrade} make={make} setMake={setMake} manufacturers={manufacturers} />
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
                <button type="button" onClick={reset} className={buttonStyles('outline', 'md')}>
                  Reset
                </button>
                <button type="button" onClick={() => setDrawerOpen(false)} className={buttonStyles('primary', 'md')}>
                  Show {filtered.length} products
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductDirectory(props: ProductDirectoryProps) {
  return (
    <Suspense fallback={<div className="card h-96 animate-pulse" />}>
      <ProductDirectoryContent {...props} />
    </Suspense>
  );
}
