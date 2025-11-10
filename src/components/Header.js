import React, { useState, useEffect, useRef } from 'react';
// FIX: Added FaPalette
import { FaBars, FaTimes, FaPalette } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Import the useTheme hook AND the themes array
import { useTheme, themes } from '../context/ThemeContext'; 

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
    <header className="bg-surface/90 text-text py-4 sticky top-0 z-50 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
        <a href="#home" className="text-2xl font-display font-bold text-glow">
          Rajesh Rajoli
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-medium hover:text-primary transition duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          // Use theme-aware colors: bg-surface
          className="md:hidden bg-surface absolute w-full left-0 top-full shadow-lg"
        >
          <ul className="flex flex-col items-center py-4">
            {links.map((link) => (
              <li key={link.name} className="w-full text-center">
                <a
                  href={link.href}
                  // Use theme-aware colors: hover:bg-background
                  className="block py-3 font-medium hover:bg-background transition duration-200"
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

export default Header;