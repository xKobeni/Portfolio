'use client';

import React from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';
import { ProjectItem } from '@/lib/projects';

interface ProjectPageClientProps {
  project: ProjectItem;
  prev: ProjectItem;
  next: ProjectItem;
}

export const ProjectPageClient: React.FC<ProjectPageClientProps> = ({ project, prev, next }) => {
  const { navigate } = usePageTransition();

  const coverStyle = project.coverImage
    ? { background: `url(${project.coverImage}) center/cover no-repeat` }
    : { background: project.coverGradient };

  const stripStyle = project.stripImage
    ? { background: `url(${project.stripImage}) center/cover no-repeat` }
    : { background: project.stripGradient };

  return (
    <div className="view active" id={`view-project-${project.id}`}>
      <div className="container project-head">
        <button
          className="back-link"
          data-cursor
          onClick={() => navigate('/', 'Index', 'work-list')}
        >
          ← All work
        </button>

        <div className="eyebrow" style={{ marginTop: '36px' }}>
          {project.category}
        </div>
        <h1 className="project-title">{project.title}</h1>

        <div className="project-meta">
          <div className="m-item">
            <span className="m-k">Role</span>
            <span className="m-v">{project.role}</span>
          </div>
          <div className="m-item">
            <span className="m-k">Year</span>
            <span className="m-v">{project.year}</span>
          </div>
          <div className="m-item">
            <span className="m-k">Stack</span>
            <span className="m-v">{project.stack}</span>
          </div>
          <div className="m-item">
            <span className="m-k">Client</span>
            <span className="m-v">{project.client}</span>
          </div>
          {(project.github || project.live) && (
            <div className="m-item">
              <span className="m-k">Links</span>
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" data-cursor>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link" data-cursor>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    <span>Visit Site</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="project-cover">
          <div className="art-panel" style={coverStyle} />
        </div>

        <div className="project-body">
          <div className="pb-label">Overview</div>
          <div className="pb-copy">
            <p>{project.overview}</p>
          </div>
        </div>

        <div className="project-block">
          <div className="project-body">
            <div className="pb-label">Approach</div>
            <div className="pb-copy">
              {project.approach.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="project-strip">
          <div className="art-panel" style={stripStyle} />
        </div>

        <div className="project-block" style={{ marginTop: '80px' }}>
          <div className="project-body">
            <div className="pb-label">Outcome</div>
            <div className="pb-copy">
              <p>{project.outcome}</p>
            </div>
          </div>
        </div>

        <div className="project-nav">
          <button
            data-cursor
            onClick={() => navigate(`/work/${prev.id}`, prev.title)}
          >
            <span className="pn-label">← Previous</span>
            <span className="pn-title">{prev.title}</span>
          </button>
          <button
            data-cursor
            onClick={() => navigate(`/work/${next.id}`, next.title)}
            className="pn-next"
          >
            <span className="pn-label">Next →</span>
            <span className="pn-title">{next.title}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
