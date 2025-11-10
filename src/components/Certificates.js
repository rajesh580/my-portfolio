import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Removed unused 'FaImage' import, added 'FaExternalLinkAlt'
import { FaFileCode, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import certificates from '../data/certificates.json';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function Certificates() {
  const { theme } = useTheme(); // Get theme
  const defaultCertificate = certificates.length > 0 ? certificates[0] : null;
  const [selectedCert, setSelectedCert] = useState(defaultCertificate);

  return (
    // Use theme-aware colors: bg-background
    <section id="certificates" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Use theme-aware colors: text-text */}
        <h2 className={`text-4xl font-display font-bold text-center text-text mb-16 ${theme === 'neon' ? 'text-glow' : ''}`}>
          Licenses & Certificates
        </h2>

        {/* VS Code style layout */}
        {/* Use theme-aware colors: bg-surface, border-surface */}
        <div className="bg-surface rounded-lg shadow-2xl min-h-[600px] flex flex-col md:flex-row overflow-hidden border border-surface">
          
          {/* Sidebar (File Explorer) */}
          {/* Use theme-aware colors: bg-background, text-text, text-text-muted */}
          <div className="w-full md:w-1/4 lg:w-1/5 bg-background p-4 flex-shrink-0 border-r border-surface">
            <h3 className="text-text font-semibold text-sm uppercase tracking-wider mb-4">
              Explorer
            </h3>
            <p className="text-text-muted text-xs uppercase font-bold mb-2">
              Certifications
            </p>
            <ul>
              {certificates.map((cert) => (
                <li key={cert.id}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className={`w-full text-left px-3 py-1.5 rounded-md flex items-center text-sm transition-colors ${
                      selectedCert && selectedCert.id === cert.id
                        ? 'bg-primary/20 text-primary' // Active file
                        : 'text-text-muted hover:bg-surface' // Inactive file
                    }`}
                  >
                    <FaFileCode className="mr-2 flex-shrink-0" />
                    <span className="truncate">{cert.title}.png</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content (Editor) */}
          <div className="w-full md:w-3/4 lg:w-4/5 bg-surface flex flex-col">
            {/* Tab Bar */}
            {/* Use theme-aware colors: bg-background, bg-surface, text-primary, text-text-muted */}
            <div className="bg-background flex-shrink-0">
              {selectedCert && (
                <div className="inline-flex items-center bg-surface px-4 py-2 text-primary border-t-2 border-primary">
                  <FaFileCode className="mr-2" />
                  <span className="text-sm">{selectedCert.title}.png</span>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="ml-4 text-text-muted hover:text-text"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            {/* Certificate Viewer */}
            <AnimatePresence>
              {!selectedCert ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-grow flex flex-col items-center justify-center p-8 text-center"
                >
                  {/* Use theme-aware colors: text-text-muted */}
                  <p className="text-text-muted text-lg">
                    Select a certificate from the explorer to view details.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={selectedCert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow p-8 overflow-y-auto"
                >
                  <div className="max-w-3xl mx-auto">
                    {/* Use theme-aware colors: text-text, text-primary */}
                    <h3 className={`text-3xl font-display font-bold text-text mb-3 ${theme === 'neon' ? 'text-glow' : ''}`}>
                      {selectedCert.title}
                    </h3>
                    <p className="text-lg text-primary font-semibold mb-6">
                      Issued by: {selectedCert.issuer}
                    </p>
                    <p className="text-text-muted text-base mb-6">
                      {selectedCert.description}
                    </p>
                    
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      // Use theme-aware colors: bg-primary, hover:bg-primary-accent
                      className="inline-flex items-center bg-primary text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:bg-primary-accent transition duration-300 mb-10 transform hover:scale-105"
                    >
                      Verify Credential
                      <FaExternalLinkAlt className="ml-2" />
                    </a>

                    {/* Certificate Image */}
                    <div>
                      {/* Use theme-aware colors: text-text */}
                      <h4 className="text-xl font-display font-semibold text-text mb-4">
                        Certificate Image
                      </h4>
                      {/* Use theme-aware colors: bg-background */}
                      <div className="bg-background rounded-lg p-4 shadow-inner">
                        <img
                          src={selectedCert.imageUrl}
                          alt={`${selectedCert.title} Certificate`}
                          className="w-full h-auto rounded-md object-contain max-h-[400px]"
                          onError={(e) => { e.target.src = 'https://placehold.co/800x600/111827/9CA3AF?text=Add+Your+Certificate+Image'; }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificates;