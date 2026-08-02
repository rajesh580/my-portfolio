import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function SectionMotionObjects({ variant = 'default' }) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const direction = variant.length % 2 === 0 ? 1 : -1;
  const driftX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [direction * -70, direction * 90]);
  const driftY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [direction * 35, direction * -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [direction * -10, direction * 18]);
  const pathLength = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.2, 1]);
  const fade = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.14, 0.36, 0.32, 0.14]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        style={{ x: driftX, y: driftY, rotate, opacity: fade }}
        className="absolute -right-16 top-12 h-36 w-36 rounded-full border border-primary/25 bg-primary/5 backdrop-blur-sm sm:-right-10 sm:top-16 sm:h-72 sm:w-72 sm:border-primary/35 sm:shadow-glow-lg"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-5 rounded-full border border-dashed border-primary-accent/45"
        />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      </motion.div>

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 520 280"
        preserveAspectRatio="none"
        style={{ x: driftY, y: driftX, opacity: fade }}
        className="absolute bottom-8 left-[-7rem] h-32 w-[26rem] max-w-none sm:bottom-4 sm:left-[-4rem] sm:h-56 sm:w-[32rem]"
      >
        <motion.path
          d="M18 210 C 95 70, 170 260, 250 130 S 390 38, 500 165"
          fill="none"
          stroke="hsl(var(--color-primary) / 0.52)"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={pathLength}
        />
        <motion.path
          d="M46 230 C 128 112, 190 246, 278 154 S 390 76, 470 190"
          fill="none"
          stroke="hsl(var(--color-primary-accent) / 0.34)"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={pathLength}
        />
      </motion.svg>

      <motion.div
        aria-hidden="true"
        style={{ x: driftX, rotate, opacity: fade }}
        className="absolute left-6 top-1/2 hidden font-mono text-7xl font-black text-primary/40 md:block"
      >
        &lt;/&gt;
      </motion.div>
    </div>
  );
}

export default SectionMotionObjects;
