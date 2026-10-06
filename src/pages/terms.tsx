import { Helmet } from '@dr.pogodin/react-helmet';
import PageBanner from '@/components/PageBanner';

const site = 'https://defendhersportsgear.com';

const h2: React.CSSProperties = { fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '40px 0 12px' };
const p: React.CSSProperties = { fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', lineHeight: 1.75, margin: '0 0 16px' };

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Use | DefendHer Sports</title>
        <meta name="description" content="The terms for using the DefendHer Sports website." />
        <link rel="canonical" href={`${site}/terms`} />
      </Helmet>
      <div style={{ paddingTop: 'var(--header-h)', background: '#1a1a1a' }}>
        <PageBanner eyebrow="Legal" title="Terms of use" subtitle="Last updated October 6, 2026." />
        <article style={{ maxWidth: '760px', padding: 'clamp(40px, 5vw, 72px) clamp(24px, 6vw, 96px) clamp(64px, 8vw, 120px)' }}>
          <p style={p}>
            By using this website you agree to these terms. If you don&rsquo;t agree, please don&rsquo;t use the site.
          </p>

          <h2 style={h2}>This is an information site</h2>
          <p style={p}>
            DefendHer Sports is in development and nothing on this website is for sale. Descriptions, drawings and photos show early prototypes and concepts, and the final product, design and materials may change before launch.
          </p>

          <h2 style={h2}>Patent pending</h2>
          <p style={p}>
            The DefendHer design is patent pending. Please don&rsquo;t copy, reproduce or build on it without our written permission.
          </p>

          <h2 style={h2}>Testimonials and opinions</h2>
          <p style={p}>
            Testimonials are the personal experiences and opinions of the players quoted, based on early prototypes. They are not guarantees of how any product will perform for you.
          </p>

          <h2 style={h2}>Our content</h2>
          <p style={p}>
            The text, photos, drawings, logos and designs on this site belong to DefendHer Sports or the people credited. You may share links to our pages, but please don&rsquo;t reuse our content without permission.
          </p>

          <h2 style={h2}>No warranties</h2>
          <p style={p}>
            We work to keep this site accurate, but we provide it as is, without promises that it will always be available or error-free. To the extent the law allows, DefendHer Sports isn&rsquo;t liable for losses from using the site.
          </p>

          <h2 style={h2}>Changes</h2>
          <p style={p}>
            We may update these terms from time to time. The date above shows when they last changed.
          </p>

          <h2 style={h2}>Contact</h2>
          <p style={p}>
            Questions? Email <a href="mailto:Defendhersports@gmail.com" style={{ color: '#e8ff3a' }}>Defendhersports@gmail.com</a>.
          </p>
        </article>
      </div>
    </>
  );
}
