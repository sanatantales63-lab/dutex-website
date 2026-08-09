import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSIONAL Wall Visualizer v4 — FINAL
//
// Two-layer masking for pixel-perfect wall painting:
//   Layer 1 — POLYGON BOUNDARY: Defines the geometric wall boundary.
//             Curtains, window, ceiling, fan are physically outside.
//   Layer 2 — PER-PIXEL VERIFICATION: Within the polygon, each pixel is
//             checked for brightness + color neutrality. Only pixels that
//             are BOTH bright AND neutral (= wall) get painted. Furniture
//             (sofa, plants, blankets, wood, etc.) is automatically excluded.
//
// Rendering uses a multiply-like formula that preserves the room's natural
// lighting — shadows, gradients, and ambient light remain intact.
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = [
  {
    id: 'original',
    name: 'Original White',
    hex: '#F5F2ED',
    label: 'As-Is Room',
    desc: 'The room in its original state — no paint applied.',
  },
  {
    id: 'olive',
    name: 'Dutex Olive',
    hex: '#6B7A4E',
    label: 'Natural & Fresh',
    desc: 'Inspired by nature, ideal for feature walls and study rooms.',
  },
  {
    id: 'terracotta',
    name: 'Royal Terracotta',
    hex: '#A94E1D',
    label: 'Warm & Earthy',
    desc: 'A rich clay shade that brings grounding energy to any space.',
  },
  {
    id: 'gold',
    name: 'Sand Gold',
    hex: '#C4974A',
    label: 'Regal & Golden',
    desc: 'Elegant warm gold that adds a luxurious, reflective quality.',
  },
  {
    id: 'beige',
    name: 'Vintage Beige',
    hex: '#D9CDB4',
    label: 'Soft & Elegant',
    desc: 'A soft off-white base that complements any interior texture.',
  },
  {
    id: 'ocean',
    name: 'Ocean Spruce',
    hex: '#2E5244',
    label: 'Bold & Moody',
    desc: 'Deep teal-forest green for a cozy, bold environment.',
  },
  {
    id: 'rose',
    name: 'Dusty Rose',
    hex: '#9C6F6D',
    label: 'Romantic & Warm',
    desc: 'Muted clay-pink that pairs beautifully with brass accents.',
  },
  {
    id: 'mustard',
    name: 'Warm Mustard',
    hex: '#B89240',
    label: 'Vibrant & Sunny',
    desc: 'A creative accent that stimulates light, warmth, and joy.',
  },
];

const TEXTURES = [
  {
    id: 'flat',
    name: 'Premium Flat',
    icon: '◼',
    desc: 'Smooth matte, zero sheen',
    textureImage: null,
    blendOpacity: 0,
  },
  {
    id: 'sandstone',
    name: 'Sandstone Grain',
    icon: '▤',
    desc: 'Fine gritty rustic matte',
    textureImage: '/images/tex_sandstone.jpg',
    blendOpacity: 0.28,
  },
  {
    id: 'stucco',
    name: 'Stucco Swirl',
    icon: '◈',
    desc: 'Hand-troweled plaster',
    textureImage: '/images/tex_stucco.jpg',
    blendOpacity: 0.28,
  },
  {
    id: 'metallic',
    name: 'Metallic Pearl',
    icon: '✦',
    desc: 'Pearlescent shimmer',
    textureImage: '/images/tex_metallic.png',
    blendOpacity: 0.20,
  },
];

const BASE_IMAGE = '/images/viz_base.jpg';

// ─── WALL POLYGON COORDINATES ────────────────────────────────────────────────
// Traced from viz_base.jpg. Normalized (0-1). These define the GEOMETRIC
// boundary — only pixels INSIDE these shapes can possibly be painted.
// Curtains, window, ceiling, fan are all outside these shapes.
//
// The back wall polygon has its top edge set below the ceiling fan (~7.5%)
// so the fan is automatically excluded. A small blur softens this edge.
// ─────────────────────────────────────────────────────────────────────────────

