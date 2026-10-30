'use client';

import React from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
  layoutId?: string;
  label?: string;
}

export function Tabs({ tabs, activeId, onChange, className, layoutId = 'tab-indicator', label = 'Filter' }: TabsProps) {
  return (
    <div role="tablist" aria-label={label} className={clsx('scrollbar-none flex gap-2 overflow-x-auto', className)}>
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
              active ? 'border-transparent text-white' : 'border-line bg-white text-body hover:border-brand hover:text-brand'
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-navy"
                transition={{ type: 'spring', stiffness: 450, damping: 36 }}
              />
            )}
            <span className="relative">{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={clsx(
                  'relative rounded-full px-1.5 text-[11px] font-bold',
                  active ? 'bg-white/20 text-white' : 'bg-mist text-muted'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
