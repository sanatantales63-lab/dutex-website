import React, { useState, useEffect, useRef } from 'react';
import { FileText, ExternalLink, BookOpen, Search, Download } from 'lucide-react';

const CATALOGS = [
  // IMPERIAL Range
  {
    id: 1,
    title: "Imperial Lakshya",
    subtitle: "Interior Emulsion",
    desc: "Smooth, high-coverage interior emulsion with excellent whiteness, washability and vibrant color for all interior walls.",
    pdfUrl: "/catalogs/Lakshya Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #0055A5 0%, #0099CC 100%)",
    tag: "IMPERIAL"
  },
  {
    id: 2,
    title: "Imperial Impression",
    subtitle: "Exterior Emulsion",
    desc: "High-performance exterior wall coating with UV resistance, anti-algae protection and monsoon weather guard.",
    pdfUrl: "/catalogs/Impression Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)",
    tag: "IMPERIAL"
  },
  {
    id: 3,
    title: "Imperial Ezy Distemper",
    subtitle: "100% Acrylic Smart Distemper",
    desc: "Economical 100% acrylic smart distemper offering excellent coverage, quick drying and smooth matte finish for interiors.",
    pdfUrl: "/catalogs/Ezy Distemper.pdf",
    colorBg: "linear-gradient(135deg, #E65100 0%, #FFB74D 100%)",
    tag: "IMPERIAL"
  },
  // MONARCH Range
  {
    id: 4,
    title: "Impression Shyne",
    subtitle: "Exterior Premium Emulsion",
    desc: "Silicon-acrylic exterior emulsion with a lasting shyne finish. 10-year durability with anti-dust and weatherproof protection.",
    pdfUrl: "/catalogs/Impression Shyne Ext Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #1A237E 0%, #5C6BC0 100%)",
    tag: "MONARCH"
  },
  {
    id: 5,
    title: "Monarch Hi Sheen",
    subtitle: "Premium Emulsion",
    desc: "High-gloss sheen premium emulsion for elegant interior spaces. Superior coverage, color retention and washable finish.",
    pdfUrl: "/catalogs/Hi Sheen Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #880E4F 0%, #EC407A 100%)",
    tag: "MONARCH"
  },
  {
    id: 6,
    title: "Monarch Trust Interior",
    subtitle: "Interior Emulsion",
    desc: "Trusted, washable interior emulsion with smooth finish, vibrant colors and long-lasting durability for every home.",
    pdfUrl: "/catalogs/Trust Interior Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #00695C 0%, #4DB6AC 100%)",
    tag: "MONARCH"
  },
  {
    id: 7,
    title: "Monarch Trust Exterior",
    subtitle: "Exterior Emulsion",
    desc: "Dependable exterior emulsion with weather resistance, anti-algae protection and durable finish for outer walls.",
    pdfUrl: "/catalogs/Trust Exterior.pdf",
    colorBg: "linear-gradient(135deg, #1B5E20 0%, #81C784 100%)",
    tag: "MONARCH"
  },
  {
    id: 8,
    title: "Monarch Acrylic Distemper",
    subtitle: "Premium Distemper",
    desc: "High-quality acrylic distemper with rich matte finish, excellent hiding power and durability for interior walls.",
    pdfUrl: "/catalogs/Ducon Distemper.pdf",
    colorBg: "linear-gradient(135deg, #37474F 0%, #90A4AE 100%)",
    tag: "MONARCH"
  },
  {
    id: 9,
    title: "Ducoprime Gold",
    subtitle: "Cement Primer",
    desc: "Premium gold-grade cement primer for exceptional alkali resistance, deep penetration and superior paint bonding.",
    pdfUrl: "/catalogs/Ducoprime Gold Primer.pdf",
    colorBg: "linear-gradient(135deg, #7B5B00 0%, #D4AC0D 100%)",
    tag: "MONARCH"
  },
  // ELITE Range
  {
    id: 10,
    title: "Elite Lavanya",
    subtitle: "Plastic Emulsion",
    desc: "Top-tier plastic emulsion for interior & exterior with high-opacity, premium sheen and anti-bacterial properties.",
    pdfUrl: "/catalogs/Lavanya Interior Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #0D47A1 0%, #42A5F5 100%)",
    tag: "ELITE"
  },
  {
    id: 11,
    title: "Elite Lavanya Exterior",
    subtitle: "Premium Exterior Emulsion",
    desc: "Premium exterior-grade Lavanya formulation with enhanced weather shield, UV guard and elastomeric protection.",
    pdfUrl: "/catalogs/Lavanya Exterior Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #1565C0 0%, #29B6F6 100%)",
    tag: "ELITE"
  },
  {
    id: 12,
    title: "Elite Majestic Interior",
    subtitle: "Interior Emulsion",
    desc: "Majestic-grade interior emulsion delivering royal coverage, silky smooth finish and lasting color vibrancy.",
    pdfUrl: "/catalogs/Majestic Exterior Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #4A148C 0%, #AB47BC 100%)",
    tag: "ELITE"
  },
  {
    id: 13,
    title: "Elite Prime Distemper",
    subtitle: "Acrylic Distemper",
    desc: "High-quality Elite-range acrylic distemper offering premium matte finish, coverage and durability at great value.",
    pdfUrl: "/catalogs/Elite Prime Acrylic Distemper.pdf",
    colorBg: "linear-gradient(135deg, #BF360C 0%, #FF7043 100%)",
    tag: "ELITE"
  },
  {
    id: 14,
    title: "Elite Supreme",
    subtitle: "Premium Emulsion",
    desc: "Supreme-grade emulsion with ultra-premium finish for luxury interiors demanding the finest quality paint.",
    pdfUrl: "/catalogs/Supreme Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #F57F17 0%, #FFD54F 100%)",
    tag: "ELITE"
  },
  {
    id: 15,
    title: "Elite Sparsh",
    subtitle: "Interior Emulsion",
    desc: "Sparsh emulsion offering a delicate, smooth touch finish on interior walls with excellent whiteness and coverage.",
    pdfUrl: "/catalogs/Sparsh Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #AD1457 0%, #F48FB1 100%)",
    tag: "ELITE"
  },
  // DUTEX Range
  {
    id: 16,
    title: "Rustic Paint",
    subtitle: "Granular Texture",
    desc: "Premium granular texture coating with natural stone effect. Ideal for feature walls, exterior pillars and boundary walls.",
    pdfUrl: "/catalogs/Rustic Paint.pdf",
    colorBg: "linear-gradient(135deg, #4E342E 0%, #A1887F 100%)",
    tag: "DUTEX"
  },
  {
    id: 17,
    title: "Premium Luxury Emulsion",
    subtitle: "Ultra Premium Emulsion",
    desc: "The pinnacle of interior coating — velvet-matte luxury finish with superior pigment loading and zero VOC formula.",
    pdfUrl: "/catalogs/Premium Luxury Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #1A0A00 0%, #7C4E2B 100%)",
    tag: "DUTEX"
  },
  {
    id: 18,
    title: "Concreto Texture",
    subtitle: "Concrete Effect Finish",
    desc: "Industrial-look concrete texture finish for modern interior & exterior walls. Creates a stunning urban design effect.",
    pdfUrl: "/catalogs/Concreto.pdf",
    colorBg: "linear-gradient(135deg, #424242 0%, #9E9E9E 100%)",
    tag: "DUTEX"
  },
  // Primers & Others
  {
    id: 19,
    title: "Ducoprime Silver",
    subtitle: "Cement Primer",
    desc: "Reliable cement primer for solid adhesion and surface sealing. Reduces paint absorption for uniform topcoat finish.",
    pdfUrl: "/catalogs/Ducoprime Silver Primer.pdf",
    colorBg: "linear-gradient(135deg, #5E35B1 0%, #CE93D8 100%)",
    tag: "IMPERIAL"
  },
  {
    id: 20,
    title: "Eco Distemper",
    subtitle: "Economy Distemper",
    desc: "Budget-friendly eco distemper for large-scale applications. Good coverage with clean white matte finish.",
    pdfUrl: "/catalogs/Eco Distemper.pdf",
    colorBg: "linear-gradient(135deg, #2E7D32 0%, #A5D6A7 100%)",
    tag: "IMPERIAL"
  },
  {
    id: 21,
    title: "Dust Protect Exterior",
    subtitle: "Exterior Emulsion",
    desc: "Specially formulated exterior emulsion with dust-repelling technology for walls that stay cleaner for longer.",
    pdfUrl: "/catalogs/Dust Protect Exterior Emulsion.pdf",
    colorBg: "linear-gradient(135deg, #455A64 0%, #90A4AE 100%)",
    tag: "IMPERIAL"
  },
  {
    id: 22,
    title: "Prime Acrylic Distemper",
    subtitle: "Acrylic Distemper",
    desc: "100% acrylic distemper for reliable interior wall coverage. Economical, durable and fast drying.",
    pdfUrl: "/catalogs/Prime Acrylic Distemper.pdf",
    colorBg: "linear-gradient(135deg, #006064 0%, #4DD0E1 100%)",
    tag: "IMPERIAL"
  },
];

