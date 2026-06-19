import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#1a1a1a',
        borderTop: '1px solid #3d3d3d',
        padding: '48px 48px 40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ marginBottom: '12px' }}>
            <img src="/defendher_logo.png" alt="DefendHer" style={{ height: '44px', width: 'auto', display: 'block' }} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              color: '#8a8a8a',
              lineHeight: 1.6,
              maxWidth: '28ch',
            }}
          >
            Protective gear built for women's hockey. No compromises.
          </p>
        </div>

        {/* Shop */}
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
            Shop
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/shop', label: 'All Products' },
              { href: '/product/neck-protector-v1', label: 'Neck Protector' },
              { href: '/cart', label: 'Cart' },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: '#d4d4d4',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Journal */}
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
            Journal
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/articles', label: 'All Articles' },
              { href: '/articles/why-girls-hockey-needs-better-gear', label: "Why Girls' Hockey Deserves Better Gear" },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: '#d4d4d4',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
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
            Company
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
              { href: '/account', label: 'My Account' },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: '#d4d4d4',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
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
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            color: '#8a8a8a',
          }}
        >
          © {currentYear} DefendHer Sport. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms', label: 'Terms' },
            { href: '/sitemap', label: 'Sitemap' },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                color: '#8a8a8a',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
