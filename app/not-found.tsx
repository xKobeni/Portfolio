import Link from 'next/link';

export default function NotFound() {
  return (
    <section style={{ minHeight: '80svh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <span className="eyebrow">404</span>
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
          Page not found
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
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="back-link" style={{ marginTop: 40, display: 'inline-flex' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>
      </div>
    </section>
  );
}
