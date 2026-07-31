import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProduct } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';

const site = 'https://defendhersport.net';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id ?? '');
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '64px', color: '#e8ff3a', textTransform: 'uppercase' }}>NOT FOUND</h1>
          <Link to="/shop" style={{ color: '#d4d4d4', fontFamily: 'var(--font-sans)' }}>Back to shop</Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const prev = () => setActiveImage((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveImage((i) => (i + 1) % images.length);

  function handleAddToCart() {
    addItem({ id: product!.id, name: product!.name, price: product!.price, size: selectedSize, image: product!.image });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  const arrow = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute',
    [side]: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.55)',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
  });

  return (
    <>
      <Helmet>
        <title>{product.name} — DefendHer Sports</title>
        <meta name="description" content={product.tagline} />
        <link rel="canonical" href={`${site}/product/${product.id}`} />
        <meta property="og:title" content={`${product.name} — DefendHer Sports`} />
        <meta property="og:description" content={product.tagline} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`${site}/product/${product.id}`} />
        <meta property="og:image" content={`${site}${product.image}`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>
        <div style={{ padding: 'clamp(24px, 3vw, 40px) clamp(24px, 6vw, 96px) clamp(64px, 8vw, 96px)', maxWidth: '1280px', margin: '0 auto' }}>

          {/* Breadcrumb */}
          <nav style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }} aria-label="Breadcrumb">
            <Link to="/shop" style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', textDecoration: 'none' }}>
              ← Shop
            </Link>
          </nav>

          {/* Gallery + buy panel */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(32px, 5vw, 72px)',
              alignItems: 'start',
              marginBottom: 'clamp(48px, 6vw, 80px)',
            }}
          >
            {/* Gallery */}
            <div>
              <div style={{ position: 'relative', aspectRatio: '1/1', background: '#2e2e2e', borderRadius: '4px', overflow: 'hidden' }}>
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {product.badge && (
                  <span style={{ position: 'absolute', top: '14px', left: '14px', background: '#e8ff3a', color: '#1a1a1a', fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 10px', borderRadius: '2px' }}>
                    {product.badge}
                  </span>
                )}
                {images.length > 1 && (
                  <>
                    <button onClick={prev} aria-label="Previous image" style={arrow('left')}>
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={next} aria-label="Next image" style={arrow('right')}>
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      style={{
                        width: '84px',
                        aspectRatio: '1/1',
                        overflow: 'hidden',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        borderRadius: '3px',
                        outline: activeImage === i ? '2px solid #e8ff3a' : '2px solid #3d3d3d',
                        background: 'none',
                        flexShrink: 0,
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: activeImage === i ? 1 : 0.45, transition: 'opacity 150ms' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy panel */}
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 14px' }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', lineHeight: 1.6, margin: '0 0 24px' }}>
                {product.tagline}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 400, lineHeight: 1, color: '#e8ff3a' }}>
                  ${product.price.toFixed(2)}
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a' }}>
                  Free shipping over $75
                </span>
              </div>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#d4d4d4', lineHeight: 1.75, margin: '0 0 32px' }}>
                {product.description}
              </p>

              {/* Size */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '12px' }}>
                  Size: <span style={{ color: '#ffffff' }}>{selectedSize}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
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
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  maxWidth: '360px',
                  background: '#e8ff3a',
                  border: '2px solid #e8ff3a',
                  color: '#1a1a1a',
                  borderRadius: '9999px',
                  padding: '17px 32px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Specs + features */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(32px, 5vw, 72px)',
              borderTop: '1px solid #3d3d3d',
              paddingTop: 'clamp(32px, 4vw, 48px)',
            }}
          >
            <div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', margin: '0 0 20px' }}>
                Specifications
              </h2>
              {product.specs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px', padding: '12px 0', borderBottom: '1px solid #3d3d3d' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>{spec.label}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#ffffff', textAlign: 'right' }}>{spec.value}</span>
                </div>
              ))}
            </div>

            <div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', margin: '0 0 20px' }}>
                Features
              </h2>
              {product.features.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 0', borderBottom: '1px solid #3d3d3d' }}>
                  <Shield size={14} style={{ color: '#e8ff3a', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#d4d4d4' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
