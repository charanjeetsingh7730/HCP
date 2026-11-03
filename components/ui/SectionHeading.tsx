import React from 'react';
import { clsx } from 'clsx';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  action,
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'dark';
  return (
    <div
      className={clsx(
        'mb-10 flex flex-col gap-5 sm:mb-12',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className={clsx('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <span className={clsx('eyebrow', isDark && 'eyebrow-light')}>{eyebrow}</span>}
        <h2
          className={clsx(
            'mt-3 text-3xl font-bold leading-tight sm:text-4xl',
            isDark ? 'text-white [text-shadow:0_2px_18px_rgba(1,23,51,0.55)]' : 'text-ink'
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={clsx('mt-4 text-base leading-relaxed', isDark ? 'text-white/90' : 'text-body')}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
