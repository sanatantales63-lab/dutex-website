import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, ChevronUp, Menu, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import Logo from './components/Logo';
import Home from './pages/Home';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import confetti from 'canvas-confetti';
import Lenis from 'lenis';

const Youtube = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Facebook = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function App() {
  const [view, setView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [dealerSubmitted, setDealerSubmitted] = useState(false);

  // Toggle modal-open class on body when dealer modal is active
  useEffect(() => {
    if (isDealerModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isDealerModalOpen]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smooth: true,
      direction: 'vertical'
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Monitor scroll for back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (targetView) => {
    setView(targetView);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDealerSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#5C6742', '#A94E1D', '#D2A85C']
    });
    setDealerSubmitted(true);
    setTimeout(() => {
      setDealerSubmitted(false);
      setIsDealerModalOpen(false);
    }, 3000);
  };

  const renderActiveView = () => {
    switch (view) {
      case 'home':
        return <Home setView={handleNav} />;
      case 'products':
        return <Products />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return <About />;
      case 'catalog':
        return <Catalog />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setView={handleNav} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      
      {/* 1. TOP HEADER BAR */}
      <div 
        style={{
          backgroundColor: 'var(--bg-dark)',
          color: 'var(--text-light)',
          fontSize: '12px',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          zIndex: 50
        }}
        className="top-bar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} className="top-bar-left">
          <span style={{ opacity: 0.5, color: 'var(--accent-gold)', fontSize: '16px' }}>✦</span>
          <span style={{ opacity: 0.8, fontWeight: '600', letterSpacing: '0.3px' }}>
            A Unit of Awantika &amp; Aaradhya Industries Pvt Ltd
          </span>
          <span style={{ opacity: 0.35 }}>|</span>
          <a href="mailto:awantikaradhyaindustries@gmail.com" style={{ color: 'var(--accent-gold)', opacity: 0.85, fontWeight: '500', textDecoration: 'none' }}>
            awantikaradhyaindustries@gmail.com
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: '#FF0000', opacity: 0.8 }} className="hover-lift">
            <Youtube size={16} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#1877F2', opacity: 0.8 }} className="hover-lift">
            <Facebook size={16} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#E4405F', opacity: 0.8 }} className="hover-lift">
            <Instagram size={16} />
          </a>
        </div>
      </div>

      {/* 2. STICKY MAIN NAVBAR */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: 'var(--shadow-sm)'
        }}
        className="glass"
      >
        <div 
          className="container" 
          style={{ 
            height: '84px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}
        >
          {/* Logo link */}
          <div onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-nav">
            {[
              { id: 'home', label: 'Home' },
              { id: 'products', label: 'Our Products' },
              { id: 'gallery', label: 'Our Gallery' },
              { id: 'about', label: 'About Us' },
              { id: 'catalog', label: 'E-Catalog' },
              { id: 'contact', label: 'Contact Us' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                style={{
                  fontSize: '14.5px',
                  fontWeight: '700',
                  color: view === link.id ? 'var(--primary)' : 'var(--text-dark)',
                  borderBottom: view === link.id ? '2px solid var(--primary)' : '2px solid transparent',
                  padding: '6px 0',
                  transition: 'all var(--transition-fast)'
                }}
                className="nav-link-btn"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Call Widget & Mobile Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Call Widget */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="call-widget">
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(92,103,66,0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Phone size={18} />
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Helpline</span>
                <p style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-dark)' }}>
                   <a href="tel:+917225020180">7225020180</a>
                </p>
              </div>
            </div>

            {/* Mobile Hamburger toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none', color: 'var(--text-dark)' }} 
              className="mobile-toggler"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 2b. MOBILE NAV DRAWER */}
        {isMobileMenuOpen && (
          <div 
            style={{
              backgroundColor: 'var(--bg-white)',
              borderTop: '1px solid var(--border-color)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: 'var(--shadow-md)'
            }}
            className="mobile-drawer"
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'products', label: 'Our Products' },
              { id: 'gallery', label: 'Our Gallery' },
              { id: 'about', label: 'About Us' },
              { id: 'catalog', label: 'E-Catalog' },
              { id: 'contact', label: 'Contact Us' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: view === link.id ? 'var(--primary)' : 'var(--text-dark)',
                  textAlign: 'left',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--bg-primary)'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 3. MAIN RENDER AREA WITH ANIMATIONS */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. FOOTER */}
      <footer 
        style={{
          backgroundColor: 'var(--bg-dark)',
          color: 'var(--text-light)',
          borderTop: '5px solid var(--secondary)'
        }}
        className="section-padding"
      >
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 1fr 1fr',
            gap: '40px',
            marginBottom: '40px'
          }} className="footer-grid">
            
            {/* Column 1: Brand description */}
            <div>
              <Logo showText={true} style={{ marginBottom: '16px' }} className="footer-logo" />
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '20px' }}>
                At Dutex Paint, we believe in being different and close to nature. We don't follow the crowd; instead, we choose our own path by introducing highly durable, non-toxic, eco-friendly wall putties, primers, and textures.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://youtube.com" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Youtube size={16} />
                </a>
                <a href="https://facebook.com" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Facebook size={16} />
                </a>
                <a href="https://instagram.com" className="hover-lift" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Column 2: Useful Links */}
            <div>
              <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '20px', position: 'relative' }}>
                Useful Links
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '2px', backgroundColor: 'var(--secondary)' }} />
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'products', label: 'Our Products' },
                  { id: 'gallery', label: 'Our Gallery' },
                  { id: 'about', label: 'About us' },
                  { id: 'catalog', label: 'E-Catalog' },
                  { id: 'contact', label: 'Contact Us' }
                ].map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => handleNav(item.id)}
                      style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s', fontWeight: '500' }}
                      className="footer-link-btn"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '20px', position: 'relative' }}>
                Contact Info
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '2px', backgroundColor: 'var(--secondary)' }} />
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <Phone size={16} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', display: 'block', opacity: 0.6 }}>Call anytime</span>
                    <strong style={{ color: 'white' }}>7225020180</strong>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '12px' }}>
                  <Mail size={16} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', display: 'block', opacity: 0.6 }}>Send email</span>
                    <strong style={{ color: 'white' }}>awantikaradhyaindustries@gmail.com</strong>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 4: Address */}
            <div>
              <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '20px', position: 'relative' }}>
                Our Address
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '30px', height: '2px', backgroundColor: 'var(--secondary)' }} />
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '12.5px', color: 'rgba(255,255,255,0.7)' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={16} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ lineHeight: '1.6' }}>
                    <strong>Factory & Registered Office:</strong><br />
                    18-19, Sector-D, Industrial Area, Mandideep, Dist. Raisen, Bhopal, Madhya Pradesh - 462046
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright Divider */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '20px',
            textAlign: 'center',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)'
          }}>
            <p>© Copyright 2026 by <strong>Dutex Paint & Texture</strong>. All rights reserved. A Unit of Awantika and Aaradhya Industries Pvt Ltd.</p>
          </div>
        </div>
      </footer>

      {/* 5. FLOATING WIDGETS */}
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917225020180"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)',
          zIndex: 45,
          fontSize: '24px'
        }}
        className="hover-lift"
        title="Chat on WhatsApp"
      >
        <MessageSquare size={26} />
      </a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '30px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            zIndex: 45
          }}
          className="hover-lift"
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* 6. BECOME A DEALER MODAL */}
      {isDealerModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          backdropFilter: 'blur(4px)'
        }}
        onClick={() => setIsDealerModalOpen(false)}
        >
          <div style={{
            backgroundColor: 'var(--bg-white)',
            borderRadius: 'var(--radius-md)',
            width: '100%',
            maxWidth: '500px',
            padding: '30px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
            position: 'relative'
          }}
          onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsDealerModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'var(--text-dark)'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Become a Dutex Dealer</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>
              Submit your dealership inquiry details. Our sales department will contact you for verification.
            </p>

            <form onSubmit={handleDealerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Dealer/Firm Name *</label>
                <input required type="text" placeholder="e.g. Awantika Paints & Hardware" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Contact Person *</label>
                <input required type="text" placeholder="Your name" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>Mobile Number *</label>
                <input required type="tel" placeholder="10-digit phone number" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px', display: 'block' }}>City / District *</label>
                <input required type="text" placeholder="e.g. Bhopal" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-primary)' }} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Submit Application <ArrowRight size={16} />
              </button>
            </form>

            {/* Success screen inside modal */}
            {dealerSubmitted && (
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'var(--bg-white)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px',
                textAlign: 'center',
                zIndex: 20
              }}>
                <CheckCircle2 size={56} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
                <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Application Received!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  Thank you for applying. A regional manager from Awantika and Aaradhya Industries will call you to discuss dealership margins.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CSS STYLES SPECIFIC TO LAYOUT ADJUSTMENTS (MEDIA QUERIES) */}
      <style>{`
        /* Hide floating widgets when a modal/lightbox is active */
        body.modal-open a.hover-lift,
        body.modal-open button.hover-lift {
          display: none !important;
        }

        /* Desktop menu hide on small displays */
        @media (max-width: 1024px) {
          .desktop-nav, .call-widget {
            display: none !important;
          }
          .mobile-toggler {
            display: block !important;
          }
        }
        
        /* Grid adaptations */
        @media (max-width: 768px) {
          .welcome-grid, .sustainable-grid, .dual-grid, .about-intro-grid, .mission-grid, .stats-grid, .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            gap: 20px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .catalog-grid, .visualizer-grid, .modal-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-left {
            height: 200px !important;
          }
          .form-double {
            grid-template-columns: 1fr !important;
          }
          .top-bar-left span {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Hover lift effects */
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .gallery-card:hover .gallery-info {
          transform: translateY(0) !important;
        }
        .gallery-card:hover .gallery-image {
          transform: scale(1.05);
        }
        
        .nav-link-btn:hover {
          color: var(--primary) !important;
          border-bottom-color: var(--primary) !important;
        }
        .footer-link-btn {
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }
        .footer-link-btn:hover {
          color: var(--secondary) !important;
        }
      `}</style>
    </div>
  );
}
