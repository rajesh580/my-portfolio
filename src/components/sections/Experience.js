import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  FaBriefcase,
  FaBrain,
  FaLaptopCode,
  FaCalendarAlt,
  FaCheckCircle,
  FaRocket,
  FaDownload,
  FaArrowRight,
  FaBolt,
  FaCogs,
  FaChartLine,
} from 'react-icons/fa';
import experienceData from '../../data/experience.json';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, scaleIn, viewportOnce } from '../../utils/animations';
import { handleResumeDownload, RESUME_URL, RESUME_FILENAME } from '../../utils/downloadResume';
import SectionMotionObjects from '../layout/SectionMotionObjects';

const ICONS = {
  1: FaBriefcase,
  2: FaBrain,
  3: FaLaptopCode,
};

function Experience() {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const ambientOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 0.6, 0.6, 0.2]);

  // Main Experience Detail Card
  const renderCard = (item, stepNum) => {
    const StepIcon = ICONS[item.id] || FaBriefcase;

    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="w-full h-full flex flex-col justify-between bg-background/95 backdrop-blur-md border border-primary/25 hover:border-primary/60 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-glow-xl transition-all duration-300 relative group overflow-hidden"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary-accent/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl" />

        <div>
          {/* Card Header: Step & Period */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-accent text-white font-mono font-bold text-sm flex items-center justify-center shadow-md">
                0{stepNum}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary/15 text-primary tracking-wide uppercase flex items-center gap-2 border border-primary/25 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {item.type}
              </span>
            </div>

            <span className="inline-flex items-center text-xs font-semibold text-text-muted gap-1.5 bg-surface/90 px-3.5 py-1.5 rounded-full border border-surface shadow-inner">
              <FaCalendarAlt className="text-primary text-xs" /> {item.period}
            </span>
          </div>

          {/* Role & Company Header */}
          <div className="flex items-start gap-4 mb-4 relative z-10">
            <div className="relative flex-shrink-0 mt-1">
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 rounded-2xl border border-dashed border-primary/40 pointer-events-none"
              />
              <div className="w-12 h-12 rounded-2xl bg-surface border border-primary/30 text-primary flex items-center justify-center shadow-md">
                <StepIcon className="text-xl" />
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-text group-hover:text-primary transition-colors leading-tight">
                {item.role}
              </h3>
              <h4 className="text-sm sm:text-base font-semibold text-primary mt-1">
                {item.company}
              </h4>
            </div>
          </div>

          {/* Summary Description */}
          <p className="text-xs sm:text-sm text-text-muted mb-4 italic leading-relaxed relative z-10">
            {item.summary}
          </p>

          {/* Bullet Points */}
          <ul className="space-y-2.5 mb-5 relative z-10">
            {item.highlights.map((bullet, bIdx) => (
              <motion.li
                key={bIdx}
                whileHover={{ x: 4 }}
                className="flex items-start text-xs sm:text-sm text-text-muted leading-relaxed gap-2.5"
              >
                <FaCheckCircle className="text-primary text-sm mt-0.5 flex-shrink-0" />
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-surface relative z-10">
          {item.tech.map((t) => (
            <motion.span
              key={t}
              whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -2 }}
              className="text-xs font-medium px-3 py-1 rounded-full bg-surface text-text-muted border border-surface hover:border-primary/40 hover:text-primary transition-all shadow-sm cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden py-20 md:py-32 bg-surface/30"
    >
      <SectionMotionObjects variant="experience" />

      {/* Ambient Pulsing Nebulae */}
      <motion.div
        style={{ opacity: ambientOpacity }}
        className="pointer-events-none absolute right-4 top-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
      />
      <motion.div
        style={{ opacity: ambientOpacity }}
        className="pointer-events-none absolute left-4 top-2/3 h-96 w-96 rounded-full bg-primary-accent/15 blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-16 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Continuous Serpentine Pathway
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`text-3xl sm:text-5xl font-display font-bold text-text mb-4 ${
              theme === 'neon' ? 'text-glow' : ''
            }`}
          >
            Work Experience
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-center text-sm sm:text-base text-text-muted max-w-2xl mx-auto"
          >
            Track my engineering progression along an uninterrupted cyber serpentine timeline—from foundational systems to production machine learning and full-stack software development.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP SERPENTINE SNAKE TIMELINE (md and up) */}
        {/* ========================================================================= */}
        <div className="hidden md:block relative">
          {/* Global SVG Filter & Gradient Definitions */}
          <svg className="absolute w-0 h-0 pointer-events-none">
            <defs>
              <linearGradient id="snakeGradL2R" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--color-primary))" stopOpacity="1" />
                <stop offset="50%" stopColor="hsl(var(--color-primary-accent))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--color-primary))" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="snakeGradR2L" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--color-primary))" stopOpacity="1" />
                <stop offset="50%" stopColor="hsl(var(--color-primary-accent))" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(var(--color-primary))" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="hsl(var(--color-primary-accent))" />
              </linearGradient>
            </defs>
          </svg>

          {/* ==================== 1. SERPENT GENESIS / START BEACON ==================== */}
          <div className="grid grid-cols-2 gap-8 mb-2">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-surface/90 border border-primary/40 shadow-glow text-primary text-xs font-mono font-bold uppercase tracking-wider mb-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span>Serpent Origin • Present Day</span>
              </motion.div>
              {/* Vertical Laser Pipe entering Card 1 */}
              <div className="w-1.5 h-8 bg-gradient-to-b from-primary via-primary-accent to-primary shadow-glow rounded-full" />
            </div>
            <div />
          </div>

          {/* ==================== ROW 1: MILESTONE 01 ==================== */}
          <div className="grid grid-cols-2 gap-8 items-stretch relative">
            {/* Col 1: Experience Detail Card (Zetacoding) */}
            <div className="relative">
              {renderCard(experienceData[0], 1)}
            </div>

            {/* Col 2: High-Tech Holographic Telemetry Pod (NOT duplicate!) */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="w-full h-full flex flex-col justify-between bg-surface/40 backdrop-blur-md border border-primary/20 hover:border-primary/50 rounded-3xl p-6 sm:p-8 shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 via-transparent to-primary-accent/5 rounded-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-surface">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <FaBolt className="text-sm animate-pulse" />
                    </span>
                    <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                      Live Production Radar
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ACTIVE ROLE
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  Enterprise Scalability & ML Integration
                </h4>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  Spearheading robust frontend UI architectures and backend microservices at Zetacoding, fusing machine learning inference engines into reactive web experiences.
                </p>

                {/* Core Architecture Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Architecture</div>
                    <div className="text-xs sm:text-sm font-bold text-text">Full-Stack</div>
                  </div>
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Microservices</div>
                    <div className="text-xs sm:text-sm font-bold text-primary">REST APIs</div>
                  </div>
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Core AI</div>
                    <div className="text-xs sm:text-sm font-bold text-text">ML Inference</div>
                  </div>
                </div>
              </div>

              {/* Status Indicator Chip */}
              <div className="flex items-center justify-between pt-4 border-t border-surface text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Zetacoding Innovative Solutions
                </span>
                <span className="font-mono text-primary font-bold">Jul 2026 – Present</span>
              </div>
            </motion.div>
          </div>

          {/* ==================== SERPENTINE SNAKE CONNECTOR 1 (Col 1 -> Loops Right -> Col 2) ==================== */}
          <div className="relative w-full h-32 pointer-events-none -my-2 z-20">
            <svg
              viewBox="0 0 1000 140"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {/* Outer Neon Glow Layer */}
              <path
                d="M 250,0 C 250,70 600,20 840,40 C 930,50 930,90 840,105 C 780,115 750,105 750,140"
                fill="none"
                stroke="hsl(var(--color-primary))"
                strokeWidth="14"
                strokeOpacity="0.2"
                strokeLinecap="round"
                filter="drop-shadow(0 0 16px hsl(var(--color-primary)))"
              />

              {/* Solid Core Neon Serpent Pipe */}
              <path
                d="M 250,0 C 250,70 600,20 840,40 C 930,50 930,90 840,105 C 780,115 750,105 750,140"
                fill="none"
                stroke="url(#snakeGradL2R)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px hsl(var(--color-primary)))"
              />

              {/* Animated Slithering Cyber Snake Scales */}
              <motion.path
                d="M 250,0 C 250,70 600,20 840,40 C 930,50 930,90 840,105 C 780,115 750,105 750,140"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="2.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -32] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Gliding Neon Laser Comet along the curve */}
              <motion.path
                d="M 250,0 C 250,70 600,20 840,40 C 930,50 930,90 840,105 C 780,115 750,105 750,140"
                fill="none"
                stroke="hsl(var(--color-primary-accent))"
                strokeWidth="6"
                strokeLinecap="round"
                filter="drop-shadow(0 0 12px white)"
                initial={{ pathLength: 0.18, pathOffset: 0 }}
                animate={shouldReduceMotion ? {} : { pathOffset: [0, 0.82] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Waypoint Diamond at Apex */}
              <circle cx="890" cy="72" r="5" fill="hsl(var(--color-primary-accent))" filter="drop-shadow(0 0 8px white)" />
            </svg>

            {/* Floating Waypoint Label on the Outer Loop */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30 shadow-glow text-[11px] font-mono font-bold text-primary flex items-center gap-1.5">
              <span>Next Milestone</span>
              <FaArrowRight className="text-[10px]" />
            </div>
          </div>

          {/* ==================== ROW 2: MILESTONE 02 ==================== */}
          <div className="grid grid-cols-2 gap-8 items-stretch relative">
            {/* Col 1: High-Tech Holographic Telemetry Pod (Contriver ML Insights) */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="w-full h-full flex flex-col justify-between bg-surface/40 backdrop-blur-md border border-primary/20 hover:border-primary/50 rounded-3xl p-6 sm:p-8 shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -inset-1 bg-gradient-to-bl from-primary-accent/5 via-transparent to-primary/5 rounded-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-surface">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <FaChartLine className="text-sm animate-pulse" />
                    </span>
                    <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                      Predictive Intelligence & AI
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                    INTERNSHIP
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  Machine Learning & Generative AI Lab
                </h4>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  Engineered and evaluated 3 custom predictive ML models using Python and Scikit-learn, executing rigorous feature selection on complex 10,000+ entry datasets.
                </p>

                {/* Core Architecture Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Records</div>
                    <div className="text-xs sm:text-sm font-bold text-primary">10,000+</div>
                  </div>
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Models</div>
                    <div className="text-xs sm:text-sm font-bold text-text">3 Built</div>
                  </div>
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Pipelines</div>
                    <div className="text-xs sm:text-sm font-bold text-text">REST APIs</div>
                  </div>
                </div>
              </div>

              {/* Status Indicator Chip */}
              <div className="flex items-center justify-between pt-4 border-t border-surface text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Contriver Deep Tech
                </span>
                <span className="font-mono text-primary font-bold">Feb 2026 – May 2026</span>
              </div>
            </motion.div>

            {/* Col 2: Experience Detail Card (Contriver) */}
            <div className="relative">
              {renderCard(experienceData[1], 2)}
            </div>
          </div>

          {/* ==================== SERPENTINE SNAKE CONNECTOR 2 (Col 2 -> Loops Left -> Col 1) ==================== */}
          <div className="relative w-full h-32 pointer-events-none -my-2 z-20">
            <svg
              viewBox="0 0 1000 140"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {/* Outer Neon Glow Layer */}
              <path
                d="M 750,0 C 750,70 400,20 160,40 C 70,50 70,90 160,105 C 220,115 250,105 250,140"
                fill="none"
                stroke="hsl(var(--color-primary))"
                strokeWidth="14"
                strokeOpacity="0.2"
                strokeLinecap="round"
                filter="drop-shadow(0 0 16px hsl(var(--color-primary)))"
              />

              {/* Solid Core Neon Serpent Pipe */}
              <path
                d="M 750,0 C 750,70 400,20 160,40 C 70,50 70,90 160,105 C 220,115 250,105 250,140"
                fill="none"
                stroke="url(#snakeGradR2L)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px hsl(var(--color-primary)))"
              />

              {/* Animated Slithering Cyber Snake Scales */}
              <motion.path
                d="M 750,0 C 750,70 400,20 160,40 C 70,50 70,90 160,105 C 220,115 250,105 250,140"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="2.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -32] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Gliding Neon Laser Comet along the curve */}
              <motion.path
                d="M 750,0 C 750,70 400,20 160,40 C 70,50 70,90 160,105 C 220,115 250,105 250,140"
                fill="none"
                stroke="hsl(var(--color-primary-accent))"
                strokeWidth="6"
                strokeLinecap="round"
                filter="drop-shadow(0 0 12px white)"
                initial={{ pathLength: 0.18, pathOffset: 0 }}
                animate={shouldReduceMotion ? {} : { pathOffset: [0, 0.82] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Waypoint Diamond at Apex */}
              <circle cx="110" cy="72" r="5" fill="hsl(var(--color-primary-accent))" filter="drop-shadow(0 0 8px white)" />
            </svg>

            {/* Floating Waypoint Label on the Outer Loop */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30 shadow-glow text-[11px] font-mono font-bold text-primary flex items-center gap-1.5">
              <span>Foundation Node</span>
              <FaArrowRight className="text-[10px]" />
            </div>
          </div>

          {/* ==================== ROW 3: MILESTONE 03 ==================== */}
          <div className="grid grid-cols-2 gap-8 items-stretch relative">
            {/* Col 1: Experience Detail Card (TSIAR) */}
            <div className="relative">
              {renderCard(experienceData[2], 3)}
            </div>

            {/* Col 2: High-Tech Holographic Telemetry Pod (TSIAR Systems) */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="w-full h-full flex flex-col justify-between bg-surface/40 backdrop-blur-md border border-primary/20 hover:border-primary/50 rounded-3xl p-6 sm:p-8 shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/5 via-transparent to-primary-accent/5 rounded-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-surface">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <FaCogs className="text-sm animate-pulse" />
                    </span>
                    <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                      Automation & Systems Engineering
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                    INTERNSHIP
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  Operations Automation & Backend Architecture
                </h4>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
                  Developed custom workflow automation tools that slashed manual overhead by 30%, while supporting backend database optimization across 2 production web portals.
                </p>

                {/* Core Architecture Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Automation</div>
                    <div className="text-xs sm:text-sm font-bold text-emerald-400">+30% Gain</div>
                  </div>
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Web Apps</div>
                    <div className="text-xs sm:text-sm font-bold text-text">2 Managed</div>
                  </div>
                  <div className="bg-background/80 rounded-2xl p-3 text-center border border-surface shadow-sm">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Backend</div>
                    <div className="text-xs sm:text-sm font-bold text-primary">DB & APIs</div>
                  </div>
                </div>
              </div>

              {/* Status Indicator Chip */}
              <div className="flex items-center justify-between pt-4 border-t border-surface text-xs text-text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  TSIAR Sports Team and Club
                </span>
                <span className="font-mono text-primary font-bold">Jun 2025 – Dec 2025</span>
              </div>
            </motion.div>
          </div>

          {/* ==================== SERPENTINE CONNECTOR 3 (Col 1 -> Curves into Center Terminal) ==================== */}
          <div className="relative w-full h-24 pointer-events-none -my-1 z-20">
            <svg
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {/* Outer Glow */}
              <path
                d="M 250,0 C 250,80 500,40 500,120"
                fill="none"
                stroke="hsl(var(--color-primary))"
                strokeWidth="12"
                strokeOpacity="0.2"
                strokeLinecap="round"
                filter="drop-shadow(0 0 14px hsl(var(--color-primary)))"
              />

              {/* Solid Pipe */}
              <path
                d="M 250,0 C 250,80 500,40 500,120"
                fill="none"
                stroke="url(#snakeGradL2R)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="drop-shadow(0 0 8px hsl(var(--color-primary)))"
              />

              {/* Animated Scales */}
              <motion.path
                d="M 250,0 C 250,80 500,40 500,120"
                fill="none"
                stroke="rgba(255,255,255,0.85)"
                strokeWidth="2.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -32] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              />

              {/* Energy Comet */}
              <motion.path
                d="M 250,0 C 250,80 500,40 500,120"
                fill="none"
                stroke="hsl(var(--color-primary-accent))"
                strokeWidth="6"
                strokeLinecap="round"
                filter="drop-shadow(0 0 12px white)"
                initial={{ pathLength: 0.2, pathOffset: 0 }}
                animate={shouldReduceMotion ? {} : { pathOffset: [0, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* ==================== TERMINAL: ROCKET LAUNCHPAD ==================== */}
          <div className="flex flex-col items-center justify-center mt-4 text-center relative z-30">
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative group cursor-pointer"
            >
              {/* Animated Thruster Flame */}
              <motion.div
                animate={shouldReduceMotion ? {} : { scaleY: [0.8, 1.5, 0.8], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full bg-gradient-to-b from-primary via-amber-500 to-transparent blur-[3px] pointer-events-none"
              />

              <div className="w-20 h-20 rounded-3xl bg-surface border-2 border-primary shadow-glow-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary-accent transition-all duration-300">
                <FaRocket className="text-3xl animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2.5 text-xs font-mono font-bold text-primary uppercase tracking-wider bg-surface/90 backdrop-blur-md px-6 py-2.5 rounded-full border border-primary/30 shadow-glow mt-5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
              <span>Ready For Next High-Impact Software & AI Roles</span>
            </motion.div>

            {/* Quick Action Button for Resume */}
            <div className="mt-5 flex items-center gap-4">
              <motion.a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeDownload}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-glow hover:bg-primary-hover transition-all cursor-pointer"
              >
                <FaDownload className="text-xs" /> Download Full Resume
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface text-text hover:text-primary text-xs font-bold border border-surface hover:border-primary/40 transition-all shadow-sm"
              >
                Let's Connect <FaArrowRight className="text-xs" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE SERPENTINE TIMELINE (< md) */}
        {/* ========================================================================= */}
        <div className="md:hidden relative">
          {/* Animated Vertical Snake Spine */}
          <div className="absolute left-4 top-2 bottom-12 w-1.5 bg-gradient-to-b from-primary via-primary-accent to-primary rounded-full shadow-glow" />

          <div className="space-y-10 pl-10">
            {experienceData.map((item, index) => {
              const StepIcon = ICONS[item.id] || FaBriefcase;

              return (
                <div key={item.id} className="relative">
                  {/* Glowing Node on Spine */}
                  <div className="absolute -left-10 top-2 w-8 h-8 rounded-full bg-surface border-2 border-primary shadow-glow flex items-center justify-center text-primary z-10">
                    <StepIcon className="text-xs" />
                  </div>

                  {renderCard(item, index + 1)}
                </div>
              );
            })}

            {/* Mobile Terminal Rocket */}
            <div className="flex items-center gap-3 pt-3">
              <div className="w-10 h-10 rounded-2xl bg-surface border-2 border-primary flex items-center justify-center text-primary shadow-glow flex-shrink-0">
                <FaRocket className="text-sm animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold text-primary uppercase">
                  Ready For Next Roles
                </span>
                <span className="text-[11px] text-text-muted">
                  Full Stack & Machine Learning Engineer
                </span>
              </div>
            </div>

            {/* Mobile Resume Action */}
            <div className="pt-2">
              <a
                href={RESUME_URL}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleResumeDownload}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-glow cursor-pointer"
              >
                <FaDownload className="text-xs" /> Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
