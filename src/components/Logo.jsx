import React, { useState } from 'react';

export default function Logo({ showText = true, className = "", style = {} }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', ...style }}>
      
      {!imgFailed ? (
        // Premium wrapper that crops the outer black corners and reduces white borders
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '11px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          backgroundColor: '#ffffff',
          flexShrink: 0
        }}>
          <img 
            src="/src/assets/logo.png" 
            alt="Dutex Texture Logo" 
            onError={() => setImgFailed(true)}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.28)', // Zoom in slightly to push out black corners and excess white margins
              transformOrigin: 'center'
            }}
          />
        </div>
      ) : (
        // High-quality vector SVG fallback replica
        <svg 
          width="54" 
          height="54" 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          {/* Paint Swash (Beige Texture Blob) in Background */}
          <path 
            d="M48 35C40 38 41.5 54 44 60C46.5 66 52 70 59 70C66 70 68 64 68 56C68 48 64 45.5 61 41C58 36.5 56 32 48 35Z" 
            fill="#EADCC9" 
            opacity="0.85" 
          />
          
          {/* Olive Green Brush Stroke L-Shape */}
          <path 
            d="M35 31C35 48 34 53 36 60C38 67 43 72 50 72C57 72 65 72.5 68 72.5" 
            stroke="#5C6742" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Terracotta/Rust Roof Structure */}
          <path 
            d="M20 33L50 14L80 33" 
            stroke="#A94E1D" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Support Beams */}
          <line x1="37.5" y1="23" x2="37.5" y2="30" stroke="#A94E1D" strokeWidth="3" strokeLinecap="round" />
          <line x1="73.5" y1="23" x2="73.5" y2="36" stroke="#A94E1D" strokeWidth="3" strokeLinecap="round" />
          
          {/* Four-pane window */}
          <g stroke="#A94E1D" strokeWidth="2.5" fill="none">
            <rect x="47.5" y="22.5" width="5" height="5" />
            <rect x="47.5" y="27.5" width="5" height="5" />
            <rect x="52.5" y="22.5" width="5" height="5" />
            <rect x="52.5" y="27.5" width="5" height="5" />
          </g>
        </svg>
      )}

      {/* Brand Text - Shown only when SVG is active */}
      {showText && imgFailed && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ 
            fontFamily: 'var(--font-heading)', 
            fontWeight: '900', 
            fontSize: '28px', 
            color: 'var(--primary)',
            letterSpacing: '-0.5px'
          }}>
            Dutex
          </span>
          <span style={{ 
            fontFamily: 'var(--font-sans)', 
            fontWeight: '600', 
            fontSize: '11px', 
            color: 'var(--secondary)', 
            letterSpacing: '4.5px',
            textTransform: 'uppercase',
            marginTop: '-2px',
            paddingLeft: '2px'
          }}>
            Texture
          </span>
        </div>
      )}
    </div>
  );
}
