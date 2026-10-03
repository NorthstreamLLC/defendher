import { Link } from 'react-router-dom';

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { href: 'https://www.instagram.com/defendhersports', label: 'Instagram', Icon: IconInstagram },
  { href: 'https://x.com/DefendHERsport', label: 'X (Twitter)', Icon: IconX },
  { href: 'https://www.linkedin.com/in/defendher-sports-22a54343a/', label: 'LinkedIn', Icon: IconLinkedIn },
];

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
            href="mailto:hello@defendhersport.net"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#d4d4d4', textDecoration: 'none', display: 'block', marginBottom: '8px' }}
          >
            hello@defendhersport.net
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
