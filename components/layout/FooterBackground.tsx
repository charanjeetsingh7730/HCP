import React from 'react';

/**
 * Footer backdrop: slowly drifting brand glows, a faint hexagon lattice and a slowly
 * rotating molecule. Decorative only; all motion stops for prefers-reduced-motion.
 */
export function FooterBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base: deep navy with a vertical depth gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#011733_0%,#01142D_55%,#010E21_100%)]" />

      {/* Drifting brand glows */}
      <div className="animate-aurora absolute -left-40 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-3xl motion-reduce:animate-none" />
      <div className="animate-aurora absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-leaf/20 blur-3xl [animation-delay:-9s] motion-reduce:animate-none" />
      <div className="animate-aurora absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-light/10 blur-3xl [animation-delay:-4s] motion-reduce:animate-none" />

      {/* Faint hexagon lattice, fading in below the top edge */}
      <div className="bg-hex-light absolute inset-0 [mask-image:linear-gradient(180deg,transparent,#000_140px,transparent_85%)]" />

      {/* Blend the glows into the wave edge so there is no visible seam */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#011733] to-transparent" />

      {/* Slowly rotating molecule ornament, top-right */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="absolute -right-16 -top-16 h-72 w-72 animate-[spin_90s_linear_infinite] opacity-60 motion-reduce:animate-none sm:h-96 sm:w-96"
      >
        <g stroke="rgba(255,255,255,0.12)" strokeWidth="1.2">
          <polygon points="100,40 152,70 152,130 100,160 48,130 48,70" />
          <polygon points="100,58 136,79 136,121 100,142 64,121 64,79" strokeDasharray="4 5" />
          <line x1="152" y1="70" x2="188" y2="48" />
          <line x1="48" y1="130" x2="14" y2="152" />
          <line x1="100" y1="40" x2="100" y2="8" />
          <line x1="152" y1="130" x2="184" y2="154" />
        </g>
        {[
          [100, 40, '#0492DB'],
          [152, 70, '#32B15B'],
          [152, 130, '#0492DB'],
          [100, 160, '#32B15B'],
          [48, 130, '#0492DB'],
          [48, 70, '#32B15B'],
          [188, 48, '#0492DB'],
          [14, 152, '#32B15B'],
          [100, 8, '#32B15B'],
          [184, 154, '#0492DB'],
        ].map(([cx, cy, c]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill={c as string} fillOpacity="0.7" />
        ))}
      </svg>
    </div>
  );
}
