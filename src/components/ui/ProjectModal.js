import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

function ProjectModal({ project, onClose }) {
  const { theme } = useTheme(); // Get theme

  const defaultProjectImage = 'https://placehold.co/800x450/111827/9CA3AF?text=Project+Preview';
  const getProjectImage = (project) => {
    if (project?.imageUrl) {
      if (!/^https?:\/\//i.test(project.imageUrl)) {
        const publicPath = project.imageUrl.replace(/^\/+/, '');
        return `${process.env.PUBLIC_URL}/${publicPath}`;
      }
      return project.imageUrl;
    }
    if (project?.githubLink) {
      const match = project.githubLink.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (match) {
        return `https://opengraph.githubassets.com/1/${match[1]}/${match[2]}`;
      }
    }
    return defaultProjectImage;
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 30 } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
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
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            // Use theme-aware colors
            className="flex h-screen w-screen flex-col overflow-hidden bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Use theme-aware colors */}
            <div className="flex flex-none items-start justify-between gap-4 border-b border-background p-4 sm:p-6">
              <h3 className={`text-xl sm:text-2xl font-bold font-display text-text ${theme === 'neon' ? 'text-glow' : ''}`}>
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

            <div className="grid flex-1 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-6">
              <div className="flex min-h-[55vh] items-center justify-center overflow-hidden rounded-md bg-background p-2 sm:min-h-[62vh] lg:h-full lg:min-h-0">
                <img
                  src={getProjectImage(project)}
                  alt={project.title}
                  className="h-full max-h-[68vh] w-full object-contain lg:max-h-[calc(100vh-9rem)]"
                  onError={(e) => { e.target.onerror = null; e.target.src = defaultProjectImage; }}
                />
              </div>

              <div className="pt-6 lg:pt-0">
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

                <div className="flex flex-wrap gap-4">
                  {project.githubLink && (
                    // Use theme-aware colors
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-background text-text font-medium py-2 px-5 rounded-lg shadow-md hover:bg-background/80 transition duration-300"
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
