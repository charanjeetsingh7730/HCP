'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-line/90 bg-white/95 text-navy shadow-lift backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:bg-brand hover:text-white hover:shadow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-95"
        >
          <ChevronUp className="h-5 w-5 sm:h-5 sm:w-5 transition-transform group-hover:-translate-y-0.5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
