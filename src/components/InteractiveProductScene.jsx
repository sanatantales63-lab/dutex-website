import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, X, Check, MessageCircle } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   PRODUCT DATA
───────────────────────────────────────────────────────────── */
const PRODUCTS_DATA = {
  interior_lakshya: {
    id: 1, name: "Ducon Imperial Lakshya", range: "IMPERIAL", rangeColor: "#0055A5",
    category: "interior",
    shortDesc: "Smooth, long-lasting interior emulsion with excellent coverage and vibrant finish.",
    desc: "Ducon Imperial Lakshya is a premium interior wall emulsion that delivers a rich, smooth finish. It offers excellent coverage, superior whiteness, and vibrant color retention. Formulated for easy application, it creates a uniform, washable surface that looks fresh for years.",
    image: "/images/IMG-20260620-WA0020.jpg",
    features: ["Superior Whiteness & Coverage", "Washable & Stain Resistant", "Smooth Uniform Finish", "Eco-Friendly Formula"],
    application: "Apply 2 coats over wall putty and primer for best results.",
    coverage: "130–150 sq.ft per litre for 2 coats",
    sizes: ["1L", "4L", "10L", "20L"],
    catalogPdf: "/catalogs/Lakshya Emulsion.pdf",
  },
  interior_trust: {
    id: 10, name: "Ducon Monarch Trust Interior", range: "MONARCH", rangeColor: "#1A6B5A",
    category: "interior",
    shortDesc: "Trusted interior emulsion with smooth finish and lasting vibrant color for every home.",
    desc: "Ducon Monarch Trust Interior Emulsion is a dependable, premium-quality interior paint offering excellent coverage, smooth finish, and vibrant color. Its washable formula ensures walls stay fresh and clean, making it a trusted choice for homeowners across India.",
    image: "/images/IMG-20260620-WA0013.jpg",
    features: ["Washable & Scrub Resistant", "Vibrant Color Palette", "Smooth Trowel Finish", "Long Lasting"],
    application: "2 coats over primer for smooth, uniform finish.",
    coverage: "120–140 sq.ft per litre for 2 coats",
    sizes: ["1L", "4L", "10L", "20L"],
    catalogPdf: "/catalogs/Trust Interior Emulsion.pdf",
  },
  interior_luxury: {
    id: 12, name: "Premium Luxury Emulsion", range: "DUTEX", rangeColor: "#7C4E2B",
    category: "interior",
    shortDesc: "Ultra-premium velvet matte luxury emulsion for demanding interior spaces.",
    desc: "Premium Luxury Emulsion by Dutex is the pinnacle of interior wall coating technology. With its velvet-matte formula and superior pigment loading, it delivers an unmatched depth of color and silky-smooth finish that defines luxury living spaces.",
    image: "/images/IMG-20260620-WA0046.jpg",
    features: ["Velvet Matte Luxury Finish", "Superior Pigment Loading", "Zero VOC Formula", "Washable & Stain Proof"],
    application: "2 coats over premium putty and primer for best results.",
    coverage: "120–140 sq.ft per litre for 2 coats",
    sizes: ["1L", "4L", "10L", "20L"],
    catalogPdf: "/catalogs/Premium Luxury Emulsion.pdf",
  },
  exterior_impression: {
    id: 2, name: "Ducon Imperial Impression", range: "IMPERIAL", rangeColor: "#0055A5",
    category: "exterior",
    shortDesc: "High-performance exterior emulsion with weather resistance for long-lasting protection.",
    desc: "Ducon Imperial Impression Exterior Emulsion is engineered for maximum weather resistance. Its advanced formula repels water, resists UV fading, and protects walls from harsh monsoon conditions, dust, and algae growth — keeping exteriors vibrant for years.",
    image: "/images/IMG-20260620-WA0018.jpg",
    features: ["UV & Fade Protection", "Water Repellent Barrier", "Anti-Algae & Anti-Fungal", "Crack Resistant Formula"],
    application: "Apply 2 coats over exterior primer on clean, dry surface.",
    coverage: "60–80 sq.ft per litre for 2 coats",
    sizes: ["4L", "10L", "20L"],
    catalogPdf: "/catalogs/Impression Emulsion.pdf",
  },
  exterior_shyne: {
    id: 3, name: "Ducon Monarch Impression Shyne", range: "MONARCH", rangeColor: "#1A6B5A",
    category: "exterior",
    shortDesc: "Premium exterior emulsion with a lasting shyne finish and superior weather protection.",
    desc: "Ducon Monarch Impression Shyne is a premium-grade exterior emulsion with a subtle sheen finish. Its advanced silicon-acrylic technology forms a tough, flexible film that resists cracking, peeling, and discoloration — even in the harshest weather conditions.",
    image: "/images/IMG-20260620-WA0019.jpg",
    features: ["Silicon-Acrylic Technology", "Premium Shyne Finish", "10 Year Durability", "Dust & Dirt Resistant"],
    application: "Apply 2 coats over exterior damp-proof primer.",
    coverage: "55–70 sq.ft per litre for 2 coats",
    sizes: ["4L", "10L", "20L"],
    catalogPdf: "/catalogs/Impression Shyne Ext Emulsion.pdf",
  },
  texture_rustic: {
    id: 11, name: "Ducon Rustic Paint", range: "DUTEX", rangeColor: "#7C4E2B",
    category: "texture",
    shortDesc: "Premium granular texture paint for luxurious stone-like exterior & feature wall finishes.",
    desc: "Ducon Rustic Paint is a high-build granular texture coating that produces a beautiful natural stone effect on walls. Mixed with natural aggregates and quartz, it provides maximum mechanical protection while delivering stunning visual appeal.",
    image: "/images/IMG-20260620-WA0036.jpg",
    features: ["Natural Stone Effect", "Granular Texture Finish", "Weather & Impact Resistant", "Ideal for Feature Walls"],
    application: "Apply with steel trowel or spray. 1 thick coat on primed surface.",
    coverage: "15–20 sq.ft per kg",
    sizes: ["10 kg", "25 kg", "50 kg"],
    catalogPdf: "/catalogs/Rustic Paint.pdf",
  },
  texture_hisheen: {
    id: 5, name: "Ducon Monarch Hi Sheen", range: "MONARCH", rangeColor: "#1A6B5A",
    category: "interior",
    shortDesc: "Stunning high-sheen premium emulsion for walls that demand elegance and luxury.",
    desc: "Ducon Monarch Hi Sheen Premium Emulsion offers a dazzling high-gloss sheen that instantly elevates interior spaces. With superior coverage and color retention, it creates a smooth, reflective surface that looks glamorous and stays vibrant.",
    image: "/images/IMG-20260620-WA0017.jpg",
    features: ["High Gloss Sheen Finish", "Superior Color Retention", "Easy Application", "Washable & Durable"],
    application: "Apply 2 coats over acrylic primer for maximum sheen.",
    coverage: "110–130 sq.ft per litre for 2 coats",
    sizes: ["1L", "4L", "10L", "20L"],
    catalogPdf: "/catalogs/Hi Sheen Emulsion.pdf",
  },
  primer_gold: {
    id: 8, name: "Ducoprime Gold Cement Primer", range: "MONARCH", rangeColor: "#8B6914",
    category: "primer",
    shortDesc: "Premium gold cement primer for exceptional paint bonding on new & old walls.",
    desc: "Ducoprime Gold Cement Primer is an alkali-resistant primer formulated for deep penetration into new cement and masonry surfaces. It neutralizes alkalinity, seals the surface, and creates a superior bonding base for topcoats.",
    image: "/images/IMG-20260620-WA0015.jpg",
    features: ["Deep Penetration Formula", "Alkali & Efflorescence Resistant", "Superior Paint Bonding", "Seals Porous Surfaces"],
    application: "1–2 coats on new plaster before wall putty or paint application.",
    coverage: "150–180 sq.ft per litre per coat",
    sizes: ["1L", "4L", "10L", "20L"],
    catalogPdf: "/catalogs/Ducoprime Gold Primer.pdf",
  },
  primer_silver: {
    id: 9, name: "Ducoprime Silver Cement Primer", range: "IMPERIAL", rangeColor: "#6A4A9E",
    category: "primer",
    shortDesc: "Reliable cement primer for solid paint adhesion and surface sealing.",
    desc: "Ducoprime Silver Cement Primer is an economical yet effective water-based cement primer designed for interior walls. It provides excellent adhesion for subsequent coats of distempers and emulsions, reduces absorption, and ensures uniform paint finishing.",
    image: "/images/IMG-20260620-WA0016.jpg",
    features: ["Strong Surface Adhesion", "Reduces Paint Absorption", "Alkali Resistant", "Budget Friendly"],
    application: "Apply 1 coat on new plaster. Allow to dry before painting.",
    coverage: "160–200 sq.ft per litre",
    sizes: ["1L", "4L", "10L", "20L"],
    catalogPdf: "/catalogs/Ducoprime Silver Primer.pdf",
  },
  distemper_ezy: {
    id: 6, name: "Ducon Imperial Ezy", range: "IMPERIAL", rangeColor: "#8B4000",
    category: "distemper",
    shortDesc: "100% acrylic smart distemper for economical, high-coverage interior wall finishing.",
    desc: "Ducon Imperial Ezy Smart Distemper is a 100% acrylic water-based distemper offering excellent coverage and a clean, matte finish. Economical yet high-performing, it is ideal for new constructions and renovation projects requiring quick, reliable wall coating.",
    image: "/images/IMG-20260620-WA0021.jpg",
    features: ["100% Acrylic Formula", "High Coverage & Economy", "Quick Drying", "Smooth Matte Finish"],
    application: "Mix with water and apply 2 coats on clean, dry surface.",
    coverage: "150–180 sq.ft per kg for 2 coats",
    sizes: ["5 kg", "10 kg", "20 kg"],
    catalogPdf: "/catalogs/Ezy Distemper.pdf",
  },
  distemper_monarch: {
    id: 7, name: "Ducon Monarch Acrylic Distemper", range: "MONARCH", rangeColor: "#2D5C1A",
    category: "distemper",
    shortDesc: "Premium acrylic distemper with rich coverage for smooth, long-lasting matte finish.",
    desc: "Ducon Monarch Acrylic Distemper is a high-quality, water-based distemper with excellent binding properties. It provides a rich, uniform matte finish with superior hiding power — making it an ideal choice for both residential and commercial interior walls.",
    image: "/images/IMG-20260620-WA0014.jpg",
    features: ["100% Acrylic Binders", "Excellent Hiding Power", "Matte Smooth Finish", "Economical & Durable"],
    application: "Apply 2 coats with brush or roller over primed surface.",
    coverage: "140–160 sq.ft per kg for 2 coats",
    sizes: ["5 kg", "10 kg", "20 kg"],
    catalogPdf: "/catalogs/Ducon Distemper.pdf",
  },
};

