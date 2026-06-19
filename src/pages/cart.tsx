import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

const site = 'https://defendhersport.net';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <>
      <Helmet>
        <title>Cart — DefendHer Sport</title>
        <meta name="description" content="Your DefendHer cart." />
        <link rel="canonical" href={`${site}/cart`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 48px clamp(64px, 8vw, 96px)' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(56px, 8vw, 96px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.85,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: '0 0 48px',
            }}
          >
            YOUR CART
          </h1>

          {items.length === 0 ? (
            <div style={{ borderTop: '1px solid #3d3d3d', paddingTop: '48px' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#8a8a8a', marginBottom: '32px' }}>
                Your cart is empty.
              </p>
              <Link
                to="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'transparent',
                  border: '2px solid #e8ff3a',
                  color: '#e8ff3a',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textDecoration: 'none',
                }}
              >
                SHOP NOW <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'start' }}>
              {/* Line items */}
              <div>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr auto',
                      gap: '20px',
                      padding: '24px 0',
                      borderBottom: '1px solid #3d3d3d',
                      alignItems: 'start',
                    }}
                  >
                    <div style={{ width: '80px', height: '80px', overflow: 'hidden', background: '#2e2e2e', borderRadius: '2px' }}>
                      <img src={item.image} alt={item.name} width={80} height={80} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', marginBottom: '12px' }}>
                        Size: {item.size}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          style={{ width: '28px', height: '28px', border: '1px solid #3d3d3d', borderRadius: '2px', background: 'transparent', color: '#d4d4d4', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ffffff', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          style={{ width: '28px', height: '28px', border: '1px solid #3d3d3d', borderRadius: '2px', background: 'transparent', color: '#d4d4d4', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: '#ffffff', letterSpacing: '0.01em', lineHeight: 1 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        style={{ background: 'none', border: 'none', color: '#8a8a8a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div
                style={{
                  background: '#2e2e2e',
                  border: '1px solid #3d3d3d',
                  padding: '28px',
                  minWidth: '260px',
                  position: 'sticky',
                  top: '80px',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: '24px' }}>
                  ORDER SUMMARY
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>${subtotal().toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #3d3d3d' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>Shipping</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: subtotal() >= 75 ? '#e8ff3a' : '#ffffff' }}>
                    {subtotal() >= 75 ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#ffffff', textTransform: 'uppercase' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: '#e8ff3a', letterSpacing: '0.01em', lineHeight: 1 }}>${subtotal().toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
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
                    width: '100%',
                  }}
                >
                  CHECKOUT <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
