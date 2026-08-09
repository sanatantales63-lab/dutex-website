import React, { useState, useEffect } from 'react';
import { Paintbrush, PhoneCall, CheckCircle, ArrowRight, ClipboardCheck, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import Visualizer from '../components/Visualizer';
import BeforeAfter from '../components/BeforeAfter';
import InteractiveProductScene from '../components/InteractiveProductScene';
import HappyClients from '../components/HappyClients';
import { gsap } from 'gsap';

// Hero slides
const HERO_SLIDES = [
  {
    title: "A Touch of Art in Every Coat",
    subtitle: "TRANSFORM YOUR SPACE WITH DUTEX TEXTURE",
    bg: "linear-gradient(rgba(10,20,10,0.52), rgba(10,20,10,0.52)), url('/images/ai_hero_living_1.jpeg')",
    btnText: "Discover Products",
    link: "products"
  },
  {
    title: "Crafted with Passion, Built to Last",
    subtitle: "AWANTIKA & AARADHYA INDUSTRIES — DUCON PAINTS",
    bg: "linear-gradient(rgba(10,20,40,0.58), rgba(10,20,40,0.58)), url('/images/exterior_villa_1.jpeg')",
    btnText: "About Us",
    link: "about"
  },
  {
    title: "Crafted for Indian Weather & Homes",
    subtitle: "AWANTIKA & AARADHYA INDUSTRIES EXCELLENCE",
    bg: "linear-gradient(rgba(10,20,10,0.52), rgba(10,20,10,0.52)), url('/images/ai_home_interior.jpeg')",
    btnText: "Get Consultation",
    link: "contact"
  }
];

const PROCESS_STEPS = [
  { icon: PhoneCall, title: "Reach Us", desc: "Contact our toll-free number or drop an inquiry to schedule a consultation." },
  { icon: MapPin, title: "Site Inspection", desc: "Our coating experts visit your site to analyze surface dampness, cracks, and requirements." },
  { icon: ClipboardCheck, title: "Validation of Wall", desc: "We suggest specific primers, textures, or wall putty based on structural moisture validation." },
  { icon: Paintbrush, title: "Execution", desc: "Trained painters apply Dutex premium coatings under expert supervisor guidance." }
];

export default function Home({ setView }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // 1. GSAP Slide-specific animations on change of currentSlide
  useEffect(() => {
    // Reset properties before animating
    gsap.set('.gsap-hero-title, .gsap-hero-subtitle, .gsap-hero-btn', { opacity: 0 });

    gsap.fromTo('.gsap-hero-subtitle', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );
    gsap.fromTo('.gsap-hero-title', 
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.25 }
    );
    gsap.fromTo('.gsap-hero-btn', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
    );
  }, [currentSlide]);

  // 2. Intersection Observer for Scroll Trigger Animations (runs exactly once on mount!)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          if (target.classList.contains('gsap-reveal-left')) {
            gsap.fromTo(target, 
              { x: -50, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' }
            );
          } else if (target.classList.contains('gsap-reveal-right')) {
            gsap.fromTo(target, 
              { x: 50, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' }
            );
          } else if (target.classList.contains('gsap-reveal-up')) {
            gsap.fromTo(target, 
              { y: 40, opacity: 0 }, 
              { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }
            );
          } else if (target.classList.contains('gsap-reveal-scale')) {
            gsap.fromTo(target, 
              { scale: 0.95, opacity: 0 }, 
              { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }
            );
          } else if (target.classList.contains('gsap-reveal-cards')) {
            const cards = target.querySelectorAll('.gsap-card');
            gsap.fromTo(cards, 
              { y: 30, opacity: 0 }, 
              { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.12 }
            );
          }

          observer.unobserve(target);
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.gsap-trigger').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade" style={{ overflowX: 'hidden' }}>
      
      {/* 1. HERO SLIDER */}
      <section style={{ position: 'relative', height: '620px', overflow: 'hidden' }}>
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: slide.bg,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === idx ? 1 : 0,
              transform: currentSlide === idx ? 'scale(1.02)' : 'scale(1)',
              transition: 'opacity 1.2s ease-in-out, transform 6s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: currentSlide === idx ? 1 : 0
            }}
          >
            <div className="container" style={{ textAlign: 'left', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
              {currentSlide === idx && (
                <div style={{ maxWidth: '650px' }}>
                  <span className="gsap-hero-subtitle" style={{ 
                    color: 'var(--accent-gold)', 
                    fontWeight: '700', 
                    fontSize: '13px', 
                    letterSpacing: '3px', 
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    display: 'block'
                  }}>
                    {slide.subtitle}
                  </span>
                  <h1 className="gsap-hero-title" style={{ 
                    color: 'white', 
                    fontSize: '54px', 
                    fontWeight: '900', 
                    marginBottom: '24px', 
                    lineHeight: '1.15',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {slide.title}
                  </h1>
                  <button 
                    onClick={() => setView(slide.link)}
                    className="btn-secondary gsap-hero-btn"
                    style={{ padding: '14px 32px', fontSize: '15px' }}
                  >
                    {slide.btnText} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {/* Slider Indicator Bullets */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 5
        }}>
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '28px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: currentSlide === idx ? 'var(--secondary)' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </section>

      {/* 2. WELCOME TO DUTEX CREATIONS (REDESIGNED: Editorial Premium Grid) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="welcome-grid">
            
            {/* Left Column: Asymmetrical Editorial Frame */}
            <div style={{ position: 'relative', paddingRight: '20px' }} className="gsap-trigger gsap-reveal-left">
              {/* Offset sand backing panel */}
              <div style={{
                position: 'absolute',
                top: '30px',
                left: '-20px',
                right: '40px',
                bottom: '-20px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                zIndex: 1
              }} />

              {/* Main Image Frame with thin Terracotta border */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '4px solid var(--bg-white)'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" 
                  alt="Premium Luxury Room" 
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }} 
                />
              </div>

              {/* Floating Glassmorphic Stamp */}
              <div style={{
                position: 'absolute',
                bottom: '30px',
                right: '-10px',
                zIndex: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid var(--accent-gold)',
                padding: '24px 30px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                maxWidth: '240px'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)', lineHeight: 1.1 }}>100%</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginTop: '2px' }}>
                    Eco-Conscious Formulas
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Dark Forest Editorial Card */}
            <div style={{
              backgroundColor: 'var(--bg-dark)',
              color: 'var(--text-light)',
              padding: '50px 40px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              position: 'relative',
              overflow: 'hidden'
            }} className="gsap-trigger gsap-reveal-right">
              
              {/* Subtle background swipe graphic */}
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '120px', height: '120px',
                background: 'radial-gradient(circle, rgba(210,168,92,0.06) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <span style={{ color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', display: 'block', marginBottom: '12px' }}>
                Our Introduction
              </span>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', marginBottom: '20px', lineHeight: 1.25, fontFamily: 'var(--font-heading)' }}>
                Welcome to <span style={{ color: 'var(--accent-gold)' }}>Dutex Texture</span> Creation
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '18px', fontSize: '14px', lineHeight: 1.65 }}>
                At Dutex, a premium venture by <strong>Awantika and Aaradhya Industries Pvt Ltd</strong>, we refuse to settle for the ordinary. Instead of following the mass-market paint standards, we design specialized textured coatings close to nature's rich profiles.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px', fontSize: '14px', lineHeight: 1.65 }}>
                Our paints, primers, and wall putties form an elastic, breathable layer. This keeps structural walls safe from extreme Indian monsoons and dampness while providing a touchable, luxurious visual finish.
              </p>

              {/* Spec Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px 16px',
                marginBottom: '36px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '28px'
              }}>
                {[
                  "Non-Toxic Ingredients",
                  "Rich Textured Grains",
                  "Excellent Adhesion",
                  "Anti-Mould Shield"
                ].map((spec, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(210,168,92,0.15)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle2 size={12} />
                    </div>
                    <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'white' }}>{spec}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setView('about')} 
                className="btn-secondary"
                style={{ 
                  backgroundColor: 'var(--accent-gold)', 
                  borderColor: 'var(--accent-gold)', 
                  color: 'var(--bg-dark)',
                  fontWeight: '700'
                }}
              >
                Learn More About Us <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE PRODUCT SCENE — Berger-style hotspot section */}
      <InteractiveProductScene setView={setView} />

      {/* 5. INTERACTIVE VISUALIZER TOOL */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle">Experiment with Colors</span>
            <h2 className="section-title">Color & Texture <span>Visualizer</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0 auto', fontSize: '14px' }}>
              Don't guess what your walls will look like. Click colors below to change the back walls of our living room live!
            </p>
          </div>
          <Visualizer />
        </div>
      </section>

      {/* 6. BEFORE / AFTER COMPARISON */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Real Transformation</span>
            <h2 className="section-title">See the <span>Dutex Difference</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0 auto', fontSize: '14px' }}>
              Drag the slider bar left and right to witness a plain, moisture-damaged wall transform into a luxury sand-textured Dutex masterpieces.
            </p>
          </div>
          <BeforeAfter />
        </div>
      </section>

      {/* 6b. HAPPY CLIENTS — Video Testimonials */}
      <HappyClients />

      {/* 7. WHY CHOOSE DUTEX PAINTS — Premium Redesign */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1a2010 0%, #2d3820 40%, #1a2010 100%)',
          position: 'relative',
          padding: '100px 0',
          overflow: 'hidden'
        }}
      >
        {/* Decorative radial glows */}
        <div style={{ position:'absolute', top:'-80px', left:'10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(210,168,92,0.08) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-100px', right:'5%', width:'600px', height:'600px', borderRadius:'50%', background:'radial-gradient(circle, rgba(169,78,29,0.07) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'40%', left:'50%', transform:'translate(-50%,-50%)', width:'800px', height:'800px', borderRadius:'50%', background:'radial-gradient(circle, rgba(92,103,66,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div className="container" style={{ position:'relative', zIndex:2 }}>
          {/* Section Header */}
          <div className="section-title-wrapper" style={{ marginBottom:'64px' }}>
            <span style={{ color:'var(--accent-gold)', fontWeight:'700', textTransform:'uppercase', letterSpacing:'3px', fontSize:'12px', display:'block', marginBottom:'12px' }}>Unmatched Quality</span>
            <h2 style={{ color:'white', fontSize:'48px', fontWeight:'900', lineHeight:'1.15', fontFamily:'var(--font-heading)', margin:'0 auto', maxWidth:'700px', textAlign:'center' }}>
              Why Choose <span style={{ color:'var(--accent-gold)' }}>Dutex Paints?</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.65)', maxWidth:'580px', margin:'16px auto 0', fontSize:'15px', lineHeight:'1.7', textAlign:'center' }}>
              Formulated to stand high dampness, retain deep tones, and protect families with non-toxic chemical standards.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'24px' }}>

            {/* Card 1 */}
            <div style={{
              background:'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border:'1px solid rgba(210,168,92,0.25)',
              borderRadius:'20px',
              padding:'36px 28px',
              backdropFilter:'blur(12px)',
              transition:'transform 0.3s ease, box-shadow 0.3s ease',
              cursor:'default'
            }} className="why-card">
              <div style={{
                width:'64px', height:'64px', borderRadius:'16px',
                background:'linear-gradient(135deg, rgba(92,103,66,0.4) 0%, rgba(92,103,66,0.15) 100%)',
                border:'1px solid rgba(92,103,66,0.5)',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'24px', fontSize:'28px'
              }}>🛡️</div>
              <h3 style={{ color:'white', fontSize:'20px', fontWeight:'800', marginBottom:'12px', lineHeight:'1.3' }}>
                Superior Weather Shield
              </h3>
              <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:'1.7' }}>
                Resists severe dampness and UV discoloration, ensuring exterior and interior surfaces keep looking new for years.
              </p>
              <div style={{ marginTop:'20px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ flex:1, height:'2px', background:'linear-gradient(90deg, rgba(92,103,66,0.8) 0%, transparent 100%)', borderRadius:'2px' }} />
                <span style={{ fontSize:'11px', color:'rgba(92,103,66,0.9)', fontWeight:'700', letterSpacing:'1px' }}>WEATHER PROOF</span>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              background:'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border:'1px solid rgba(169,78,29,0.3)',
              borderRadius:'20px',
              padding:'36px 28px',
              backdropFilter:'blur(12px)',
              transition:'transform 0.3s ease, box-shadow 0.3s ease',
              cursor:'default'
            }} className="why-card">
              <div style={{
                width:'64px', height:'64px', borderRadius:'16px',
                background:'linear-gradient(135deg, rgba(169,78,29,0.4) 0%, rgba(169,78,29,0.15) 100%)',
                border:'1px solid rgba(169,78,29,0.5)',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'24px', fontSize:'28px'
              }}>🎨</div>
              <h3 style={{ color:'white', fontSize:'20px', fontWeight:'800', marginBottom:'12px', lineHeight:'1.3' }}>
                Artist Palette &amp; Textures
              </h3>
              <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:'1.7' }}>
                Choose from over 150 signature tones and a range of granular sands, rustic mud, and metallic gloss coat textures.
              </p>
              <div style={{ marginTop:'20px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ flex:1, height:'2px', background:'linear-gradient(90deg, rgba(169,78,29,0.8) 0%, transparent 100%)', borderRadius:'2px' }} />
                <span style={{ fontSize:'11px', color:'rgba(169,78,29,0.9)', fontWeight:'700', letterSpacing:'1px' }}>150+ SHADES</span>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{
              background:'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border:'1px solid rgba(92,150,80,0.3)',
              borderRadius:'20px',
              padding:'36px 28px',
              backdropFilter:'blur(12px)',
              transition:'transform 0.3s ease, box-shadow 0.3s ease',
              cursor:'default'
            }} className="why-card">
              <div style={{
                width:'64px', height:'64px', borderRadius:'16px',
                background:'linear-gradient(135deg, rgba(40,120,60,0.4) 0%, rgba(40,120,60,0.15) 100%)',
                border:'1px solid rgba(40,120,60,0.5)',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'24px', fontSize:'28px'
              }}>🌿</div>
              <h3 style={{ color:'white', fontSize:'20px', fontWeight:'800', marginBottom:'12px', lineHeight:'1.3' }}>
                Eco-Friendly &amp; Low VOC
              </h3>
              <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:'1.7' }}>
                With nearly zero volatile organic compounds, our paints are breathable, non-toxic, and safe for kids and pets.
              </p>
              <div style={{ marginTop:'20px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ flex:1, height:'2px', background:'linear-gradient(90deg, rgba(40,120,60,0.8) 0%, transparent 100%)', borderRadius:'2px' }} />
                <span style={{ fontSize:'11px', color:'rgba(40,180,80,0.9)', fontWeight:'700', letterSpacing:'1px' }}>ZERO VOC</span>
              </div>
            </div>

            {/* Card 4 */}
            <div style={{
              background:'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border:'1px solid rgba(100,150,210,0.3)',
              borderRadius:'20px',
              padding:'36px 28px',
              backdropFilter:'blur(12px)',
              transition:'transform 0.3s ease, box-shadow 0.3s ease',
              cursor:'default'
            }} className="why-card">
              <div style={{
                width:'64px', height:'64px', borderRadius:'16px',
                background:'linear-gradient(135deg, rgba(40,80,160,0.4) 0%, rgba(40,80,160,0.15) 100%)',
                border:'1px solid rgba(40,80,160,0.5)',
                display:'flex', alignItems:'center', justifyContent:'center',
                marginBottom:'24px', fontSize:'28px'
              }}>💧</div>
              <h3 style={{ color:'white', fontSize:'20px', fontWeight:'800', marginBottom:'12px', lineHeight:'1.3' }}>
                Dampness Moisture Shield
              </h3>
              <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:'1.7' }}>
                Forms a dense elastomeric coat that bridges hairline cracks, locking structural walls from moisture and rain seepage.
              </p>
              <div style={{ marginTop:'20px', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ flex:1, height:'2px', background:'linear-gradient(90deg, rgba(40,80,160,0.8) 0%, transparent 100%)', borderRadius:'2px' }} />
                <span style={{ fontSize:'11px', color:'rgba(80,140,220,0.9)', fontWeight:'700', letterSpacing:'1px' }}>WATERPROOF</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA Row */}
          <div style={{ marginTop:'56px', display:'flex', justifyContent:'center', alignItems:'center', gap:'32px', flexWrap:'wrap' }}>
            {[
              { num:'15+', label:'Years of Expertise' },
              { num:'150+', label:'Premium Shades' },
              { num:'10K+', label:'Happy Customers' },
              { num:'100%', label:'Eco-Certified' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign:'center', padding:'0 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <div style={{ fontSize:'36px', fontWeight:'900', color:'var(--accent-gold)', lineHeight:1 }}>{stat.num}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'1px', marginTop:'6px', fontWeight:'600' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .why-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 24px 60px rgba(0,0,0,0.4);
          }
        `}</style>
      </section>

      {/* OUR SEAMLESS PROCESS SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '48px' }}>
            <span className="section-subtitle">Our Seamless Process</span>
            <h2 className="section-title">4 Simple Steps to Bring <span>Your Vision to Reality</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0 auto', fontSize: '14px' }}>
              From initial contact to expert wall preparation and final application, our structured process guarantees flawless results.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-white)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: '48px 32px',
            border: '1px solid var(--border-color)'
          }} className="gsap-trigger gsap-reveal-scale">
            <div className="process-grid">
              {PROCESS_STEPS.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div key={idx} style={{ 
                    textAlign: 'center', 
                    padding: '20px 16px', 
                    position: 'relative'
                  }} className="process-card">
                    {/* Step badge */}
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      right: '12px',
                      fontSize: '11px',
                      fontWeight: '800',
                      color: 'var(--secondary)',
                      backgroundColor: 'rgba(169, 78, 29, 0.1)',
                      padding: '2px 9px',
                      borderRadius: '12px'
                    }}>
                      Step 0{idx + 1}
                    </div>

                    {/* Circle icon */}
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(92, 103, 66, 0.08)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px auto',
                      boxShadow: 'var(--shadow-sm)',
                      border: '2px solid rgba(92, 103, 66, 0.15)',
                      transition: 'transform 0.3s ease'
                    }} className="process-icon-container">
                      <IconComponent size={26} />
                    </div>
                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-dark)' }}>{step.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>{step.desc}</p>
                    
                    {/* Connect Arrow */}
                    {idx < PROCESS_STEPS.length - 1 && (
                      <div className="process-arrow" style={{
                        position: 'absolute',
                        top: '52px',
                        right: '-20px',
                        width: '40px',
                        height: '2px',
                        borderTop: '2px dashed var(--border-color)',
                        display: 'block'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. SUSTAINABLE SPACES (REDESIGNED: Frosted Full-Bleed Luxury Section) */}
      <section 
        style={{ 
          backgroundColor: 'var(--bg-dark)',
          position: 'relative',
          padding: '100px 0',
          overflow: 'hidden'
        }}
      >
        {/* Subtle background abstract circles */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92,103,66,0.1) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(169,78,29,0.06) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div className="container sustainable-grid" style={{ 
          position: 'relative',
          zIndex: 2
        }}>
          
          {/* Left Block: Modern Text Grid */}
          <div className="gsap-trigger gsap-reveal-left">
            <span style={{ 
              color: 'var(--accent-gold)', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontSize: '12px', 
              display: 'block', 
              marginBottom: '10px' 
            }}>
              Green Construction
            </span>
            
            <h2 style={{ 
              color: 'white', 
              fontSize: '42px', 
              fontWeight: '900', 
              marginBottom: '24px', 
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.2'
            }}>
              Leading with Nature,<br />Inspiring Sustainable Spaces.
            </h2>
            
            <p style={{ 
              color: 'rgba(255,255,255,0.75)', 
              marginBottom: '40px', 
              fontSize: '15px', 
              lineHeight: '1.65',
              maxWidth: '580px' 
            }}>
              At Dutex, we ensure that sustainability isn't just a label—it's a product standard. From raw material sourcing to production energy, we strive to reduce our ecological footprint so that your home is healthy both inside and outside.
            </p>
            
            {/* Checklist rendering as Glassmorphic Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px' 
            }} className="form-double">
              {[
                { title: "Sustainable Design", desc: "Green construction and sustainable material sourcing." },
                { title: "Healthy Air Quality", desc: "Low-VOC emission certified for healthy breathing air." },
                { title: "Eco-Conscious Tech", desc: "Carbon-balanced chemical formulations." },
                { title: "Responsible Spaces", desc: "Perfect for both commercial and residential projects." }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '16px 20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 'var(--radius-sm)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span style={{ fontSize: '14px', color: 'white', fontWeight: '700' }}>{item.title}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Block: Floating Glass Consultant Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="gsap-trigger gsap-reveal-right">
            <div style={{
              border: '1.5px solid var(--accent-gold)',
              padding: '44px 32px',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
              backdropFilter: 'blur(20px)',
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: 'var(--shadow-lg)',
              width: '100%',
              maxWidth: '340px',
              position: 'relative'
            }}>
              {/* Gold border accent ribbon */}
              <div style={{
                position: 'absolute',
                top: '-2px', left: '50%',
                transform: 'translateX(-50%)',
                width: '60px', height: '4px',
                background: 'var(--accent-gold)',
                borderRadius: 'var(--radius-full)'
              }} />

              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(210,168,92,0.15)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <Sparkles size={26} />
              </div>
              <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '800', marginBottom: '10px' }}>Free Consultant Visit</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '28px', lineHeight: '1.5' }}>
                Get expert recommendation on wall dampness levels and color combinations at your doorstep.
              </p>
              <button 
                onClick={() => setView('contact')} 
                className="btn-secondary" 
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  backgroundColor: 'var(--secondary)',
                  borderColor: 'var(--secondary)',
                  color: 'white',
                  fontWeight: '700'
                }}
              >
                Book Consultant
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
