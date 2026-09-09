import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projects from '../../data/projects.json';
import ProjectModal from '../ui/ProjectModal';
import { useTheme } from '../../context/ThemeContext';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '../../utils/animations';
import SectionMotionObjects from '../layout/SectionMotionObjects';

function Projects() {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const sortedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) => b.year - a.year || (b.featured === true) - (a.featured === true)
    );
  }, []);

  const latestProject = sortedProjects[0];
  const otherProjects = sortedProjects.slice(1);

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

  // Dedicated Featured / Latest Project Hero Card (Split 2-Column on Desktop)
  const renderLatestProjectCard = (project) => (
    <motion.div
      key={project.id}
      variants={scaleIn}
      className="group bg-background shadow-2xl rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
    >
      {/* High-res Image Cover (7 columns on desktop) */}
      <div className="relative overflow-hidden bg-surface lg:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[300px] lg:min-h-[420px]">
        <img
          src={getProjectImage(project)}
          alt={project.title}
          className="h-full w-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
          onClick={() => setSelectedProject(project)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProjectImage;
          }}
          loading="eager"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-white uppercase tracking-wider shadow-lg">
          Latest Project
        </span>
      </div>

      {/* Content Side (5 columns on desktop) */}
      <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/15 text-primary tracking-wide">
              Featured • {project.year}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-text mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-text-muted mb-5 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {(project.tags || []).map((tag) => (
              <span
                key={tag}
                className="bg-primary/15 text-primary text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-xs text-text-muted mb-6">
            Tech: {project.tech?.join(', ') || 'N/A'}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-surface">
          {project.liveDemo && project.liveDemo !== '#' && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary-accent transition duration-200 shadow-md"
            >
              <FaExternalLinkAlt /> Live Demo
            </motion.a>
          )}
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-surface text-text px-4 py-2.5 rounded-lg border border-background hover:bg-background transition duration-200"
            >
              <FaGithub /> GitHub
            </motion.a>
          )}
          <motion.button
            type="button"
            onClick={() => setSelectedProject(project)}
            whileTap={{ scale: 0.96 }}
            className="ml-auto text-sm text-primary font-semibold hover:underline"
          >
            View details →
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // Standard Grid Project Card
  const renderProjectCard = (project) => (
    <motion.div
      key={project.id}
      variants={scaleIn}
      whileHover={{ y: -4 }}
      className="group bg-background shadow-lg rounded-xl overflow-hidden flex flex-col transition-all duration-300 transform hover:shadow-2xl border border-surface hover:border-primary/30"
    >
      <div className="relative overflow-hidden bg-surface h-52 sm:h-56">
        <img
          src={getProjectImage(project)}
          alt={project.title}
          className="h-full w-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
          onClick={() => setSelectedProject(project)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultProjectImage;
          }}
          loading="eager"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full bg-primary text-white uppercase tracking-wide">
          {project.featured ? 'Featured' : 'Project'}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-bold text-text mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-muted mb-3 flex-grow line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(project.tags || []).map((tag) => (
            <span
              key={tag}
              className="bg-primary/15 text-primary text-xs font-semibold px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-xs text-text-muted mb-4">
          Year: {project.year} • Tech: {project.tech?.join(', ') || 'N/A'}
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2 border-t border-surface/60">
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 bg-surface text-text px-3 py-1.5 text-xs rounded-lg border border-background hover:bg-background transition duration-200"
            >
              <FaGithub /> GitHub
            </motion.a>
          )}
          {project.liveDemo && project.liveDemo !== '#' && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 text-xs rounded-lg hover:bg-primary-accent transition duration-200"
            >
              <FaExternalLinkAlt /> Live Demo
            </motion.a>
          )}
          <motion.button
            type="button"
            onClick={() => setSelectedProject(project)}
            whileTap={{ scale: 0.96 }}
            className="ml-auto text-xs text-primary font-semibold hover:underline"
          >
            View details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="relative overflow-hidden bg-surface/45 py-16 md:py-28">
      <SectionMotionObjects variant="projects" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`text-3xl sm:text-4xl font-display font-bold text-center text-text mb-8 sm:mb-16 ${
            theme === 'neon' ? 'text-glow' : ''
          }`}
        >
          My Projects
        </motion.h2>

        {latestProject && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-12"
          >
            <motion.h3
              variants={fadeUp}
              className="text-2xl font-display font-bold text-primary mb-4"
            >
              Latest Project
            </motion.h3>
            {renderLatestProjectCard(latestProject)}
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
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