const WALL_POLYGONS = [
  // BACK WALL — the main feature wall behind the sofa
  // Top edge is at y≈7.5% (below ceiling fan blades which end at ~7%)
  // Left edge at x≈25.8% (corner where left wall meets back wall)
  // Right edge at x≈99.5% (right edge of image)
  // Bottom at y≈78% (baseboard)
  {
    points: [
      [0.258, 0.075],   // top-left: corner below fan
      [0.995, 0.067],   // top-right: below fan at right edge
      [0.995, 0.785],   // bottom-right: baseboard
      [0.258, 0.768],   // bottom-left: baseboard at corner
    ],
  },
  // LEFT WALL — small strip with geometric art print
  // Only x=0.5% to 6.5% (stops well before curtain drapes at ~8%)
  // Top at y≈7.8% (below curtain rod), bottom at y≈48%
  {
    points: [
      [0.005, 0.078],   // top-left
      [0.065, 0.080],   // top-right (before curtain)
      [0.065, 0.480],   // bottom-right (above sofa arm)
      [0.005, 0.455],   // bottom-left
    ],
  },
];


// ─── Utilities ───────────────────────────────────────────────────────────────

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// O(w×h) separable box blur — fast regardless of radius
function boxBlur(src, w, h, r) {
  const temp = new Float32Array(w * h);
  const out  = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const row = y * w;
    let sum = 0, cnt = 0;
    for (let x = 0; x <= r && x < w; x++) { sum += src[row + x]; cnt++; }
    for (let x = 0; x < w; x++) {
      temp[row + x] = sum / cnt;
      if (x + r + 1 < w) { sum += src[row + x + r + 1]; cnt++; }
      if (x - r >= 0) { sum -= src[row + x - r]; cnt--; }
    }
  }
  for (let x = 0; x < w; x++) {
    let sum = 0, cnt = 0;
    for (let y = 0; y <= r && y < h; y++) { sum += temp[y * w + x]; cnt++; }
    for (let y = 0; y < h; y++) {
      out[y * w + x] = sum / cnt;
      if (y + r + 1 < h) { sum += temp[(y + r + 1) * w + x]; cnt++; }
      if (y - r >= 0) { sum -= temp[(y - r) * w + x]; cnt--; }
    }
  }
  return out;
}


// ─── POLYGON MASK CREATION ───────────────────────────────────────────────────
// Draws wall polygons on an offscreen canvas, reads back as a Float32 mask,
// and applies a small blur for anti-aliased, smooth edges.
// Returns Float32Array[w*h] with values 0..1.
// ─────────────────────────────────────────────────────────────────────────────

function createPolygonMask(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#fff';
  for (const poly of WALL_POLYGONS) {
    ctx.beginPath();
    ctx.moveTo(poly.points[0][0] * w, poly.points[0][1] * h);
    for (let i = 1; i < poly.points.length; i++) {
      ctx.lineTo(poly.points[i][0] * w, poly.points[i][1] * h);
    }
    ctx.closePath();
    ctx.fill();
  }

  const data = ctx.getImageData(0, 0, w, h).data;
  const raw = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    raw[i] = data[i * 4] / 255; // R channel → 0 or 1
  }

  // Blur for soft edges (radius 2 = ~4px transition zone)
  return boxBlur(raw, w, h, 2);
}


// ─── WALL PAINT RENDERER ─────────────────────────────────────────────────────
// Per-pixel rendering with TWO-LAYER masking:
//   1. polyMask[i] — is the pixel within the wall polygon? (0..1)
//   2. brightBlend × neutBlend — is the pixel actually wall material? (0..1)
//      • brightBlend: bright pixels (wall) → 1.0, dark (furniture) → 0.0
//      • neutBlend: neutral/achromatic → 1.0, colored objects → 0.0
//
// Final blend = polyMask × brightBlend × neutBlend
// → Only bright, neutral pixels INSIDE the polygon get painted.
// → Furniture, plants, throw blankets, sofa = automatically skipped.
// ─────────────────────────────────────────────────────────────────────────────

