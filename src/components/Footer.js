import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function Footer() {
  const { theme } = useTheme(); // Get theme

  return (
    // Use theme-aware colors: bg-surface, text-text-muted
    <section id="contact" className="bg-surface text-text-muted py-20">
      <div className="container mx-auto text-center px-6 lg:px-20">
        {/* Use theme-aware colors: text-text */}
        <h2 className={`text-3xl font-display font-bold mb-8 text-text ${theme === 'neon' ? 'text-glow' : ''}`}>
          Contact Me
        </h2>
        <p className="text-lg mb-8 max-w-lg mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities.
        </p>
        <div className="flex justify-center space-x-8 mb-10">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rajesh-rajoli"
            target="_blank"
            rel="noopener noreferrer"
            // Use theme-aware colors: hover:text-primary
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="text-4xl" />
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/rajesh580"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="GitHub Profile"
          >
            <FaGithub className="text-4xl" />
          </a>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/rajesh_raj__"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="Instagram Profile"
          >
            <FaInstagram className="text-4xl" />
          </a>
          {/* Email */}
          <a
            href="mailto:rajeshrajoli722@gmail.com"
            className="hover:text-primary transition duration-300 transform hover:scale-125"
            aria-label="Email Me"
          >
            <FaEnvelope className="text-4xl" />
          </a>
        </div>
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Rajesh Rajoli. All rights reserved.
        </p>
      </div>
    </section>
  );
}

// FIX: Change default export to match the function name
export default Footer;