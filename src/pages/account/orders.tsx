import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { fetchOrders, getSessionId, type Order } from '@/lib/auth-client';

const site = 'https://defendhersport.net';

const STATUS_STEPS = ['confirmed', 'processing', 'shipped', 'delivered'];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

function StatusTracker({ status }: { status: string }) {
  const currentIdx = STATUS_STEPS.indexOf(status);
  const isCancelled = status === 'cancelled' || status === 'refunded';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '16px' }}>
      {STATUS_STEPS.map((step, i) => {
        const done = !isCancelled && currentIdx >= i;
        const active = !isCancelled && currentIdx === i;
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 'none' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: done ? '#e8ff3a' : '#3d3d3d',
                border: active ? '2px solid #e8ff3a' : 'none',
                flexShrink: 0,
                boxShadow: active ? '0 0 8px rgba(232,255,58,0.5)' : 'none',
              }}
            />
            {i < STATUS_STEPS.length - 1 && (
              <div style={{ flex: 1, height: '2px', background: done && currentIdx > i ? '#e8ff3a' : '#3d3d3d', minWidth: '24px' }} />
            )}
          </div>
        );
      })}
      <div style={{ marginLeft: '12px', fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: isCancelled ? '#ff6b6b' : '#e8ff3a', whiteSpace: 'nowrap' }}>
        {STATUS_LABELS[status] ?? status}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getSessionId()) {
      navigate('/account');
      return;
    }
    fetchOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Order History — DefendHer Sport</title>
        <meta name="description" content="View and track your DefendHer orders." />
        <link rel="canonical" href={`${site}/account/orders`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 48px' }}>

          {/* Header */}
          <div style={{ marginBottom: '48px' }}>
            <Link to="/account" style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
              ← MY ACCOUNT
            </Link>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
              ORDER HISTORY
            </h1>
          </div>

          {loading && (
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#8a8a8a' }}>Loading orders...</div>
          )}

          {error && (
            <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.4)', borderRadius: '2px', padding: '16px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', color: '#3d3d3d', textTransform: 'uppercase', marginBottom: '16px' }}>NO ORDERS YET</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#8a8a8a', marginBottom: '32px' }}>
                Your order history will appear here after your first purchase.
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
                SHOP NOW →
              </Link>
            </div>
          )}

          {!loading && orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: '1px solid #3d3d3d',
                borderRadius: '2px',
                marginBottom: '24px',
                overflow: 'hidden',
              }}
            >
              {/* Order header */}
              <div style={{ background: '#2e2e2e', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#e8ff3a', textTransform: 'uppercase', letterSpacing: '0.01em' }}>
                    {order.orderNumber}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', marginTop: '2px' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#ffffff', textTransform: 'uppercase' }}>
                    ${parseFloat(order.total).toFixed(2)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Status tracker */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #3d3d3d' }}>
                <StatusTracker status={order.status} />
                {order.trackingNumber && (
                  <div style={{ marginTop: '12px', fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>
                    Tracking: <span style={{ color: '#d4d4d4' }}>{order.trackingCarrier ? `${order.trackingCarrier} — ` : ''}{order.trackingNumber}</span>
                  </div>
                )}
              </div>

              {/* Line items */}
              <div style={{ padding: '0 24px' }}>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 0',
                      borderBottom: '1px solid #3d3d3d',
                      gap: '16px',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>{item.productName}</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', marginTop: '2px' }}>
                        {[item.variantSize, item.variantColor].filter(Boolean).join(' · ')} · Qty {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#d4d4d4', whiteSpace: 'nowrap' }}>
                      ${parseFloat(item.lineTotal).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order totals */}
              <div style={{ padding: '16px 24px', background: '#242424' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '240px', marginLeft: 'auto' }}>
                  {[
                    { label: 'Subtotal', value: order.subtotal },
                    { label: 'Shipping', value: parseFloat(order.shippingCost) === 0 ? 'FREE' : `$${parseFloat(order.shippingCost).toFixed(2)}` },
                    { label: 'Tax (HST)', value: `$${parseFloat(order.tax).toFixed(2)}` },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>
                      <span>{row.label}</span>
                      <span>{typeof row.value === 'string' && row.value.startsWith('$') ? row.value : typeof row.value === 'string' ? row.value : `$${parseFloat(String(row.value)).toFixed(2)}`}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff', paddingTop: '8px', borderTop: '1px solid #3d3d3d', marginTop: '4px' }}>
                    <span>Total</span>
                    <span>${parseFloat(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
