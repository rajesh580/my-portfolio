import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projects from '../data/projects.json';
import ProjectModal from './ProjectModal';
import { useTheme } from '../context/ThemeContext'; // Import theme hook

function Projects() {
  const { theme } = useTheme(); // Get theme
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const sortedProjects = [...projects].sort((a, b) => b.year - a.year || (b.featured === true) - (a.featured === true));
  const latestProject = sortedProjects[0];
  const otherProjects = sortedProjects.slice(1);

  const defaultProjectImage = 'https://placehold.co/800x450/111827/9CA3AF?text=Project+Preview';
  const getProjectImage = (project) => {
    if (project?.imageUrl) {
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

  React.useEffect(() => {
    sortedProjects.forEach((project) => {
      const image = new Image();
      image.src = getProjectImage(project);
      image.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [project.id]: true }));
      };
      image.onerror = () => {
        setLoadedImages((prev) => ({ ...prev, [project.id]: true }));
      };
    });
  }, [sortedProjects]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const renderProjectCard = (project, highlight = false) => (
    <motion.div
      key={project.id}
      variants={cardVariants}
      className={`bg-background shadow-lg rounded-xl overflow-hidden flex flex-col transition-all duration-300 transform ${highlight ? 'lg:scale-100 shadow-2xl' : 'hover:shadow-2xl hover:-translate-y-2'} `}
    >
      <div className="relative">
        {!loadedImages[project.id] && (
          <div className={`absolute inset-0 ${highlight ? 'h-80' : 'h-48'} bg-surface shimmer`} />
        )}

        <img
          src={getProjectImage(project)}
          alt={project.title}
          className={`w-full ${highlight ? 'h-80' : 'h-48'} object-cover cursor-pointer transition-opacity duration-500 ${loadedImages[project.id] ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSelectedProject(project)}
          onLoad={() => setLoadedImages((prev) => ({ ...prev, [project.id]: true }))}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProjectImage;
            setLoadedImages((prev) => ({ ...prev, [project.id]: true }));
          }}
          loading="eager"
        />

        <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full bg-primary text-white uppercase tracking-wide">
          {highlight ? 'Latest' : project.featured ? 'Featured' : 'Project'}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-bold text-text mb-2">{project.title}</h3>
        <p className="text-sm text-text-muted mb-3 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {(project.tags || []).map((tag) => (
            <span key={tag} className="bg-primary/15 text-primary text-xs font-semibold px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="text-xs text-text-muted mb-4">Year: {project.year} • Tech: {project.tech?.join(', ') || 'N/A'}</div>

        <div className="flex flex-wrap gap-3">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-surface text-text px-4 py-2 rounded-lg border border-background hover:bg-background transition duration-200"
            >
              <FaGithub /> GitHub
            </a>
          )}
          {project.liveDemo && project.liveDemo !== '#' && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-accent transition duration-200"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
          <button
            type="button"
            onClick={() => setSelectedProject(project)}
            className="ml-auto text-sm text-primary font-semibold hover:underline"
          >
            View details
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="bg-surface py-16 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20">
        <h2 className={`text-3xl sm:text-4xl font-display font-bold text-center text-text mb-8 sm:mb-16 ${theme === 'neon' ? 'text-glow' : ''}`}>
          My Projects
        </h2>

        {latestProject && (
          <div className="mb-10">
            <h3 className="text-2xl font-display font-bold text-primary mb-4">Latest Project</h3>
            {renderProjectCard(latestProject, true)}
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10"
        >
          {otherProjects.map((project) => renderProjectCard(project))}
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export default Projects;
