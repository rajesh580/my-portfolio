import React from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function ScrollBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -140]);
  const yReverse = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 110]);
  const rotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 14]);
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.12]);
  const ribbonX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['-9%', '8%']);
  const ribbonY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['9%', '-13%']);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [-8, -8] : [-8, 12]);
  const ribbonPath = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0.85, 0.85] : [0.22, 1]);
  const ribbonOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.18, 0.48, 0.42, 0.2]);

  const orb1X = useTransform(scrollYProgress, [0, 1], ['18%', '62%']);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['10%', '42%']);
  const orb2X = useTransform(scrollYProgress, [0, 1], ['72%', '32%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['40%', '78%']);

  const backgroundGlow = useMotionTemplate`
    radial-gradient(circle at ${orb1X} ${orb1Y}, hsl(var(--color-primary) / 0.25), transparent 34%),
    radial-gradient(circle at ${orb2X} ${orb2Y}, hsl(var(--color-primary-accent) / 0.22), transparent 42%)
  `;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <motion.div
        aria-hidden="true"
        style={{ backgroundImage: backgroundGlow, opacity: shouldReduceMotion ? 0.4 : 0.9 }}
        className="absolute inset-0"
      />

      <motion.div
        aria-hidden="true"
        style={{ y, rotate, scale }}
        animate={shouldReduceMotion ? {} : { x: [0, 24, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-28 top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl md:-left-24 md:top-16 md:h-96 md:w-96"
      />

      <motion.div
        aria-hidden="true"
        style={{ y: yReverse, rotate: rotate, scale }}
        animate={shouldReduceMotion ? {} : { x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-32 top-[52vh] h-56 w-56 rounded-full bg-primary-accent/10 blur-3xl md:-right-24 md:top-[45vh] md:h-[28rem] md:w-[28rem]"
      />

      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1200 760"
        preserveAspectRatio="xMidYMid slice"
        style={{ x: ribbonX, y: ribbonY, rotate: ribbonRotate, opacity: ribbonOpacity }}
        className="absolute inset-0 h-full w-full opacity-60 sm:opacity-100"
      >
        <defs>
          <filter id="neon-ribbon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M-120 520 C 95 355, 215 735, 420 535 S 695 155, 900 315 S 1100 680, 1320 450"
          fill="none"
          stroke="hsl(var(--color-primary) / 0.58)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={ribbonPath}
          filter="url(#neon-ribbon-glow)"
        />
        <motion.path
          d="M-120 520 C 95 355, 215 735, 420 535 S 695 155, 900 315 S 1100 680, 1320 450"
          fill="none"
          stroke="hsl(var(--color-primary-accent) / 0.48)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={ribbonPath}
        />
        <motion.circle
          cx="900"
          cy="315"
          r="12"
          fill="hsl(var(--color-primary-accent) / 0.65)"
          animate={shouldReduceMotion ? {} : { scale: [1, 1.45, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#neon-ribbon-glow)"
        />
      </motion.svg>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] sm:opacity-[0.045]"
        animate={shouldReduceMotion ? {} : { opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--color-primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--color-primary)) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
    </div>
  );
}

export default ScrollBackground;
