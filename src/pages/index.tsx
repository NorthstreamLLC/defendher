import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroSocials } from '../components/Socials';
import FeatureCards from '../components/FeatureCards';
import SignupForm from '../components/SignupForm';

const site = 'https://www.defendhersportsgear.com';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>DefendHer — Neck Protection Built for Women's Hockey</title>
        <meta
          name="description"
          content="DefendHer is building neck protection engineered specifically for women's hockey. Join the waitlist to be first to know when we launch."
        />
        <link rel="canonical" href={`${site}/`} />
        <meta property="og:title" content="DefendHer — Coming Soon" />
        <meta property="og:description" content="Neck protection built for women's hockey. Launching soon." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/`} />
        <meta property="og:image" content={`${site}/ice-rink.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DefendHer — Coming Soon" />
        <meta name="twitter:description" content="Neck protection built for women's hockey. Launching soon." />
        <meta name="twitter:image" content={`${site}/ice-rink.webp`} />
      </Helmet>

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'max(100svh, 640px)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
        aria-label="DefendHer — Protect Her Game"
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden="true">
          <img
            src="/ice-rink.webp"
            alt="Women's hockey player at the rink entrance"
            width={2560}
            height={1440}
            fetchPriority="high"
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '60% center',
              display: 'block',
              filter: 'saturate(0.15) contrast(1.1) brightness(0.5)',
            }}
          />
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0) 55%)',
          }}
        />

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

        <div
          className="dh-roll-in"
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            paddingTop: 'calc(var(--header-h, 80px) + clamp(40px, 7vh, 80px))',
            paddingBottom: '80px',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: 'clamp(24px, 5vw, 80px)',
          }}
        >
          <HeroSocials />

          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#e8ff3a',
              display: 'block',
              marginBottom: '20px',
            }}
          >
            Launching Soon
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(72px, 13vw, 160px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.85,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 32px',
            }}
          >
            PROTECT<br />HER GAME
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(14px, 1.6vw, 17px)',
              color: '#d4d4d4',
              lineHeight: 1.6,
              maxWidth: '52ch',
              marginBottom: '40px',
            }}
          >
            Every neck protector on the market was designed for men. DefendHer is changing that — building neck protection engineered from the ground up for the female athlete.
          </p>

          {/* Signup form */}
          <SignupForm source="home-hero" />

          <Link
            to="/product"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '16px',
              border: '2px solid #ffffff',
              color: '#ffffff',
              borderRadius: '9999px',
              padding: '12px 26px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            See the prototype <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── THE STORY ── */}
      <section
        style={{
          borderTop: '1px solid #3d3d3d',
          padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(48px, 7vw, 96px)',
          alignItems: 'center',
        }}
      >
        <div>
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
            Why we exist
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(48px, 6vw, 88px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.88,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 36px',
            }}
          >
            BUILT FOR<br />HER. NOT<br />ADAPTED.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: '#d4d4d4',
              lineHeight: 1.7,
              maxWidth: '60ch',
              marginBottom: '16px',
            }}
          >
            The women's game is growing faster than ever. The equipment hasn't kept up. Male-designed neck protectors slip, bulk up, and restrict movement — because they were never made for a female neck and shoulder profile.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              color: '#d4d4d4',
              lineHeight: 1.7,
              maxWidth: '60ch',
            }}
          >
            DefendHer is building protection that was engineered from scratch for women — with the fit, the comfort, and the performance the female athlete deserves.
          </p>

          <Link
            to="/product"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '28px',
              background: '#e8ff3a',
              color: '#1a1a1a',
              borderRadius: '9999px',
              padding: '14px 28px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            Explore the product <ArrowRight size={15} />
          </Link>
        </div>

        {/* Prototype photo stack */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
          aria-label="Prototype photos"
        >
          <div
            style={{
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '4px',
              background: '#2e2e2e',
              position: 'relative',
            }}
          >
            <img
              src="/prototype-1.jpg"
              alt="DefendHer neck protector prototype — front view"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                background: 'rgba(26,26,26,0.85)',
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#8a8a8a',
                padding: '4px 8px',
                borderRadius: '2px',
              }}
            >
              Prototype
            </span>
          </div>
          <div
            style={{
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '4px',
              background: '#2e2e2e',
              marginTop: '24px',
              position: 'relative',
            }}
          >
            <img
              src="/prototype-2.jpg"
              alt="DefendHer neck protector prototype — side view"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <span
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                background: 'rgba(26,26,26,0.85)',
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#8a8a8a',
                padding: '4px 8px',
                borderRadius: '2px',
              }}
            >
              Prototype
            </span>
          </div>
        </div>
      </section>

      {/* ── WHAT'S COMING ── */}
      <section
        style={{
          borderTop: '1px solid #3d3d3d',
          padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
        }}
      >
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
          What we're building
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(48px, 6vw, 88px)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            lineHeight: 0.88,
            color: '#ffffff',
            textTransform: 'uppercase',
            margin: '0 0 64px',
          }}
        >
          ENGINEERED<br />FOR THE<br />FEMALE ATHLETE
        </h2>

        <FeatureCards
          items={[
            { title: 'Sports bra base layer', text: 'Support and comfort in a piece players already wear every game.' },
            { title: 'Integrated neck guard', text: 'Neck protection built into the garment, not strapped on top of it.' },
            { title: 'Adjustable magnetic closure', text: 'A secure fit that keeps hair from catching, with no Velcro to wear out.' },
            { title: 'Designed for her', text: 'Made for female athletes of all ages and every body type, not adapted from men\u2019s equipment.' },
          ]}
        />
      </section>

      {/* ── BOTTOM CTA ── */}
      <section
        style={{
          borderTop: '1px solid #3d3d3d',
          padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(48px, 7vw, 100px)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            lineHeight: 0.88,
            color: '#e8ff3a',
            textTransform: 'uppercase',
            margin: '0 0 32px',
          }}
        >
          BE FIRST<br />TO KNOW
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            color: '#d4d4d4',
            lineHeight: 1.6,
            maxWidth: '50ch',
            margin: '0 auto 40px',
          }}
        >
          We're in the final stages of development. Get notified the moment DefendHer is ready to ship.
        </p>

        <SignupForm source="home-bottom" align="center" />

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: '#8a8a8a',
            marginTop: '16px',
          }}
        >
          Questions? Reach us at{' '}
          <a
            href="mailto:Defendhersports@gmail.com"
            style={{ color: '#d4d4d4', textDecoration: 'none' }}
          >
            Defendhersports@gmail.com
          </a>
        </p>
      </section>
    </>
  );
}
