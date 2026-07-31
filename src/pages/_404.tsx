import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div
      style={{
        paddingTop: 'var(--header-h)',
        minHeight: '100vh',
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', padding: '0 24px' }}>
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(80px, 15vw, 160px)',
            fontWeight: 400,
            lineHeight: 0.85,
            color: '#e8ff3a',
            textTransform: 'uppercase',
            margin: '0 0 16px',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '15px',
            color: '#8a8a8a',
            marginBottom: '32px',
          }}
        >
          This page doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'transparent',
            border: '2px solid #e8ff3a',
            color: '#e8ff3a',
            borderRadius: '9999px',
            padding: '14px 28px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
