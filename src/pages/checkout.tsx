import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useCartStore } from '@/lib/cart-store';
import { authHeaders, getStoredCustomer } from '@/lib/auth-client';

const site = 'https://defendhersport.net';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const customer = getStoredCustomer();

  // Form state
  const [firstName, setFirstName] = useState(customer?.firstName ?? '');
  const [lastName, setLastName] = useState(customer?.lastName ?? '');
  const [email, setEmail] = useState(customer?.email ?? '');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const sub = subtotal();
  const shippingCost = sub >= 75 ? 0 : 9.99;
  const tax = sub * 0.13;
  const total = sub + shippingCost + tax;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({
          guestEmail: customer ? undefined : email,
          shipping: { firstName, lastName, line1, city, state, postalCode, country: 'CA' },
          items: items.map((item) => ({
            productId: item.id,
            productName: item.name,
            variantSize: item.size,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Order failed');
      clearCart();
      navigate('/order-confirmation', { state: { orderNumber: json.orderNumber, total: json.total } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '64px', color: '#ffffff', textTransform: 'uppercase', marginBottom: '24px' }}>CART EMPTY</h1>
          <Link to="/shop" style={{ color: '#e8ff3a', fontFamily: 'var(--font-sans)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shop Now →</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout — DefendHer Sport</title>
        <meta name="description" content="Complete your DefendHer order." />
        <link rel="canonical" href={`${site}/checkout`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '55fr 45fr',
            minHeight: 'calc(100vh - 64px)',
            alignItems: 'start',
          }}
        >
          {/* LEFT: Checkout form */}
          <main style={{ padding: 'clamp(48px, 6vw, 72px) 48px clamp(64px, 8vw, 96px)', borderRight: '1px solid #3d3d3d' }}>
            {/* Step indicator */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <Link to="/cart" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', textDecoration: 'none' }}>
                ← CART
              </Link>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#8a8a8a' }}>step 2 of 3</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 0.9,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 40px',
              }}
            >
              YOUR ORDER
            </h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '520px' }} noValidate>
              {/* Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', paddingBottom: '12px', borderBottom: '1px solid #3d3d3d' }}>
                  Contact
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="first-name">First name *</label>
                    <input id="first-name" type="text" required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#ffffff', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="last-name">Last name *</label>
                    <input id="last-name" type="text" required autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#ffffff', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="email">Email *</label>
                  <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#ffffff', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%' }} />
                </div>
              </div>

              {/* Shipping */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', paddingBottom: '12px', borderBottom: '1px solid #3d3d3d' }}>
                  Shipping Address
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="address">Street address *</label>
                  <input id="address" type="text" required autoComplete="street-address" value={line1} onChange={(e) => setLine1(e.target.value)} style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#ffffff', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="city">City *</label>
                    <input id="city" type="text" required autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#ffffff', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="state">Province</label>
                    <input id="state" type="text" autoComplete="address-level1" value={state} onChange={(e) => setState(e.target.value)} style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#ffffff', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="zip">Postal *</label>
                    <input id="zip" type="text" required autoComplete="postal-code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#ffffff', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%' }} />
                  </div>
                </div>
              </div>

              {/* Payment — UI only */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', paddingBottom: '12px', borderBottom: '1px solid #3d3d3d' }}>
                  Payment
                </div>
                <div style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>Payment processing coming soon. This is a demo checkout.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }} htmlFor="card">Card number</label>
                  <input id="card" type="text" placeholder="4242 4242 4242 4242" disabled style={{ background: '#2e2e2e', border: '1px solid #3d3d3d', borderRadius: '2px', color: '#8a8a8a', fontFamily: 'var(--font-sans)', fontSize: '16px', padding: '12px 16px', outline: 'none', width: '100%', cursor: 'not-allowed' }} />
                </div>
              </div>

              {error && (
                <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.4)', borderRadius: '2px', padding: '12px 16px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#ff6b6b' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  background: submitting ? '#e8ff3a' : 'transparent',
                  border: '2px solid #e8ff3a',
                  color: submitting ? '#1a1a1a' : '#e8ff3a',
                  borderRadius: '9999px',
                  padding: '16px 32px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  width: '100%',
                  maxWidth: '360px',
                  transition: 'all 150ms',
                }}
              >
                {submitting ? 'PLACING ORDER...' : 'PLACE ORDER'}
              </button>
            </form>
          </main>

          {/* RIGHT: Order summary — editorial column */}
          <aside
            style={{
              position: 'sticky',
              top: '64px',
              height: 'calc(100vh - 64px)',
              display: 'flex',
              flexDirection: 'column',
              borderTop: '3px solid #e8ff3a',
              overflow: 'auto',
            }}
          >
            <div style={{ padding: '40px 40px 32px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '16px' }}>
                Order Summary
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 0.85,
                  color: '#e8ff3a',
                  textTransform: 'uppercase',
                  margin: '0 0 24px',
                }}
              >
                PROTECT<br />HER GAME
              </h2>
            </div>

            <div style={{ flex: 1, padding: '0 40px', overflowY: 'auto' }}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '16px',
                    padding: '16px 0',
                    borderBottom: '1px solid #3d3d3d',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>{item.name}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>Size {item.size} × {item.quantity}</div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: '24px 40px 40px', borderTop: '1px solid #3d3d3d' }}>
              {[
                { label: 'Subtotal', value: `$${sub.toFixed(2)}` },
                { label: 'Shipping', value: shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}` },
                { label: 'Tax (HST 13%)', value: `$${tax.toFixed(2)}` },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', marginBottom: '8px' }}>
                  <span>{row.label}</span><span>{row.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid #3d3d3d', paddingTop: '12px', marginTop: '4px' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>total</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '40px', color: '#e8ff3a', letterSpacing: '0.01em', lineHeight: 1 }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
