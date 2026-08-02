import React, { useState, useEffect, useRef } from 'react';
// FIX: Added FaPalette
import { FaBars, FaTimes, FaPalette } from 'react-icons/fa';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
// FIX: Import the useTheme hook AND the themes array
import { useTheme, themes } from '../../context/ThemeContext';

// --- NEW THEME SWITCHER COMPONENT ---
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  // Define swatches for the menu
  const themeSwatches = {
    light: 'bg-white border-gray-300',
    neon: 'bg-[#FF00FF]', // Using hex for neon pink
    dark: 'bg-neutral-900', // This is a Tailwind color, so it works
    forest: 'bg-[#101A10]', // Custom dark green
    synthwave: 'bg-[#2B213A]', // Custom dark purple
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Theme Picker Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-background p-2 rounded-full text-text hover:text-primary transition-colors"
        aria-label="Toggle theme"
      >
        <FaPalette />
      </button>

      {/* Theme Picker Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            // Use theme-aware colors
            className="absolute right-0 top-12 w-40 bg-surface rounded-lg shadow-xl border border-background p-2"
          >
            {themes.map((themeName) => (
              <button
                key={themeName}
                onClick={() => {
                  setTheme(themeName);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center p-2 rounded-md transition-colors ${
                  theme === themeName
                    ? 'bg-primary/20 text-primary' // Active
                    : 'text-text-muted hover:bg-background' // Inactive
                }`}
              >
                <span className={`w-4 h-4 rounded-full mr-3 border ${themeSwatches[themeName]}`}></span>
                {/* Capitalize first letter */}
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// --- END OF THEME SWITCHER COMPONENT ---


function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    // Use theme-aware colors: bg-surface, text-text
    <header className="bg-surface/90 text-text py-4 sticky top-0 z-50 backdrop-blur-xl border-b border-surface shadow-lg">
      <motion.div
        className="absolute left-0 top-0 h-1 w-full origin-left bg-primary shadow-glow-lg"
        style={{ scaleX: scrollYProgress }}
      />
      <nav className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
        <motion.a
          href="#home"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="text-2xl sm:text-3xl font-display font-black tracking-wider text-primary hover:text-primary-accent transition-colors"
        >
          Rajesh Rajoli
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-5 items-center">
            {links.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35 }}
              >
                <motion.a
                  href={link.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="font-medium text-text-muted hover:text-primary transition duration-200 px-3 py-2 rounded-lg hover:bg-primary/10"
                >
                  {link.name}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="https://drive.google.com/uc?export=download&id=1CNUXbAgFJP5FNTBN9lDZn1j_riAES4QG"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-accent transition duration-200 shadow-md"
          >
            Download Resume
          </motion.a>

          {/* FIX: Add the new ThemeSwitcher */}
          <ThemeSwitcher />

        </div>

        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center space-x-4">
           
           {/* FIX: Add the new ThemeSwitcher */}
           <ThemeSwitcher />

          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -18, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -18, height: 0 }}
            className="md:hidden bg-surface absolute w-full left-0 top-full shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col items-center py-4">
              {links.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="w-full text-center"
                >
                  <motion.a
                    href={link.href}
                    whileTap={{ scale: 0.96 }}
                    className="block py-3 font-medium hover:bg-background transition duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
