import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    'IDENTITY',
    'INTERACTION',
    'TYPE SYSTEMS',
    'MOTION',
    'PROTOTYPING',
    'ART DIRECTION',
  ];

  return (
    <div className="marquee">
      <div className="marquee-track">
        <div className="marquee-group">
          {items.map((item, idx) => (
            <span key={`g1-${idx}`}>
              <em>{item}</em> —{' '}
            </span>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`g2-${idx}`}>
              <em>{item}</em> —{' '}
            </span>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`g3-${idx}`}>
              <em>{item}</em> —{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
