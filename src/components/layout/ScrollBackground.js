import React from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';

function ScrollBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -140]);
  const yReverse = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 110]);
  const rotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 14]);
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.12]);

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
        className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl md:h-96 md:w-96"
      />

      <motion.div
        aria-hidden="true"
        style={{ y: yReverse, rotate: rotate, scale }}
        animate={shouldReduceMotion ? {} : { x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-24 top-[45vh] h-80 w-80 rounded-full bg-primary-accent/10 blur-3xl md:h-[28rem] md:w-[28rem]"
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.045]"
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
