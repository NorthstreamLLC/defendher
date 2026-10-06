import { Helmet } from '@dr.pogodin/react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { TEAM, HOW_IT_STARTED } from '@/lib/team';
import PageBanner from '@/components/PageBanner';

const site = 'https://www.defendhersportsgear.com';

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  display: 'block',
  marginBottom: '16px',
};

export default function TeamPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <>
      <Helmet>
        <title>Meet the Team — DefendHer Sports</title>
        <meta name="description" content="Meet the people behind DefendHer Sports: Ally, Neal and Carissa, a player, an equipment manager and a goalie who couldn't leave a problem alone." />
        <link rel="canonical" href={`${site}/team`} />
        <meta property="og:title" content="Meet the Team — DefendHer Sports" />
        <meta property="og:description" content="A player, an equipment manager and a goalie who couldn't leave a problem alone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/team`} />
        <meta property="og:image" content={`${site}/ally-use.jpeg`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', background: '#1a1a1a' }}>
        <PageBanner
          eyebrow="Meet the team"
          title={<>Three people.<br />One problem.</>}
          subtitle="A player, an equipment manager and a goalie. None of us set out to start a company."
        />

        {/* PROFILES */}
        <section style={{ padding: '0 clamp(24px, 6vw, 96px)', maxWidth: '1280px', margin: '0 auto' }}>
          {TEAM.map((m, i) => (
            <article
              key={m.slug}
              id={m.slug}
              style={{
                padding: 'clamp(48px, 6vw, 88px) 0',
                borderBottom: '1px solid #3d3d3d',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'clamp(32px, 5vw, 80px)',
                alignItems: 'start',
                scrollMarginTop: 'var(--header-h)',
              }}
            >
              <div style={{ order: i % 2 === 0 ? 0 : 1, maxWidth: '420px', width: '100%' }}>
                <div style={{ aspectRatio: '4/5', borderRadius: '4px 4px 4px 96px', overflow: 'hidden', background: '#2e2e2e', border: '1px solid #3d3d3d', position: 'relative' }}>
                  {m.photo ? (
                    <img src={m.photo} alt={m.alt ?? m.name} loading={i === 0 ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: m.objectPosition ?? 'center', display: 'block' }} />
                  ) : (
                    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #262b12 0%, #1a1a1a 70%)' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(120px, 14vw, 200px)', color: '#e8ff3a', lineHeight: 1 }}>{m.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                {m.caption && (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', margin: '12px 0 0' }}>{m.caption}</p>
                )}
              </div>

              <div>
                <span style={{ ...eyebrow, color: '#e8ff3a' }}>{m.role}</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 24px' }}>
                  {m.name}
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 600, color: '#ffffff', lineHeight: 1.4, margin: '0 0 24px', maxWidth: '34ch' }}>
                  {m.lead}
                </p>
                {m.bio.map((para, k) => (
                  <p key={k} style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.75, margin: '0 0 18px', maxWidth: '60ch' }}>
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* HOW IT STARTED */}
        <section style={{ padding: 'clamp(48px, 6vw, 88px) clamp(24px, 6vw, 96px)', maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{ ...eyebrow, color: '#8a8a8a' }}>How it started</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', border: '1px solid #3d3d3d', background: '#3d3d3d' }}>
            {HOW_IT_STARTED.map((step) => (
              <div key={step.when} style={{ background: '#1a1a1a', padding: 'clamp(24px, 3vw, 36px)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: '#e8ff3a', textTransform: 'uppercase', lineHeight: 1, marginBottom: '14px' }}>{step.when}</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#b0b0b0', lineHeight: 1.65, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CLOSING */}
        <section style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(48px, 6vw, 88px) clamp(24px, 6vw, 96px)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 64px)', color: '#ffffff', textTransform: 'uppercase', lineHeight: 0.95, margin: '0 auto 28px', maxWidth: '20ch' }}>
            We thought about her.
          </p>
          <Link
            to="/product"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#e8ff3a', color: '#1a1a1a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
          >
            See the prototype <ArrowRight size={15} />
          </Link>
        </section>
      </div>
    </>
  );
}
