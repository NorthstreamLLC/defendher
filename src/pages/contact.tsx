import { Helmet } from '@dr.pogodin/react-helmet';
import PageBanner from '@/components/PageBanner';
import ContactForm from '@/components/ContactForm';
import SignupForm from '@/components/SignupForm';

const site = 'https://www.defendhersportsgear.com';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact — DefendHer Sports</title>
        <meta name="description" content="Get in touch with DefendHer Sports. Questions, wholesale inquiries, or just want to say hi — we'd love to hear from you." />
        <link rel="canonical" href={`${site}/contact`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>

        <PageBanner
          eyebrow="Contact"
          title="Let's talk."
          subtitle="Questions, feedback or just want to say hi."
        />

        {/* Info + Form */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', maxWidth: '1100px', borderBottom: '1px solid #3d3d3d' }}>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {[
              { label: 'Email', value: 'Defendhersports@gmail.com', href: 'mailto:Defendhersports@gmail.com' },
              { label: 'Hours', value: 'Monday – Friday\n9am – 5pm CT', href: null },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '10px' }}>
                  {label}
                </span>
                {href ? (
                  <a href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', textDecoration: 'none', lineHeight: 1.6, display: 'inline-block', padding: '10px 0' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#d4d4d4')}
                  >
                    {value}
                  </a>
                ) : (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '24px' }}>
              Send a Message
            </span>
            <ContactForm />
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '16px' }}>
            Newsletter
          </span>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '0 0 24px' }}>
            Stay in the loop.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', margin: '0 0 24px', maxWidth: '400px' }}>
            New products, launch updates, and stories from the ice. No spam, ever.
          </p>
          <SignupForm source="contact" buttonLabel="Subscribe" />
        </div>

      </div>
    </>
  );
}
