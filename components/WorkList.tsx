'use client';

import React, { useState } from 'react';
import { usePageTransition } from './PageTransitionContext';
import { getAllProjects, ProjectItem } from '@/lib/projects';

export const WorkList: React.FC = () => {
  const { navigate } = usePageTransition();
  const projects = getAllProjects();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [coverPos, setCoverPos] = useState({ x: 0, y: 0 });
  const [coverVisible, setCoverVisible] = useState(false);
  const [hasFinePointer] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(pointer:fine)').matches;
  });

  const handleMouseEnter = (project: ProjectItem, e: React.MouseEvent) => {
    if (!hasFinePointer) return;
    setActiveProject(project);
    setCoverPos({ x: e.clientX, y: e.clientY });
    setCoverVisible(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hasFinePointer || !coverVisible) return;
    setCoverPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    if (!hasFinePointer) return;
    setCoverVisible(false);
  };

  return (
    <div className="work-list" id="work-list">
      {projects.map((item) => (
        <div
          key={item.id}
          className="work-item reveal"
          data-cursor
          onClick={() => {
            setCoverVisible(false);
            navigate(`/work/${item.id}`, item.title);
          }}
          onMouseEnter={(e) => handleMouseEnter(item, e)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="work-index">{item.index}</span>
          <span className="work-title">{item.title}</span>
          <span className="work-desc">{item.desc}</span>
          <span className="work-tags">{item.tags}</span>
        </div>
      ))}

      {hasFinePointer && (
        <div
          className={`work-cover ${coverVisible ? 'visible' : ''}`}
          id="workCover"
          style={{
            left: `${coverPos.x}px`,
            top: `${coverPos.y}px`,
          }}
        >
          <div
            className="swatch"
            id="workSwatch"
            style={{
              background: activeProject?.coverImage
                ? `url(${activeProject.coverImage}) center/cover no-repeat`
                : activeProject?.coverGradient || projects[0]?.coverGradient,
            }}
          />
        </div>
      )}
    </div>
  );
};
