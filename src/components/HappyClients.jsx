import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT TESTIMONIAL DATA
// ─────────────────────────────────────────────────────────────────────────────

const CLIENTS = [
  {
    id: 0,
    name: 'Priya Sharma',
    city: 'Ahmedabad, Gujarat',
    project: 'Full Home Interior',
    rating: 5,
    color: '#5C6742',
    quote: '"Bilkul soch bhi nahi sakti thi ki sirf paint se itna farak pad sakta hai. Dutex ne humara living room ekdum naya kar diya — texture finish ne toh kuch aur hi level pe le gaya! Poore mohalle mein sabse sundar ghar ab hamara hai."',
    tag: 'Texture Finish',
    avatar: 'PS',
    bgGradient: 'linear-gradient(145deg, #3a4228 0%, #5C6742 100%)',
  },
  {
    id: 1,
    name: 'Rajesh Patel',
    city: 'Ahmedabad, Gujarat',
    project: '3BHK Flat Renovation',
    rating: 5,
    color: '#A94E1D',
    quote: '"Meri wife ka sapna tha ki ghar ka colour perfect ho. Dutex ke dealers ne bahut ache se guide kiya — sahi shade select karne se lekar smooth finish tak. Quality mein koi compromise nahi, aur price bhi bahut reasonable thi. 100% recommended!"',
    tag: 'Exterior Coat',
    avatar: 'RP',
    bgGradient: 'linear-gradient(145deg, #6b2e0d 0%, #A94E1D 100%)',
  },
  {
    id: 2,
    name: 'Kavitha Nair',
    city: 'Bangalore, Karnataka',
    project: 'Villa Painting Project',
    rating: 5,
    color: '#2E5244',
    quote: '"We tried multiple brands before, but Dutex stood apart in every single way. The Sandstone finish on our feature wall looks so real you want to touch it! Neighbours keep asking which brand we used. Absolutely premium quality at a fair price."',
    tag: 'Sandstone Finish',
    avatar: 'KN',
    bgGradient: 'linear-gradient(145deg, #1a3028 0%, #2E5244 100%)',
  },
  {
    id: 3,
    name: 'Suresh Gupta',
    city: 'New Delhi',
    project: 'Office & Showroom',
    rating: 5,
    color: '#C4974A',
    quote: '"Hamara showroom ab ek luxury boutique jaisa lagta hai. Dutex ka Metallic Pearl finish customers ko pehli nazar mein impress karta hai. Har visitor puchta hai ki interior designer kaun hai — hum bolte hain Dutex! Business bhi badh gaya!"',
    tag: 'Metallic Pearl',
    avatar: 'SG',
    bgGradient: 'linear-gradient(145deg, #7a5a25 0%, #C4974A 100%)',
  },
  {
    id: 4,
    name: 'Anita Mehta',
    city: 'Pune, Maharashtra',
    project: 'Bedroom & Kids Room',
    rating: 5,
    color: '#9C6F6D',
    quote: '"Bacchon ke room ke liye safe aur healthy paint chahiye thi. Dutex ka low-VOC formula bilkul perfect hai — koi smell nahi, koi irritation nahi. 6 mahine ho gaye, abhi bhi ekdum fresh aur vibrant dikhta hai!"',
    tag: 'Low-VOC Interior',
    avatar: 'AM',
    bgGradient: 'linear-gradient(145deg, #5e3f3e 0%, #9C6F6D 100%)',
  },
];

const STATS = [
  { num: '1,200+', label: 'Happy Families' },
  { num: '18+',   label: 'Years of Excellence' },
  { num: '50+',   label: 'Cities Covered' },
  { num: '4.9',   label: 'Average Rating ★' },
];

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f5c842', fontSize: '15px', lineHeight: 1 }}>★</span>
      ))}
    </div>
  );
}

