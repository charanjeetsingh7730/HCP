'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

type From = 'up' | 'left' | 'right' | 'scale';

const OFFSETS: Record<From, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.92 },
};

/**
 * Fades its children in once they scroll into view, sliding from the given direction.
 * Respects reduced-motion preferences.
 */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: From;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...OFFSETS[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

type Tag = 'div' | 'ol' | 'ul' | 'li';

/** Grid/list wrapper whose `StaggerItem` children animate in one after another on scroll. */
export function Stagger({ children, className, as = 'div' }: { children: React.ReactNode; className?: string; as?: Tag }) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  if (reduce) return React.createElement(as, { className }, children);

  return (
    <Component className={className} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -60px 0px' }}>
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className, as = 'div' }: { children: React.ReactNode; className?: string; as?: Tag }) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  if (reduce) return React.createElement(as, { className }, children);

  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