/* ─────────────────────────────────────────────────────────────
   CATEGORIES — hotspot coords stored as % of the RAW IMAGE
   (imgTop, imgLeft = % of the actual image pixel dimensions)
   The rendering engine converts these to container % at runtime
   so they stay on the exact same wall spot on any screen size.
───────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'interior',
    label: 'Interior', icon: '🏠',
    image: '/images/ai_family_living_1.jpeg',
    desc: 'Premium wall paints for beautiful interiors',
    hotspots: [
      // Beige back wall — above the art frame, centre
      { id: 'h1', imgTop: 12, imgLeft: 50, productKey: 'interior_lakshya' },
      // Beige back wall — above wooden shelves, right section
      { id: 'h2', imgTop: 15, imgLeft: 72, productKey: 'interior_trust' },
      // Beige back wall — far right, between shelves and edge
      { id: 'h3', imgTop: 28, imgLeft: 87, productKey: 'interior_luxury' },
    ],
  },
  {
    id: 'exterior',
    label: 'Exterior', icon: '🏗️',
    image: '/images/exterior_villa_1.jpeg',
    desc: 'Weather-resistant coatings for stunning exteriors',
    hotspots: [
      // Left building — cream/beige facade wall, upper level
      { id: 'e1', imgTop: 26, imgLeft: 28, productKey: 'exterior_impression' },
      // Right building — cream facade, second storey wall panel
      { id: 'e2', imgTop: 24, imgLeft: 58, productKey: 'exterior_shyne' },
    ],
  },
  {
    id: 'texture',
    label: 'Texture', icon: '✨',
    image: '/images/texture_accent_wall_1.jpeg',
    desc: 'Designer textures for statement walls',
    hotspots: [
      // Bronze textured feature wall — upper left section
      { id: 't1', imgTop: 20, imgLeft: 28, productKey: 'texture_rustic' },
      // Bronze textured feature wall — upper right section
      { id: 't2', imgTop: 20, imgLeft: 62, productKey: 'texture_hisheen' },
    ],
  },
  {
    id: 'primer',
    label: 'Primer', icon: '🎯',
    image: '/images/ai_luxury_bedroom.jpeg',
    desc: 'Superior bonding primers for every surface',
    hotspots: [
      // Soft pink back wall — above artwork, left-centre
      { id: 'p1', imgTop: 28, imgLeft: 38, productKey: 'primer_gold' },
      // Soft pink back wall — above bed headboard, centre-right
      { id: 'p2', imgTop: 22, imgLeft: 60, productKey: 'primer_silver' },
    ],
  },
  {
    id: 'distemper',
    label: 'Distemper', icon: '🖌️',
    image: '/images/ai_kids_bedroom.jpeg',
    desc: 'Economical acrylic distempers for every budget',
    hotspots: [
      // Blue back wall — above alphabet poster (upper-left of back wall)
      { id: 'd1', imgTop: 10, imgLeft: 50, productKey: 'distemper_ezy' },
      // Blue back wall — above numbers/world-map posters (upper-right)
      { id: 'd2', imgTop: 10, imgLeft: 68, productKey: 'distemper_monarch' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   COORDINATE TRANSFORM
   Converts image-space % → container-space % accounting for
   object-fit: cover (which scales + centers the image).
   This ensures dots stay on the same wall pixel on every screen.
───────────────────────────────────────────────────────────── */
function toContainerPct(imgTopPct, imgLeftPct, cw, ch, iw, ih) {
  if (!cw || !ch || !iw || !ih) {
    return { top: imgTopPct, left: imgLeftPct };
  }
  // Scale factor for object-fit: cover
  const scale = Math.max(cw / iw, ch / ih);
  // Rendered image size in container
  const rw = iw * scale;
  const rh = ih * scale;
  // Offset (image is centered; negative means image overflows container)
  const ox = (cw - rw) / 2;
  const oy = (ch - rh) / 2;
  // Image pixel position of hotspot
  const px = (imgLeftPct / 100) * iw * scale + ox;
  const py = (imgTopPct / 100) * ih * scale + oy;
  // Clamp to 3%-95% so dot is always visible
  return {
    top: Math.max(3, Math.min(93, (py / ch) * 100)),
    left: Math.max(3, Math.min(95, (px / cw) * 100)),
  };
}

