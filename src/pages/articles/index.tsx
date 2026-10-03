import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ARTICLES } from '@/lib/articles';

const site = 'https://defendhersport.net';

export default function ArticlesIndexPage() {
  return (
    <>
      <Helmet>
        <title>Articles — DefendHer Sports</title>
        <meta name="description" content="Insights on women's hockey gear, protection standards, and the game." />
        <link rel="canonical" href={`${site}/articles`} />
        <meta property="og:title" content="Articles — DefendHer Sports" />
        <meta property="og:description" content="Insights on women's hockey gear, protection standards, and the game." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/articles`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${site}/articles#webpage`,
          name: 'Articles — DefendHer Sports',
          url: `${site}/articles`,
          isPartOf: { '@id': `${site}/#website` },
        })}</script>
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: 'var(--concrete-900, #1a1a1a)' }}>
        {/* Page header */}
        <div style={{ padding: 'clamp(28px, 4vw, 44px) clamp(20px, 4vw, 48px) 24px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--chalk-tertiary, #8a8a8a)', display: 'block', marginBottom: '8px' }}>
            DefendHer Journal
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: 'var(--chalk-primary, #ffffff)', textTransform: 'uppercase', margin: 0 }}>
            JOURNAL
          </h1>
        </div>

        {/* Women's Wednesday banner */}
        <div style={{ background: '#111111', borderTop: '1px solid var(--line-subtle, #3d3d3d)', borderBottom: '1px solid var(--line-subtle, #3d3d3d)' }}>
          <Link
            to="/womens-wednesday"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'clamp(20px, 3vw, 48px)',
              padding: 'clamp(20px, 3vw, 32px) clamp(20px, 4vw, 48px)',
            }}
          >
            <img
              src="/ww-thumb.jpg"
              alt="Women's Wednesday. Women. Sports. Stories. Impact."
              style={{ width: 'min(100%, 320px)', aspectRatio: '4/3', objectFit: 'cover', display: 'block', borderRadius: '2px', flexShrink: 0 }}
            />
            <div style={{ flex: '1 1 240px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e8ff3a', display: 'block', marginBottom: '6px' }}>
                Weekly Series &middot; Every Wednesday
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
                WOMEN&apos;S WEDNESDAY
              </h2>
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a1a1a', background: '#e8ff3a', borderRadius: '9999px', padding: '12px 22px', whiteSpace: 'nowrap' }}>
              Read the series &rarr;
            </span>
          </Link>
        </div>

        <div style={{ padding: 'clamp(24px, 3vw, 36px) clamp(20px, 4vw, 48px) 0' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a' }}>
            More from the Journal
          </span>
        </div>

        {/* Article list */}
        <div style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(80px, 10vw, 120px)' }}>
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <article
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 320px',
                  gap: 'clamp(32px, 5vw, 64px)',
                  alignItems: 'start',
                  padding: 'clamp(40px, 5vw, 64px) 0',
                  borderBottom: '1px solid var(--line-subtle, #3d3d3d)',
                }}
              >
                {/* Text */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--volt-primary, #e8ff3a)' }}>
                      {article.category}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--chalk-tertiary, #8a8a8a)' }}>
                      {article.date} · {article.readTime}
                    </span>
                  </div>

                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: 'var(--chalk-primary, #ffffff)', textTransform: 'uppercase', margin: '0 0 20px' }}>
                    {article.title.toUpperCase()}
                  </h2>

                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--chalk-secondary, #d4d4d4)', lineHeight: 1.6, maxWidth: '65ch', marginBottom: '28px' }}>
                    {article.subtitle}
                  </p>

                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--volt-primary, #e8ff3a)' }}>
                    READ ARTICLE →
                  </span>
                </div>

                {/* Hero image */}
                <div style={{ overflow: 'hidden', borderRadius: '2px', aspectRatio: '4/3', background: 'var(--concrete-800, #2e2e2e)' }}>
                  <img
                    src={article.heroImage}
                    alt={article.heroAlt}
                    width={320}
                    height={240}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.2) contrast(1.1)' }}
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
