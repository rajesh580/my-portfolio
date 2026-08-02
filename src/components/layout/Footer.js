import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, staggerContainer, viewportOnce } from '../../utils/animations';
import SectionMotionObjects from './SectionMotionObjects';

function Footer() {
  const { theme } = useTheme(); // Get theme

  return (
    // Use theme-aware colors: bg-surface, text-text-muted
    <section id="contact" className="relative overflow-hidden bg-gradient-to-t from-background/70 via-surface/45 to-blue-900/10 text-text-muted py-16 md:py-20 border-t border-surface">
      <SectionMotionObjects variant="contact" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 container mx-auto text-center px-4 sm:px-6 lg:px-20"
      >
        {/* Use theme-aware colors: text-text */}
        <motion.h2 variants={fadeUp} className={`text-2xl sm:text-3xl font-display font-bold mb-6 sm:mb-8 text-text ${theme === 'neon' ? 'text-glow' : ''}`}>
          Contact Me
        </motion.h2>
        <motion.p variants={fadeUp} className="text-base sm:text-lg mb-6 sm:mb-8 max-w-lg mx-auto px-2">
          I'm always open to discussing new projects, creative ideas, or opportunities.
        </motion.p>
        <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8 sm:mb-10 px-2">
          {/* LinkedIn */}
          <motion.a
            href="https://www.linkedin.com/in/rajesh-rajoli"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            // Use theme-aware colors: hover:text-primary
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="text-3xl sm:text-4xl" />
          </motion.a>
          {/* GitHub */}
          <motion.a
            href="https://github.com/rajesh580"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="GitHub Profile"
          >
            <FaGithub className="text-3xl sm:text-4xl" />
          </motion.a>
          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/rajesh_raj__"
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="Instagram Profile"
          >
            <FaInstagram className="text-3xl sm:text-4xl" />
          </motion.a>
          {/* Email */}
          <motion.a
            href="mailto:rajeshrajoli722@gmail.com"
            variants={fadeUp}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="Email Me"
          >
            <FaEnvelope className="text-3xl sm:text-4xl" />
          </motion.a>
        </motion.div>
        <motion.p variants={fadeUp} className="text-xs sm:text-sm text-text-muted px-2">
          &copy; {new Date().getFullYear()} Rajesh Rajoli. All rights reserved.
        </motion.p>
      </motion.div>
    </section>
  );
}

// FIX: Change default export to match the function name
export default Footer;
