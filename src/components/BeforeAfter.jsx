import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div
      className="before-after-container"
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '480px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.22)',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'ew-resize'
      }}
    >
      {/* ── AFTER: AI-generated Dutex textured wall room ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <img
          src="/images/after_wall.jpg?v=2"
          alt="After: Beautiful Dutex textured wall"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
          draggable={false}
        />
        {/* Gradient overlay for text */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
        }} />
        {/* AFTER label — bottom right */}
        <div style={{
          position: 'absolute', bottom: '32px', right: '36px', zIndex: 4,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px'
        }}>
          <span style={{
            background: 'linear-gradient(90deg, #5C6742, #A94E1D)',
            color: 'white',
            padding: '6px 18px',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            ✦ After: Dutex Royal Sand Texture
          </span>
          <h3 style={{
            color: 'white',
            fontSize: '26px',
            fontWeight: '900',
            textAlign: 'right',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            lineHeight: 1.2
          }}>
            Elevate Walls into<br />Living Art
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '13px',
            maxWidth: '280px',
            textAlign: 'right',
            textShadow: '0 1px 6px rgba(0,0,0,0.4)',
            lineHeight: 1.5
          }}>
            Rich, touchable sand-textured finish that resists moisture and maintains color depth for years.
          </p>
        </div>
      </div>

      {/* ── BEFORE: AI-generated damaged wall ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          overflow: 'hidden',
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      >
        <img
          src="/images/before_wall.jpg?v=2"
          alt="Before: Damaged, peeling wall"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block'
          }}
          draggable={false}
        />
        {/* Gradient overlay for text */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
        }} />
        {/* BEFORE label — bottom left */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '36px', zIndex: 4,
          display: 'flex', flexDirection: 'column', gap: '10px'
        }}>
          <span style={{
            background: 'rgba(60,60,55,0.92)',
            color: 'white',
            padding: '6px 18px',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            display: 'inline-block',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            Before: Dull, Faded &amp; Damaged
          </span>
          <h3 style={{
            color: 'white',
            fontSize: '26px',
            fontWeight: '900',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            lineHeight: 1.2
          }}>
            Restricted,<br />Lifeless Spaces
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '13px',
            maxWidth: '240px',
            textShadow: '0 1px 6px rgba(0,0,0,0.5)',
            lineHeight: 1.5
          }}>
            Walls showing paint peeling, damp patches, cracks, and uneven fading.
          </p>
        </div>
      </div>

      {/* ── DRAG HANDLE BAR ── */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: `${sliderPosition}%`,
          width: '3px',
          background: 'white',
          zIndex: 5,
          transform: 'translateX(-1.5px)',
          boxShadow: '0 0 24px rgba(255,255,255,0.7)',
          pointerEvents: 'none'
        }}
      >
        {/* Round drag button */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '52px', height: '52px',
          borderRadius: '50%',
          background: 'white',
          border: '3px solid var(--primary)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'ew-resize'
        }}>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ border: 'solid var(--primary)', borderWidth: '0 2.5px 2.5px 0', display: 'inline-block', padding: '3.5px', transform: 'rotate(135deg)' }} />
            <span style={{ border: 'solid var(--primary)', borderWidth: '0 2.5px 2.5px 0', display: 'inline-block', padding: '3.5px', transform: 'rotate(-45deg)' }} />
          </div>
        </div>

        {/* DRAG label tab */}
        <div style={{
          position: 'absolute', top: '22px', left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--primary)', color: 'white',
          fontSize: '10px', fontWeight: '800', padding: '4px 10px',
          borderRadius: '6px', whiteSpace: 'nowrap', letterSpacing: '1px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>DRAG</div>
      </div>
    </div>
  );
}
