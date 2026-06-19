import { useParams, Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { getProduct } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';

const site = 'https://defendhersport.net';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id ?? '');
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '64px', color: '#e8ff3a', textTransform: 'uppercase' }}>NOT FOUND</h1>
          <Link to="/shop" style={{ color: '#d4d4d4', fontFamily: 'var(--font-sans)' }}>Back to shop</Link>
        </div>
      </div>
    );
  }

  function handleAddToCart() {
    addItem({ id: product!.id, name: product!.name, price: product!.price, size: selectedSize, image: product!.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — DefendHer Sport</title>
        <meta name="description" content={product.tagline} />
        <link rel="canonical" href={`${site}/product/${product.id}`} />
        <meta property="og:title" content={`${product.name} — DefendHer Sport`} />
        <meta property="og:description" content={product.tagline} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${site}/product/${product.id}`} />
        <meta property="og:image" content={`${site}${product.image}`} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: `${site}${product.image}`,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        })}</script>
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: 'calc(100vh - 64px)',
            alignItems: 'start',
          }}
        >
          {/* Left: product image */}
          <div
            style={{
              position: 'sticky',
              top: '64px',
              height: 'calc(100vh - 64px)',
              overflow: 'hidden',
              background: '#2e2e2e',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              width={800}
              height={1000}
              loading="eager"
              fetchPriority="high"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Right: product details */}
          <div style={{ padding: 'clamp(48px, 6vw, 80px) 48px clamp(64px, 8vw, 96px)', borderLeft: '1px solid #3d3d3d' }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '32px' }} aria-label="Breadcrumb">
              <Link to="/shop" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', textDecoration: 'none' }}>
                ← SHOP
              </Link>
            </nav>

            {product.badge && (
              <span
                style={{
                  display: 'inline-block',
                  background: '#e8ff3a',
                  color: '#1a1a1a',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  marginBottom: '16px',
                }}
              >
                {product.badge}
              </span>
            )}

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 0.85,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 16px',
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                color: '#d4d4d4',
                lineHeight: 1.6,
                marginBottom: '32px',
                maxWidth: '55ch',
              }}
            >
              {product.description}
            </p>

            {/* Price */}
            <div style={{ marginBottom: '32px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '56px',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                  color: '#e8ff3a',
                }}
              >
                ${product.price.toFixed(2)}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  color: '#8a8a8a',
                  marginLeft: '12px',
                }}
              >
                Free shipping over $75
              </span>
            </div>

            {/* Size selector */}
            <div style={{ marginBottom: '32px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#8a8a8a',
                  marginBottom: '12px',
                }}
              >
                Size: <span style={{ color: '#ffffff' }}>{selectedSize}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '48px',
                      height: '48px',
                      background: selectedSize === size ? '#e8ff3a' : 'transparent',
                      border: `2px solid ${selectedSize === size ? '#e8ff3a' : '#3d3d3d'}`,
                      borderRadius: '2px',
                      color: selectedSize === size ? '#1a1a1a' : '#d4d4d4',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 150ms',
                    }}
                    aria-pressed={selectedSize === size}
                    aria-label={`Size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: added ? '#e8ff3a' : 'transparent',
                border: '2px solid #e8ff3a',
                color: added ? '#1a1a1a' : '#e8ff3a',
                borderRadius: '9999px',
                padding: '16px 32px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                marginBottom: '48px',
                transition: 'all 150ms',
              }}
            >
              {added ? 'ADDED TO CART ✓' : 'ADD TO CART'}
              {!added && <ArrowRight size={16} />}
            </button>

            {/* Specs */}
            <div style={{ borderTop: '1px solid #3d3d3d', paddingTop: '32px', marginBottom: '32px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#8a8a8a',
                  marginBottom: '16px',
                }}
              >
                Specifications
              </div>
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '16px',
                    padding: '12px 0',
                    borderBottom: '1px solid #3d3d3d',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a', textTransform: 'lowercase' }}>{spec.label}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff', textAlign: 'right' }}>{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#8a8a8a',
                  marginBottom: '16px',
                }}
              >
                Features
              </div>
              {product.features.map((feat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    borderBottom: '1px solid #3d3d3d',
                  }}
                >
                  <Shield size={14} style={{ color: '#e8ff3a', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#d4d4d4' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
