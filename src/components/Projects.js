import React, { useEffect, useState } from 'react';
import projectsData from '../data/projects.json';
import ProjectModal from './ProjectModal';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // prefer featured projects first
    const list = (projectsData || []).slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    setProjects(list);
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article
              key={p.id}
              className="card project-card p-4 hover:shadow-xl cursor-pointer transition-transform transform hover:-translate-y-1"
              onClick={() => setSelected(p)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(p);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="card-body flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <h3 className="project-title text-lg font-bold">{p.title}</h3>
                  {p.featured && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Featured</span>}
                </div>

                <p className="text-gray-700 mt-3 flex-1">{p.description}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {(p.tech || []).slice(0, 4).map((t, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded">{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {p.liveDemo && p.liveDemo !== '#' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(p.liveDemo, '_blank');
                        }}
                        className="px-3 py-1 rounded-md border text-sm"
                        type="button"
                      >
                        Live
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (p.githubLink) window.open(p.githubLink, '_blank');
                      }}
                      className="btn-accent text-sm"
                      type="button"
                    >
                      Source
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}

export default Projects;
