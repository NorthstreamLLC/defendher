import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';

const site = 'https://defendhersport.net';

export default function ShopPage() {
  const addItem = useCartStore((s) => s.addItem);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [activeImages, setActiveImages] = useState<Record<string, number>>({});

  return (
    <>
      <Helmet>
        <title>Shop — DefendHer Sport</title>
        <meta name="description" content="Shop DefendHer neck protectors for women's hockey. CE Level 1 certified, women-specific fit." />
        <link rel="canonical" href={`${site}/shop`} />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        <div style={{ padding: 'clamp(48px, 6vw, 80px) 48px 40px', borderBottom: '1px solid #3d3d3d' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '12px' }}>
            DefendHer Store
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
            PROTECT<br />HER GAME
          </h1>
        </div>

        <div style={{ padding: '48px 48px 96px' }}>
          {PRODUCTS.map((product) => {
            const size = selectedSizes[product.id] || 'M';
            const images = product.images && product.images.length > 0 ? product.images : [product.image];
            const activeIdx = activeImages[product.id] || 0;

            const prev = () => setActiveImages(p => ({ ...p, [product.id]: (activeIdx - 1 + images.length) % images.length }));
            const next = () => setActiveImages(p => ({ ...p, [product.id]: (activeIdx + 1) % images.length }));

            return (
              <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '64px', alignItems: 'start', maxWidth: '1100px', margin: '0 auto' }}>

                {/* Image + thumbnails */}
                <div>
                  {/* Main image with arrows */}
                  <div style={{ position: 'relative', aspectRatio: '4/3', background: '#2e2e2e', borderRadius: '4px', overflow: 'hidden' }}>
                    <Link to={`/product/${product.id}`}>
                      <img src={images[activeIdx]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </Link>
                    {product.badge && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#e8ff3a', color: '#1a1a1a', fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 10px', borderRadius: '2px' }}>
                        {product.badge}
                      </span>
                    )}
                    {images.length > 1 && (
                      <>
                        <button onClick={prev} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                          <ChevronLeft size={18} />
                        </button>
                        <button onClick={next} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>
                  {/* Thumbnails */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    {images.map((img, i) => (
                      <button key={i} onClick={() => setActiveImages(p => ({ ...p, [product.id]: i }))}
                        style={{ flex: 1, aspectRatio: '1/1', overflow: 'hidden', border: 'none', padding: 0, cursor: 'pointer', borderRadius: '3px', outline: activeIdx === i ? '2px solid #e8ff3a' : '2px solid #3d3d3d', outlineOffset: '0px', background: 'none' }}>
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: activeIdx === i ? 1 : 0.45, transition: 'opacity 150ms' }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div style={{ paddingTop: '8px' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 3.5vw, 56px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 12px' }}>
                    {product.name}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', lineHeight: 1.6, marginBottom: '28px' }}>
                    {product.tagline}
                  </p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#d4d4d4', lineHeight: 1.7, marginBottom: '32px' }}>
                    {product.description}
                  </p>

                  {/* Size */}
                  <div style={{ marginBottom: '28px' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '10px' }}>
                      Size: <span style={{ color: '#fff' }}>{size}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {product.sizes.map((s) => (
                        <button key={s} onClick={() => setSelectedSizes(p => ({ ...p, [product.id]: s }))}
                          style={{ width: '44px', height: '44px', background: size === s ? '#e8ff3a' : 'transparent', border: `2px solid ${size === s ? '#e8ff3a' : '#3d3d3d'}`, borderRadius: '2px', color: size === s ? '#1a1a1a' : '#d4d4d4', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'all 150ms' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTAs */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 400, color: '#e8ff3a', lineHeight: 1 }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, size, image: product.image })}
                        style={{ background: '#e8ff3a', color: '#1a1a1a', border: 'none', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        Add to Cart
                      </button>
                      <Link to={`/product/${product.id}`}
                        style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#e8ff3a', border: '2px solid #e8ff3a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Specs */}
                  <div style={{ borderTop: '1px solid #3d3d3d', paddingTop: '24px' }}>
                    {product.specs.map((spec, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #3d3d3d' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>{spec.label}</span>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: '#fff' }}>{spec.value}</span>
                      </div>
                    ))}
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
