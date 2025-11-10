import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function ProjectModal({ project, onClose }) {
  const { theme } = useTheme(); // Get theme

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          // Use theme-aware colors for backdrop
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            // Use theme-aware colors
            className="bg-surface rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-surface"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Use theme-aware colors */}
            <div className="flex justify-between items-center p-6 border-b border-background">
              <h3 className={`text-2xl font-bold font-display text-text ${theme === 'neon' ? 'text-glow' : ''}`}>
                {project.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="text-text-muted hover:text-primary p-1 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto max-h-64 object-cover rounded-md mb-6"
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/1F2937/9CA3AF?text=Project+Image'; }}
              />
              {/* Use theme-aware colors */}
              <p className="text-text-muted mb-6">{project.description}</p>
              
              <div className="mb-6">
                {/* Use theme-aware colors */}
                <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-3">Tech Stack</h4>
                <div className="flex gap-2 flex-wrap">
                  {/* FIX: Check if tags exist before mapping */}
                  {project.tags?.map((tag) => (
                    // Use theme-aware colors
                    <span key={tag} className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {project.githubLink && (
                  // Use theme-aware colors
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-surface text-text font-medium py-2 px-5 rounded-lg shadow-md hover:bg-background transition duration-300"
                  >
                    <FaGithub className="mr-2" />
                    View Source
                  </a>
                )}
                {project.liveDemo && project.liveDemo !== "#" && (
                  // Use theme-aware colors
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-primary text-white font-medium py-2 px-5 rounded-lg shadow-lg hover:bg-primary-accent transition duration-300"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;