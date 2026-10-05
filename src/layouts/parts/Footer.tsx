import { Link } from 'react-router-dom';

import { socials } from '../../components/Socials';

const colHeading: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#e8ff3a',
  marginBottom: '18px',
};

const footLink: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  color: '#d4d4d4',
  textDecoration: 'none',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#1a1a1a', overflow: 'hidden', borderTop: '1px solid #3d3d3d' }}>
      <style>{`
        .dh-social { width: 44px; height: 44px; border-radius: 9999px; border: 1px solid #3d3d3d; display: inline-flex; align-items: center; justify-content: center; color: #d4d4d4; text-decoration: none; transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), background 200ms ease, color 200ms ease, border-color 200ms ease; }
        .dh-social:hover, .dh-social:focus-visible { transform: translateY(-4px); background: #e8ff3a; border-color: #e8ff3a; color: #1a1a1a; }
        .dh-foot-link:hover { color: #e8ff3a !important; }
        @media (prefers-reduced-motion: reduce) { .dh-social { transition: none; } }
      `}</style>

      <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px) 32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(32px, 4vw, 56px)',
            marginBottom: '48px',
          }}
        >
          {/* Brand + socials */}
          <div>
            <img src="/logo-dhs.png" alt="DefendHer Sports" style={{ height: '64px', width: 'auto', display: 'block', marginBottom: '20px' }} />
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#b0b0b0', lineHeight: 1.6, maxWidth: '30ch', margin: '0 0 24px' }}>
              Built by three hockey people who couldn&rsquo;t leave a problem alone.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {socials.map(({ href, label, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="dh-social">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <div style={colHeading}>Explore</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/product', label: 'Product' },
                { href: '/about', label: 'About' },
                { href: '/team', label: 'Meet the team' },
                { href: '/testimonials', label: 'Testimonials' },
                { href: '/womens-wednesday', label: "Women's Wednesday" },
                { href: '/articles', label: 'Journal' },
                { href: '/videos', label: 'Videos' },
                { href: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link key={item.href} to={item.href} className="dh-foot-link" style={footLink}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={colHeading}>Say hello</div>
            <a href="mailto:Defendhersports@gmail.com" className="dh-foot-link" style={{ ...footLink, display: 'block', marginBottom: '20px', wordBreak: 'break-word' }}>
              Defendhersports@gmail.com
            </a>
            <span
              style={{
                display: 'inline-block',
                border: '1px solid #3d3d3d',
                borderRadius: '9999px',
                padding: '8px 16px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#e8ff3a',
              }}
            >
              Patent pending &middot; Launching soon
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #3d3d3d',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px 24px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>
            &copy; {currentYear} DefendHer Sports. Made for her.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { href: '/privacy', label: 'Privacy' },
              { href: '/terms', label: 'Terms' },
            ].map((item) => (
              <Link key={item.href} to={item.href} className="dh-foot-link" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
