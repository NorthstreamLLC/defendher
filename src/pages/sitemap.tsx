import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ARTICLES } from '@/lib/articles';
import { PRODUCTS } from '@/lib/products';

const site = 'https://defendhersport.net';

interface SitemapSection {
  label: string;
  links: { href: string; label: string; description?: string }[];
}

const SECTIONS: SitemapSection[] = [
  {
    label: 'Main',
    links: [
      { href: '/', label: 'Home', description: "DefendHer Sport — neck protection built for women's hockey" },
      { href: '/about', label: 'About', description: 'Our story and mission' },
      { href: '/contact', label: 'Contact', description: 'Get in touch with the team' },
    ],
  },
  {
    label: 'Shop',
    links: [
      { href: '/shop', label: 'All Products', description: 'Browse the full DefendHer range' },
      ...PRODUCTS.map((p) => ({
        href: `/product/${p.id}`,
        label: p.name,
        description: p.tagline,
      })),
    ],
  },
  {
    label: 'Articles',
    links: [
      { href: '/articles', label: 'All Articles', description: "Insights on women's hockey gear and protection" },
      ...ARTICLES.map((a) => ({
        href: `/articles/${a.slug}`,
        label: a.title,
        description: a.subtitle,
      })),
    ],
  },
  {
    label: 'Account',
    links: [
      { href: '/account', label: 'My Account', description: 'Sign in or create an account' },
      { href: '/account/orders', label: 'Order History', description: 'Track and manage your orders' },
      { href: '/cart', label: 'Cart', description: 'Your shopping cart' },
      { href: '/checkout', label: 'Checkout', description: 'Complete your order' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Helmet>
        <title>Sitemap — DefendHer Sport</title>
        <meta name="description" content="All pages on DefendHer Sport — women's hockey neck protection." />
        <link rel="canonical" href={`${site}/sitemap`} />
        <meta property="og:title" content="Sitemap — DefendHer Sport" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/sitemap`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${site}/sitemap#webpage`,
          name: 'Sitemap — DefendHer Sport',
          url: `${site}/sitemap`,
          isPartOf: { '@id': `${site}/#website` },
        })}</script>
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: 'var(--concrete-900, #1a1a1a)' }}>
        {/* Page header */}
        <div style={{ padding: 'clamp(48px, 6vw, 80px) 48px 40px', borderBottom: '1px solid var(--line-subtle, #3d3d3d)' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--chalk-tertiary, #8a8a8a)', display: 'block', marginBottom: '12px' }}>
            All Pages
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: 'var(--chalk-primary, #ffffff)', textTransform: 'uppercase', margin: 0 }}>
            SITEMAP
          </h1>
        </div>

        {/* Sections */}
        <div style={{ padding: 'clamp(48px, 6vw, 72px) 48px clamp(80px, 10vw, 120px)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'clamp(40px, 5vw, 64px) clamp(32px, 5vw, 64px)',
            }}
          >
            {SECTIONS.map((section) => (
              <div key={section.label}>
                {/* Section heading */}
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--chalk-tertiary, #8a8a8a)',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--line-subtle, #3d3d3d)',
                    marginBottom: '0',
                  }}
                >
                  {section.label}
                </div>

                {/* Links */}
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                    <div
                      style={{
                        padding: '16px 0',
                        borderBottom: '1px solid var(--line-subtle, #3d3d3d)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '22px',
                          fontWeight: 400,
                          letterSpacing: '0.01em',
                          lineHeight: 0.9,
                          color: 'var(--chalk-primary, #ffffff)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {link.label}
                      </span>
                      {link.description && (
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            color: 'var(--chalk-tertiary, #8a8a8a)',
                            lineHeight: 1.5,
                          }}
                        >
                          {link.description}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          color: 'var(--chalk-tertiary, #8a8a8a)',
                          marginTop: '2px',
                        }}
                      >
                        {site}{link.href}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
