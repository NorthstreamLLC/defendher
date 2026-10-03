import { Helmet } from '@dr.pogodin/react-helmet';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const site = 'https://defendhersport.net';

export default function ShopPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setSubmitted(true);
    setError('');
  }

  return (
    <>
      <Helmet>
        <title>Shop — DefendHer Sport</title>
        <meta name="description" content="DefendHer neck protection is coming soon. Join the waitlist to be first to shop." />
        <link rel="canonical" href={`${site}/shop`} />
      </Helmet>

      <div
        style={{
          paddingTop: '64px',
          minHeight: '100vh',
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 80px)',
            maxWidth: '640px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '3px',
              background: '#e8ff3a',
              margin: '0 auto 32px',
            }}
          />

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(56px, 10vw, 120px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.88,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 32px',
            }}
          >
            COMING<br />SOON
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: '#d4d4d4',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}
          >
            We're putting the finishing touches on DefendHer. Get notified the moment we're ready to ship.
          </p>

          {submitted ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '2px solid #e8ff3a',
                borderRadius: '9999px',
                padding: '14px 28px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#e8ff3a',
              }}
            >
              You're on the list — we'll be in touch.
            </div>
          ) : (
            <form
              onSubmit={handleSignup}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '2px solid #3d3d3d',
                  borderRadius: '9999px',
                  padding: '14px 24px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  color: '#ffffff',
                  outline: 'none',
                  minWidth: '240px',
                  flex: '1 1 240px',
                  maxWidth: '320px',
                }}
              />
              <button
                type="submit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#e8ff3a',
                  border: '2px solid #e8ff3a',
                  color: '#1a1a1a',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                NOTIFY ME <ArrowRight size={15} />
              </button>
              {error && (
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#ff6b6b', width: '100%', textAlign: 'center' }}>
                  {error}
                </span>
              )}
            </form>
          )}

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', marginTop: '24px' }}>
            Questions?{' '}
            <a href="mailto:Defendhersports@gmail.com" style={{ color: '#d4d4d4', textDecoration: 'none' }}>
              Defendhersports@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