const TAG_COLORS = {
  'IMPERIAL': '#0055A5',
  'MONARCH': '#1A6B5A',
  'ELITE': '#7B1FA2',
  'DUTEX': '#7C4E2B'
};

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function CatalogCard({ catalog, index }) {
  const [ref, inView] = useInView();
  const tagColor = TAG_COLORS[catalog.tag] || '#333';

  return (
    <div
      ref={ref}
      onClick={() => window.open(catalog.pdfUrl, '_blank')}
      style={{
        backgroundColor: 'var(--bg-white)', borderRadius: '16px', overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1px solid var(--border-color)',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
      }}
      className="catalog-card-hover"
    >
      {/* Cover */}
      <div style={{
        background: catalog.colorBg, height: '150px', padding: '20px',
        color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Dot pattern overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '18px 18px', pointerEvents: 'none'
        }} />
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', right: '-30px', bottom: '-30px', width: '120px', height: '120px',
          borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)'
        }} />

        <span style={{
          backgroundColor: 'rgba(255,255,255,0.22)', color: 'white',
          fontSize: '10px', fontWeight: '800', padding: '4px 10px', borderRadius: '20px',
          alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '1.2px',
          backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)'
        }}>
          {catalog.tag}
        </span>

        <div>
          <FileText size={20} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }} />
          <h3 style={{ color: 'white', fontSize: '19px', fontWeight: '800', lineHeight: '1.1' }}>{catalog.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '11.5px', marginTop: '2px' }}>{catalog.subtitle}</p>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '18px 20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', lineHeight: '1.55', flexGrow: 1, marginBottom: '16px' }}>
          {catalog.desc}
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px dashed var(--border-color)', paddingTop: '14px',
          color: tagColor, fontWeight: '700', fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <FileText size={15} />
            <span>Open PDF Catalog</span>
          </div>
          <ExternalLink size={14} />
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRange, setActiveRange] = useState('all');

  const RANGES = ['all', 'IMPERIAL', 'MONARCH', 'ELITE', 'DUTEX'];

  const filtered = CATALOGS.filter(cat => {
    const matchRange = activeRange === 'all' || cat.tag === activeRange;
    const matchSearch = cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRange && matchSearch;
  });

  return (
    <div className="section-padding animate-fade" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <style>{`
        .catalog-card-hover:hover {
          box-shadow: 0 16px 48px rgba(0,0,0,0.16) !important;
          transform: translateY(-6px) !important;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .catalog-header-anim { animation: slideDown 0.6s ease both; }
      `}</style>

      <div className="container">

        {/* Header */}
        <div className="section-title-wrapper catalog-header-anim" style={{ marginBottom: '40px' }}>
          <span className="section-subtitle">Awantika & Aaradhya Group</span>
          <h2 className="section-title">Product <span>E-Catalogs</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0', fontSize: '14px' }}>
            Click any catalog card to open its official PDF brochure instantly. Detailed specs, shade cards, and application guides for every product.
          </p>
        </div>

        {/* Filter + Search Row */}
        <div style={{
          backgroundColor: 'var(--bg-white)', padding: '18px 22px',
          borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          border: '1px solid var(--border-color)', marginBottom: '36px',
          display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {RANGES.map(range => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                style={{
                  padding: '8px 18px', borderRadius: '20px', fontWeight: '700', fontSize: '12px', cursor: 'pointer',
                  backgroundColor: activeRange === range ? (TAG_COLORS[range] || 'var(--primary)') : 'transparent',
                  color: activeRange === range ? 'white' : 'var(--text-dark)',
                  border: `2px solid ${activeRange === range ? (TAG_COLORS[range] || 'var(--primary)') : 'var(--border-color)'}`,
                  transition: 'all 0.2s', textTransform: range === 'all' ? 'capitalize' : 'uppercase', letterSpacing: range === 'all' ? '0' : '0.5px'
                }}
              >
                {range === 'all' ? 'All Catalogs' : range}
              </button>
            ))}
          </div>
          <div style={{ position: 'relative', width: '100%', maxWidth: '260px' }}>
            <input
              type="text"
              placeholder="Search catalogs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '9px 14px 9px 38px',
                borderRadius: '20px', border: '1px solid var(--border-color)',
                fontSize: '13px', backgroundColor: 'var(--bg-primary)', outline: 'none', boxSizing: 'border-box'
              }}
            />
            <Search size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Count indicator */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
            Showing <strong style={{ color: 'var(--text-dark)' }}>{filtered.length}</strong> of {CATALOGS.length} catalogs
          </span>
          {activeRange !== 'all' && (
            <span style={{
              backgroundColor: TAG_COLORS[activeRange], color: 'white',
              fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase'
            }}>{activeRange} Range</span>
          )}
        </div>

        {/* Catalog Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '26px', marginBottom: '50px'
        }}>
          {filtered.map((cat, i) => (
            <CatalogCard key={cat.id} catalog={cat} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <BookOpen size={40} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>No catalogs found.</p>
          </div>
        )}

        {/* Bottom Info Note */}
        <div style={{
          backgroundColor: 'var(--bg-white)', padding: '24px 28px', borderRadius: '16px',
          border: '1px solid var(--border-color)', display: 'flex', gap: '16px', alignItems: 'center'
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Download size={20} color="white" />
          </div>
          <div>
            <strong style={{ fontSize: '14px', color: 'var(--text-dark)' }}>All catalogs open instantly in a new tab</strong>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '3px', lineHeight: '1.4' }}>
              No sign-up or download needed. Click any card to view the complete product PDF — shade cards, specs, and application guides included.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
