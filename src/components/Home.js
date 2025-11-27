import React, { useState } from 'react';
import { motion } from 'framer-motion';
// FIX: 'FaGithub' is now imported, 'FaLinkedin' is removed
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function Home() {
  const { theme } = useTheme(); // Get current theme
  const [imgLoading, setImgLoading] = useState(true);

  return (
    // Use theme-aware color: bg-background
    <section id="home" className="bg-background py-16 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8">
        
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
            Software Developer
          </p>
          {/* Use theme-aware colors: text-text-muted */}
          <p className="text-base sm:text-lg text-text-muted mb-8 max-w-md mx-auto md:mx-0">
            Passionate about building innovative and efficient web applications. Welcome to my personal portfolio.
          </p>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:space-x-4">
            <a
              href="#projects"
              // Use theme-aware colors: bg-primary, hover:bg-primary-accent
              className="bg-primary text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:bg-primary-accent transition duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              View My Work
            </a>
            <a
              href="https://github.com/rajesh580"
              target="_blank"
              rel="noopener noreferrer"
              // Use theme-aware colors: bg-surface, text-text
              className="bg-surface text-text font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg hover:bg-surface/70 transition duration-300 transform hover:scale-105 flex items-center justify-center text-sm sm:text-base"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
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