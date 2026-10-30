'use client';

import React, { useId, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, defaultOpenId, className }: AccordionProps) {
  const uid = useId();
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : items[0] ? [items[0].id] : []);

  const toggle = (id: string) =>
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : allowMultiple ? [...prev, id] : [id]));

  return (
    <div className={clsx('space-y-3', className)}>
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const panelId = `${uid}-${item.id}`;
        return (
          <div
            key={item.id}
            id={item.id}
            className={clsx(
              'scroll-mt-28 rounded-2xl border bg-white transition-colors',
              open ? 'border-brand-200 shadow-card' : 'border-line hover:border-brand-200'
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left font-display text-base font-bold text-ink sm:text-lg"
              >
                {item.question}
                <span
                  className={clsx(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all',
                    open ? 'rotate-45 bg-brand text-white' : 'bg-brand-50 text-brand'
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-[15px] leading-relaxed text-body">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
