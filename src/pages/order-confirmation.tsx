import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';

const site = 'https://defendhersport.net';

// Mock order reference
const ORDER_REF = `DH-${Date.now().toString(36).toUpperCase().slice(-8)}`;

export default function OrderConfirmationPage() {
  return (
    <>
      <Helmet>
        <title>Order Confirmed — DefendHer Sport</title>
        <meta name="description" content="Your DefendHer order has been confirmed." />
        <link rel="canonical" href={`${site}/order-confirmation`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        {/* Flow nav step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', height: '56px', borderBottom: '1px solid #3d3d3d' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#e8ff3a', textTransform: 'uppercase', letterSpacing: '0.01em' }}>DEFENDHER</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#8a8a8a' }}>step 3 of 3</span>
        </div>

        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 'clamp(64px, 8vw, 100px) 24px clamp(80px, 10vw, 120px)',
            minHeight: 'calc(100vh - 120px)',
          }}
        >
          <div style={{ width: '100%', maxWidth: '560px' }}>
            {/* Status mark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid #e8ff3a',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8l4 4 6-7" stroke="#e8ff3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a' }}>
                Order confirmed
              </span>
            </div>

            {/* Display headline */}
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(64px, 16vw, 96px)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 0.85,
                color: '#e8ff3a',
                textTransform: 'uppercase',
                margin: '0 0 48px',
              }}
            >
              ORDER<br />PLACED
            </h1>

            {/* Confirmation panel — full volt border */}
            <div
              style={{
                background: '#2e2e2e',
                border: '1px solid #e8ff3a',
                borderRadius: '2px',
                overflow: 'hidden',
                marginBottom: '32px',
              }}
              role="region"
              aria-label="Order details"
            >
              <div
                style={{
                  padding: '24px 28px 20px',
                  borderBottom: '1px solid #3d3d3d',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '40px',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: 0.9,
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  NECK PROTECTOR
                </h2>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', whiteSpace: 'nowrap' }}>
                  CE Level 1
                </span>
              </div>

              <dl>
                {[
                  { label: 'product', value: 'DefendHer Neck Protector' },
                  { label: 'size', value: 'M' },
                  { label: 'quantity', value: '1' },
                  { label: 'shipping', value: 'Standard (3–5 business days)' },
                  { label: 'total charged', value: '$89.99', volt: true },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: '24px',
                      padding: '16px 28px',
                      borderBottom: i < 4 ? '1px solid #3d3d3d' : 'none',
                    }}
                  >
                    <dt style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', textTransform: 'lowercase', flexShrink: 0 }}>{row.label}</dt>
                    <dd style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 700, color: row.volt ? '#e8ff3a' : '#ffffff', textAlign: 'right', margin: 0 }}>{row.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Reference strip */}
              <div
                style={{
                  background: '#1a1a1a',
                  padding: '20px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  borderTop: '1px solid #3d3d3d',
                }}
              >
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#8a8a8a', textTransform: 'lowercase', flexShrink: 0 }}>order ref</span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    color: '#e8ff3a',
                    letterSpacing: '0.06em',
                    textAlign: 'right',
                    lineHeight: 1,
                  }}
                  aria-label={`Order reference ${ORDER_REF}`}
                >
                  {ORDER_REF}
                </span>
              </div>
            </div>

            {/* Post-confirmation message */}
            <div style={{ borderTop: '1px solid #3d3d3d', paddingTop: '32px' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', lineHeight: 1.6, marginBottom: '32px' }}>
                A confirmation email is on its way. Your neck protector ships within 1–2 business days. Track your order in your account.
              </p>

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link
                  to="/account/orders"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'transparent',
                    border: '2px solid #e8ff3a',
                    color: '#e8ff3a',
                    borderRadius: '9999px',
                    padding: '14px 24px',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                  }}
                >
                  TRACK ORDER
                </Link>
                <Link
                  to="/shop"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700,
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#8a8a8a',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  ← BACK TO SHOP
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
