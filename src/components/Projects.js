import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
// FIX: Import the project data
import projects from '../data/projects.json'; 
import ProjectModal from './ProjectModal';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function Projects() {
  const { theme } = useTheme(); // Get theme
  const [selectedProject, setSelectedProject] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // Use theme-aware colors: bg-surface
    <section id="projects" className="bg-surface py-16 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Use theme-aware colors: text-text */}
        <h2 className={`text-3xl sm:text-4xl font-display font-bold text-center text-text mb-8 sm:mb-16 ${theme === 'neon' ? 'text-glow' : ''}`}>
          My Projects
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
        >
          {/* FIX: Map over projects from JSON */}
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              // Use theme-aware colors: bg-background
              className="bg-background shadow-lg rounded-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setSelectedProject(project)}
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/1F2937/9CA3AF?text=Project+Image'; }}
              />
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                {/* Use theme-aware colors: text-text */}
                <h3 className="text-lg sm:text-xl font-bold font-display text-text mb-2">
                  {project.title}
                </h3>
                {/* Use theme-aware colors: text-text-muted */}
                <p className="text-sm sm:text-base text-text-muted mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tags - Use theme-aware colors: bg-primary/10 text-primary */}
                <div className="flex flex-wrap gap-2 mb-4 text-xs sm:text-sm">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary text-xs font-semibold px-2 sm:px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links - Use theme-aware colors: text-text-muted hover:text-primary */}
                <div className="flex flex-wrap justify-start gap-4 sm:space-x-6 mt-auto text-sm sm:text-base">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-primary transition duration-200 flex items-center"
                    aria-label={`${project.title} GitHub Repository`}
                  >
                    <FaGithub className="mr-2" /> GitHub
                  </a>
                  {project.liveDemo && project.liveDemo !== '#' && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-primary transition duration-200 flex items-center"
                      aria-label={`${project.title} Live Demo`}
                    >
                      <FaExternalLinkAlt className="mr-2" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}

export default Projects;