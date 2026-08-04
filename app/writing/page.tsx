'use client';

import React from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';
import { getAllPosts } from '@/lib/posts';

export default function WritingPage() {
  const { navigate } = usePageTransition();
  const posts = getAllPosts();

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
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>development &amp; process</em>
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
            Occasional writing about development, AI, and the decisions that
            happen between the idea and the shipped thing.
          </p>
        </div>

        <div className="work-list stagger reveal" style={{ marginTop: '60px' }}>
          {posts.map((post) => (
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
          <span>© 2026 Adrian Perce</span>
          <span>Index 06</span>
        </footer>
      </div>
    </div>
  );
}
