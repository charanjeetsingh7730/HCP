import React from 'react';
import { clsx } from 'clsx';

/** Faint hexagonal molecule outline used as a background ornament. Purely decorative. */
export function MoleculeDecor({ className, tone = 'brand' }: { className?: string; tone?: 'brand' | 'light' }) {
  const stroke = tone === 'light' ? 'rgba(255,255,255,0.14)' : 'rgba(4,116,194,0.16)';
  const node = tone === 'light' ? 'rgba(4,146,219,0.55)' : 'rgba(50,177,91,0.45)';
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={clsx('pointer-events-none', className)}>
      <g stroke={stroke} strokeWidth="1.5">
        <polygon points="100,40 152,70 152,130 100,160 48,130 48,70" />
        <polygon points="100,58 136,79 136,121 100,142 64,121 64,79" strokeDasharray="4 5" />
        <line x1="152" y1="70" x2="188" y2="48" />
        <line x1="48" y1="130" x2="14" y2="152" />
        <line x1="100" y1="40" x2="100" y2="8" />
        <line x1="152" y1="130" x2="184" y2="154" />
      </g>
      <g fill={node}>
        {[
          [100, 40],
          [152, 70],
          [152, 130],
          [100, 160],
          [48, 130],
          [48, 70],
          [188, 48],
          [14, 152],
          [100, 8],
          [184, 154],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>
    </svg>
  );
}
