import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ARTICLES } from '@/lib/articles';

const site = 'https://defendhersport.net';

export default function ArticlesIndexPage() {
  return (
    <>
      <Helmet>
        <title>Articles — DefendHer Sport</title>
        <meta name="description" content="Insights on women's hockey gear, protection standards, and the game." />
        <link rel="canonical" href={`${site}/articles`} />
        <meta property="og:title" content="Articles — DefendHer Sport" />
        <meta property="og:description" content="Insights on women's hockey gear, protection standards, and the game." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/articles`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': `${site}/articles#webpage`,
          name: 'Articles — DefendHer Sport',
          url: `${site}/articles`,
          isPartOf: { '@id': `${site}/#website` },
        })}</script>
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--concrete-900, #1a1a1a)' }}>
        {/* Page header */}
        <div style={{ padding: 'clamp(48px, 6vw, 80px) 48px 40px', borderBottom: '1px solid var(--line-subtle, #3d3d3d)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--chalk-tertiary, #8a8a8a)', display: 'block', marginBottom: '12px' }}>
            DefendHer Journal
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: 'var(--chalk-primary, #ffffff)', textTransform: 'uppercase', margin: 0 }}>
            ARTICLES
          </h1>
        </div>

        {/* Article list */}
        <div style={{ padding: '0 48px clamp(80px, 10vw, 120px)' }}>
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
