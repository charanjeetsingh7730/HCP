'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { clsx } from 'clsx';

/**
 * Decorative full-bleed background photo that drifts slower than the page while scrolling.
 * Place inside a `relative overflow-hidden` section; it sits behind content (-z-20).
 */
export function ParallaxImage({
  src,
  side = 'full',
  className,
  imageClassName,
}: {
  src: string;
  /** `right` / `left` pin the photo to one half on large screens and fade it into the section. */
  side?: 'full' | 'left' | 'right';
  className?: string;
  imageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <div
      ref={ref}
      className={clsx(
        'absolute inset-y-0 -z-20 overflow-hidden',
        side === 'full' && 'inset-x-0',
        side === 'right' && 'right-0 w-full lg:w-[52%] mask-fade-left',
        side === 'left' && 'left-0 w-full lg:w-[52%] mask-fade-right',
        className
      )}
      aria-hidden="true"
    >
      <motion.div className="absolute inset-x-0 -inset-y-[14%]" style={reduce ? undefined : { y }}>
        <Image src={src} alt="" fill sizes="100vw" className={clsx('object-cover', imageClassName)} />
      </motion.div>
    </div>
  );
}
