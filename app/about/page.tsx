'use client';

import React from 'react';
import { usePageTransition } from '@/components/PageTransitionContext';

export default function AboutPage() {
  const { navigate } = usePageTransition();

  const frontend = ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'jQuery', 'React', 'Next.js', 'Flutter'];
  const backend = ['Node.js', 'PHP', 'Python', 'C++', 'MongoDB', 'MySQL', 'PostgreSQL'];
  const tools = ['Git', 'GitHub', 'Figma', 'Canva', 'Blender', 'Postman', 'AppScript'];
  const gameDev = ['Unreal Engine', 'Godot Engine', 'Unity'];
  const aiMl = ['Python', 'R', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Keras', 'Prompt Engineering', 'NLP'];

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
              I write code<br />
              that <em>ships</em>.
            </h1>
            <p className="about-lede">
              I&apos;m Adrian Perce, a Fullstack developer and freelancer based in Batangas, Philippines. I build things from the database to the browser, and I ship them too.
            </p>
          </div>
          <div className="about-portrait">
            <div
              className="art-panel"
              style={{
                background: 'url(/about/me.jpg) center/cover no-repeat',
              }}
            />
          </div>
        </div>

        {/* Story & Philosophy */}
        <div className="about-copy">
          <div>
            <p>
              When I&apos;m not building client projects, you&apos;ll usually find me
              experimenting with AI, learning new technologies, or creating
              small interactive projects <em>just for fun</em>.
            </p>
            <p>
              My goal is simple: create applications that are fast, intuitive, and enjoyable to use.
            </p>
          </div>
          <div className="about-facts">
            <div className="fact">
              <span className="fact-k">Based</span>
              <span className="fact-v">Batangas, Philippines</span>
            </div>
            <div className="fact">
              <span className="fact-k">Focus</span>
              <span className="fact-v">Fullstack & AI Development</span>
            </div>
            <div className="fact">
              <span className="fact-k">Work</span>
              <span className="fact-v">Freelance &amp; Projects</span>
            </div>
            <div className="fact">
              <span className="fact-k">Available</span>
              <span className="fact-v">For freelance work</span>
            </div>
            <div className="fact">
              <span className="fact-k">Resume</span>
              <a href="/about/Resume_Adrian Perce.pdf" download className="fact-v" data-cursor>
                Download ↓
              </a>
            </div>
          </div>
        </div>

        {/* Frontend */}
        <div className="reveal" style={{ marginTop: '90px' }}>
          <div className="eyebrow">Index 03.0 — Frontend</div>
          <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
            {frontend.map((skill, idx) => (
              <span key={idx} className="skill-pill">{skill}</span>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="reveal" style={{ marginTop: '48px' }}>
          <div className="eyebrow">Index 03.1 — Backend</div>
          <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
            {backend.map((skill, idx) => (
              <span key={idx} className="skill-pill">{skill}</span>
            ))}
          </div>
        </div>

        {/* Tools & Design */}
        <div className="reveal" style={{ marginTop: '48px' }}>
          <div className="eyebrow">Index 03.2 — Tools &amp; Design</div>
          <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
            {tools.map((skill, idx) => (
              <span key={idx} className="skill-pill">{skill}</span>
            ))}
          </div>
        </div>

        {/* Game Development */}
        <div className="reveal" style={{ marginTop: '48px' }}>
          <div className="eyebrow">Index 03.3 — Game Development</div>
          <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
            {gameDev.map((skill, idx) => (
              <span key={idx} className="skill-pill">{skill}</span>
            ))}
          </div>
        </div>

        {/* AI & Machine Learning */}
        <div className="reveal" style={{ marginTop: '48px' }}>
          <div className="eyebrow">Index 03.4 — AI &amp; Machine Learning</div>
          <div className="stagger" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
            {aiMl.map((skill, idx) => (
              <span key={idx} className="skill-pill">{skill}</span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline stagger reveal">
          <div className="eyebrow">Index 03.5 — Experience</div>
          <div className="timeline-item">
            <span className="t-year mono">Jun 2025 — Present</span>
            <span className="t-role">Freelance Fullstack Developer</span>
            <span className="t-desc">
              Building and shipping full-stack web, mobile, and desktop applications; from concept to deployment.
            </span>
          </div>
          <div className="timeline-item">
            <span className="t-year mono">Feb 2026 — May 2026</span>
            <span className="t-role">Software Developer Intern, City Government of Lipa</span>
            <span className="t-desc">
              Led the development of 4 government information systems, digitizing manual workflows and automating internal processes.
            </span>
          </div>
          <div className="timeline-item">
            <span className="t-year mono">Feb 2025 — Dec 2025</span>
            <span className="t-role">Web Developer Intern, Tech Executive Labs</span>
            <span className="t-desc">
              Developed and maintained web applications, working across frontend and backend.
            </span>
          </div>
        </div>

        {/* Education */}
        <div className="reveal" style={{ marginTop: '90px' }}>
          <div className="eyebrow">Index 03.6 — Education</div>
          <div className="timeline stagger" style={{ marginTop: '20px' }}>
            <div className="timeline-item">
              <span className="t-year mono">Aug 2022 — Jul 2026</span>
              <span className="t-role">BS in Information Technology, Major in Business Analytics</span>
              <span className="t-desc">
                Batangas State University TNEU — Lipa
              </span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="reveal" style={{ marginTop: '48px' }}>
          <div className="eyebrow">Index 03.7 — Certifications</div>
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>
              Google Project Management Professional Certificate
            </span>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>
              Google Prompting Essentials Specialization
            </span>
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>
              Google AI Essentials Specialization
            </span>
          </div>
        </div>

        <div className="teaser reveal" style={{ marginTop: '110px' }}>
          <p>Need something built from the ground up?</p>
          <button
            className="back-link"
            data-cursor
            onClick={() => navigate('/', 'Index', 'contact')}
          >
            LET&apos;S BUILD →
          </button>
        </div>

        <footer>
          <span>© 2026 Adrian Perce</span>
          <span>Index 03</span>
        </footer>
      </div>
    </div>
  );
}
