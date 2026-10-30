import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light' | 'success' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white shadow-brand hover:bg-brand-dark focus-visible:ring-brand/25',
  secondary: 'bg-navy text-white hover:bg-navy-800 focus-visible:ring-navy/25',
  outline: 'border border-line bg-white text-ink hover:border-brand hover:text-brand focus-visible:ring-brand/15',
  ghost: 'text-ink hover:bg-brand-50 hover:text-brand focus-visible:ring-brand/15',
  light: 'border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 focus-visible:ring-white/30',
  success: 'bg-leaf-dark text-white hover:bg-leaf focus-visible:ring-leaf/25',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500/25',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-xs',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-12 gap-2.5 px-6 text-sm sm:text-base',
};

/** Shared class builder so links (`<Link>`) look identical to buttons. Safe to use in server components. */
export function buttonStyles(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return twMerge(clsx(base, variants[variant], sizes[size], className));
}
