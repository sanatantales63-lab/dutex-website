import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Eye, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

// SHORT FILENAME ALIASES for readability
const S = (name) => `/images/${name}`;

const GALLERY_ITEMS = [
  // --- INTERIOR DESIGN & LIVING SPACES ---
  {
    id: 1,
    title: "Warm Beige Living Room Interior",
    category: "interior",
    image: S("ai_hero_living_1.jpeg"),
    desc: "Elegant living room featuring smooth warm beige Ducon interior emulsion finish.",
    badge: "Interior"
  },
  {
    id: 3,
    title: "Luxury Indian Home Interior",
    category: "interior",
    image: S("ai_home_interior.jpeg"),
    desc: "Contemporary Indian living space adorned with eco-friendly non-toxic Ducon paint.",
    badge: "Interior"
  },
  {
    id: 4,
    title: "Pastel Luxury Master Bedroom",
    category: "interior",
    image: S("ai_luxury_bedroom.jpeg"),
    desc: "Peaceful master bedroom with soothing pastel wall hues and velvet matte finish.",
    badge: "Interior"
  },
  {
    id: 5,
    title: "Pastel Kids Bedroom Walls",
    category: "interior",
    image: S("ai_kids_bedroom.jpeg"),
    desc: "Vibrant, low-VOC child-safe paint for kids' bedroom walls.",
    badge: "Interior"
  },
  {
    id: 6,
    title: "Modern Modular Kitchen Design",
    category: "interior",
    image: S("ai_modern_kitchen.jpeg"),
    desc: "Moisture-resistant kitchen wall coating designed for Indian cooking conditions.",
    badge: "Interior"
  },
  {
    id: 7,
    title: "Luxurious Living Room Interior",
    category: "interior",
    image: S("ai_family_living_1.jpeg"),
    desc: "Spacious living area featuring premium luxury emulsion with stain-resistant coating.",
    badge: "Interior"
  },
  {
    id: 11,
    title: "Warm Dining Room Ambience",
    category: "interior",
    image: S("ai_family_dinner_1.jpeg"),
    desc: "Warm tone interior wall finish highlighting dining area aesthetics.",
    badge: "Interior"
  },
  {
    id: 13,
    title: "Contemporary Home Living Wall",
    category: "interior",
    image: S("ai_couple_home.jpeg"),
    desc: "High-sheen luxury emulsion bringing modern sophistication into living rooms.",
    badge: "Interior"
  },
  {
    id: 17,
    title: "Aesthetic Floral Dining Decor",
    category: "interior",
    image: S("ai_woman_flowers.jpeg"),
    desc: "Satin finish interior wall enhancing delicate room lighting.",
    badge: "Interior"
  },

  // --- TEXTURE & 1MM PLASTER ---
  {
    id: 18,
    title: "1mm Bedroom Textured Accent Wall",
    category: "texture",
    image: S("texture_1mm_bedroom_1.jpeg"),
    desc: "Dutex 1mm texture creating an artistic relief accent wall in master bedroom.",
    badge: "1mm Texture"
  },
  {
    id: 20,
    title: "1mm Exterior Textured Villa Facade",
    category: "texture",
    image: S("texture_1mm_villa_ext_1.jpeg"),
    desc: "Weather-proof 1mm acrylic texture applied on villa exterior elevation.",
    badge: "1mm Texture"
  },
  {
    id: 22,
    title: "Mineral Plaster Texture Close-up",
    category: "texture",
    image: S("texture_1mm_plaster.jpeg"),
    desc: "Detailed view of Dutex mineral plaster finish texture.",
    badge: "1mm Texture"
  },
  {
    id: 23,
    title: "Decorative Accent Wall Texture",
    category: "texture",
    image: S("texture_accent_wall_1.jpeg"),
    desc: "Artistic geometric wall texture crafted with Dutex Texture Extas.",
    badge: "Texture"
  },

  // --- EXTERIOR PAINTS ---
  {
    id: 25,
    title: "Luxury Indian Bungalow Exterior",
    category: "exterior",
    image: S("exterior_bungalow.jpeg"),
    desc: "Dutex Weather Shield Exterior Emulsion protecting Indian bungalow facades.",
    badge: "Exterior"
  },
  {
    id: 26,
    title: "Weatherproof Villa Exterior Paint",
    category: "exterior",
    image: S("exterior_villa_1.jpeg"),
    desc: "Anti-fungal, rain-resistant exterior coating for modern villas.",
    badge: "Exterior"
  },
  {
    id: 27,
    title: "Modern Villa Exterior Facade",
    category: "exterior",
    image: S("exterior_villa_2.jpeg"),
    desc: "High UV-protection exterior paint engineered for extreme heat and rain.",
    badge: "Exterior"
  },
  {
    id: 28,
    title: "Premium Architectural Exterior",
    category: "exterior",
    image: S("exterior_villa_3.jpeg"),
    desc: "Long-lasting color retention facade paint with dirt-pickup resistance.",
    badge: "Exterior"
  },

  // --- MARBLE FINISH & LUXURY ---
  {
    id: 29,
    title: "Festive Living Room Marble Wall",
    category: "marble",
    image: S("marble_diwali_family.jpeg"),
    desc: "Italian marble look wall paint finish created using Ducon Lacquer.",
    badge: "Marble Finish"
  },
  {
    id: 30,
    title: "Modern Dining Room Marble Accent",
    category: "marble",
    image: S("marble_dining_family.jpeg"),
    desc: "High-gloss polished marble wall texture for luxurious dining areas.",
    badge: "Marble Finish"
  },
  {
    id: 31,
    title: "Luxury Living Marble Wall Texture",
    category: "marble",
    image: S("marble_living_family.jpeg"),
    desc: "Smooth marble sheen wall paint with rich venetian plaster effect.",
    badge: "Marble Finish"
  },
  {
    id: 32,
    title: "Elegant Home Marble Interior",
    category: "marble",
    image: S("marble_mother_daughter.jpeg"),
    desc: "Soft neutral marble grain wall texture for serene home interiors.",
    badge: "Marble Finish"
  },
  {
    id: 33,
    title: "Ducon Marble Texture Paint Sample",
    category: "marble",
    image: S("marble_paint_sample.jpeg"),
    desc: "Official Dutex Marble Finish swatch demonstration wall.",
    badge: "Marble Finish"
  }
];