// ─── Large featured video card ───────────────────────────────────────────────
function FeaturedVideoCard({ client, animating }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '380px',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: client.bgGradient,
        boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`,
        opacity: animating ? 0 : 1,
        transform: animating ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.32s ease, transform 0.32s ease',
      }}
    >
      {/* Noise / film grain texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      {/* Decorative light rays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      {/* Room silhouette lines (decorative interior lines) */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.08, pointerEvents: 'none' }}>
        {/* Floor line */}
        <div style={{ position: 'absolute', bottom: '28%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.8)' }} />
        {/* Left wall vanishing line */}
        <div style={{ position: 'absolute', bottom: '28%', top: 0, left: '18%', width: '1px', background: 'rgba(255,255,255,0.6)', transform: 'skewX(-8deg)' }} />
        {/* Right wall vanishing line */}
        <div style={{ position: 'absolute', bottom: '28%', top: 0, right: '18%', width: '1px', background: 'rgba(255,255,255,0.6)', transform: 'skewX(8deg)' }} />
        {/* Window on left wall */}
        <div style={{ position: 'absolute', top: '15%', left: '5%', width: '10%', height: '25%', border: '1px solid rgba(255,255,255,0.5)' }} />
        {/* Art on main wall */}
        <div style={{ position: 'absolute', top: '20%', left: '35%', right: '35%', height: '28%', border: '1px solid rgba(255,255,255,0.4)' }} />
        {/* Sofa silhouette */}
        <div style={{ position: 'absolute', bottom: '28%', left: '25%', right: '25%', height: '12%', background: 'rgba(0,0,0,0.15)', borderRadius: '6px 6px 0 0' }} />
      </div>

      {/* Tag badge — top left */}
      <div style={{
        position: 'absolute', top: '16px', left: '16px', zIndex: 4,
        background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: '50px',
        padding: '5px 14px',
        fontSize: '10.5px',
        fontWeight: '700',
        color: 'white',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
      }}>
        {client.tag}
      </div>

      {/* Video duration badge — top right */}
      <div style={{
        position: 'absolute', top: '16px', right: '16px', zIndex: 4,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '6px',
        padding: '3px 9px',
        fontSize: '11px',
        fontWeight: '700',
        color: 'white',
        letterSpacing: '0.5px',
        fontVariantNumeric: 'tabular-nums',
      }}>
        1:24
      </div>

      {/* Center: Person avatar + Play button */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -58%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        zIndex: 3,
      }}>
        {/* Avatar circle */}
        <div style={{
          width: '72px', height: '72px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '2px solid rgba(255,255,255,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', fontWeight: '900', color: 'white',
          letterSpacing: '1px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        }}>
          {client.avatar}
        </div>

        {/* Play button */}
        <div style={{
          width: hovered ? '72px' : '64px',
          height: hovered ? '72px' : '64px',
          borderRadius: '50%',
          background: hovered ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 8px rgba(255,255,255,0.12)`,
          transition: 'all 0.25s ease',
          cursor: 'pointer',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={client.color} style={{ marginLeft: '3px' }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>

      {/* Bottom gradient + name */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.82))',
        padding: '48px 22px 22px',
        zIndex: 3,
      }}>
        <p style={{
          color: 'white', fontWeight: '800',
          fontSize: '16px', marginBottom: '4px',
          textShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}>{client.name}</p>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '12px',
        }}>{client.city}</p>
      </div>
    </div>
  );
}

