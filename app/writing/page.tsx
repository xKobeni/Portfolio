'use client';

import React from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';

const POSTS = [
  {
    index: '01',
    title: 'The Frame Between Two States',
    desc: 'Why the transition matters more than either screen on either side of it.',
    date: 'Mar 2026',
    tag: 'Interaction',
  },
  {
    index: '02',
    title: 'Motion as Hierarchy',
    desc: 'Using timing and easing to tell people what to look at first.',
    date: 'Jan 2026',
    tag: 'Motion',
  },
  {
    index: '03',
    title: 'Building a Brand That Survives Being Built',
    desc: 'How to design identity systems that don\'t fall apart the moment a developer touches them.',
    date: 'Nov 2025',
    tag: 'Brand',
  },
  {
    index: '04',
    title: 'Grain, Texture, and the Digital Surface',
    desc: 'Why a little noise makes screens feel less like screens.',
    date: 'Sep 2025',
    tag: 'Visual',
  },
];

export default function WritingPage() {
  const { navigate } = usePageTransition();

  return (
    <div className="view active" id="view-writing">
      <div className="container">
        <button
          className="back-link"
          data-cursor
          onClick={() => navigate('/', 'Index')}
          style={{ marginTop: '120px' }}
        >
          ← Index
        </button>

        <div style={{ paddingTop: '24px' }}>
          <div className="eyebrow">Index 06 — Writing</div>
          <h1
            className="project-title"
            style={{ marginTop: '0', fontSize: 'clamp(44px, 7vw, 90px)' }}
          >
            Notes on<br />
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>design &amp; process</em>
          </h1>
          <p
            style={{
              marginTop: '24px',
              maxWidth: '480px',
              color: 'var(--muted)',
              fontSize: '16px',
              lineHeight: '1.7',
            }}
          >
            Occasional writing about interaction, motion, brand systems, and the
            decisions that happen between the brief and the shipped thing.
          </p>
        </div>

        <div className="work-list stagger reveal" style={{ marginTop: '60px' }}>
          {POSTS.map((post) => (
            <div key={post.index} className="work-item reveal" data-cursor>
              <span className="work-index">{post.index}</span>
              <span className="work-title">{post.title}</span>
              <span className="work-desc">{post.desc}</span>
              <span className="work-tags">
                {post.tag} — {post.date}
              </span>
            </div>
          ))}
        </div>

        <div className="teaser reveal" style={{ marginTop: '80px' }}>
          <p>More coming soon — subscribe to know when something ships.</p>
          <button
            className="back-link"
            data-cursor
            onClick={() => navigate('/', 'Index', 'contact')}
          >
            GET IN TOUCH →
          </button>
        </div>

        <footer>
          <span>© 2026 Alex Reyes</span>
          <span>Index 06</span>
        </footer>
      </div>
    </div>
  );
}
