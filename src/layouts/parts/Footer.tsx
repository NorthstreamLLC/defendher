import { Link } from 'react-router-dom';

import { socials } from '../../components/Socials';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#1a1a1a',
        borderTop: '1px solid #3d3d3d',
        padding: 'clamp(48px, 6vw, 72px) clamp(20px, 4vw, 48px) 40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}
      >
        {/* Brand + socials */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <img src="/logo-dhs.png" alt="DefendHer Sports" style={{ height: '56px', width: 'auto', display: 'block' }} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: '#8a8a8a',
              lineHeight: 1.6,
              maxWidth: '28ch',
              marginBottom: '20px',
            }}
          >
            Women's base layer and protective gear — designed for HER.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: '#8a8a8a', transition: 'color 150ms', display: 'flex' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e8ff3a'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8a8a8a'; }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#8a8a8a',
              marginBottom: '16px',
            }}
          >
            Explore
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/product', label: 'Product' },
              { href: '/testimonials', label: 'Testimonials' },
              { href: '/about', label: 'About' },
              { href: '/womens-wednesday', label: "Women's Wednesday" },
              { href: '/articles', label: 'Journal' },
              { href: '/videos', label: 'Videos' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#d4d4d4', textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#8a8a8a',
              marginBottom: '16px',
            }}
          >
            Get in touch
          </div>
          <a
            href="mailto:Defendhersports@gmail.com"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#d4d4d4', textDecoration: 'none', display: 'block', marginBottom: '8px' }}
          >
            Defendhersports@gmail.com
          </a>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a', lineHeight: 1.5, marginTop: '12px' }}>
            Product patent pending.<br />Launching soon.
          </p>
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
          gap: '12px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>
          © {currentYear} DefendHer Sports. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms', label: 'Terms' },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', textDecoration: 'none' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
