'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X, ArrowRight } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastAction {
  label: string;
  href: string;
}

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  action?: ToastAction;
}

interface ToastContextType {
  toast: (title: string, description?: string, type?: ToastType, action?: ToastAction) => void;
  success: (title: string, description?: string, action?: ToastAction) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ICONS = {
  success: <CheckCircle2 className="h-5 w-5 text-leaf" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-brand" />,
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback<ToastContextType['toast']>(
    (title, description, type = 'info', action) => {
      const id = Math.random().toString(36).slice(2, 9);
      // keep at most 3 on screen
      setToasts((prev) => [...prev.slice(-2), { id, title, description, type, action }]);
      setTimeout(() => removeToast(id), action ? 5500 : 4000);
    },
    [removeToast]
  );

  const success = useCallback<ToastContextType['success']>(
    (title, description, action) => toast(title, description, 'success', action),
    [toast]
  );
  const error = useCallback((title: string, description?: string) => toast(title, description, 'error'), [toast]);
  const info = useCallback((title: string, description?: string) => toast(title, description, 'info'), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-4 top-24 z-[70] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-6 sm:w-96"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 480, damping: 34 }}
              className="pointer-events-auto flex w-full items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-modal"
            >
              <span className="mt-0.5 shrink-0">{ICONS[t.type]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{t.title}</p>
                {t.description && <p className="mt-0.5 text-xs leading-relaxed text-body">{t.description}</p>}
                {t.action && (
                  <Link
                    href={t.action.href}
                    onClick={() => removeToast(t.id)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-dark"
                  >
                    {t.action.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="shrink-0 rounded-lg p-1 text-muted hover:bg-mist hover:text-ink"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
