import React, { useState } from 'react';
import aaLogo from '../assets/aa_paints_logo.jpg';

export default function Logo({ showText = true, className = "", style = {} }) {
  const [imgFailed, setImgFailed] = useState(false);

  // Navbar: compact height; Footer (showText=true used as size hint): slightly taller
  const logoHeight = showText ? '72px' : '56px';

  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', ...style }}>
      
      {!imgFailed ? (
        <img
          src={aaLogo}
          alt="Awantika Aradhya Paints Logo"
          onError={() => setImgFailed(true)}
          style={{
            height: logoHeight,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
          }}
        />
      ) : (
        /* Fallback: text-only brand mark */
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: '900',
            fontSize: '22px',
            color: 'var(--primary)',
            letterSpacing: '-0.5px'
          }}>
            Awantika Aradhya
          </span>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: '700',
            fontSize: '11px',
            color: '#B8860B',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginTop: '1px',
          }}>
            Paints
          </span>
        </div>
      )}
    </div>
  );
}
