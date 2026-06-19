import { useParams, Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { getArticle } from '@/lib/articles';

const site = 'https://defendhersport.net';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticle(slug ?? '');

  if (!article) {
    return (
      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '64px', color: 'var(--volt-primary, #e8ff3a)', textTransform: 'uppercase' }}>NOT FOUND</h1>
          <Link to="/articles" style={{ color: 'var(--chalk-secondary, #d4d4d4)', fontFamily: 'var(--font-body)' }}>Back to articles</Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${site}/articles/${article.slug}`;

  return (
    <>
      <Helmet>
        <title>{article.title} — DefendHer Sport</title>
        <meta name="description" content={article.subtitle} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${article.title} — DefendHer Sport`} />
        <meta property="og:description" content={article.subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${site}${article.heroImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${article.title} — DefendHer Sport`} />
        <meta name="twitter:description" content={article.subtitle} />
        <meta name="twitter:image" content={`${site}${article.heroImage}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.subtitle,
          image: `${site}${article.heroImage}`,
          datePublished: '2026-06-18',
          dateModified: '2026-06-18',
          author: { '@type': 'Organization', name: 'DefendHer Sport', url: `${site}/` },
          publisher: { '@type': 'Organization', name: 'DefendHer Sport', url: `${site}/` },
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        })}</script>
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--concrete-900, #1a1a1a)' }}>

        {/* ── HERO ── */}
        <div style={{ position: 'relative', width: '100%', height: 'clamp(400px, 55vw, 680px)', overflow: 'hidden', background: 'var(--concrete-800, #2e2e2e)' }}>
          <img
            src={article.heroImage}
            alt={article.heroAlt}
            width={1440}
            height={680}
            fetchPriority="high"
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.15) contrast(1.1) brightness(0.6)' }}
          />
          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0) 50%)' }} aria-hidden="true" />
          {/* Volt floor line */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'var(--volt-primary, #e8ff3a)' }} aria-hidden="true" />

          {/* Hero text — bottom left */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(32px, 4vw, 56px) 48px clamp(40px, 5vw, 64px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--volt-primary, #e8ff3a)' }}>
                {article.category}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--chalk-tertiary, #8a8a8a)' }}>
                {article.date} · {article.readTime}
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 0.85,
                color: 'var(--chalk-primary, #ffffff)',
                textTransform: 'uppercase',
                margin: '0 0 16px',
                maxWidth: '18ch',
              }}
            >
              {article.title.toUpperCase()}
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--chalk-secondary, #d4d4d4)', lineHeight: 1.5, maxWidth: '65ch' }}>
              {article.subtitle}
            </p>
          </div>
        </div>

        {/* ── ARTICLE BODY ── */}
        {/* Two-column: sidebar index left, content right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(48px, 6vw, 80px) 48px clamp(80px, 10vw, 120px)',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* LEFT: sticky sidebar */}
          <aside
            style={{
              position: 'sticky',
              top: '80px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
            }}
            aria-label="Article navigation"
          >
            <Link
              to="/articles"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--chalk-tertiary, #8a8a8a)',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '32px',
              }}
            >
              ← ALL ARTICLES
            </Link>

            <div style={{ borderTop: '1px solid var(--line-subtle, #3d3d3d)', paddingTop: '20px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--chalk-tertiary, #8a8a8a)', marginBottom: '16px' }}>
                In this article
              </div>
              {article.body
                .filter((b) => b.type === 'heading')
                .map((b, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      color: 'var(--chalk-tertiary, #8a8a8a)',
                      lineHeight: 1.5,
                      padding: '8px 0',
                      borderBottom: '1px solid var(--line-subtle, #3d3d3d)',
                    }}
                  >
                    {b.type === 'heading' ? b.text : ''}
                  </div>
                ))}
            </div>

            {/* Shop CTA */}
            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--line-subtle, #3d3d3d)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--chalk-tertiary, #8a8a8a)', marginBottom: '12px' }}>
                Shop
              </div>
              <Link
                to="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'transparent',
                  border: '2px solid var(--volt-primary, #e8ff3a)',
                  color: 'var(--volt-primary, #e8ff3a)',
                  borderRadius: '9999px',
                  padding: '10px 18px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                SHOP NOW →
              </Link>
            </div>
          </aside>

          {/* RIGHT: article content */}
          <article>
            {article.body.map((block, i) => {
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '18px',
                      color: 'var(--chalk-secondary, #d4d4d4)',
                      lineHeight: 1.7,
                      maxWidth: '65ch',
                      marginBottom: '28px',
                    }}
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'heading') {
                return (
                  <h2
                    key={i}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(32px, 4vw, 52px)',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      lineHeight: 0.9,
                      color: 'var(--chalk-primary, #ffffff)',
                      textTransform: 'uppercase',
                      margin: '56px 0 24px',
                    }}
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'pullquote') {
                return (
                  <blockquote
                    key={i}
                    style={{
                      borderLeft: '3px solid var(--volt-primary, #e8ff3a)',
                      paddingLeft: '28px',
                      margin: '48px 0',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 3vw, 36px)',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        lineHeight: 1.1,
                        color: 'var(--chalk-primary, #ffffff)',
                        textTransform: 'uppercase',
                        marginBottom: block.attribution ? '16px' : '0',
                      }}
                    >
                      {block.text}
                    </p>
                    {block.attribution && (
                      <cite
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--chalk-tertiary, #8a8a8a)',
                          fontStyle: 'normal',
                        }}
                      >
                        — {block.attribution}
                      </cite>
                    )}
                  </blockquote>
                );
              }

              if (block.type === 'image') {
                return (
                  <figure key={i} style={{ margin: '48px 0' }}>
                    <div style={{ overflow: 'hidden', borderRadius: '2px', background: 'var(--concrete-800, #2e2e2e)' }}>
                      <img
                        src={block.src}
                        alt={block.alt}
                        width={800}
                        height={500}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', display: 'block', filter: 'saturate(0.2) contrast(1.1)' }}
                      />
                    </div>
                    {block.caption && (
                      <figcaption
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          color: 'var(--chalk-tertiary, #8a8a8a)',
                          lineHeight: 1.5,
                          marginTop: '12px',
                          paddingTop: '12px',
                          borderTop: '1px solid var(--line-subtle, #3d3d3d)',
                        }}
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              if (block.type === 'list') {
                return (
                  <ul
                    key={i}
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '32px 0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0',
                    }}
                  >
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '14px 0',
                          borderBottom: '1px solid var(--line-subtle, #3d3d3d)',
                          ...(j === 0 ? { borderTop: '1px solid var(--line-subtle, #3d3d3d)' } : {}),
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            background: 'var(--volt-primary, #e8ff3a)',
                            borderRadius: '50%',
                            flexShrink: 0,
                            marginTop: '8px',
                          }}
                          aria-hidden="true"
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: 'var(--chalk-secondary, #d4d4d4)',
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}

            {/* Article footer */}
            <div
              style={{
                marginTop: '64px',
                paddingTop: '40px',
                borderTop: '3px solid var(--volt-primary, #e8ff3a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '24px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--chalk-tertiary, #8a8a8a)', marginBottom: '4px' }}>
                  Published by
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--volt-primary, #e8ff3a)', textTransform: 'uppercase', letterSpacing: '0.01em' }}>
                  DEFENDHER SPORT
                </div>
              </div>
              <Link
                to="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'transparent',
                  border: '2px solid var(--volt-primary, #e8ff3a)',
                  color: 'var(--volt-primary, #e8ff3a)',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                SHOP THE NECK PROTECTOR →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
