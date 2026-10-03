import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
// FIX: 'FaGithub' and 'FaDownload' imported
import { FaGithub, FaDownload } from 'react-icons/fa';
import projects from '../../data/projects.json';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, staggerContainer } from '../../utils/animations';
import { handleResumeDownload, RESUME_URL, RESUME_FILENAME } from '../../utils/downloadResume';

function Home() {
  const { theme } = useTheme(); // Get current theme
  const [imgLoading, setImgLoading] = useState(true);
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const codeTrailX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-40, 95]);
  const codeTrailY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 140]);
  const codeTrailRotate = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [-8, -8] : [-8, 18]);
  const circuitX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [70, -110]);
  const circuitY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-20, 120]);
  const circuitPath = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.35, 1]);
  const bracketY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -90]);
  const bracketOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.22, 0.6, 0.12]);

  const floatingBadgeAnimation = shouldReduceMotion
    ? {}
    : {
        y: [0, -12, 0],
        x: [0, 10, 0],
        rotate: [0, 8, 0],
      };

  const floatingAura = shouldReduceMotion
    ? {}
    : {
        y: [0, -12, 0],
        x: [0, 10, 0],
        scale: [1, 1.08, 1],
        opacity: [0.4, 0.78, 0.4],
      };

  return (
    // Use theme-aware color: bg-background
    <section ref={sectionRef} id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-background/60 to-surface/45 py-16 md:py-32">
      <motion.div
        aria-hidden="true"
        style={{ x: codeTrailX, y: codeTrailY, rotate: codeTrailRotate }}
        className="pointer-events-none absolute left-3 top-24 hidden rounded-xl border border-primary/20 bg-surface/35 px-5 py-4 font-mono text-sm text-primary shadow-glow-lg backdrop-blur-md sm:block"
      >
        <motion.span
          animate={shouldReduceMotion ? {} : { opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          const build = &quot;ideas&quot;;
        </motion.span>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ x: circuitX, y: circuitY }}
        className="pointer-events-none absolute -right-20 top-28 h-40 w-56 opacity-35 sm:right-0 sm:h-64 sm:w-80 sm:opacity-70"
      >
        <svg viewBox="0 0 320 250" className="h-full w-full">
          <motion.path
            d="M24 42 H118 L152 84 H270 M78 158 H148 L186 118 H298 M40 214 H116 L152 186 H245"
            fill="none"
            stroke="hsl(var(--color-primary) / 0.55)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={circuitPath}
          />
          <motion.path
            d="M118 42 V20 M186 118 V92 M245 186 V218"
            fill="none"
            stroke="hsl(var(--color-primary-accent) / 0.5)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={circuitPath}
          />
          {[24, 270, 78, 298, 40, 245].map((cx, index) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={[42, 84, 158, 118, 214, 186][index]}
              r="5"
              fill="hsl(var(--color-primary) / 0.72)"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.55, 1] }}
              transition={{ duration: 2.2, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: bracketY, opacity: bracketOpacity }}
        className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 font-mono text-8xl font-bold text-primary md:block"
      >
        {'{ }'}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <motion.div
          aria-hidden="true"
          animate={floatingAura}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-8 top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl md:h-36 md:w-36"
        />
        <motion.div
          aria-hidden="true"
          animate={shouldReduceMotion ? {} : { y: [0, 16, 0], x: [0, -10, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute right-6 bottom-10 h-20 w-20 rounded-full bg-primary-accent/10 blur-2xl md:h-32 md:w-32"
        />
        
        {/* Text Content */}
        <motion.div
          variants={fadeUp}
          className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
        >
          {/* Use theme-aware colors: text-text */}
          <h1 className={`text-3xl sm:text-4xl md:text-6xl font-display font-extrabold text-text mb-4 ${theme === 'neon' ? 'text-glow' : ''}`}>
            Rajesh Rajoli
          </h1>
          {/* Use theme-aware colors: text-primary */}
          <p className="text-xl sm:text-2xl font-display font-semibold bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent mb-6">
            Full Stack Developer
          </p>
          {/* Use theme-aware colors: text-text-muted */}
          <p className="text-base sm:text-lg text-text-muted mb-8 max-w-md mx-auto md:mx-0">
            Passionate about building innovative and efficient web applications. Welcome to my personal portfolio.
          </p>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 flex-wrap">
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-primary text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:bg-primary-accent transition duration-300 transform hover:scale-105 text-sm sm:text-base inline-flex items-center justify-center"
            >
              View My Work
            </motion.a>
            <motion.a
              href={RESUME_URL}
              download={RESUME_FILENAME}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeDownload}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 inline-flex items-center justify-center text-sm sm:text-base cursor-pointer"
            >
              <FaDownload className="mr-2" /> Resume
            </motion.a>
            <motion.a
              href="https://github.com/rajesh580"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-surface text-text font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:bg-surface/70 transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <FaGithub className="mr-2" /> GitHub
            </motion.a>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <motion.div whileHover={{ y: -2 }} className="bg-surface border border-primary/20 p-4 rounded-xl shadow-sm">
              <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Experience</h4>
              <p className="text-2xl font-bold text-text">2+ yrs</p>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="bg-surface border border-primary/20 p-4 rounded-xl shadow-sm">
              <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Projects</h4>
              <p className="text-2xl font-bold text-text">{projects.length}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div 
          variants={fadeUp}
          className="md:w-1/3 flex justify-center"
        >
          <div className="relative">
            <motion.div
              aria-hidden="true"
              animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1], rotate: [0, 4, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full border border-primary/20"
            />
            <motion.div
              aria-hidden="true"
              animate={floatingBadgeAnimation}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -top-6 -right-8 z-10 hidden h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-surface/80 shadow-glow-lg backdrop-blur-md sm:flex md:h-28 md:w-28"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: -360 }}
                transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-3 rounded-full border border-dashed border-primary/50"
              />
              <span className="relative font-display text-2xl font-extrabold text-primary md:text-3xl">
                &lt;/&gt;
              </span>
              <span className="absolute -bottom-1 left-4 h-3 w-3 rounded-full bg-primary" />
              <span className="absolute right-3 top-4 h-2 w-2 rounded-full bg-primary-accent" />
            </motion.div>

            {imgLoading && (
              <div className="rounded-full bg-gray-200 dark:bg-gray-700 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto border-4 border-background shimmer" />
            )}

            <img
              src={`${process.env.PUBLIC_URL}/images/profile.jpg`}
              alt="Rajesh Rajoli"
              onLoad={() => setImgLoading(false)}
              onError={(e) => { setImgLoading(false); }}
              // Use theme-aware colors: border-background
              className={`rounded-full shadow-glow-lg w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover mx-auto border-4 border-background ${imgLoading ? 'hidden' : 'block'}`}
            />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}

export default Home;
