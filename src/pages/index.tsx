import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Shield, Star } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { PRODUCTS } from '@/lib/products';

const site = 'https://defendhersport.net';

export default function HomePage() {
  const addItem = useCartStore((s) => s.addItem);
  const product = PRODUCTS[0];

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: 'M',
      image: product.image,
    });
  }

  return (
    <>
      <Helmet>
        <title>DefendHer — Neck Protector Built for Women's Hockey</title>
        <meta
          name="description"
          content="DefendHer makes CE Level 1 certified neck protection engineered specifically for women's hockey. Women-specific fit, high-density foam, free shipping over $75."
        />
        <link rel="canonical" href={`${site}/`} />
        <meta property="og:title" content="DefendHer — Neck Protector Built for Women's Hockey" />
        <meta property="og:description" content="CE Level 1 certified neck protection engineered for women's hockey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/`} />
        <meta property="og:image" content={`${site}/airo-assets/images/pages/home/hero`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DefendHer — Neck Protector Built for Women's Hockey" />
        <meta name="twitter:description" content="CE Level 1 certified neck protection engineered for women's hockey." />
        <meta name="twitter:image" content={`${site}/airo-assets/images/pages/home/hero`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'WebSite', '@id': `${site}/#website`, name: 'DefendHer', url: `${site}/` },
            {
              '@type': 'Organization',
              '@id': `${site}/#organization`,
              name: 'DefendHer Sport',
              url: `${site}/`,
              description: 'Protective gear built for women\'s hockey',
            },
            {
              '@type': 'WebPage',
              '@id': `${site}/#webpage`,
              url: `${site}/`,
              name: 'DefendHer — Neck Protector Built for Women\'s Hockey',
              isPartOf: { '@id': `${site}/#website` },
              about: { '@id': `${site}/#organization` },
              datePublished: '2026-06-18',
              dateModified: '2026-06-18',
            },
          ],
        })}</script>
      </Helmet>

      {/* ═══════════════════════════════════════
          ACT 1 — HERO OVERPRINT
          Full viewport. Volt headline bottom-left.
      ════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          minHeight: '640px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
        aria-label="DefendHer — Protect Her Game"
      >
        {/* Full-bleed photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden="true">
          <img
            src="/airo-assets/images/pages/home/hero"
            alt="Women's hockey player in action"
            width={1920}
            height={1080}
            fetchPriority="high"
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '65% center',
              display: 'block',
              filter: 'saturate(0.12) contrast(1.1) brightness(0.55)',
            }}
          />
        </div>

        {/* Gradient overlay — bottom fade for legibility */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, rgba(26,26,26,0.7) 0%, rgba(26,26,26,0) 50%)',
          }}
        />

        {/* Volt floor line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: '#e8ff3a',
            zIndex: 4,
          }}
        />

        {/* Content — bottom-anchored, left-aligned */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            paddingTop: 'calc(64px + 48px)',
            paddingBottom: '80px',
            paddingLeft: '48px',
            paddingRight: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#ffffff',
              display: 'block',
              marginBottom: '24px',
              maxWidth: '60ch',
              lineHeight: 1.5,
            }}
          >
            The only neck protector built for women's hockey
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(80px, 14vw, 180px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.85,
              color: '#e8ff3a',
              textTransform: 'uppercase',
              margin: 0,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            PROTECT<br />HER GAME
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ACT 2 — THE PITCH
          Two columns. Editorial left + fact stack right.
      ════════════════════════════════════════ */}
      <section
        style={{
          borderTop: '1px solid #3d3d3d',
          padding: 'clamp(80px, 12vw, 140px) 48px',
          display: 'grid',
          gridTemplateColumns: '55fr 45fr',
          gap: 'clamp(48px, 7vw, 96px)',
          alignItems: 'start',
        }}
        aria-labelledby="pitch-heading"
      >
        {/* LEFT: editorial lockup + copy + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#8a8a8a',
              display: 'block',
              marginBottom: '20px',
            }}
          >
            Built different. Built for her.
          </span>

          <h2
            id="pitch-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(56px, 7vw, 100px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.85,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 40px',
            }}
          >
            GEAR THAT<br />FITS YOUR<br />GAME
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: '#d4d4d4',
              lineHeight: 1.6,
              maxWidth: '65ch',
              marginBottom: '16px',
            }}
          >
            Every neck protector on the market was designed for men. DefendHer changes that. Our neck protector is engineered from the ground up for the female athlete — contoured to the female neck and shoulder profile, so it stays in place through every check, every shift, every game.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: '#d4d4d4',
              lineHeight: 1.6,
              maxWidth: '65ch',
              marginBottom: '48px',
            }}
          >
            CE Level 1 certified. High-density foam core. Low-profile under equipment. This is protection that doesn't compromise your game — it elevates it.
          </p>

          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: '2px solid #e8ff3a',
              color: '#e8ff3a',
              borderRadius: '9999px',
              padding: '16px 32px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              width: 'fit-content',
            }}
          >
            SHOP NOW
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* RIGHT: fact stack */}
        <aside
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 'clamp(80px, 9vw, 120px)',
          }}
          aria-label="Product facts"
        >
          {product.specs.map((spec, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '24px',
                padding: '24px 0',
                borderTop: '1px solid #3d3d3d',
                ...(i === product.specs.length - 1 ? { borderBottom: '1px solid #3d3d3d' } : {}),
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: '#8a8a8a',
                  textTransform: 'lowercase',
                  lineHeight: 1.5,
                  flexShrink: 0,
                }}
              >
                {spec.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  color: i === 3 ? '#e8ff3a' : '#ffffff',
                  textTransform: 'uppercase',
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                {spec.value}
              </span>
            </div>
          ))}
        </aside>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT SPOTLIGHT
          Featured category pull pattern
      ════════════════════════════════════════ */}
      <section
        style={{
          background: '#2e2e2e',
          padding: 'clamp(64px, 8vw, 100px) 48px',
        }}
        aria-labelledby="product-heading"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {/* Product image */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
              aspectRatio: '4/5',
              background: '#1a1a1a',
            }}
          >
            <img
              src="/airo-assets/images/pages/home/product-spotlight"
              alt="DefendHer Neck Protector"
              width={800}
              height={1000}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {product.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#e8ff3a',
                  color: '#1a1a1a',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '4px 10px',
                  borderRadius: '2px',
                }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Product info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#8a8a8a',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Flagship Product
            </span>

            <h2
              id="product-heading"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(48px, 6vw, 88px)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 0.85,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 24px',
              }}
            >
              NECK<br />PROTECTOR
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                color: '#d4d4d4',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '50ch',
              }}
            >
              {product.tagline}
            </p>

            {/* Key features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
              {product.features.slice(0, 4).map((feat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: '1px solid #3d3d3d',
                  }}
                >
                  <Shield size={14} style={{ color: '#e8ff3a', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      color: '#d4d4d4',
                    }}
                  >
                    {feat}
                  </span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '48px',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  color: '#e8ff3a',
                }}
              >
                ${product.price.toFixed(2)}
              </span>

              <button
                onClick={handleAddToCart}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'transparent',
                  border: '2px solid #e8ff3a',
                  color: '#e8ff3a',
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
                ADD TO CART
              </button>

              <Link
                to={`/product/${product.id}`}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#8a8a8a',
                  textDecoration: 'none',
                }}
              >
                VIEW DETAILS →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SOCIAL PROOF — Review pull
          3 player testimonials, staggered grid
      ════════════════════════════════════════ */}
      <section
        style={{ padding: 'clamp(80px, 10vw, 120px) 48px' }}
        aria-labelledby="reviews-heading"
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '24px',
            marginBottom: '64px',
            flexWrap: 'wrap',
          }}
        >
          <h2
            id="reviews-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.85,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            PLAYERS<br />WHO TRUST IT
          </h2>
          <div style={{ display: 'flex', gap: '4px' }} aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} style={{ color: '#e8ff3a', fill: '#e8ff3a' }} />
            ))}
          </div>
        </header>

        {/* 12-column staggered grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            rowGap: 'clamp(40px, 5vw, 72px)',
          }}
          role="list"
        >
          {/* Review 1: cols 1–7 */}
          <article
            role="listitem"
            style={{
              gridColumn: '1 / 8',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingTop: '32px',
              borderTop: '1px solid #3d3d3d',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '20px',
                color: '#ffffff',
                lineHeight: 1.55,
                maxWidth: '65ch',
              }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25em', color: '#e8ff3a', lineHeight: 0, verticalAlign: '-0.18em', marginRight: '4px' }}>"</span>
              Finally a neck guard that actually fits. I've been playing for 12 years and every other protector I've tried sits wrong, gaps at the sides, or rides up during play. DefendHer stays exactly where it should.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#d4d4d4', fontWeight: 700 }}>Sarah K.</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>D-zone player · 12 years competitive</span>
            </div>
          </article>

          {/* Review 2: cols 5–12 */}
          <article
            role="listitem"
            style={{
              gridColumn: '5 / 13',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingTop: '32px',
              borderTop: '1px solid #3d3d3d',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '20px',
                color: '#ffffff',
                lineHeight: 1.55,
                maxWidth: '65ch',
              }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25em', color: '#e8ff3a', lineHeight: 0, verticalAlign: '-0.18em', marginRight: '4px' }}>"</span>
              The CE Level 1 certification was the deciding factor for me. My league requires it and most women's options are either bulky or don't meet the standard. This one does both — certified and actually comfortable.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#d4d4d4', fontWeight: 700 }}>Maya T.</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>Forward · Women's rec league</span>
            </div>
          </article>

          {/* Review 3: cols 2–9 */}
          <article
            role="listitem"
            style={{
              gridColumn: '2 / 10',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              paddingTop: '32px',
              borderTop: '1px solid #3d3d3d',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '20px',
                color: '#ffffff',
                lineHeight: 1.55,
                maxWidth: '65ch',
              }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25em', color: '#e8ff3a', lineHeight: 0, verticalAlign: '-0.18em', marginRight: '4px' }}>"</span>
              I coach a women's U18 team and I've made DefendHer mandatory for our players. The fit is genuinely different — you can see it the moment they put it on. No adjusting, no complaints. Just protection.
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#d4d4d4', fontWeight: 700 }}>Coach Priya M.</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>U18 Women's coach · 6 seasons</span>
            </div>
          </article>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════ */}
      <div
        style={{
          padding: '0 48px 120px',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(32px, 5vw, 64px)',
          flexWrap: 'wrap',
          borderTop: '1px solid #3d3d3d',
          paddingTop: 'clamp(64px, 8vw, 100px)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.85,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            READY TO<br />PROTECT HER?
          </h2>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: '#8a8a8a',
              lineHeight: 1.5,
            }}
          >
            Free shipping on orders over $75 · CE Level 1 certified
          </span>
        </div>

        <Link
          to="/shop"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'transparent',
            border: '2px solid #e8ff3a',
            color: '#e8ff3a',
            borderRadius: '9999px',
            padding: '16px 36px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          SHOP NOW
          <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
