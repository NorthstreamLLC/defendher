import { Helmet } from '@dr.pogodin/react-helmet';
import PageBanner from '@/components/PageBanner';

const site = 'https://defendhersportsgear.com';

const h2: React.CSSProperties = { fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '40px 0 12px' };
const p: React.CSSProperties = { fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', lineHeight: 1.75, margin: '0 0 16px' };

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | DefendHer Sports</title>
        <meta name="description" content="How DefendHer Sports collects, uses and protects the email addresses people share with us." />
        <link rel="canonical" href={`${site}/privacy`} />
      </Helmet>
      <div style={{ paddingTop: 'var(--header-h)', background: '#1a1a1a' }}>
        <PageBanner eyebrow="Legal" title="Privacy policy" subtitle="Last updated October 6, 2026." />
        <article style={{ maxWidth: '760px', padding: 'clamp(40px, 5vw, 72px) clamp(24px, 6vw, 96px) clamp(64px, 8vw, 120px)' }}>
          <p style={p}>
            DefendHer Sports (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a pre-launch brand. This page explains what we collect when you use this website and what we do with it.
          </p>

          <h2 style={h2}>What we collect</h2>
          <p style={p}>
            If you join our launch list, we collect your email address, the page you signed up from, and the date and time. We don&rsquo;t ask for anything else, and we don&rsquo;t collect payment details because we don&rsquo;t sell anything yet.
          </p>

          <h2 style={h2}>How we use it</h2>
          <p style={p}>
            We use your email only to tell you about DefendHer Sports, such as launch news and product updates. We don&rsquo;t sell your email address or share it with anyone to market to you.
          </p>

          <h2 style={h2}>Where it&rsquo;s stored</h2>
          <p style={p}>
            Signups are stored in a private Google Sheet that only our team can open. Our website is hosted by Vercel, which keeps standard server logs such as your IP address and browser type to run and secure the site.
          </p>

          <h2 style={h2}>Unsubscribing and deleting your data</h2>
          <p style={p}>
            Email us at <a href="mailto:Defendhersports@gmail.com" style={{ color: '#e8ff3a' }}>Defendhersports@gmail.com</a> and ask us to remove your address, and we will. Every marketing email we send will also tell you how to opt out.
          </p>

          <h2 style={h2}>Links to other sites</h2>
          <p style={p}>
            Our pages link to Instagram, TikTok, Facebook, X and LinkedIn. Those services have their own privacy policies, and we don&rsquo;t control what they collect.
          </p>

          <h2 style={h2}>Changes</h2>
          <p style={p}>
            If we change how we handle your information, we&rsquo;ll update this page and the date above.
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
