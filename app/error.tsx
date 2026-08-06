'use client';

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section style={{ minHeight: '80svh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <span className="eyebrow">Error</span>
        <h1
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(44px, 8vw, 100px)',
            lineHeight: 1.02,
            letterSpacing: '-.02em',
            marginTop: 16,
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            color: 'var(--muted)',
            fontSize: 17,
            lineHeight: 1.7,
            marginTop: 24,
            maxWidth: 440,
          }}
        >
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={retry}
          className="back-link"
          style={{ marginTop: 40, display: 'inline-flex' }}
          data-cursor
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Try again
        </button>
      </div>
    </section>
  );
}