function renderWallPaint(ctx, baseData, polyMask, w, h, colorHex, texData, texBlend) {
  const cr = parseInt(colorHex.slice(1, 3), 16);
  const cg = parseInt(colorHex.slice(3, 5), 16);
  const cb = parseInt(colorHex.slice(5, 7), 16);

  const src = baseData.data;
  const out = new Uint8ClampedArray(src.length);
  out.set(src); // copy base

  const hasTex = texData != null && texBlend > 0;
  const tw = hasTex ? texData.width : 0;
  const th = hasTex ? texData.height : 0;
  const td = hasTex ? texData.data : null;

  for (let i = 0; i < w * h; i++) {
    const pa = polyMask[i]; // polygon alpha
    if (pa < 0.005) continue; // outside polygon — skip

    const idx = i << 2; // i * 4
    const r = src[idx], g = src[idx + 1], b = src[idx + 2];

    // ── Luminance (perceived brightness) ──
    const lum = (r * 55 + g * 183 + b * 18) >> 8; // fast approx of 0.2126r + 0.7152g + 0.0722b, result 0-255
    const lumN = lum / 255; // normalized 0..1

    // ── BRIGHTNESS BLEND ──
    // Wall pixels: lum > ~190 (lum/255 > 0.745) → full blend
    // Furniture:   lum < ~145 (lum/255 < 0.569) → zero blend
    // Transition zone between these → smooth ramp
    //
    // Verified for viz_base.jpg:
    //   White wall bright: lum≈242 → blend=1.0
    //   Wall shadow:       lum≈197 → blend=1.0
    //   Gray sofa:         lum≈145 → blend=0.0
    //   Dark wood:         lum≈80  → blend=0.0
    let bBlend;
    if (lum > 190) bBlend = 1.0;
    else if (lum < 145) bBlend = 0.0;
    else bBlend = (lum - 145) / 45;

    if (bBlend < 0.01) continue; // definitely not wall

    // ── COLOR NEUTRALITY BLEND ──
    // Wall pixels are achromatic (R ≈ G ≈ B), so max-min is small.
    // Colored objects (plants, pillows, throw) have large max-min.
    //
    // Verified:
    //   Wall:          range≈10  → blend=1.0
    //   Throw blanket: range≈25  → blend=0.19 (barely painted, fades to 0)
    //   Blue pillow:   range≈60  → blend=0.0
    //   Green plant:   range≈70  → blend=0.0
    //   Wood floor:    range≈90  → blend=0.0
    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const range = maxC - minC;

    let nBlend;
    if (range < 12) nBlend = 1.0;
    else if (range > 28) nBlend = 0.0;
    else nBlend = (28 - range) / 16;

    if (nBlend < 0.01) continue;

    // ── COMBINED BLEND FACTOR ──
    const blend = pa * bBlend * nBlend;
    if (blend < 0.01) continue;

    // ── PAINT COLOR APPLICATION ──
    // Multiply-like: paint color × original brightness
    // This preserves the room's natural lighting, shadows, and gradients.
    // Small lift prevents extreme darkening in deep shadow areas.
    const adj = lumN * 0.88 + 0.12;
    let pR = cr * adj;
    let pG = cg * adj;
    let pB = cb * adj;

    // ── TEXTURE OVERLAY ──
    if (hasTex) {
      const x = i % w, y = (i / w) | 0;
      // Mirror-tile for seamless repeats
      let tx = x % (tw << 1); // x % (tw*2)
      let ty = y % (th << 1);
      if (tx >= tw) tx = (tw << 1) - 1 - tx;
      if (ty >= th) ty = (th << 1) - 1 - ty;
      const ti = (ty * tw + tx) << 2;
      // Texture detail as bump-map lighting
      const tLum = (td[ti] * 55 + td[ti + 1] * 183 + td[ti + 2] * 18) >> 8;
      const detail = (tLum / 255 - 0.5) * 2; // -1..+1
      const mod = 1 + detail * texBlend * 0.6;
      pR *= mod;
      pG *= mod;
      pB *= mod;
    }

    // Clamp
    if (pR > 255) pR = 255; else if (pR < 0) pR = 0;
    if (pG > 255) pG = 255; else if (pG < 0) pG = 0;
    if (pB > 255) pB = 255; else if (pB < 0) pB = 0;

    // ── ALPHA BLEND with original pixel ──
    out[idx]     = (r + (pR - r) * blend + 0.5) | 0;
    out[idx + 1] = (g + (pG - g) * blend + 0.5) | 0;
    out[idx + 2] = (b + (pB - b) * blend + 0.5) | 0;
    // Alpha stays at 255
  }

  ctx.putImageData(new ImageData(out, w, h), 0, 0);
}


// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Visualizer() {
  const [selColor, setSelColor] = useState(COLORS[0]);
  const [selTex, setSelTex]     = useState(TEXTURES[0]);
  const [loading, setLoading]   = useState(true);
  const [ready, setReady]       = useState(false);

  const canvasRef   = useRef(null);
  const baseImgRef  = useRef(null);
  const baseDataRef = useRef(null);
  const polyMaskRef = useRef(null);
  const texCacheRef = useRef({});
  const sizeRef     = useRef({ w: 0, h: 0 });

  // ── INIT: load base image + create polygon mask (once) ─────────────────
  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const img = await loadImage(BASE_IMAGE);
        if (dead) return;
        baseImgRef.current = img;

        // Working resolution (cap at 1200 for speed)
        const maxW = Math.min(img.naturalWidth, 1200);
        const scale = maxW / img.naturalWidth;
        const w = maxW;
        const h = Math.round(img.naturalHeight * scale);
        sizeRef.current = { w, h };

        // Get base pixel data
        const off = document.createElement('canvas');
        off.width = w; off.height = h;
        const offCtx = off.getContext('2d');
        offCtx.drawImage(img, 0, 0, w, h);
        baseDataRef.current = offCtx.getImageData(0, 0, w, h);

        // Create polygon mask
        polyMaskRef.current = createPolygonMask(w, h);

        // Setup visible canvas
        const c = canvasRef.current;
        if (c) {
          c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
        }

        setReady(true);
        setLoading(false);
      } catch (e) {
        console.error('Visualizer init failed:', e);
        setLoading(false);
      }
    })();
    return () => { dead = true; };
  }, []);

  // ── Load & cache texture data ──────────────────────────────────────────
  const getTexData = useCallback(async (src) => {
    if (texCacheRef.current[src]) return texCacheRef.current[src];
    const img = await loadImage(src);
    const ts = 400; // tile size
    const c = document.createElement('canvas');
    c.width = ts; c.height = ts;
    c.getContext('2d').drawImage(img, 0, 0, ts, ts);
    const data = c.getContext('2d').getImageData(0, 0, ts, ts);
    texCacheRef.current[src] = data;
    return data;
  }, []);

  // ── Re-render on color / texture change ────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    let dead = false;
    (async () => {
      const c = canvasRef.current;
      if (!c) return;
      const ctx = c.getContext('2d');
      const { w, h } = sizeRef.current;

      if (selColor.id === 'original') {
        ctx.drawImage(baseImgRef.current, 0, 0, w, h);
        return;
      }

      let texData = null;
      if (selTex.textureImage) {
        texData = await getTexData(selTex.textureImage);
        if (dead) return;
      }

      renderWallPaint(
        ctx,
        baseDataRef.current,
        polyMaskRef.current,
        w, h,
        selColor.hex,
        texData,
        selTex.blendOpacity,
      );
    })();
    return () => { dead = true; };
  }, [selColor, selTex, ready, getTexData]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="visualizer-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '40px',
        alignItems: 'center',
        background: 'var(--bg-white)',
        padding: '30px',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {/* ── ROOM PREVIEW ─────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
        background: '#1a1a1a',
      }}>
        {loading && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#f5f5f5',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36,
                border: '3px solid rgba(92,103,66,0.2)',
                borderTopColor: 'var(--primary)',
                borderRadius: '50%',
                animation: 'vizSpin 0.8s linear infinite',
              }} />
              <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>
                Preparing visualizer…
              </span>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />

        {/* Badge */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '5px 13px', borderRadius: 20,
          fontSize: 10, fontWeight: 800, color: '#fff',
          textTransform: 'uppercase', letterSpacing: '0.9px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ color: '#facc15', fontSize: 9 }}>✦</span>
          Real Room Visualizer
        </div>

        {/* Pill */}
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(0,0,0,0.58)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 30, padding: '8px 16px',
        }}>
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            backgroundColor: selColor.hex,
            border: '2px solid rgba(255,255,255,0.7)',
            flexShrink: 0,
            boxShadow: `0 0 8px ${selColor.hex}aa`,
          }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
            {selColor.name}
          </span>
          {selTex.id !== 'flat' && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10 }}>·</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.78)' }}>
                {selTex.name}
              </span>
            </>
          )}
        </div>
      </div>

      {/* ── CONTROLS ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <span className="section-subtitle" style={{ fontSize: 11, letterSpacing: '1.2px' }}>
            Dutex Color Visualizer
          </span>
          <h3 style={{ fontSize: 24, marginBottom: 8, marginTop: 5, lineHeight: 1.25 }}>
            See Your Wall,<br />Transformed Instantly
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: 1.65 }}>
            Pick a shade below and watch the wall color switch in a real room
            photo — just like calling the painter!
          </p>
        </div>

        {/* 01 — Color */}
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '1.2px', marginBottom: 14, color: 'var(--text-dark)',
          }}>01 &nbsp;Paint Color</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {COLORS.map(col => {
              const on = selColor.id === col.id;
              return (
                <button key={col.id} onClick={() => setSelColor(col)} title={col.name} style={{
                  width: 38, height: 38, borderRadius: '50%',
                  backgroundColor: col.hex, cursor: 'pointer',
                  border: on ? '3px solid #111' : '2px solid rgba(0,0,0,0.1)',
                  boxShadow: on ? `0 0 0 3px ${col.hex}55, 0 4px 14px rgba(0,0,0,0.2)` : '0 2px 6px rgba(0,0,0,0.1)',
                  transform: on ? 'scale(1.22)' : 'scale(1)',
                  transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
                  flexShrink: 0,
                }} />
              );
            })}
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '12px 16px',
            background: `linear-gradient(135deg, ${selColor.hex}15, ${selColor.hex}05)`,
            border: `1.5px solid ${selColor.hex}40`,
            borderRadius: 12, transition: 'all 0.3s ease',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: selColor.hex,
              border: '1px solid rgba(0,0,0,0.08)',
              flexShrink: 0, boxShadow: `0 4px 14px ${selColor.hex}60`,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ fontSize: 14, color: 'var(--text-dark)', display: 'block', marginBottom: 2 }}>
                {selColor.name}
              </strong>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 500 }}>
                {selColor.label}
              </span>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, color: selColor.hex,
              fontFamily: 'monospace', letterSpacing: '0.5px', flexShrink: 0,
            }}>
              {selColor.hex.toUpperCase()}
            </span>
          </div>
        </div>

        {/* 02 — Texture */}
        <div>
          <p style={{
            fontSize: 11, fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '1.2px', marginBottom: 12, color: 'var(--text-dark)',
          }}>02 &nbsp;Wall Finish</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {TEXTURES.map(tex => {
              const on = selTex.id === tex.id;
              return (
                <button key={tex.id} onClick={() => setSelTex(tex)} style={{
                  padding: '11px 10px', borderRadius: 12,
                  border: on ? '2px solid var(--primary)' : '1.5px solid var(--border-color)',
                  backgroundColor: on ? 'rgba(92,103,66,0.08)' : 'var(--bg-white)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.18s ease',
                  boxShadow: on ? '0 0 0 3px rgba(92,103,66,0.10)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
                    <span style={{ fontSize: 14, color: on ? 'var(--primary)' : 'var(--text-muted)' }}>
                      {tex.icon}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: on ? 'var(--primary)' : 'var(--text-dark)' }}>
                      {tex.name}
                    </span>
                  </div>
                  <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginLeft: 21, lineHeight: 1.4 }}>
                    {tex.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`@keyframes vizSpin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
