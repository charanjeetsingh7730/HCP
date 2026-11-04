'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import {
  Menu,
  X,
  Phone,
  Mail,
  Search,
  ChevronDown,
  FileText,
  MapPin,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  FlaskConical,
  Sparkles,
  HeartHandshake,
  Droplets,
  Layers,
} from 'lucide-react';
import { HCP_COMPANY } from '@/data/company';
import { PRODUCT_CATEGORIES } from '@/data/categories';
import { buttonStyles } from '@/components/ui/button-styles';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { useCart } from '@/components/cart/CartContext';

const categoryIcons: Record<string, React.ElementType> = {
  ShieldCheck,
  FlaskConical,
  Sparkles,
  HeartHandshake,
  Droplets,
  Layers,
};

const NAV_LINKS = [
  { href: '/products', label: 'Products', mega: true },
  { href: '/industries', label: 'Industries' },
  { href: '/manufacturers', label: 'Manufacturers' },
  { href: '/about', label: 'About Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Close the mega menu on outside click/tap or Escape (needed when it was opened by click, touch or keyboard)
  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [megaOpen]);

  // Close the mobile drawer with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Lock page scroll while the mobile drawer is open
  // (only touches the style while open, so it never clears a lock set by the search palette)
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) || (href === '/products' && pathname.startsWith('/categories'));

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-navy-900 text-[13px] text-white/75 md:block">
        <div className="container-x flex h-10 items-center justify-between gap-4">
          <p className="flex items-center gap-2 truncate">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-light" />
            <span className="truncate">
              Serving pharma &amp; industrial units across {HCP_COMPANY.serviceRegions.primaryHubs.join(', ')}
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5 text-leaf" />
              {HCP_COMPANY.contact.phoneDisplay[0]}
            </a>
            <a
              href={`mailto:${HCP_COMPANY.contact.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-white lg:flex"
            >
              <Mail className="h-3.5 w-3.5 text-brand-light" />
              {HCP_COMPANY.contact.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={clsx(
          'sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-shadow',
          scrolled ? 'border-line shadow-card' : 'border-transparent'
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-2 min-[360px]:gap-4 lg:h-20">
          <Link href="/" className="shrink-0 rounded-lg" aria-label={`${HCP_COMPANY.legalName} — Home`}>
            <Image
              src="/assets/logo/logo.svg"
              alt={HCP_COMPANY.legalName}
              width={2456}
              height={550}
              priority
              className="h-8 w-auto min-[360px]:h-10 sm:h-11 lg:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.mega ? (
                <div
                  key={link.href}
                  ref={megaRef}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <button
                    type="button"
                    onClick={() => setMegaOpen((v) => !v)}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    className={clsx(
                      'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors xl:px-4',
                      isActive(link.href) ? 'text-brand' : 'text-ink hover:text-brand'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={clsx('h-4 w-4 transition-transform', megaOpen && 'rotate-180')} />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute left-0 top-full z-50 w-[720px] pt-3"
                      >
                        <div className="grid grid-cols-[1fr_220px] overflow-hidden rounded-2xl border border-line bg-white shadow-modal">
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {PRODUCT_CATEGORIES.map((cat) => {
                              const Icon = categoryIcons[cat.iconName] || FlaskConical;
                              return (
                                <Link
                                  key={cat.id}
                                  href={`/categories/${cat.slug}`}
                                  onClick={() => setMegaOpen(false)}
                                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-mist"
                                >
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span>
                                    <span className="block text-sm font-semibold text-ink">{cat.shortName}</span>
                                    <span className="mt-0.5 block text-xs text-muted">{cat.catalogCount} products</span>
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                          <div className="flex flex-col justify-between bg-brand-gradient p-5 text-white">
                            <div>
                              <p className="font-display text-lg font-bold leading-snug">Full product catalogue</p>
                              <p className="mt-2 text-xs leading-relaxed text-white/80">
                                Search all raw materials by name, grade or manufacturer.
                              </p>
                            </div>
                            <Link href="/products" onClick={() => setMegaOpen(false)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:underline">
                              Browse all products <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={clsx(
                    'relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors xl:px-4',
                    isActive(link.href) ? 'text-brand' : 'text-ink hover:text-brand'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:border-brand hover:text-brand hover:bg-mist/60"
              aria-label="Search products"
              title="Search products (Ctrl+K)"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink transition-colors hover:border-brand hover:text-brand hover:bg-mist/60"
              aria-label={`Enquiry cart, ${count} ${count === 1 ? 'item' : 'items'}`}
              title="View Cart"
            >
              <ShoppingCart className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-leaf px-1 text-[11px] font-bold text-white ring-2 ring-white">
                  {count}
                </span>
              )}
            </Link>

            <Link href="/request-quote" className={buttonStyles('primary', 'md', 'hidden sm:inline-flex')}>
              <FileText className="h-4 w-4" />
              Get a Quote
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-mist lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 340 }}
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-modal"
            >
              <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
                <Image src="/assets/logo/logo.svg" alt={HCP_COMPANY.legalName} width={2456} height={550} className="h-9 w-auto" />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-mist"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="mb-4 flex w-full items-center gap-2.5 rounded-xl border border-line bg-mist px-3.5 py-2.5 text-left text-sm text-muted transition-colors hover:border-brand hover:text-brand"
                  aria-label="Search products"
                >
                  <Search className="h-4 w-4 text-brand" />
                  <span>Search chemicals, grades…</span>
                </button>

                <nav className="space-y-1" aria-label="Mobile navigation">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'block rounded-xl px-4 py-3 text-base font-semibold transition-colors',
                      pathname === '/' ? 'bg-brand-50 text-brand' : 'text-ink hover:bg-mist'
                    )}
                  >
                    Home
                  </Link>
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        'block rounded-xl px-4 py-3 text-base font-semibold transition-colors',
                        isActive(link.href) ? 'bg-brand-50 text-brand' : 'text-ink hover:bg-mist'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <p className="mb-2 mt-6 px-4 text-xs font-semibold uppercase tracking-wider text-muted">Categories</p>
                <div className="grid grid-cols-1 gap-1">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-body transition-colors hover:bg-mist hover:text-brand"
                    >
                      {cat.shortName}
                      <span className="text-xs text-muted">{cat.catalogCount}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-3 border-t border-line p-5">
                <Link
                  href="/request-quote"
                  onClick={() => setMobileOpen(false)}
                  className={buttonStyles('primary', 'lg', 'w-full')}
                >
                  <FileText className="h-4 w-4" />
                  Get a Quote
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className={buttonStyles('outline', 'lg', 'w-full')}
                >
                  <ShoppingCart className="h-4 w-4" />
                  View Cart {count > 0 && `(${count})`}
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a href={`tel:+91${HCP_COMPANY.contact.phoneNumbers[0]}`} className={buttonStyles('outline', 'md')}>
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a href={`mailto:${HCP_COMPANY.contact.email}`} className={buttonStyles('outline', 'md')}>
                    <Mail className="h-4 w-4" /> Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
