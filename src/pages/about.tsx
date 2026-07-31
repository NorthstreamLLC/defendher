import { Helmet } from '@dr.pogodin/react-helmet';

const site = 'https://defendhersport.net';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — DefendHer Sports</title>
        <meta name="description" content="DefendHer Sports builds protective equipment designed specifically for female athletes, starting with women's hockey." />
        <link rel="canonical" href={`${site}/about`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>

        {/* Hero */}
        <div style={{ padding: 'clamp(64px, 8vw, 120px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '900px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '16px' }}>
            About
          </span>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
            Built for her.<br />From the ground up.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', color: '#a0a0a0', lineHeight: 1.7, margin: '0 0 20px', maxWidth: '620px' }}>
            At DefendHer Sports, we believe every female athlete deserves products designed for her — not adapted from someone else. Born from firsthand experience on the ice, our brand is committed to solving the everyday challenges women face in sport through thoughtful innovation, comfort, and performance.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', color: '#a0a0a0', lineHeight: 1.7, margin: 0, maxWidth: '620px' }}>
            We are building more than equipment — we are building a brand where women feel seen, valued, and represented.
          </p>
        </div>

        {/* Mission */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', maxWidth: '1200px' }}>
          {[
            { label: 'Our Mission', body: 'To redefine women’s sports equipment by designing innovative, comfortable, and protective products created by women, for women. We are committed to putting female athletes first, listening to their needs, and developing gear that helps them perform with confidence while feeling represented, supported, and empowered.' },
            { label: 'Our Standard', body: 'CE Level 1 certified protection in every product we ship. That’s not a marketing claim — it’s a minimum threshold. If it doesn’t meet the standard, it doesn’t leave the building.' },
            { label: 'Our Promise', body: 'We’ll always be honest about what our gear does and doesn’t do, and we’ll keep improving it. As we grow, that promise extends to every sport we build for.' },
          ].map(({ label, body }) => (
            <div key={label}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '16px' }}>
                {label}
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', lineHeight: 1.7, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Starting with hockey */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '780px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '24px' }}>
            Starting With Hockey
          </span>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.01em', margin: '0 0 20px' }}>
            One sport first. Every sport next.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 20px' }}>
            Our goal is to provide protective equipment for female athletes across all sports. We started with women&rsquo;s hockey because that&rsquo;s where our experience is, and because the gap between what women need and what the market offers is impossible to ignore on the ice.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: 0 }}>
            Hockey is where we begin — not where we stop. The same approach that shaped our neck protector will carry into every sport we build for next.
          </p>
        </div>

        {/* Story */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '1100px' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', margin: '0 0 40px' }}>
            Our Story
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'start' }}>

            {/* Photo */}
            <div style={{ maxWidth: '380px' }}>
              <div
                style={{
                  aspectRatio: '4/5',
                  background: '#2e2e2e',
                  border: '1px solid #3d3d3d',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/ally.jpg"
                  alt="Ally Stymiest, co-founder of DefendHer Sports, in her University of Southern Maine jersey"
                  width={900}
                  height={1124}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, letterSpacing: '-0.01em', margin: '0 0 8px' }}>
                Ally Stymiest
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', margin: '0 0 28px' }}>
                Co-Founder
              </p>

              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 20px' }}>
                Ally Stymiest is a professional hockey player and co-founder of DefendHer Sports. She played four years of prep school hockey before competing at the NCAA Division III level at the University of Southern Maine, where she earned a degree in Leadership and Organizational Studies. After graduating, Ally signed her first professional hockey contract.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 20px' }}>
                Throughout her athletic career, Ally recognized a consistent gap in the women&rsquo;s sports market. Few brands were designing products specifically for female athletes, and she regularly heard teammates express frustration with base layers and protective gear that didn&rsquo;t fit properly or meet their needs. The result: girls wearing products incorrectly, or not wearing protective gear at all.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 20px' }}>
                Growing up, Ally struggled with traditional neck guards. They chafed her neck and caught in her hair, leaving her to pull out large knots or spend hours brushing them out, and over time the Velcro closures wore out and lost their effectiveness. Across years of locker rooms, she noticed nearly every female hockey player already wore a sports bra. Long-sleeve shirts with built-in neck guards existed, but nothing combined support, comfort, and protection in one product. That gap inspired the idea: a sports bra with an integrated neck guard.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: 0 }}>
                After bringing the concept to Neal &mdash; her equipment manager in university &mdash; and building a first prototype, both knew they had something worth pursuing. Together they refined the design with an adjustable magnetic closure that keeps hair from catching while holding the secure fit athletes need. Today, Ally&rsquo;s vision for DefendHer Sports is to create innovative base layers and protective gear that prioritize women, celebrate every body type, and ensure female athletes of all ages have products designed specifically for them &mdash; not adapted from men&rsquo;s equipment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '24px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Ready to try it?
          </p>
          <a
            href="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--volt-primary, #e8ff3a)', color: '#1a1a1a', borderRadius: '9999px', padding: '14px 32px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
          >
            Shop Now
          </a>
        </div>

      </div>
    </>
  );
}