/* ─────────────────────────────────────────────────────────────
   HOTSPOT DOT — receives pre-computed container % position
───────────────────────────────────────────────────────────── */
function HotspotDot({ top, left, isActive, onClick, dotId, color }) {
  return (
    <button
      onClick={() => onClick(dotId)}
      style={{
        position: 'absolute',
        top: `${top}%`,
        left: `${left}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      }}
    >
      <span className="ips-ring ips-ring-1" style={{ borderColor: color }} />
      <span className="ips-ring ips-ring-2" style={{ borderColor: color }} />
      <span style={{
        display: 'block',
        width: isActive ? '22px' : '17px',
        height: isActive ? '22px' : '17px',
        borderRadius: '50%',
        background: isActive ? color : 'rgba(255,255,255,0.95)',
        border: `3px solid ${color}`,
        boxShadow: isActive
          ? `0 0 0 5px rgba(255,255,255,0.3), 0 6px 20px ${color}99`
          : '0 2px 10px rgba(0,0,0,0.35)',
        transition: 'all 0.3s cubic-bezier(0.34,1.4,0.64,1)',
        position: 'relative', zIndex: 1,
      }} />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOTSPOT CARD — pixel-clamped so it never overflows image
───────────────────────────────────────────────────────────── */
const CARD_W = 218;
const CARD_H = 210; // approximate card height

function HotspotCard({ dotTop, dotLeft, containerW, containerH, product, onOpenModal, onClose }) {
  if (!product) return null;
  const color = product.rangeColor;

  // Convert % to px
  const dotPxX = (dotLeft / 100) * containerW;
  const dotPxY = (dotTop / 100) * containerH;

  // Try placing card to the right of the dot (16px gap)
  let cardLeft = dotPxX + 16;
  // If it would overflow right edge, place to the left
  if (cardLeft + CARD_W > containerW - 8) {
    cardLeft = dotPxX - CARD_W - 16;
  }
  // Hard clamp so card never leaves container
  cardLeft = Math.max(8, Math.min(containerW - CARD_W - 8, cardLeft));

  // Vertically center on dot, then clamp
  let cardTop = dotPxY - CARD_H / 2;
  cardTop = Math.max(8, Math.min(containerH - CARD_H - 8, cardTop));

  return (
    <div
      style={{
        position: 'absolute',
        left: `${cardLeft}px`,
        top: `${cardTop}px`,
        width: `${CARD_W}px`,
        zIndex: 40,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
        borderRadius: '14px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.1)',
        border: `1.5px solid ${color}44`,
        overflow: 'hidden',
        animation: 'ips-card-pop 0.28s cubic-bezier(0.34,1.4,0.64,1)',
        pointerEvents: 'all',
      }}
    >
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${color}, ${color}88)` }} />

      <div style={{ height: '100px', background: '#f5f7fa', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
        <span style={{
          position: 'absolute', top: '7px', left: '7px',
          background: color, color: 'white',
          fontSize: '9px', fontWeight: '800', padding: '2px 8px',
          borderRadius: '20px', textTransform: 'uppercase',
        }}>{product.range}</span>
        <button onClick={onClose} style={{
          position: 'absolute', top: '6px', right: '6px',
          background: 'rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer',
          width: '20px', height: '20px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555',
        }}>
          <X size={10} />
        </button>
      </div>

      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ fontSize: '9px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '2px' }}>
          {product.category}
        </p>
        <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#1a1a1a', lineHeight: '1.35', marginBottom: '5px' }}>
          {product.name}
        </h4>
        <p style={{ fontSize: '10.5px', color: '#666', lineHeight: '1.45', marginBottom: '10px' }}>
          {product.shortDesc}
        </p>
        <button
          onClick={() => onOpenModal(product)}
          style={{
            width: '100%', padding: '8px 10px',
            background: color, color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer',
            fontSize: '11px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
          }}
        >
          View Full Details <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULL PRODUCT MODAL
───────────────────────────────────────────────────────────── */
function ProductDetailModal({ product, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);
  if (!product) return null;
  const rangeColor = product.rangeColor || '#333';
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, padding: '16px', backdropFilter: 'blur(8px)',
        animation: 'ips-overlay-in 0.22s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ips-modal-inner"
        style={{
          backgroundColor: 'var(--bg-white)',
          width: '100%', maxWidth: '800px',
          maxHeight: '92vh', overflowY: 'auto',
          borderRadius: '20px',
          boxShadow: '0 32px 100px rgba(0,0,0,0.35)',
          position: 'relative',
          display: 'grid', gridTemplateColumns: '1fr 1.35fr',
          border: '1px solid var(--border-color)',
          animation: 'ips-modal-in 0.3s cubic-bezier(0.34,1.4,0.64,1)',
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '14px', right: '14px', zIndex: 10,
          width: '36px', height: '36px', borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dark)',
        }}>
          <X size={16} />
        </button>
        <div style={{ backgroundColor: '#f5f7fa', display: 'flex', flexDirection: 'column', borderRadius: '20px 0 0 20px' }}>
          <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <img src={product.image} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }} />
          </div>
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: rangeColor, letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>Packaging Sizes</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {product.sizes.map((sz, i) => (
                <span key={i} style={{ backgroundColor: 'white', border: `2px solid ${rangeColor}`, color: rangeColor, padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{sz}</span>
              ))}
            </div>
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '10px', borderLeft: `4px solid ${rangeColor}` }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: rangeColor, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Coverage</span>
              <p style={{ fontSize: '13px', marginTop: '4px', fontWeight: '600', color: 'var(--text-dark)' }}>{product.coverage}</p>
            </div>
          </div>
        </div>
        <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: rangeColor, display: 'block', marginBottom: '6px' }}>
            {product.range} Range • {product.category}
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: 'var(--text-dark)', lineHeight: '1.2' }}>{product.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: '1.65', marginBottom: '20px' }}>{product.desc}</p>
          <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', color: 'var(--text-dark)', fontWeight: '700' }}>Key Features</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
            {product.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: rangeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={11} color="white" />
                </div>
                <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-dark)' }}>{feat}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px', background: 'var(--bg-primary)', borderRadius: '10px', borderLeft: `4px solid ${rangeColor}`, marginBottom: '20px' }}>
            <strong style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: rangeColor, display: 'block', marginBottom: '4px' }}>Application Method</strong>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{product.application}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <a href={product.catalogPdf} target="_blank" rel="noreferrer" style={{ flex: 1, padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', backgroundColor: rangeColor, color: 'white', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              📄 View Product PDF
            </a>
            <a
              href={`https://wa.me/917225020180?text=${encodeURIComponent(`Hi! I am interested in *${product.name}* (${product.range} Range). Please share more details.`)}`}
              target="_blank" rel="noreferrer"
              style={{ flex: 1, padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '13px', backgroundColor: '#25D366', color: 'white', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <MessageCircle size={16} /> Enquire Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function InteractiveProductScene({ setView }) {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  // Track container dimensions via ResizeObserver (updates on every resize)
  const sceneRef = useRef(null);
  const [containerDims, setContainerDims] = useState({ w: 0, h: 0 });

  // Track actual image natural dimensions (set when image loads)
  const [imgNatural, setImgNatural] = useState({ w: 1, h: 1 });

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerDims({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setContainerDims({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const category = CATEGORIES.find(c => c.id === activeCat);

  const handleCatChange = (catId) => {
    if (catId === activeCat) return;
    setActiveHotspot(null);
    setImgLoaded(false);
    setImgNatural({ w: 1, h: 1 });
    setActiveCat(catId);
  };

  const handleHotspotClick = (id) => {
    setActiveHotspot(prev => prev === id ? null : id);
  };

  const handleImageLoad = (e) => {
    setImgNatural({ w: e.target.naturalWidth, h: e.target.naturalHeight });
    setImgLoaded(true);
  };

  const handleOpenModal = (product) => {
    setActiveHotspot(null);
    setModalProduct(product);
  };

  // Dismiss popup on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.ips-scene-wrap')) setActiveHotspot(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Pre-compute all hotspot positions once (container + image dims known)
  const computedHotspots = category.hotspots.map(h => {
    const pos = toContainerPct(
      h.imgTop, h.imgLeft,
      containerDims.w, containerDims.h,
      imgNatural.w, imgNatural.h
    );
    return { ...h, cTop: pos.top, cLeft: pos.left };
  });

  const activeHotspotComp = computedHotspots.find(h => h.id === activeHotspot);
  const activeProduct = activeHotspotComp ? PRODUCTS_DATA[activeHotspotComp.productKey] : null;

  return (
    <>
      <style>{`
        .ips-ring {
          position: absolute; border-radius: 50%; border: 2px solid;
          pointer-events: none; animation: ips-pulse 2.2s ease-in-out infinite;
        }
        .ips-ring-1 { inset: -8px; opacity: 0.6; }
        .ips-ring-2 { inset: -17px; opacity: 0.25; animation-delay: 0.55s !important; }
        @keyframes ips-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.3); opacity: 0.1; }
        }
        @keyframes ips-card-pop {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes ips-img-in {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes ips-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ips-modal-in {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .ips-img-loaded { animation: ips-img-in 0.55s ease forwards; }

        /* Sidebar & Scene sizing for laptop/desktop screens */
        .ips-scene-wrap {
          height: 620px;
          min-height: 620px;
        }

        @media (min-width: 1400px) {
          .ips-scene-wrap {
            height: 660px !important;
            min-height: 660px !important;
          }
        }

        @media (min-width: 1024px) {
          .ips-sidebar {
            min-width: 260px !important;
            max-width: 270px !important;
            padding: 18px !important;
          }
          .ips-cat-btn {
            padding: 15px 16px !important;
            margin-bottom: 4px !important;
          }
          .ips-cat-icon {
            width: 44px !important;
            height: 44px !important;
            font-size: 20px !important;
          }
          .ips-cat-label {
            font-size: 15px !important;
          }
        }

        @media (max-width: 1023px) {
          .ips-scene-wrap {
            height: 480px !important;
            min-height: 480px !important;
          }
        }

        @media (max-width: 767px) {
          .ips-scene-wrap {
            height: 380px !important;
            min-height: 380px !important;
          }
        }

        /* Category sidebar */
        .ips-cat-btn {
          display: flex; align-items: center; gap: 12px;
          width: 100%; padding: 12px 14px;
          border: none; background: transparent; cursor: pointer;
          border-radius: 14px; transition: all 0.22s; text-align: left;
          position: relative; overflow: hidden;
        }
        .ips-cat-btn::after {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
          background: var(--primary); border-radius: 0 4px 4px 0;
          opacity: 0; transition: opacity 0.2s;
        }
        .ips-cat-btn:hover { background: rgba(92,103,66,0.06); }
        .ips-cat-btn.active { background: rgba(92,103,66,0.09); }
        .ips-cat-btn.active::after { opacity: 1; }
        .ips-cat-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; transition: background 0.22s; }
        .ips-cat-btn:not(.active) .ips-cat-icon { background: rgba(92,103,66,0.07); }
        .ips-cat-btn.active .ips-cat-icon { background: var(--primary); }
        .ips-cat-label { font-size: 14px; font-weight: 700; color: var(--text-dark); transition: color 0.2s; }
        .ips-cat-btn.active .ips-cat-label { color: var(--primary); }
        .ips-cat-count { font-size: 11px; color: var(--text-muted); font-weight: 500; }

        /* Mobile pill tabs */
        .ips-mobile-tabs { display: none; overflow-x: auto; gap: 8px; padding: 0 0 8px; scrollbar-width: none; -ms-overflow-style: none; }
        .ips-mobile-tabs::-webkit-scrollbar { display: none; }
        .ips-pill { display: flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 30px; border: 2px solid var(--border-color); background: white; cursor: pointer; font-size: 13px; font-weight: 700; color: var(--text-dark); white-space: nowrap; transition: all 0.22s; flex-shrink: 0; }
        .ips-pill.active { background: var(--primary); color: white; border-color: var(--primary); box-shadow: 0 4px 14px rgba(92,103,66,0.3); }

        /* Modal responsive */
        @media (max-width: 620px) {
          .ips-modal-inner { grid-template-columns: 1fr !important; }
          .ips-modal-inner > div:first-child { border-radius: 20px 20px 0 0 !important; }
        }

        @media (max-width: 900px) {
          .ips-layout { flex-direction: column !important; }
          .ips-sidebar { display: none !important; }
          .ips-mobile-tabs { display: flex !important; }
        }
      `}</style>

      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '90px 0' }} id="products-we-offer">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <div className="section-title-wrapper" style={{ marginBottom: '48px' }}>
            <span className="section-subtitle">Explore Our Range</span>
            <h2 className="section-title">Products <span>We Offer</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '12px auto 0', fontSize: '14px', lineHeight: '1.6' }}>
              Select a category, then click the glowing dots on the room image to discover the perfect Dutex product.
            </p>
          </div>

          {/* Mobile pill tabs */}
          <div className="ips-mobile-tabs" style={{ marginBottom: '20px' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} className={`ips-pill${activeCat === cat.id ? ' active' : ''}`} onClick={() => handleCatChange(cat.id)}>
                <span style={{ fontSize: '15px' }}>{cat.icon}</span>{cat.label}
              </button>
            ))}
          </div>

          {/* Layout */}
          <div className="ips-layout" style={{ display: 'flex', gap: '24px', alignItems: 'stretch' }}>

            {/* Desktop sidebar */}
            <div className="ips-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '210px', maxWidth: '220px', background: 'white', borderRadius: '18px', padding: '14px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: '1px solid var(--border-color)', alignSelf: 'flex-start' }}>
              <p style={{ fontSize: '10px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.2px', paddingLeft: '2px', marginBottom: '6px' }}>Category</p>
              {CATEGORIES.map(cat => (
                <button key={cat.id} className={`ips-cat-btn${activeCat === cat.id ? ' active' : ''}`} onClick={() => handleCatChange(cat.id)}>
                  <span className="ips-cat-icon">{cat.icon}</span>
                  <span>
                    <span className="ips-cat-label">{cat.label}</span>
                    {activeCat === cat.id && (
                      <span className="ips-cat-count" style={{ display: 'block', marginTop: '1px' }}>{category.hotspots.length} products</span>
                    )}
                  </span>
                  {activeCat === cat.id && <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--primary)', flexShrink: 0 }} />}
                </button>
              ))}
              <div style={{ marginTop: '10px', padding: '11px 13px', background: 'rgba(92,103,66,0.05)', borderRadius: '10px', border: '1px dashed rgba(92,103,66,0.22)' }}>
                <p style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600', margin: 0, lineHeight: '1.45' }}>
                  💡 Click the glowing dots on the image to explore products
                </p>
              </div>
            </div>

            {/* Scene image with hotspots */}
            <div
              className="ips-scene-wrap"
              ref={sceneRef}
              style={{ flex: 1, position: 'relative', borderRadius: '18px', overflow: 'hidden', minHeight: '420px', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}
            >
              {/* Image — key forces remount on category switch to fire onLoad */}
              <img
                key={activeCat}
                src={category.image}
                alt={category.label}
                onLoad={handleImageLoad}
                className={imgLoaded ? 'ips-img-loaded' : ''}
                style={{ width: '100%', height: '100%', minHeight: '420px', objectFit: 'cover', display: 'block', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s ease', position: 'absolute', inset: 0 }}
              />

              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 45%)', pointerEvents: 'none', zIndex: 5 }} />

              {/* Category badge */}
              <div style={{ position: 'absolute', bottom: '18px', left: '18px', background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.28)', borderRadius: '30px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '9px', zIndex: 10, pointerEvents: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                <span style={{ fontSize: '20px' }}>{category.icon}</span>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: '800', color: 'white', margin: 0, lineHeight: 1 }}>{category.label}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', margin: 0, marginTop: '2px' }}>{category.desc}</p>
                </div>
              </div>

              {/* Hint pill */}
              <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,0.48)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '5px 12px', zIndex: 10, pointerEvents: 'none' }}>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.92)', fontWeight: '600', margin: 0 }}>Tap dots to explore ✦</p>
              </div>

              {/* DOTS — only render when image loaded and dims known */}
              {imgLoaded && containerDims.w > 0 && computedHotspots.map(h => (
                <HotspotDot
                  key={h.id}
                  dotId={h.id}
                  top={h.cTop}
                  left={h.cLeft}
                  isActive={activeHotspot === h.id}
                  onClick={handleHotspotClick}
                  color={PRODUCTS_DATA[h.productKey]?.rangeColor || '#5C6742'}
                />
              ))}

              {/* POPUP CARD — pixel-clamped to container bounds */}
              {activeHotspotComp && activeProduct && containerDims.w > 0 && (
                <HotspotCard
                  dotTop={activeHotspotComp.cTop}
                  dotLeft={activeHotspotComp.cLeft}
                  containerW={containerDims.w}
                  containerH={containerDims.h}
                  product={activeProduct}
                  onOpenModal={handleOpenModal}
                  onClose={() => setActiveHotspot(null)}
                />
              )}
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button onClick={() => setView('products')} className="btn-primary" style={{ padding: '14px 38px', fontSize: '15px' }}>
              View All Products <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {modalProduct && <ProductDetailModal product={modalProduct} onClose={() => setModalProduct(null)} />}
    </>
  );
}
