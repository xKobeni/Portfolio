'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

const WORD_POOLS = {
  short: [
    'code runs on dreams',
    'pixel perfect design',
    'ship it fast',
    'git commit push',
    'flex box center',
    'async await resolve',
    'zero bugs shipped',
    'clean code wins',
    'deploy on friday',
    'close enough works',
    'the compiler knows',
    'trust the process',
    'edit undo repeat',
    'stack overflow saves',
    'console log everything',
    'it works on mine',
    'npm install fix',
    'type safety matters',
    'read the docs first',
    'prettier saves friendships',
    'docker container ready',
    'the edge case broke',
    'merge conflict resolved',
    'refactor later maybe',
    'code review monday',
  ],
  medium: [
    'the quick brown fox jumps over the lazy dog near the river bank at dawn',
    'pack my box with five dozen liquor jugs and ship them across the ocean',
    'a wizard job is to vex chumps quickly in fog while brewing potions',
    'two driven jocks help fax my big quiz over the phone line at noon',
    'sphinx of black quartz judge my vow before the sun sets on the hill',
    'how vexingly quick daft zebras jump over the sleeping lion at night',
    'the five boxing wizards jump quickly across the mat in the gymnasium',
    'jeopardy alex trebek fun tv quiz game show brings joy to many viewers',
    'sympathizing would fix quaker objectives and bring peace to the world',
    'the jay pig fox zebra and my wolves quack loudly in the morning rain',
    'programming is the art of telling another human what one wants the computer to do',
    'every great developer you know got there by solving problems they were unqualified to solve',
    'the best code is no code at all every line of code you write is a line of code you have to maintain',
  ],
  long: [
    'the best interface is no interface is the golden rule of design if you can find a way to remove the interface do it the user will thank you',
    'first solve the problem then write the code the difference between a programmer and a developer is that a developer knows how to decompose a problem',
    'any fool can write code that a computer can understand good programmers write code that humans can understandMartin Fowler said that and it is true',
    'programming is not about typing it is about thinking you have to think before you type and you have to think about what the computer needs to do',
    'the most dangerous phrase in our language is we have always done it this way that is how bugs are born and how innovation dies slowly',
    'premature optimization is the root of all evil but that does not mean we should ignore performance entirely finding the right balance is the key to great software',
    'code is like humor when you have to explain it it is bad that means the naming is wrong the logic is unclear or the architecture has fundamental problems',
    'fix the cause not the symptom the symptoms are just the tip of the iceberg underneath lies a mountain of technical debt and architectural decay',
    'the only way to go fast is to go well that means writing clean code reading the code before you change it and always leaving the code better than you found it',
    'first make it work then make it right then make it fast in that order do not try to optimize code that does not work because you will waste your time',
  ],
};

type Difficulty = 'short' | 'medium' | 'long';

export const TypingTest: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [target, setTarget] = useState(() => {
    const pool = WORD_POOLS['medium'];
    return pool[Math.floor(Math.random() * pool.length)];
  });
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [chars, setChars] = useState({ correct: 0, total: 0 });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const newSentence = useCallback((diff?: Difficulty) => {
    const pool = WORD_POOLS[diff || difficulty];
    setTarget(pool[Math.floor(Math.random() * pool.length)]);
    setInput('');
    setStartTime(null);
    setElapsed(0);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    setChars({ correct: 0, total: 0 });
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, [difficulty]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInput(val);

    if (!startTime && val.length > 0) {
      const now = Date.now();
      setStartTime(now);
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - now) / 1000));
      }, 100);
    }

    let correct = 0;
    for (let i = 0; i < val.length && i < target.length; i++) {
      if (val[i] === target[i]) correct++;
    }
    setChars({ correct, total: val.length });

    if (val.length >= target.length) {
      const end = Date.now();
      setEndTime(end);
      if (timerRef.current) clearInterval(timerRef.current);

      const timeMinutes = ((startTime || end) - end ? 0 : end - (startTime || end)) / 60000;
      const charsTyped = val.length;
      const standardWpm = timeMinutes > 0 ? Math.round((charsTyped / 5) / timeMinutes) : 0;
      setWpm(standardWpm);
      setElapsed(Math.round((end - (startTime || end)) / 1000));

      let finalCorrect = 0;
      for (let i = 0; i < target.length; i++) {
        if (val[i] === target[i]) finalCorrect++;
      }
      setAccuracy(Math.round((finalCorrect / target.length) * 100));
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const isComplete = endTime !== null;
  const progress = target.length > 0 ? Math.min((input.length / target.length) * 100, 100) : 0;
  const currentCharIndex = input.length;

  return (
    <div className="playground-demo">
      <div className="playground-demo-header" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div className="typing-difficulty">
          {(['short', 'medium', 'long'] as Difficulty[]).map((d) => (
            <button
              key={d}
              className={`playground-btn-sm ${difficulty === d ? 'active' : ''}`}
              onClick={() => { setDifficulty(d); newSentence(d); }}
              data-cursor
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        <span className="mono" style={{ fontSize: '12px', color: 'var(--muted)' }}>
          {isComplete ? `${wpm} WPM · ${accuracy}% accuracy · ${elapsed}s` :
            startTime ? `Time: ${elapsed}s` : 'Type the sentence below'}
        </span>
      </div>

      <div className="typing-progress-bar">
        <div className="typing-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="typing-target">
        {target.split('').map((char, i) => {
          let className = 'typing-char';
          if (i < input.length) {
            className += input[i] === char ? ' correct' : ' incorrect';
          } else if (i === currentCharIndex) {
            className += ' cursor';
          }
          // Highlight current word
          const words = target.split(' ');
          let charWordStart = 0;
          let currentWordIndex = 0;
          for (let w = 0; w < words.length; w++) {
            if (i < charWordStart + words[w].length) {
              currentWordIndex = w;
              break;
            }
            charWordStart += words[w].length + 1;
          }
          let wordStart = 0;
          for (let w = 0; w < currentWordIndex; w++) {
            wordStart += words[w].length + 1;
          }
          if (i >= wordStart && i < wordStart + words[currentWordIndex].length) {
            className += ' current-word';
          }
          return (
            <span key={i} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        ref={inputRef}
        className="typing-input"
        value={input}
        onChange={handleInput}
        onPaste={handlePaste}
        onContextMenu={(e) => e.preventDefault()}
        disabled={isComplete}
        placeholder={isComplete ? 'Done!' : 'Start typing...'}
        spellCheck={false}
        autoFocus
      />

      {isComplete && (
        <div className="typing-results">
          <div className="typing-result">
            <span className="typing-result-value">{wpm}</span>
            <span className="typing-result-label">WPM</span>
          </div>
          <div className="typing-result">
            <span className="typing-result-value">{accuracy}%</span>
            <span className="typing-result-label">Accuracy</span>
          </div>
          <div className="typing-result">
            <span className="typing-result-value">{elapsed}s</span>
            <span className="typing-result-label">Time</span>
          </div>
          <div className="typing-result">
            <span className="typing-result-value">{chars.correct}/{chars.total}</span>
            <span className="typing-result-label">Chars</span>
          </div>
        </div>
      )}

      <div className="playground-demo-actions">
        <button className="playground-btn" onClick={() => newSentence()} data-cursor>
          {isComplete ? 'TRY AGAIN' : 'NEW SENTENCE'}
        </button>
      </div>
    </div>
  );
};
