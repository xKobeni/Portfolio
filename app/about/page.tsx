'use client';

import React from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';

export default function AboutPage() {
  const { navigate } = usePageTransition();

  const skills = [
    'Design Systems',
    'Interaction Design',
    'Motion & Kinetic Animation',
    'Product Strategy',
    'Figma & Prototyping',
    'React & Next.js',
    'Creative Coding & WebGL',
    'Art Direction',
  ];

  return (
    <div className="view active" id="view-about">
      <div className="container">
        <button
          className="back-link"
          data-cursor
          onClick={() => navigate('/', 'Index')}
          style={{ marginTop: '120px' }}
        >
          ← Index
        </button>

        <div className="about-hero">
          <div>
            <div className="eyebrow" style={{ marginTop: '16px' }}>
              Index 03 — About
            </div>
            <h1 className="about-heading">
              Ten years learning
              <br />
              to design the <em>frame</em>
              <br />
              between two states.
            </h1>
            <p className="about-lede">
              First as an illustrator, now as someone who thinks in systems — the hover, the load, the scroll matter as much as the screens either side of them.
            </p>
          </div>
          <div className="about-portrait">
            <div
              className="art-panel"
              style={{
                background: 'url(/about/portrait.svg) center/cover no-repeat',
              }}
            />
          </div>
        </div>

        {/* Story & Philosophy */}
        <div className="about-copy">
          <div>
            <p>
              I care about the <em>transition</em> more than either state alone — what a page feels like while it&apos;s still becoming itself.
            </p>
            <p>
              Most of my work sits at the edge of brand and product: identity systems that have to survive being built, and interfaces that have to feel considered, not just correct.
            </p>
          </div>
          <div className="about-facts">
            <div className="fact">
              <span className="fact-k">Based</span>
              <span className="fact-v">Manila, Philippines</span>
            </div>
            <div className="fact">
              <span className="fact-k">Focus</span>
              <span className="fact-v">Interaction &amp; Brand Systems</span>
            </div>
            <div className="fact">
              <span className="fact-k">Tools</span>
              <span className="fact-v">Figma, After Effects, Framer, Code</span>
            </div>
            <div className="fact">
              <span className="fact-k">Currently</span>
              <span className="fact-v">Design Lead, Studio Index</span>
            </div>
          </div>
        </div>

        {/* Capabilities & Skills Pills */}
        <div className="reveal" style={{ marginTop: '90px' }}>
          <div className="eyebrow">Index 03.0 — Capabilities &amp; Stack</div>
          <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
            {skills.map((skill, idx) => (
              <span key={idx} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline stagger reveal">
          <div className="eyebrow">Index 03.1 — A Rough Timeline</div>
          <div className="timeline-item">
            <span className="t-year mono">2024—Now</span>
            <span className="t-role">Design Lead, Studio Index</span>
            <span className="t-desc">
              Leading brand and product design for early-stage startups, from naming through shipped interface.
            </span>
          </div>
          <div className="timeline-item">
            <span className="t-year mono">2021—2024</span>
            <span className="t-role">Senior Product Designer, Fieldnote</span>
            <span className="t-desc">
              Owned the interaction language for a journaling app used by 200k+ people.
            </span>
          </div>
          <div className="timeline-item">
            <span className="t-year mono">2018—2021</span>
            <span className="t-role">Freelance Illustrator &amp; Designer</span>
            <span className="t-desc">
              Editorial illustration and identity work for independent publishers and small brands.
            </span>
          </div>
          <div className="timeline-item">
            <span className="t-year mono">2016—2018</span>
            <span className="t-role">BFA, Visual Communication</span>
            <span className="t-desc">
              Focused a thesis year on kinetic typography and generative print systems.
            </span>
          </div>
        </div>

        <div className="teaser reveal" style={{ marginTop: '110px' }}>
          <p>Have something that needs both a system and a feeling?</p>
          <button
            className="back-link"
            data-cursor
            onClick={() => navigate('/', 'Index', 'contact')}
          >
            SAY HELLO →
          </button>
        </div>

        <footer>
          <span>© 2026 Alex Reyes</span>
          <span>Index 03</span>
        </footer>
      </div>
    </div>
  );
}
