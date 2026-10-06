import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '@/lib/testimonials';
import { TEAM } from '@/lib/team';
import PageBanner from '@/components/PageBanner';

const site = 'https://www.defendhersportsgear.com';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — DefendHer Sports</title>
        <meta name="description" content="DefendHer Sports builds protective equipment designed specifically for female athletes, starting with women's hockey." />
        <link rel="canonical" href={`${site}/about`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>

        <PageBanner
          eyebrow="About"
          title={<>Built for her.<br />From the ground up.</>}
          subtitle="Protective gear designed for female athletes, starting with hockey."
        />

        {/* Intro */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '900px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', color: '#a0a0a0', lineHeight: 1.7, margin: '0 0 20px', maxWidth: '620px' }}>
            At DefendHer Sports, we believe every female athlete deserves products designed for her — not adapted from someone else. Born from firsthand experience on the ice, our brand is committed to solving the everyday challenges women face in sport through thoughtful innovation, comfort, and performance.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', color: '#a0a0a0', lineHeight: 1.7, margin: 0, maxWidth: '620px' }}>
            We are building more than equipment — we are building a brand where women feel seen, valued, and represented.
          </p>
        </div>

        {/* Mission */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', maxWidth: '1200px' }}>
          {[
            { label: 'Our Mission', body: 'To redefine women’s sports equipment by designing innovative, comfortable, and protective products created by women, for women. We are committed to putting female athletes first, listening to their needs, and developing gear that helps them perform with confidence while feeling represented, supported, and empowered.' },
            { label: 'Our Approach', body: 'Designed by a player who wore the gear, refined with her university equipment manager, and tested by players who gave us honest feedback. Patent pending and still in development.' },
            { label: 'Our Promise', body: 'We’ll always be honest about what our gear does and doesn’t do, and we’ll keep improving it. As we grow, that promise extends to every sport we build for.' },
          ].map(({ label, body }) => (
            <div key={label}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '16px' }}>
                {label}
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', lineHeight: 1.7, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Starting with hockey */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '780px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '24px' }}>
            Starting With Hockey
          </span>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.01em', margin: '0 0 20px' }}>
            One sport first. Every sport next.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 20px' }}>
            Our goal is to provide protective equipment for female athletes across all sports. We started with women&rsquo;s hockey because that&rsquo;s where our experience is, and because the gap between what women need and what the market offers is impossible to ignore on the ice.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: 0 }}>
            Hockey is where we begin — not where we stop. The same approach that shaped our neck protector will carry into every sport we build for next.
          </p>
        </div>

        {/* Meet the team */}
        <div style={{ padding: 'clamp(40px, 5vw, 72px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '1200px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '20px' }}>
            Our Story
          </span>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.01em', margin: '0 0 16px', maxWidth: '24ch' }}>
            Three people who couldn&rsquo;t leave a problem alone.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 32px', maxWidth: '62ch' }}>
            DefendHer began in a college pro shop, when a player, an equipment manager and a goalie turned a frustration with neck guards into a first prototype built from scraps.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', border: '1px solid #3d3d3d', background: '#3d3d3d', marginBottom: '28px' }}>
            {TEAM.map((m) => (
              <Link key={m.slug} to={`/team#${m.slug}`} style={{ background: '#1a1a1a', padding: 'clamp(24px, 3vw, 32px)', textDecoration: 'none', display: 'block' }}>
                <div style={{ width: '32px', height: '3px', background: '#e8ff3a', marginBottom: '18px' }} />
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>{m.name}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e8ff3a', marginBottom: '12px' }}>{m.role}</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#b0b0b0', lineHeight: 1.6, margin: 0 }}>{m.blurb}</p>
              </Link>
            ))}
          </div>
          <Link to="/team" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a', textDecoration: 'none' }}>
            Meet the team &rarr;
          </Link>
        </div>

        {/* PLAYERS */}
        <div style={{ padding: 'clamp(40px, 5vw, 72px) clamp(24px, 6vw, 96px)' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '28px' }}>
            Tested by players
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(28px, 3vw, 48px)', marginBottom: '32px' }}>
            {TESTIMONIALS.map((t) => (
              <figure key={t.name ?? t.team} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div aria-hidden="true" style={{ width: '32px', height: '3px', background: '#e8ff3a' }} />
                <blockquote style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'clamp(17px, 1.7vw, 20px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.4 }}>
                  &ldquo;{t.highlight}&rdquo;
                </blockquote>
                <figcaption style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>
                  {t.name ? `${t.name}, ${t.team}` : t.team}
                </figcaption>
              </figure>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px 28px' }}>
            <Link to="/testimonials" style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a', textDecoration: 'none' }}>
              Read what players say &rarr;
            </Link>
            <a
              href="https://www.instagram.com/defendhersports"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--volt-primary, #e8ff3a)', color: '#1a1a1a', borderRadius: '9999px', padding: '12px 26px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
            >
              Follow along
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
