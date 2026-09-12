import React from 'react';

const PausedOverlay = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      color: '#ffffff',
      textAlign: 'center',
      padding: '20px',
    }}>
      {/* Logo / Brand */}
      <div style={{
        marginBottom: '40px',
        opacity: 0.9,
      }}>
        <img
          src="/src/assets/logo.svg"
          alt="Dutex Logo"
          style={{ width: '80px', height: '80px', marginBottom: '16px', display: 'block', margin: '0 auto 16px' }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <h1 style={{
          fontSize: 'clamp(20px, 4vw, 32px)',
          fontWeight: '700',
          letterSpacing: '2px',
          color: '#e8c97e',
          margin: 0,
          textTransform: 'uppercase',
        }}>
          Dutex Paint &amp; Texture
        </h1>
      </div>

      {/* Pause Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '3px solid rgba(232, 201, 126, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px',
        background: 'rgba(232, 201, 126, 0.08)',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '10px', height: '36px', background: '#e8c97e', borderRadius: '3px' }} />
          <div style={{ width: '10px', height: '36px', background: '#e8c97e', borderRadius: '3px' }} />
        </div>
      </div>

      {/* Main Message */}
      <h2 style={{
        fontSize: 'clamp(28px, 6vw, 52px)',
        fontWeight: '800',
        margin: '0 0 16px',
        letterSpacing: '-1px',
        background: 'linear-gradient(90deg, #ffffff, #e8c97e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}>
        Website Paused
      </h2>

      <p style={{
        fontSize: 'clamp(14px, 2.5vw, 18px)',
        color: 'rgba(255,255,255,0.6)',
        maxWidth: '480px',
        lineHeight: '1.7',
        margin: '0 0 48px',
      }}>
        This website is temporarily unavailable.<br />
        It will be back online shortly.
      </p>

      {/* Divider */}
      <div style={{
        width: '60px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #e8c97e, transparent)',
        marginBottom: '32px',
      }} />

      {/* Contact */}
      <p style={{
        fontSize: '13px',
        color: 'rgba(255,255,255,0.35)',
        margin: 0,
        letterSpacing: '0.5px',
      }}>
        For enquiries, contact us directly.
      </p>
    </div>
  );
};

export default PausedOverlay;
