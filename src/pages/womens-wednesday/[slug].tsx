import { useParams, Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { WOMENS_WEDNESDAY } from '@/lib/womens-wednesday';

const site = 'https://defendhersport.net';

function renderBody(lines: string[]) {
  return lines.map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2
          key={i}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            lineHeight: 0.9,
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: '56px 0 24px',
          }}
        >
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith('>> ')) {
      return (
        <blockquote
          key={i}
          style={{
            margin: '48px 0',
            padding: '28px 0 0',
            borderTop: '2px solid #e8ff3a',
          }}
        >
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px, 3vw, 32px)', color: '#ffffff', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.01em', margin: 0 }}>
            {line.slice(3)}
          </p>
        </blockquote>
      );
    }
    return (
      <p
        key={i}
        style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 24px' }}
      >
        {line}
      </p>
    );
  });
}

export default function WomensWednesdayPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = WOMENS_WEDNESDAY.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '64px', color: '#e8ff3a', textTransform: 'uppercase' }}>NOT FOUND</h1>
          <Link to="/womens-wednesday" style={{ color: '#d4d4d4', fontFamily: 'var(--font-sans)' }}>← Back to Women's Wednesday</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — Women's Wednesday — DefendHer Sports</title>
        <meta name="description" content={post.summary} />
        <link rel="canonical" href={`${site}/womens-wednesday/${post.slug}`} />
        <meta property="og:title" content={`${post.title} — DefendHer Sports`} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${site}/womens-wednesday/${post.slug}`} />
        <meta property="og:image" content={`${site}${post.image}`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>
        {/* Hero */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(320px, 50vh, 560px)',
            overflow: 'hidden',
            background: '#2e2e2e',
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.45)' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(24px, 4vw, 56px)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e8ff3a', display: 'block', marginBottom: '12px' }}>
              Women's Wednesday · {post.date}
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(40px, 7vw, 88px)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 0.88,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              {post.title}
            </h1>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '48px', flexWrap: 'wrap' }}>
            <Link
              to="/womens-wednesday"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', textDecoration: 'none' }}
            >
              ← All Women's Wednesday
            </Link>
            <a
              href="https://www.instagram.com/defendhersports"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a', textDecoration: 'none' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>
              @defendhersports
            </a>
          </div>

          <p
            style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', color: '#ffffff', lineHeight: 1.6, marginBottom: '40px', fontWeight: 500 }}
          >
            {post.summary}
          </p>

          <div style={{ borderTop: '1px solid #3d3d3d', paddingTop: '40px' }}>
            {renderBody(post.body)}
          </div>
        </div>
      </div>
    </>
  );
}
