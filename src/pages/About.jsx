import React, { useEffect, useRef, useState } from 'react';
import { Target, Eye, Shield, Users, Award, Zap, MapPin, Phone, CheckCircle } from 'lucide-react';

// Factory & Registered Office Address
const FACTORY_ADDRESS = "18-19, Sector-D, Industrial Area, Mandideep, Dist. Raisen, Bhopal, Madhya Pradesh - 462046";
const REG_OFFICE = "18-19, Sector-D, Industrial Area, Mandideep, Dist. Raisen, Bhopal, Madhya Pradesh - 462046";
const PHONE = "7225020180";

const STATS = [
  { value: "2024", label: "Year Founded" },
  { value: "150+", label: "Premium Shades" },
  { value: "40+", label: "Partner Dealers" },
  { value: "100%", label: "Quality Tested" }
];

function useCountUp(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ''));
    if (!num) return;
    let start = 0;
    const step = Math.ceil(num / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  const suffix = target.replace(/[0-9]/g, '');
  return count + suffix;
}

function StatItem({ stat, inView }) {
  const displayed = useCountUp(stat.value, inView);
  return (
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ color: 'var(--accent-gold)', fontSize: '46px', fontWeight: '900', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
        {displayed}
      </h3>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontWeight: '600', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {stat.label}
      </p>
    </div>
  );
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function About() {
  const [statsRef, statsInView] = useInView(0.3);

  return (
    <div className="animate-fade">

      {/* ─── 1. HERO — ELEGANT ARCHITECTURE ─── */}
      <section style={{
        backgroundImage: `linear-gradient(rgba(10,20,40,0.65), rgba(10,20,40,0.65)), url('/images/exterior_bungalow.jpeg')`,
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
        color: 'white', padding: '100px 0', textAlign: 'center'
      }}>
        <div className="container">
          <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2.5px', fontSize: '12px', display: 'block', marginBottom: '14px' }}>
            Awantika & Aaradhya Industries Pvt. Ltd.
          </span>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: '900', marginBottom: '18px', fontFamily: 'var(--font-heading)', lineHeight: 1.15 }}>
            About <span style={{ color: 'var(--accent-gold)' }}>Ducon</span> Paints
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '580px', margin: '0 auto', fontSize: '15px', lineHeight: '1.65' }}>
            Crafting premium quality paints, emulsions and textures for beautiful Indian homes and modern architectural structures.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)', color: 'white', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <MapPin size={13} /> Mandideep, M.P.
            </span>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)', color: 'white', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Phone size={13} /> {PHONE}
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. COMPANY STORY + INTERIOR SHOWCASE ─── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }} className="about-intro-grid">
            <div>
              <span className="section-subtitle">Our Heritage</span>
              <h2 className="section-title" style={{ marginBottom: '20px' }}>
                Redefining Paint through <span>Innovation</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14.5px', lineHeight: '1.7' }}>
                <strong>Dutex Paint & Texture</strong> is a premium brand manufactured by <strong>Awantika & Aaradhya Industries Pvt. Ltd.</strong> — a growing force in India's paint manufacturing industry, headquartered in Bhopal (MP) with our production unit in Mandideep.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14.5px', lineHeight: '1.7' }}>
                We combine modern chemical engineering with eco-conscious formulations to create paints that are safe, durable, and beautiful. Every product undergoes rigorous quality testing before it reaches a dealer's shelf or a customer's wall.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  "Zero lead & heavy metals in all formulas",
                  "ISO-compliant manufacturing processes",
                  "Pan-India dealer network growing daily",
                  "From budget economy to ultra-premium luxury range"
                ].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '13.5px', color: 'var(--text-dark)' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interior Design Photo */}
            <div style={{ position: 'relative' }}>
              <img
                src="/images/ai_home_interior.jpeg"
                alt="Ducon Painted Home Interior"
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.18)', height: '380px', objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* Accent border */}
              <div style={{
                position: 'absolute', top: '18px', left: '-18px', right: '18px', bottom: '-18px',
                border: '3px solid var(--secondary)', borderRadius: '16px', zIndex: -1
              }} />
              {/* Floating label */}
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px',
                backgroundColor: 'white', padding: '12px 16px', borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '10px'
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-dark)' }}>Ducon Interior Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. BEAUTIFUL FINISHES STRIP ─── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Artistic Spaces & Finishes</span>
            <h2 className="section-title">Excellence in <span>Every Finish</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '10px auto 0', fontSize: '14px' }}>
              From luxury interior bedrooms to weather-resistant exterior facades, explore the beauty of Ducon paints.
            </p>
          </div>

          {/* Finishes Photo Grid */}
          <div className="about-finishes-grid-1">
            <div className="about-img-container-300">
              <img src="/images/texture_1mm_bedroom_1.jpeg" alt="1mm Textured Bedroom Accent Wall"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                className="factory-img"
              />
            </div>
            <div className="about-img-container-300">
              <img src="/images/exterior_villa_1.jpeg" alt="Luxury Villa Exterior Paint"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                className="factory-img"
              />
            </div>
            <div className="about-img-container-300">
              <img src="/images/ai_hero_living_1.jpeg" alt="Warm Beige Living Room"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                className="factory-img"
              />
            </div>
          </div>
          <div className="about-finishes-grid-2">
            <div className="about-img-container-220">
              <img src="/images/marble_living_family.jpeg" alt="Marble Wall Living Interior"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                className="factory-img"
              />
            </div>
            <div className="about-img-container-220">
              <img src="/images/texture_accent_wall_1.jpeg" alt="Decorative Wall Texture"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                className="factory-img"
              />
            </div>
            <div className="about-img-container-220">
              <img src="/images/ai_modern_kitchen.jpeg" alt="Modern Kitchen Finish"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                className="factory-img"
              />
            </div>
          </div>
          <style>{`
            .about-finishes-grid-1 {
              display: grid;
              grid-template-columns: 2fr 1fr 1fr;
              gap: 16px;
              margin-bottom: 16px;
            }
            .about-finishes-grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr 2fr;
              gap: 16px;
            }
            .about-img-container-300 {
              border-radius: 14px;
              overflow: hidden;
              height: 300px;
            }
            .about-img-container-220 {
              border-radius: 14px;
              overflow: hidden;
              height: 220px;
            }
            .factory-img:hover { transform: scale(1.04); }

            @media (max-width: 768px) {
              .about-finishes-grid-1, .about-finishes-grid-2 {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
              }
              .about-img-container-300, .about-img-container-220 {
                height: 200px !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* ─── 4. MISSION & VISION ─── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="mission-grid">
            {[{
              icon: Target, color: 'var(--primary)', bg: 'rgba(92,103,66,0.08)',
              title: 'Our Mission',
              text: 'To manufacture and provide next-generation, eco-friendly surface coatings that elevate the aesthetic and structural longevity of every Indian home. We replace toxic petroleum-based paints with breathable, low-VOC natural mineral formulas.'
            }, {
              icon: Eye, color: 'var(--secondary)', bg: 'rgba(169,78,29,0.08)',
              title: 'Our Vision',
              text: 'To become the most trusted and preferred paint brand in Central India — recognized for our commitment to sustainable design, healthy indoor air quality, and superior protective technologies that stand the test of time.'
            }].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} style={{
                  backgroundColor: 'var(--bg-primary)', padding: '36px 30px',
                  borderRadius: '16px', border: '1px solid var(--border-color)'
                }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={26} />
                  </div>
                  <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: '800' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. ANIMATED STATS ─── */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #3a5a2a 100%)' }}>
        <div className="container" ref={statsRef}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', textAlign: 'center' }} className="stats-grid">
            {STATS.map((st, idx) => <StatItem key={idx} stat={st} inView={statsInView} />)}
          </div>
        </div>
      </section>

      {/* ─── 6. QUALITY PILLARS ─── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Commitments</span>
            <h2 className="section-title">The Pillars of <span>Ducon Excellence</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '24px' }}>
            {[
              { icon: Shield, title: "Uncompromising Safety", desc: "Every batch undergoes rigorous lab checks — zero heavy metals, zero harmful VOC emissions beyond safe limits." },
              { icon: Award, title: "Architect-Grade Quality", desc: "Engineered to support modern construction — durable, high-build formulas that resist mold, damp, and UV fading." },
              { icon: Users, title: "Dealer Transparency", desc: "We maintain trusted, fair relationships with regional dealers — guaranteed fresh stock and honest pricing." },
              { icon: Zap, title: "High Thermal Barrier", desc: "Our reflective polymer bases help reduce wall temperatures by up to 3°C — keeping homes cooler naturally." }
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} style={{
                  padding: '26px', borderRadius: '14px',
                  border: '1px solid var(--border-color)', display: 'flex', gap: '16px',
                  transition: 'box-shadow 0.25s, transform 0.25s',
                  backgroundColor: 'var(--bg-primary)'
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}><Icon size={22} /></div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '6px' }}>{p.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 7. ADDRESS SECTION ─── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Find Us</span>
            <h2 className="section-title">Our <span>Locations</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="mission-grid">
            {[{
              label: '🏭 Factory Address',
              address: FACTORY_ADDRESS,
              color: 'var(--primary)'
            }, {
              label: '🏢 Registered Office',
              address: REG_OFFICE,
              color: 'var(--secondary)'
            }].map((loc, i) => (
              <div key={i} style={{
                backgroundColor: 'var(--bg-white)', padding: '28px 24px',
                borderRadius: '14px', border: '1px solid var(--border-color)',
                borderLeft: `5px solid ${loc.color}`
              }}>
                <strong style={{ fontSize: '13px', color: loc.color, display: 'block', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {loc.label}
                </strong>
                <p style={{ color: 'var(--text-dark)', fontSize: '14px', lineHeight: '1.7', fontWeight: '500' }}>{loc.address}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', color: loc.color, fontSize: '13px', fontWeight: '700' }}>
                  <Phone size={14} /> {PHONE}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
