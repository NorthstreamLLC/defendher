import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { WOMENS_WEDNESDAY } from '@/lib/womens-wednesday';

const site = 'https://defendhersportsgear.com';

export default function WomensWednesdayPage() {
  return (
    <>
      <Helmet>
        <title>Women's Wednesday — DefendHer Sports</title>
        <meta name="description" content="Every Wednesday we spotlight the women, moments, and stories that shaped sports. Women. Sports. Stories. Impact." />
        <link rel="canonical" href={`${site}/womens-wednesday`} />
        <meta property="og:title" content="Women's Wednesday — DefendHer Sports" />
        <meta property="og:description" content="Women. Sports. Stories. Impact." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/womens-wednesday`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>
        {/* Page header */}
        <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px) 40px', borderBottom: '1px solid #3d3d3d' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a', display: 'block', marginBottom: '12px' }}>
            Every Wednesday
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 20px' }}>
            WOMEN'S<br />WEDNESDAY
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#8a8a8a', lineHeight: 1.6, maxWidth: '55ch', margin: '0 0 24px' }}>
            Women. Sports. Stories. Impact. — Every Wednesday we spotlight the women, moments, and stories that shaped the game.
          </p>
          <a
            href="https://www.instagram.com/defendhersports"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a', textDecoration: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>
            Follow on Instagram
          </a>
        </div>

        {/* Post list */}
        <div style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(80px, 10vw, 120px)' }}>
          {WOMENS_WEDNESDAY.map((post) => (
            <Link
              key={post.slug}
              to={`/womens-wednesday/${post.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <article
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr clamp(200px, 30vw, 320px)',
                  gap: 'clamp(24px, 4vw, 64px)',
                  alignItems: 'center',
                  padding: 'clamp(32px, 5vw, 56px) 0',
                  borderBottom: '1px solid #3d3d3d',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a' }}>
                      Women's Wednesday
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#8a8a8a' }}>
                      {post.date}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(32px, 4vw, 56px)',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      lineHeight: 0.9,
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      margin: '0 0 20px',
                      transition: 'color 150ms',
                    }}
                  >
                    {post.title}
                  </h2>

                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', lineHeight: 1.6, maxWidth: '60ch', margin: '0 0 20px' }}>
                    {post.summary}
                  </p>

                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a' }}>
                    Read →
                  </span>
                </div>

                <div style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '4px', background: '#2e2e2e' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 400ms cubic-bezier(0.4,0,0.2,1)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
