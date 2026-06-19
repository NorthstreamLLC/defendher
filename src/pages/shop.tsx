import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';

const site = 'https://defendhersport.net';

export default function ShopPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  return (
    <>
      <Helmet>
        <title>Shop — DefendHer Sport</title>
        <meta name="description" content="Shop DefendHer neck protectors for women's hockey. CE Level 1 certified, women-specific fit." />
        <link rel="canonical" href={`${site}/shop`} />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        {/* Page header */}
        <div style={{ padding: 'clamp(48px, 6vw, 80px) 48px 40px', borderBottom: '1px solid #3d3d3d' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '12px' }}>
            DefendHer Store
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
            PROTECT<br />HER GAME
          </h1>
        </div>

        {/* Products */}
        <div style={{ padding: '0 0 96px' }}>
          {PRODUCTS.map((product) => {
            const size = selectedSizes[product.id] || 'M';
            return (
              <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #3d3d3d' }}>

                {/* Image */}
                <Link to={`/product/${product.id}`} style={{ display: 'block', position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#2e2e2e' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 400ms', }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                  {product.badge && (
                    <span style={{ position: 'absolute', top: '16px', left: '16px', background: '#e8ff3a', color: '#1a1a1a', fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 10px', borderRadius: '2px' }}>
                      {product.badge}
                    </span>
                  )}
                </Link>

                {/* Details */}
                <div style={{ padding: 'clamp(32px, 5vw, 80px) clamp(24px, 5vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid #3d3d3d' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4vw, 64px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 16px' }}>
                    {product.name}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', lineHeight: 1.6, marginBottom: '32px', maxWidth: '44ch' }}>
                    {product.tagline}
                  </p>

                  {/* Size selector */}
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '12px' }}>
                      Size: <span style={{ color: '#ffffff' }}>{size}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {product.sizes.map((s) => (
                        <button key={s} onClick={() => setSelectedSizes(prev => ({ ...prev, [product.id]: s }))}
                          style={{ width: '44px', height: '44px', background: size === s ? '#e8ff3a' : 'transparent', border: `2px solid ${size === s ? '#e8ff3a' : '#3d3d3d'}`, borderRadius: '2px', color: size === s ? '#1a1a1a' : '#d4d4d4', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'all 150ms' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, color: '#e8ff3a', lineHeight: 1 }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={() => addItem({ id: product.id, name: product.name, price: product.price, size, image: product.image })}
                        style={{ background: '#e8ff3a', color: '#1a1a1a', border: 'none', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        Add to Cart
                      </button>
                      <Link to={`/product/${product.id}`}
                        style={{ background: 'transparent', color: '#e8ff3a', border: '2px solid #e8ff3a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