// ─── Small thumbnail card ─────────────────────────────────────────────────────
function ThumbCard({ client, isActive, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = isActive || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        width: '148px',
        height: '200px',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: client.bgGradient,
        border: isActive ? `2px solid ${client.color}` : '2px solid transparent',
        transition: 'all 0.28s ease',
        transform: active ? 'translateY(-5px) scale(1.03)' : 'scale(1)',
        boxShadow: isActive
          ? `0 16px 40px rgba(0,0,0,0.45), 0 0 0 1px ${client.color}40`
          : '0 6px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Light ray */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Room lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.07, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', bottom: '30%', left: 0, right: 0, height: '1px', background: 'white' }} />
        <div style={{ position: 'absolute', bottom: '30%', top: 0, left: '22%', width: '1px', background: 'white', transform: 'skewX(-6deg)' }} />
        <div style={{ position: 'absolute', bottom: '30%', top: 0, right: '22%', width: '1px', background: 'white', transform: 'skewX(6deg)' }} />
      </div>

      {/* Tag badge */}
      <div style={{
        position: 'absolute', top: '9px', left: '9px',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '20px',
        padding: '2px 9px',
        fontSize: '8.5px',
        fontWeight: '700',
        color: 'white',
        letterSpacing: '0.5px',
        textTransform: 'uppercase',
      }}>
        {client.tag}
      </div>

      {/* Avatar + play */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -58%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '10px',
      }}>
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(6px)',
          border: '1.5px solid rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: '800', color: 'white',
        }}>
          {client.avatar}
        </div>
        <div style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.35), 0 0 0 5px rgba(255,255,255,0.1)',
          transition: 'transform 0.2s ease',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill={client.color} style={{ marginLeft: '2px' }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div style={{
          position: 'absolute', top: '9px', right: '9px',
          width: '7px', height: '7px',
          borderRadius: '50%',
          background: client.color,
          boxShadow: `0 0 10px ${client.color}`,
          animation: 'hcPulse 2s ease-in-out infinite',
        }} />
      )}

      {/* Name at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.78))',
        padding: '28px 12px 12px',
      }}>
        <p style={{
          color: 'white', fontWeight: '800',
          fontSize: '11.5px', marginBottom: '2px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{client.name}</p>
        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: '9.5px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{client.city}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function HappyClients() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const active = CLIENTS[activeIdx];

  const goTo = (idx) => {
    if (animating || idx === activeIdx) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CLIENTS.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = (idx) => {
    clearInterval(timerRef.current);
    goTo(idx);
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CLIENTS.length);
    }, 5500);
  };

  return (
    <section
      id="happy-clients"
      style={{
        background: 'linear-gradient(160deg, #0f1a12 0%, #1a2a1a 50%, #111a0e 100%)',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: `radial-gradient(circle, ${active.color}1e 0%, transparent 65%)`,
        transition: 'background 0.6s ease', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-40px',
        width: '380px', height: '380px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(92,103,66,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* ── HEADING ROW ── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '52px',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div>
            <span style={{
              fontSize: '11px', fontWeight: '800',
              textTransform: 'uppercase', letterSpacing: '2px',
              color: active.color, display: 'block', marginBottom: '12px',
              transition: 'color 0.4s ease',
            }}>
              ★ Verified Customer Reviews
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: '900', lineHeight: 1.15,
              color: 'white',
            }}>
              Voices from<br />
              <span style={{ color: active.color, transition: 'color 0.4s ease' }}>
                Real Homes
              </span>
            </h2>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  fontWeight: '900',
                  color: 'white',
                  lineHeight: 1,
                  marginBottom: '5px',
                }}>{s.num}</p>
                <p style={{
                  fontSize: '10.5px', fontWeight: '600',
                  color: 'rgba(255,255,255,0.45)',
                  textTransform: 'uppercase', letterSpacing: '0.8px',
                }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT: VIDEO CARD + QUOTE ── */}
        <div
          className="hc-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px',
            marginBottom: '24px',
            minHeight: '380px',
          }}
        >
          {/* LEFT: Featured video card */}
          <FeaturedVideoCard client={active} animating={animating} />

          {/* RIGHT: Quote panel */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '22px',
            padding: '8px 0',
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}>

            {/* Giant quote mark */}
            <div style={{
              fontSize: '96px',
              lineHeight: 0.75,
              color: active.color,
              fontFamily: 'Georgia, serif',
              fontWeight: '900',
              opacity: 0.55,
              transition: 'color 0.4s ease',
              userSelect: 'none',
            }}>"</div>

            {/* Quote text */}
            <p style={{
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.78,
              fontStyle: 'italic',
              fontWeight: '400',
              marginTop: '-12px',
            }}>
              {active.quote}
            </p>

            {/* Accent divider */}
            <div style={{
              width: '50px', height: '3px',
              background: active.color,
              borderRadius: '2px',
              transition: 'background 0.4s ease',
            }} />

            {/* Customer info row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '52px', height: '52px',
                borderRadius: '50%',
                background: active.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', fontWeight: '900', color: 'white',
                flexShrink: 0,
                boxShadow: `0 4px 20px ${active.color}55`,
                transition: 'background 0.4s ease, box-shadow 0.4s ease',
              }}>
                {active.avatar}
              </div>

              <div>
                <strong style={{ color: 'white', fontSize: '16px', display: 'block', marginBottom: '3px' }}>
                  {active.name}
                </strong>
                <span style={{ color: 'rgba(255,255,255,0.48)', fontSize: '12px' }}>
                  {active.city}&nbsp;·&nbsp;{active.project}
                </span>
              </div>

              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <Stars count={active.rating} />
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '10px', marginTop: '3px' }}>
                  Verified ✓
                </p>
              </div>
            </div>

            {/* Navigation dots */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              {CLIENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => resetTimer(i)}
                  style={{
                    width: i === activeIdx ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === activeIdx ? active.color : 'rgba(255,255,255,0.22)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── THUMBNAIL ROW ── */}
        <div style={{
          display: 'flex',
          gap: '14px',
          overflowX: 'auto',
          paddingBottom: '12px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {CLIENTS.map((client, i) => (
            <ThumbCard
              key={client.id}
              client={client}
              isActive={i === activeIdx}
              onClick={() => resetTimer(i)}
            />
          ))}
        </div>

      </div>

      {/* Responsive + animations */}
      <style>{`
        @keyframes hcPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        #happy-clients .hc-main-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 820px) {
          #happy-clients .hc-main-grid {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          #happy-clients .hc-main-grid > div:first-child {
            min-height: 280px !important;
          }
        }
        #happy-clients ::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
