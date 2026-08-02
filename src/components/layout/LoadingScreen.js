import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

function LoadingScreen({ progress }) {
  const { theme } = useTheme();
  const progressValue = Math.round(progress);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background px-6 text-text"
    >
      <div className="w-full max-w-sm text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary"
        >
          Loading
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          className={`mb-6 font-display text-3xl font-bold ${theme === 'neon' ? 'text-glow' : ''}`}
        >
          Rajesh Portfolio
        </motion.h1>

        <div className="h-2 overflow-hidden rounded-full bg-surface">
          <motion.div
            animate={{ width: `${progressValue}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="h-full rounded-full bg-primary"
          />
        </div>

        <p className="mt-3 text-sm text-text-muted">{progressValue}%</p>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
