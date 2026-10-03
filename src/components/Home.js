import React, { useState, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
// FIX: 'FaGithub' is now imported, 'FaLinkedin' is removed
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function Home() {
  const { theme } = useTheme(); // Get current theme
  const ref = useRef(null);
  const [imgLoading, setImgLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Set up scroll tracking for the parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Track from when the top of the section hits the top of the viewport, until it leaves.
  });

  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  const orbitAnimation = shouldReduceMotion
    ? {}
    : {
        y: ["-10%", "10%", "-10%"],
        x: ["-8%", "8%", "-8%"],
        rotate: [0, 360],
      };

  return (
    // Use theme-aware color: bg-background
    <section ref={ref} id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-900/10 via-background to-surface py-16 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/20 blur-3xl"
          style={{ y: yBg1 }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
          style={{ y: yBg2 }}
        />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
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
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:space-x-4">
            <a
              href="#projects"
              className="bg-primary text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:bg-primary-accent transition duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              View My Work
            </a>
            <a
              href="https://github.com/rajesh580"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface text-text font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:bg-surface/70 transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="bg-surface border border-primary/20 p-4 rounded-xl shadow-sm">
              <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Experience</h4>
              <p className="text-2xl font-bold text-text">2+ yrs</p>
            </div>
            <div className="bg-surface border border-primary/20 p-4 rounded-xl shadow-sm">
              <h4 className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Projects</h4>
              <p className="text-2xl font-bold text-text">9</p>
            </div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/3 flex justify-center"
        >
          <div className="relative">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -right-8 z-10 hidden h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-surface/80 shadow-glow-lg backdrop-blur-md sm:flex md:h-28 md:w-28"
              animate={orbitAnimation}
              transition={{
                y: { duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                x: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "linear", repeatType: "loop" },
              }}
            >
              <motion.div
                className="absolute inset-3 rounded-full border border-dashed border-primary/50"
                animate={shouldReduceMotion ? {} : { rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
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
              src={`https://raw.githubusercontent.com/rajesh580/my-portfolio/refs/heads/main/public/images/profile.jpg`}
              alt="Rajesh Rajoli"
              onLoad={() => setImgLoading(false)}
              onError={(e) => { setImgLoading(false); }}
              // Use theme-aware colors: border-background
              className={`rounded-full shadow-glow-lg w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover mx-auto border-4 border-background ${imgLoading ? 'hidden' : 'block'}`}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Home;
