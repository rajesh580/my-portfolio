import React from 'react';

function ProjectModal({project, onClose}){
  if(!project) return null;
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(2,6,23,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:80}} onClick={onClose}>
      <div onClick={(e)=>e.stopPropagation()} className="card p-6 max-w-2xl">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <button type="button" onClick={onClose} aria-label="Close project details" className="px-3 py-1">Close</button>
        </div>
        <p className="mt-3 text-gray-700">{project.description}</p>
        <div className="mt-4">
          <div className="text-sm text-gray-600">Tech stack</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {project.tech?.map((t,i)=>(<span key={i} className="px-2 py-1 bg-gray-100 rounded">{t}</span>))}
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-accent">Source</a>}
          {project.liveDemo && project.liveDemo!="#" && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border">Live Demo</a>}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;