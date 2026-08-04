'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { usePageTransition } from '@/components/PageTransitionContext';
import { getProjectById, getPrevNextProjects } from '@/lib/projects';

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProjectById(slug);
  const { navigate } = usePageTransition();

  if (!project) {
    notFound();
  }

  const { prev, next } = getPrevNextProjects(slug);

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
}
