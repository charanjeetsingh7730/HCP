'use client';

import React, { useEffect, useRef } from 'react';

// Hexagon cells (the logo's motif) that softly glow in the background
const GLOW_HEXES = [
  { pos: 'left-[6%] top-[14%]', size: 'h-16 w-16', tone: 'text-brand-light', delay: '0s' },
  { pos: 'left-[42%] top-[8%]', size: 'h-10 w-10', tone: 'text-leaf', delay: '-1.5s' },
  { pos: 'right-[6%] top-[10%]', size: 'h-20 w-20', tone: 'text-brand', delay: '-3s' },
  { pos: 'left-[30%] bottom-[10%]', size: 'h-12 w-12', tone: 'text-leaf', delay: '-4.5s' },
  { pos: 'right-[40%] bottom-[22%]', size: 'h-14 w-14', tone: 'text-brand-light', delay: '-2s' },
];

// Fewer, smaller cells for the compact inner-page header
const GLOW_HEXES_COMPACT = [
  { pos: 'left-[4%] top-[18%]', size: 'h-12 w-12', tone: 'text-brand-light', delay: '0s' },
  { pos: 'left-[46%] top-[10%]', size: 'h-8 w-8', tone: 'text-leaf', delay: '-1.5s' },
  { pos: 'right-[5%] bottom-[14%]', size: 'h-14 w-14', tone: 'text-brand', delay: '-3s' },
  { pos: 'left-[34%] bottom-[12%]', size: 'h-10 w-10', tone: 'text-leaf', delay: '-4.5s' },
];

interface HeroBackgroundProps {
  /** `full` = home hero, `compact` = inner-page header */
  variant?: 'full' | 'compact';
}

/**
 * Shared hero backdrop: soft brand mesh, hexagon texture from the logo, glowing hex cells and a
 * hexagon spotlight that follows the cursor. Place inside a `relative isolate overflow-hidden` parent.
 */
export function HeroBackground({ variant = 'full' }: HeroBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Moves the spotlight with the cursor via CSS variables (listens on the parent section, no re-render)
  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = host.getBoundingClientRect();
      el.style.setProperty('--hx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--hy', `${e.clientY - rect.top}px`);
    };
    host.addEventListener('pointermove', onMove);
    return () => host.removeEventListener('pointermove', onMove);
  }, []);

  const hexes = variant === 'full' ? GLOW_HEXES : GLOW_HEXES_COMPACT;
  const spot = variant === 'full' ? '260px' : '220px';

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 [--hx:78%] [--hy:35%]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_80%_30%,#AFD8F4_0%,transparent_70%),radial-gradient(50%_60%_at_5%_100%,#D4F0DE_0%,transparent_70%),linear-gradient(180deg,#EDF6FD,#E2EFF9)]" />
      <div className="bg-hex mask-radial absolute inset-0 opacity-80" />
      <div
        className="bg-hex-strong absolute inset-0 hidden lg:block"
        style={{
          WebkitMaskImage: `radial-gradient(${spot} circle at var(--hx) var(--hy), #000, transparent 75%)`,
          maskImage: `radial-gradient(${spot} circle at var(--hx) var(--hy), #000, transparent 75%)`,
        }}
      />
      {hexes.map((h) => (
        <svg
          key={h.pos}
          viewBox="0 0 56 64"
          className={`animate-hex-glow absolute hidden md:block motion-reduce:animate-none ${h.pos} ${h.size} ${h.tone}`}
          style={{ animationDelay: h.delay }}
        >
          <path
            d="M28 2 L54 17 L54 47 L28 62 L2 47 L2 17 Z"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}
