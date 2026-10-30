import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

const STEPS = ['Enquiry Cart', 'Your Details', 'Confirmation'];

/** Progress indicator for the cart → enquiry → thank-you flow. */
export function EnquirySteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Enquiry progress">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3">
            <span
              className={clsx(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-1',
                done && 'bg-leaf text-white ring-leaf',
                active && 'bg-white text-navy ring-white',
                !done && !active && 'bg-white/5 text-white/60 ring-white/20'
              )}
              aria-current={active ? 'step' : undefined}
            >
              {done ? <Check className="h-4 w-4" /> : step}
            </span>
            <span className={clsx('hidden text-sm font-medium sm:inline', active ? 'text-white' : 'text-white/60')}>
              {label}
            </span>
            {step < STEPS.length && <span className="h-px w-6 bg-white/20 sm:w-10" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
