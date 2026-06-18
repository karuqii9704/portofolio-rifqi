/* ================================================================
   morph-bg.js — Animated background:
   • 3 blobs that continuously MORPH in place (soft radial fills,
     no hard edges / seams).
   • 2 drifter shapes that TRAVEL across the viewport (Lissajous).
   Time-driven rAF loop; lives in its own fixed layer.
   ================================================================ */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* 8 anchor points per keyframe [nx, ny] ≈ [-1, 1], clockwise from top. */
  const FRAMES = [
    [ [0,-0.70],[0.50,-0.50],[0.70,0],[0.50,0.50],[0,0.70],[-0.50,0.50],[-0.70,0],[-0.50,-0.50] ],
    [ [0.10,-0.60],[0.45,-0.55],[0.85,0.10],[0.40,0.45],[-0.10,0.80],[-0.65,0.55],[-0.60,-0.10],[-0.45,-0.50] ],
    [ [0,-0.85],[0.45,-0.55],[0.55,0.05],[0.45,0.60],[0,0.85],[-0.45,0.60],[-0.55,-0.05],[-0.45,-0.55] ],
    [ [0.15,-0.50],[0.60,-0.45],[0.85,0.05],[0.60,0.45],[-0.15,0.55],[-0.60,0.50],[-0.85,-0.05],[-0.55,-0.45] ],
    [ [0.30,-0.65],[0.60,-0.30],[0.65,0.25],[0.35,0.60],[-0.20,0.70],[-0.55,0.45],[-0.70,-0.15],[-0.40,-0.60] ],
    [ [-0.10,-0.70],[0.50,-0.50],[0.75,-0.05],[0.50,0.55],[0.05,0.75],[-0.55,0.50],[-0.70,0.05],[-0.50,-0.50] ],
  ];

  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);

  function blend(phase) {
    const N = FRAMES.length;
    const pos = phase * N;
    const i = ((Math.floor(pos) % N) + N) % N;
    const j = (i + 1) % N;
    const t = smooth(pos - Math.floor(pos));
    const a = FRAMES[i], b = FRAMES[j];
    return a.map((p, k) => [lerp(p[0], b[k][0], t), lerp(p[1], b[k][1], t)]);
  }

  function toPath(pts, cx, cy, rx, ry) {
    const n = pts.length;
    const sp = pts.map(([x, y]) => [cx + x * rx, cy + y * ry]);
    let d = `M${sp[0][0].toFixed(1)},${sp[0][1].toFixed(1)}`;
    for (let i = 0; i < n; i++) {
      const p0 = sp[(i - 1 + n) % n], p1 = sp[i], p2 = sp[(i + 1) % n], p3 = sp[(i + 2) % n];
      const f = 1 / 6;
      d += `C${(p1[0] + (p2[0] - p0[0]) * f).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) * f).toFixed(1)} ` +
           `${(p2[0] - (p3[0] - p1[0]) * f).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) * f).toFixed(1)} ` +
           `${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d + 'Z';
  }

  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };

  // Soft radial gradient: opaque-ish core → transparent edge. No hard boundary.
  function radial(id, stopClass) {
    const g = el('radialGradient', { id, cx: '50%', cy: '50%', r: '50%' });
    g.append(
      el('stop', { offset: '0%',  class: stopClass + ' s0' }),
      el('stop', { offset: '55%', class: stopClass + ' s1' }),
      el('stop', { offset: '100%', class: stopClass + ' s2' })
    );
    return g;
  }

  const layer = document.createElement('div');
  layer.className = 'morph-layer';
  layer.setAttribute('aria-hidden', 'true');
  const svg = el('svg', { preserveAspectRatio: 'none' });
  const defs = el('defs');
  defs.append(
    radial('mg-a', 'gst-accent'),
    radial('mg-b', 'gst-gold'),
    radial('mg-c', 'gst-accent'),
    radial('mg-d1', 'gst-accent'),
    radial('mg-d2', 'gst-gold')
  );
  svg.appendChild(defs);

  const pA = el('path', { class: 'morph-a', fill: 'url(#mg-a)' });
  const pB = el('path', { class: 'morph-b', fill: 'url(#mg-b)' });
  const pC = el('path', { class: 'morph-c', fill: 'url(#mg-c)' });
  const d1 = el('circle', { class: 'drift-1', r: 1, fill: 'url(#mg-d1)' });
  const d2 = el('circle', { class: 'drift-2', r: 1, fill: 'url(#mg-d2)' });
  svg.append(pA, pB, pC, d1, d2);
  layer.appendChild(svg);
  document.body.appendChild(layer);

  /* Morphing blobs — fixed-ish anchors, soft radial fill. */
  const blobs = [
    { el: pA, cx: 0.26, cy: 0.32, rx: 0.55, ry: 0.58, period: 19000, dir:  1, dx: 0.05, dy: 0.04, off: 0.00 },
    { el: pB, cx: 0.78, cy: 0.64, rx: 0.50, ry: 0.52, period: 26000, dir: -1, dx: 0.06, dy: 0.05, off: 0.40 },
    { el: pC, cx: 0.56, cy: 0.16, rx: 0.40, ry: 0.38, period: 22000, dir:  1, dx: 0.07, dy: 0.03, off: 0.72 },
  ];

  /* Drifters — TRAVEL across the whole viewport on Lissajous curves. */
  const drifters = [
    { el: d1, r: 0.30, ax: 0.42, ay: 0.40, fx: 0.00017, fy: 0.00023, px: 0,    py: 1.7 },
    { el: d2, r: 0.24, ax: 0.40, ay: 0.44, fx: 0.00021, fy: 0.00015, px: 2.1,  py: 0.6 },
  ];

  let W = innerWidth, H = innerHeight;
  addEventListener('resize', () => { W = innerWidth; H = innerHeight; }, { passive: true });

  let scrollPhase = 0;
  addEventListener('scroll', () => {
    const max = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    scrollPhase = scrollY / max;
  }, { passive: true });

  let last = 0, running = true;
  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    if (now - last < 32) return; // ~30fps
    last = now;

    const S = Math.min(W, H);

    for (const b of blobs) {
      const phase = (now / b.period) * b.dir + b.off + scrollPhase * 0.4;
      const pts = blend(((phase % 1) + 1) % 1);
      const dt = now / (b.period * 1.6);
      const cx = (b.cx + Math.sin(dt + b.off * 6.28) * b.dx) * W;
      const cy = (b.cy + Math.cos(dt * 1.2 + b.off * 6.28) * b.dy) * H;
      b.el.setAttribute('d', toPath(pts, cx, cy, S * b.rx, S * b.ry));
    }

    for (const d of drifters) {
      const x = (0.5 + Math.sin(now * d.fx + d.px) * d.ax) * W;
      const y = (0.5 + Math.sin(now * d.fy + d.py) * d.ay) * H;
      d.el.setAttribute('cx', x.toFixed(1));
      d.el.setAttribute('cy', y.toFixed(1));
      d.el.setAttribute('r', (S * d.r).toFixed(1));
    }
  }
  requestAnimationFrame(frame);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { running = false; }
    else if (!running) { running = true; last = 0; requestAnimationFrame(frame); }
  });
})();
