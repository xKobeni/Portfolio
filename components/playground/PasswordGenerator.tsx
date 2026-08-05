'use client';

import React, { useState, useCallback } from 'react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    let result = '';
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    for (let i = 0; i < length; i++) {
      result += chars[arr[i] % chars.length];
    }
    setPassword(result);
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = length >= 20 && (uppercase ? 1 : 0) + (lowercase ? 1 : 0) + (numbers ? 1 : 0) + (symbols ? 1 : 0) >= 3
    ? 'Strong'
    : length >= 12
    ? 'Medium'
    : 'Weak';

  const strengthColor = strength === 'Strong' ? '#22c55e' : strength === 'Medium' ? '#eab308' : '#ef4444';

  return (
    <div className="playground-demo">
      <div className="playground-demo-header">
        <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>
          Secure random password generator
        </span>
      </div>

      <div className="pw-output">
        <span className="pw-text mono">{password || 'Click generate'}</span>
        {password && (
          <button className="pw-copy playground-btn" onClick={copyToClipboard} data-cursor>
            {copied ? 'COPIED!' : 'COPY'}
          </button>
        )}
      </div>

      <div className="pw-strength">
        <div className="pw-strength-bar">
          <div className="pw-strength-fill" style={{ width: strength === 'Strong' ? '100%' : strength === 'Medium' ? '60%' : '30%', background: strengthColor }} />
        </div>
        <span className="mono" style={{ fontSize: '11px', color: strengthColor }}>{strength}</span>
      </div>

      <div className="pw-options">
        <div className="pw-option">
          <label className="mono" style={{ fontSize: '12px' }}>Length: {length}</label>
          <input
            type="range"
            min={8}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="pw-checkboxes">
          <label className="pw-checkbox">
            <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
            <span className="mono">ABC</span>
          </label>
          <label className="pw-checkbox">
            <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />
            <span className="mono">abc</span>
          </label>
          <label className="pw-checkbox">
            <input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} />
            <span className="mono">123</span>
          </label>
          <label className="pw-checkbox">
            <input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} />
            <span className="mono">!@#</span>
          </label>
        </div>
      </div>

      <div className="playground-demo-actions">
        <button className="playground-btn" onClick={generate} data-cursor>
          GENERATE
        </button>
      </div>
    </div>
  );
};