const CATEGORY_COLORS = {
  interior: '#7C4E2B',
  texture: '#4A7C3F',
  exterior: '#0055A5',
  marble: '#C59B27',
};

const FILTERS = [
  { id: 'all', label: '✦ All' },
  { id: 'interior', label: '🏠 Interior' },
  { id: 'texture', label: '🎨 Texture' },
  { id: 'exterior', label: '🏡 Exterior' },
  { id: 'marble', label: '✨ Marble Finish' },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function GalleryCard({ item, index, onOpen }) {
  const [ref, inView] = useInView();
  const color = CATEGORY_COLORS[item.category] || '#333';

  return (
    <div
      ref={ref}
      onClick={() => onOpen(item)}
      style={{
        position: 'relative', borderRadius: '14px', overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)', height: '280px', cursor: 'pointer',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s`,
      }}
      className="gallery-card"
    >
      <img
        src={item.image}
        alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        className="gallery-image"
      />
      {/* Badge */}
      <span style={{
        position: 'absolute', top: '12px', left: '12px',
        backgroundColor: color, color: 'white',
        fontSize: '10px', fontWeight: '800', padding: '4px 10px',
        borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>{item.badge}</span>

      {/* Hover Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to top, rgba(10,10,30,0.88) 0%, rgba(10,10,30,0.3) 55%, transparent 100%)',
        opacity: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '20px', color: 'white', transition: 'opacity 0.35s ease'
      }} className="gallery-overlay">
        <div style={{ transform: 'translateY(10px)', transition: 'transform 0.35s ease' }} className="gallery-info">
          <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '5px', lineHeight: '1.3' }}>{item.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '12px', lineHeight: '1.4' }}>{item.desc}</p>
        </div>
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '34px', height: '34px', borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
        }}>
          <ZoomIn size={16} />
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const openLightbox = (item) => {
    setLightboxItem(item);
    setLightboxIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const navigate = (dir) => {
    const next = (lightboxIndex + dir + filteredItems.length) % filteredItems.length;
    setLightboxIndex(next);
    setLightboxItem(filteredItems[next]);
  };

  // Lock background scrolling and hide floating widgets when lightbox is open
  useEffect(() => {
    if (lightboxItem) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [lightboxItem]);

  useEffect(() => {
    const handler = (e) => {
      if (!lightboxItem) return;
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxItem, lightboxIndex, filteredItems]);

  return (
    <div className="section-padding animate-fade" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <style>{`
        .gallery-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.2) !important; }
        .gallery-card:hover .gallery-image { transform: scale(1.08); }
        .gallery-card:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-card:hover .gallery-info { transform: translateY(0) !important; }
        .gal-filter-btn:hover { opacity: 0.85; }
        @keyframes lbIn { from { opacity:0; transform: scale(0.93); } to { opacity:1; transform: scale(1); } }
        .lb-animate { animation: lbIn 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        
        /* Premium Responsive Gallery styles */
        @media (max-width: 600px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .gallery-card {
            height: 165px !important;
          }
          .gallery-overlay {
            padding: 10px !important;
          }
          .gallery-info h3 {
            font-size: 11.5px !important;
            margin-bottom: 2px !important;
            line-height: 1.2 !important;
          }
          .gallery-info p {
            display: none !important; /* Hide description on mobile to stay neat */
          }
          .gallery-card span {
            font-size: 8px !important;
            padding: 2px 6px !important;
            top: 8px !important;
            left: 8px !important;
          }
          .gal-nav-btn {
            width: 38px !important;
            height: 38px !important;
            background-color: rgba(0,0,0,0.6) !important;
          }
          .gal-nav-btn-left {
            left: 8px !important;
          }
          .gal-nav-btn-right {
            right: 8px !important;
          }
          .lb-close-btn {
            padding: 6px 12px !important;
            font-size: 11px !important;
          }
          .lb-title {
            font-size: 16px !important;
          }
          .lb-desc {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Awantika & Aaradhya Industries Pvt Ltd</span>
          <h2 className="section-title">Our Work & <span>Showcase</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '12px auto 0', fontSize: '14px' }}>
            Real photos — our factory, showroom, finished interiors and texture work. A transparent look into the Ducon world.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '10px',
          flexWrap: 'wrap', marginBottom: '40px'
        }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              className="gal-filter-btn"
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '10px 22px', borderRadius: '24px',
                fontWeight: '700', fontSize: '13px', cursor: 'pointer',
                backgroundColor: activeFilter === f.id ? 'var(--primary)' : 'var(--bg-white)',
                color: activeFilter === f.id ? 'white' : 'var(--text-dark)',
                border: activeFilter === f.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                boxShadow: activeFilter === f.id ? '0 4px 14px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s'
              }}
            >{f.label}</button>
          ))}
        </div>

        {/* Count */}
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '32px', fontWeight: '500' }}>
          Showing <strong style={{ color: 'var(--text-dark)' }}>{filteredItems.length}</strong> photos
        </p>

        {/* Gallery Grid */}
        <div className="gallery-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '22px'
        }}>
          {filteredItems.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} onOpen={openLightbox} />
          ))}
        </div>

      </div>

      {/* LIGHTBOX (Rendered in Portal to sit above all headers/navbars) */}
      {lightboxItem && createPortal(
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.94)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 999999, padding: '16px', backdropFilter: 'blur(12px)',
            overflowY: 'auto'
          }}
          onClick={() => setLightboxItem(null)}
        >
          {/* Top Bar with Counter and Close Button */}
          <div style={{
            position: 'fixed', top: '16px', left: '16px', right: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            zIndex: 1000010, pointerEvents: 'none'
          }}>
            {/* Counter Badge */}
            <div style={{
              pointerEvents: 'auto',
              backgroundColor: 'rgba(0,0,0,0.65)',
              color: 'var(--accent-gold)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <span>{lightboxItem.badge}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
              <span style={{ color: 'white' }}>{lightboxIndex + 1} / {filteredItems.length}</span>
            </div>

            {/* Prominent Close Button */}
            <button 
              className="lb-close-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxItem(null);
              }}
              aria-label="Close Gallery"
              title="Close (Esc)"
              style={{
                pointerEvents: 'auto',
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px', borderRadius: '28px',
                backgroundColor: 'rgba(220, 38, 38, 0.85)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease'
              }}
            >
              <span>CLOSE</span>
              <X size={18} />
            </button>
          </div>

          {/* Prev */}
          <button 
            className="gal-nav-btn gal-nav-btn-left" 
            onClick={(e) => { e.stopPropagation(); navigate(-1); }} 
            aria-label="Previous image"
            style={{
              position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '48px', height: '48px', borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.65)', color: 'white',
              border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000005, boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button 
            className="gal-nav-btn gal-nav-btn-right" 
            onClick={(e) => { e.stopPropagation(); navigate(1); }} 
            aria-label="Next image"
            style={{
              position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)',
              width: '48px', height: '48px', borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.65)', color: 'white',
              border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 1000005, boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Content */}
          <div
            className="lb-animate"
            onClick={e => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '14px', padding: '60px 8px 20px' }}
          >
            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              style={{ width: '100%', maxHeight: '68vh', objectFit: 'contain', borderRadius: '14px', boxShadow: '0 12px 48px rgba(0,0,0,0.8)' }}
            />
            <div style={{ textAlign: 'center', color: 'white', padding: '0 8px' }}>
              <h3 className="lb-title" style={{ color: 'white', fontSize: '20px', marginTop: '6px', marginBottom: '6px', fontWeight: '800' }}>{lightboxItem.title}</h3>
              <p className="lb-desc" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13.5px', lineHeight: '1.5', maxWidth: '600px', margin: '0 auto' }}>
                {lightboxItem.desc}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
