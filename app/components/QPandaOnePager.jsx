"use client";
import React, { useRef, useState, useEffect, useContext, createContext } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";


// ——— Icons (inline) ———
const IconSparkles = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z" /><path d="M5 15l.75 1.75L7.5 17.5 5.75 18.25 5 20l-.75-1.75L2.5 17.5 4.25 16.75 5 15z" /><path d="M18.5 14l.5 1.25L20.25 16l-1.25.75L18.5 18l-.5-1.25L16.75 16l1.25-.75.5-1.25z" /></svg>);
const IconZap = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>);
const IconShield = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z" /></svg>);
const IconCpu = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></svg>);
const IconRocket = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3c4 1 7 4 7 8-2 0-5 1-7 3-2 2-3 5-3 7-4 0-7-3-8-7 2 0 5-1 7-3 2-2 3-5 4-8z" /><path d="M6 18l2-2M8 20l2-2" /></svg>);

// ——— Data ———
const PLANS = [
  { id: "qubit", name: "Qubit", tagline: "Launch fast on autopilot.", price: "$9/mo", features: ["AI-managed setup", "1 vCPU • 1GB RAM", "Quantum CDN edge", "Predictive cache warmup"], badge: "Starter" },
  { id: "entangle", name: "Entangle", tagline: "Scale reliably across nodes.", price: "$29/mo", features: ["2 vCPU • 4GB RAM", "Auto failover & healing", "DDoS intelligent shield", "Staging environments"], badge: "Pro" },
  { id: "superposition", name: "Superposition", tagline: "Parallel deployments at will.", price: "$79/mo", features: ["4 vCPU • 8GB RAM", "Zero-downtime releases", "Neural edge functions", "Traffic spike autoscaling"], badge: "Scale" },
  { id: "teleport", name: "Teleport Enterprise", tagline: "Custom clusters. Infinite headroom.", price: "Talk to sales", features: ["Dedicated clusters", "SLA 99.99%", "Private regions", "SAML/SSO & SOC2"], badge: "Enterprise" },
];
const POSTS = [
  { slug: 'launch-notes', title: 'Launch Notes: Q Panda v1', date: '2025-08-01', excerpt: 'Teleport-ready deployments, predictive shield, and neural edge functions.' },
  { slug: 'edge-functions', title: 'Designing Neural Edge Functions', date: '2025-07-18', excerpt: 'How we tuned cold starts to 28ms average at the edge.' },
  { slug: 'status-architecture', title: 'How Our Status Pipeline Works', date: '2025-07-05', excerpt: 'From probes to pages—transparent reliability.' }
];

// WHMCS links (replace with real)
const WHMCS_SUPPORT_URL = "https://billing.example.com/submitticket.php";
const WHMCS_CLIENT_AREA_URL = "https://billing.example.com/clientarea.php";

// ——— Utils ———
const rand = (a, b) => Math.random() * (b - a) + a; const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function getDeepLinkPlanFromURL(s) { try { const u = new URL(s, 'https://example.com'); const h = u.hash || ''; const qp = u.searchParams.get('plan'); const fromHash = h.startsWith('#plan=') ? h.slice(6) : null; return qp || fromHash || null; } catch { return null; } }
function getRouteFromHash(hash) { const h = (hash ?? (typeof window !== 'undefined' ? window.location.hash : ''))?.replace(/^#/, ''); if (h === '/' || h === '') return { name: 'home' }; if (h.startsWith('/contact')) return { name: 'contact' }; if (h.startsWith('/status')) return { name: 'status' }; if (h.startsWith('/blog')) { const p = h.split('/'); return { name: 'blog', slug: p[2] || null }; } return { name: 'home' }; }

// ——— Error boundary ———
class ErrorBoundary extends React.Component { constructor(p) { super(p); this.state = { hasError: false, error: null }; } static getDerivedStateFromError(e) { return { hasError: true, error: e }; } componentDidCatch(e, i) { console.error('QPanda ErrorBoundary', e, i); } render() { return this.state.hasError ? (<div className="p-6 text-center text-red-200">Something went wrong.<pre className="mt-2 whitespace-pre-wrap text-xs text-red-300">{String(this.state.error)}</pre></div>) : this.props.children; } }

// ——— Headless Dialog ———
const DialogCtx = createContext({ open: false, onOpenChange: () => { }, dismissOnBackdrop: true });
function Dialog({ open, onOpenChange, dismissOnBackdrop = true, children }) { return <DialogCtx.Provider value={{ open, onOpenChange, dismissOnBackdrop }}>{children}</DialogCtx.Provider>; }
function DialogContent({ className = "", children }) {
  const { open, onOpenChange, dismissOnBackdrop } = useContext(DialogCtx);
  const ref = useRef(null); const [fxId, setFxId] = useState(0); const [playFx, setPlayFx] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => { if (typeof window === 'undefined' || !open) return; const prev = document.activeElement; const onKey = (e) => { if (e.key === 'Escape') { setPlayFx(true); setFxId(n => n + 1); setTimeout(() => { onOpenChange(false); setPlayFx(false); }, 260); } }; document.addEventListener('keydown', onKey); const prevOv = document.body.style.overflow; document.body.style.overflow = 'hidden'; setTimeout(() => { ref.current && ref.current.focus?.(); }, 0); return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOv; prev && prev.focus && prev.focus(); }; }, [open, onOpenChange]);
  
  if (typeof window === "undefined" || !mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => { if (dismissOnBackdrop) { setPlayFx(true); setFxId(n => n + 1); setTimeout(() => { onOpenChange(false); setPlayFx(false); }, 260); } }} />
          <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" className={`relative z-[101] w-[92vw] max-w-md rounded-2xl overflow-hidden ${className}`} initial={{ scale: 0.94, y: 10, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.98, y: 8, opacity: 0, filter: 'blur(6px)' }} transition={{ opacity: { duration: 0.30, ease: [0.16, 1, 0.3, 1] }, y: { duration: 0.30, ease: [0.16, 1, 0.3, 1] }, filter: { duration: 0.30, ease: [0.16, 1, 0.3, 1] }, scale: { type: "spring", stiffness: 220, damping: 26 } }} >
            <AnimatePresence initial={false}>
              {playFx && (
                <motion.div key={`fx-${fxId}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="pointer-events-none absolute inset-0 z-[102]">
                  <DisintegrateParticles />
                </motion.div>
              )}
            </AnimatePresence>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>, document.body);
}
const DialogHeader = ({ children }) => <div className="mb-3 space-y-1.5">{children}</div>;
const DialogTitle = ({ className = "", children }) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const DialogDescription = ({ className = "", children }) => <p className={`text-sm text-slate-300 ${className}`}>{children}</p>;

// ——— Simple UI ———
const Card = ({ className = "", children, ...p }) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({ className = "", children, ...p }) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({ className = "", children, ...p }) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);

// ——— Background canvas ———
function QuantumBackground2D() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return;
    let raf = 0, w = 0, h = 0, dpr = window.devicePixelRatio || 1, frame = 0; const N = 220; const nodes = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), vx: rand(-0.0006, 0.0006), vy: rand(-0.0006, 0.0006), pulse: Math.random() })); const parentEl = canvas.parentElement;
    const buildEdges = () => { const k = 2, ed = []; for (let i = 0; i < N; i++) { const a = nodes[i], ds = []; for (let j = 0; j < N; j++) { if (i === j) continue; const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y; ds.push([dx * dx + dy * dy, j]); } ds.sort((a, b) => a[0] - b[0]); for (let m = 0; m < k; m++) ed.push([i, ds[m][1]]); } return ed; };
    let edges = buildEdges(); const P = 40; let photons = Array.from({ length: P }, () => ({ e: Math.floor(Math.random() * edges.length), t: Math.random(), v: rand(0.004, 0.012) }));
    const resize = () => { const rect = (parentEl || canvas).getBoundingClientRect(); dpr = window.devicePixelRatio || 1; const cssW = Math.max(1, rect.width), cssH = Math.max(1, rect.height); const newW = Math.floor(cssW * dpr), newH = Math.floor(cssH * dpr); if (newW !== w || newH !== h) { w = newW; h = newH; canvas.width = w; canvas.height = h; canvas.style.width = cssW + 'px'; canvas.style.height = cssH + 'px'; } };
    const step = () => { frame++; resize(); ctx.clearRect(0, 0, w, h); ctx.fillStyle = 'rgba(2,6,23,1)'; ctx.fillRect(0, 0, w, h); for (let i = 0; i < N; i++) { const n = nodes[i]; n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > 1) n.vx *= -1; if (n.y < 0 || n.y > 1) n.vy *= -1; n.vx = clamp(n.vx + rand(-0.00003, 0.00003), -0.0012, 0.0012); n.vy = clamp(n.vy + rand(-0.00003, 0.00003), -0.0012, 0.0012); n.pulse += 0.02; } if (frame % (60 * 8) === 0) edges = buildEdges(); ctx.lineWidth = 0.6 * dpr; ctx.strokeStyle = 'rgba(168,85,247,0.10)'; for (let k = 0; k < edges.length; k++) { const [ai, bi] = edges[k], a = nodes[ai], b = nodes[bi]; ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h); ctx.stroke(); } for (let i = 0; i < photons.length; i++) { const ph = photons[i]; ph.t += ph.v; if (ph.t > 1) { ph.e = Math.floor(Math.random() * edges.length); ph.t = 0; ph.v = rand(0.004, 0.012); } const [ai, bi] = edges[ph.e], a = nodes[ai], b = nodes[bi]; const x = (a.x + (b.x - a.x) * ph.t) * w, y = (a.y + (b.y - a.y) * ph.t) * h; ctx.beginPath(); ctx.arc(x, y, 1.3 * dpr, 0, Math.PI * 2); ctx.fillStyle = 'rgba(56,189,248,0.95)'; ctx.fill(); } for (let i = 0; i < N; i++) { const n = nodes[i], px = n.x * w, py = n.y * h, r = (1.1 + Math.sin(n.pulse) * 0.6) * dpr; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(56,189,248,0.85)'; ctx.fill(); } raf = requestAnimationFrame(step); };
    const onPointerMove = (e) => { const rect = (parentEl || canvas).getBoundingClientRect(); const mx = (e.clientX - rect.left) / rect.width, my = (e.clientY - rect.top) / rect.height; for (let i = 0; i < N; i++) { const n = nodes[i], dx = n.x - mx, dy = n.y - my, d2 = dx * dx + dy * dy; if (d2 < 0.02) { n.vx += dx * 0.002; n.vy += dy * 0.002; } } };
    const onVisibility = () => { if (!document.hidden && !raf) { raf = requestAnimationFrame(step); } };
    resize(); raf = requestAnimationFrame(step); window.addEventListener('resize', resize); let ro; try { ro = new ResizeObserver(() => resize()); ro.observe(parentEl || canvas); } catch { } canvas.addEventListener('pointermove', onPointerMove); document.addEventListener('visibilitychange', onVisibility);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); try { ro && ro.disconnect(); } catch { } canvas.removeEventListener('pointermove', onPointerMove); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href') || "";
      if (href.startsWith('#/')) return; // routed pages (blog, status, contact)
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return <canvas data-qpanda-bg ref={ref} className="absolute inset-0" />;
}

function StaticOrnaments() {
  // Gentle glows + a faint grid starting below the hero (~85vh)
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* soft glows */}
      <div className="absolute left-[-12%] top-[64vh] h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute right-[-10%] bottom-[-8%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      {/* faint grid */}
      <svg className="absolute inset-x-0 top-[85vh] opacity-[0.06]" height="220" viewBox="0 0 1440 220">
        <defs>
          <pattern id="qp-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#qp-grid)" className="text-cyan-400" />
      </svg>
    </div>
  );
}


function DisintegrateParticles({ count = 60 }) { return (<div className="absolute inset-0">{Array.from({ length: count }).map((_, i) => (<motion.span key={i} className="absolute h-1 w-1 rounded-full bg-cyan-300/90" style={{ left: '50%', top: '50%' }} initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }} animate={{ x: (Math.random() - 0.5) * 180, y: (Math.random() - 0.5) * 160, opacity: 0, scale: 0.6 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} />))}</div>); }

const PLAN_NODE_POS = [{ id: 'qubit', top: 24, left: 18 }, { id: 'entangle', top: 42, left: 55 }, { id: 'superposition', top: 66, left: 28 }, { id: 'teleport', top: 20, left: 78 }];
const PlanNode = ({ id, top, left, onClick }) => (<button onClick={(e) => { const r = e.currentTarget?.getBoundingClientRect?.(); const cx = r ? r.left + r.width / 2 : window.innerWidth / 2; const cy = r ? r.top + r.height / 2 : window.innerHeight / 2; onClick && onClick(id, cx, cy); }} className="group absolute z-20 h-4 w-4 rounded-full bg-cyan-300/80 shadow-[0_0_18px_6px_rgba(34,211,238,0.6)] hover:shadow-[0_0_28px_12px_rgba(34,211,238,0.8)] ring-2 ring-cyan-200/70" style={{ top: `${top}%`, left: `${left}%` }} aria-label={`Open ${id} plan`}><span className="absolute -inset-3 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100" /></button>);


function PandaFace({ size = 68 }) { return (<svg width={size} height={size} viewBox="0 0 128 128" className="drop-shadow-[0_0_18px_rgba(59,130,246,0.5)]"><defs><radialGradient id="g" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#b3e5fc" /><stop offset="100%" stopColor="#38bdf8" /></radialGradient></defs><circle cx="64" cy="64" r="52" fill="url(#g)" stroke="#0ea5e9" strokeWidth="4" /><circle cx="36" cy="34" r="16" fill="#111827" /><circle cx="92" cy="34" r="16" fill="#111827" /><ellipse cx="64" cy="72" rx="42" ry="36" fill="#f8fafc" /><circle cx="48" cy="66" r="10" fill="#111827" /><circle cx="80" cy="66" r="10" fill="#111827" /><path d="M50 92 C64 104 78 104 92 92" stroke="#111827" strokeWidth="6" fill="none" strokeLinecap="round" /></svg>); }
function PandaTrail({ pos, length = 10 }) { const [trail, setTrail] = useState([]); useEffect(() => { setTrail(t => { const next = [...t, { id: Date.now(), x: pos.x, y: pos.y }]; return next.slice(-length); }); }, [pos.x, pos.y]); return (<AnimatePresence>{trail.map(p => (<motion.div key={p.id} className="pointer-events-none fixed z-20 h-2 w-2 rounded-full bg-cyan-400/60" initial={{ x: p.x, y: p.y, opacity: 0.45, scale: 1 }} animate={{ opacity: 0, scale: 0.6, y: p.y - 20 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} />))}</AnimatePresence>); }
const TeleportRing = ({ x, y, show }) => (<AnimatePresence>{show && (<motion.div initial={{ scale: 0.2, opacity: 0.8 }} animate={{ scale: 1.8, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="pointer-events-none fixed z-30 h-6 w-6 rounded-full border-2 border-cyan-300 shadow-[0_0_24px_6px_rgba(34,211,238,0.5)]" style={{ left: (x || 0) - 12, top: (y || 0) - 12 }} />)}</AnimatePresence>);


function OverlayFX({ tethers = [], glitchAt }) {
  return (
    <>
      <svg className="pointer-events-none fixed inset-0 z-20" width="100%" height="100%">
        {tethers.map(t => (
          <motion.line
            key={t.id}
            x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke="url(#fx-stroke)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: [0.9, 0.9, 0] }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        <defs>
          <linearGradient id="fx-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(56,189,248)" />
            <stop offset="100%" stopColor="rgb(168,85,247)" />
          </linearGradient>
        </defs>
      </svg>

      <AnimatePresence>
        {glitchAt && (
          <motion.div
            className="pointer-events-none fixed z-30 mix-blend-screen"
            style={{ left: glitchAt.x - 16, top: glitchAt.y - 16 }}
            initial={{ opacity: 0.9, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-8 w-8 bg-cyan-400/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


function PlanDialog({ open, onOpenChange, planId }) { const plan = PLANS.find(p => p.id === planId) || null; return (<Dialog open={!!open} onOpenChange={onOpenChange}><DialogContent className="border border-cyan-300/20 bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-4 backdrop-blur-xl shadow-2xl"><DialogHeader><DialogTitle className="flex items-center gap-2 text-cyan-200"><IconSparkles className="h-5 w-5" /> {plan ? plan.name : "Plan"}{plan?.badge && <span className="ml-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-200">{plan.badge}</span>}</DialogTitle><DialogDescription className="text-slate-300">{plan ? plan.tagline : "Quantum-grade hosting plan."}</DialogDescription></DialogHeader><Card className="relative overflow-hidden border border-cyan-400/20 bg-white/5"><CardContent className="p-4"><motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-20" initial={{ x: -200 }} animate={{ x: 200 }} transition={{ repeat: Infinity, repeatType: 'mirror', duration: 2.2, ease: 'linear' }} style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(56,189,248,0.6) 50%, transparent 60%)' }} /><div className="mb-2 text-2xl font-semibold text-cyan-200">{plan ? plan.price : ""}</div><ul className="space-y-2 text-slate-200">{(plan?.features || []).map(f => (<li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]" />{f}</li>))}</ul><div className="mt-4 flex gap-2"><Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900">Get started</Button><Button className="border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10">Compare</Button></div></CardContent></Card></DialogContent></Dialog>); }

function ParallaxOrnaments() {
  // Uses document scroll; slower = farther layer
  const { scrollY } = useScroll();
  const yFar = useTransform(scrollY, [0, 2000], [0, 120]);  // faint grid
  const yMid = useTransform(scrollY, [0, 2000], [0, 180]);  // fuchsia glow
  const yNear = useTransform(scrollY, [0, 2000], [0, 260]);  // cyan glow
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* near (moves most) */}
      <motion.div style={{ y: yNear }} className="absolute left-[-12%] top-[64vh] h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px] will-change-transform" />
      {/* mid */}
      <motion.div style={{ y: yMid }} className="absolute right-[-10%] top-[98vh] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px] will-change-transform" />
      {/* far (moves least) */}
      <motion.svg style={{ y: yFar }} className="absolute inset-x-0 top-[85vh] opacity-[0.06] will-change-transform" height="260" viewBox="0 0 1440 260">
        <defs>
          <pattern id="qp-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#qp-grid)" className="text-cyan-400" />
      </motion.svg>
    </div>
  );
}

function MouseParallaxGlows() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 60, damping: 15, mass: 0.3 });

  useEffect(() => {
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx); my.set(ny);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  function Layer({ mult, className }) {
    const x = useTransform(sx, v => v * mult);
    const y = useTransform(sy, v => v * mult);
    return <motion.div style={{ x, y }} className={className} aria-hidden />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen">
      <Layer mult={22} className="absolute left-[8%]  top-[25%] h-40 w-40 rounded-full bg-cyan-500/15 blur-[60px]" />
      <Layer mult={-16} className="absolute right-[16%] top-[35%] h-56 w-56 rounded-full bg-fuchsia-500/12 blur-[80px]" />
      <Layer mult={10} className="absolute left-1/2 top-[65%] h-32 w-32 -translate-x-1/2 rounded-full bg-sky-400/10 blur-[50px]" />
    </div>
  );
}


export default function QPandaOnePager() {
  const [pandaPos, setPandaPos] = useState({ x: 120, y: 320 }); const [ring, setRing] = useState({ x: 0, y: 0, show: false }); const [dialogOpen, setDialogOpen] = useState(false); const [activePlan, setActivePlan] = useState(null); const [clones, setClones] = useState([]); const [route, setRoute] = useState(getRouteFromHash()); const plansRef = useRef(null); const [highlightPlans, setHighlightPlans] = useState(false);
  useEffect(() => { setPandaPos({ x: window.innerWidth * 0.5, y: Math.min(window.innerHeight * 0.35, 360) }); }, []);
  useEffect(() => { const plan = getDeepLinkPlanFromURL(window.location.href); if (plan && PLANS.some(p => p.id === plan)) { setTimeout(() => { teleportTo(plan, window.innerWidth * 0.5, window.innerHeight * 0.35); }, 300); } }, []);
  useEffect(() => { const onHash = () => setRoute(getRouteFromHash(window.location.hash)); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  const teleportTo = (id, x, y) => { const cx = clamp(Number(x) || window.innerWidth / 2, 0, window.innerWidth); const cy = clamp(Number(y) || window.innerHeight / 2, 0, window.innerHeight); setRing({ x: cx, y: cy, show: true }); setTimeout(() => setRing(r => ({ ...r, show: false })), 450); setPandaPos({ x: cx, y: cy }); setActivePlan(id); setDialogOpen(true); const mini = Array.from({ length: 3 }).map((_, i) => ({ id: Date.now() + i, x: cx + rand(-60, 60), y: cy + rand(-60, 60) })); setClones(mini); setTimeout(() => setClones([]), 900); };
  const handleSeePlans = () => { const el = plansRef.current; if (el?.scrollIntoView) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setHighlightPlans(true); setTimeout(() => setHighlightPlans(false), 1200); } };
  const openQubit = (e) => { const r = e?.currentTarget?.getBoundingClientRect?.(); const cx = r ? r.left + r.width / 2 : window.innerWidth / 2; const cy = r ? r.top : window.innerHeight / 2; teleportTo('qubit', cx, cy); };
  useEffect(() => { const i = setInterval(() => { setPandaPos(p => ({ x: clamp(p.x + rand(-6, 6), 0, window.innerWidth), y: clamp(p.y + rand(-4, 4), 0, window.innerHeight) })); }, 1400); return () => clearInterval(i); }, []);
  useEffect(() => { const fly = setInterval(() => { if (dialogOpen) return; const x = window.innerWidth * (0.15 + Math.random() * 0.7); const y = window.innerHeight * (0.15 + Math.random() * 0.5); setRing({ x, y, show: true }); setTimeout(() => setRing(r => ({ ...r, show: false })), 320); setPandaPos({ x, y }); setClones(Array.from({ length: 2 }).map((_, i) => ({ id: Date.now() + i, x: x + rand(-50, 50), y: y + rand(-50, 50) }))); setTimeout(() => setClones([]), 900); }, 12000); return () => clearInterval(fly); }, [dialogOpen]);
  const heroRef = useRef(null);
  const [glitch, setGlitch] = useState(false);
  const [tethers, setTethers] = useState([]);
  const [actionLabel, setActionLabel] = useState(null);

  function percentToViewport(topPercent, leftPercent) {
    const hero = heroRef.current;
    if (!hero) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = hero.getBoundingClientRect();
    const x = rect.left + (leftPercent / 100) * rect.width;
    const y = rect.top + (topPercent / 100) * rect.height;
    return { x, y };
  }
  const triggerOrb = (id, cx, cy) => {
    // always teleport (moves Panda + opens modal)
    teleportTo(id, cx, cy);

    // ephemeral label near Panda
    setActionLabel(id);
    setTimeout(() => setActionLabel(null), 900);

    if (id === 'teleport') {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 240);
      return;
    }

    if (id === 'superposition') {
      // extra clones for “parallel” feeling
      const extra = Array.from({ length: 4 }).map((_, i) => ({
        id: Date.now() + 100 + i,
        x: cx + rand(-90, 90),
        y: cy + rand(-90, 90),
      }));
      setClones(prev => [...prev, ...extra]);
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
      setTimeout(() => setClones([]), 1000);
      return;
    }

    if (id === 'entangle') {
      // draw a shimmering tether to a random *other* orb
      const others = PLAN_NODE_POS.filter(n => n.id !== id);
      const target = others[Math.floor(Math.random() * others.length)];
      const p2 = percentToViewport(target.top, target.left);
      setTethers([{ id: Date.now(), x1: cx, y1: cy, x2: p2.x, y2: p2.y }]);
      setTimeout(() => setTethers([]), 1200);
      return;
    }

    // 'qubit' → modal is already handled by teleportTo()
  };


  return (
    <ErrorBoundary>
      <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
        <StaticOrnaments />
        <header className="sticky top-0 z-[200] border-b border-white/10 bg-slate-950/70 backdrop-blur-xl"><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3"><a href="#top" className="text-lg font-bold text-cyan-300">Q Panda</a><nav className="hidden gap-5 text-sm text-slate-300 md:flex"><a href="#/" className="hover:text-cyan-300">Home</a><a href="#features" className="hover:text-cyan-300">Features</a><a href="#plans" className="hover:text-cyan-300">Plans</a><a href="#benchmarks" className="hover:text-cyan-300">Benchmarks</a><a href="#faq" className="hover:text-cyan-300">FAQ</a><a href="#docs" className="hover:text-cyan-300">Docs</a><a href="#/blog" className="hover:text-cyan-300">Blog</a><a href="#/status" className="hover:text-cyan-300">Status</a><a href="#/contact" className="hover:text-cyan-300">Contact</a></nav><Button className="hidden bg-cyan-500 text-slate-900 hover:bg-cyan-400 md:inline-flex">Launch</Button></div></header>
        <ParallaxOrnaments />
        {route.name !== 'home' ? (<SitePages route={route} />) : (<>
          <section ref={heroRef} className="relative h-[90vh] overflow-hidden">

            <QuantumBackground2D />
            <MouseParallaxGlows />

            <div className="pointer-events-none absolute inset-0">{PLAN_NODE_POS.map((n, i) => (<div key={i} className="absolute" style={{ top: `${n.top}%`, left: `${n.left}%` }}><div className="h-1 w-16 origin-left rotate-12 bg-gradient-to-r from-cyan-400/60 to-fuchsia-400/10 blur-[1px]" /></div>))}</div>
            <div className="absolute inset-0">{PLAN_NODE_POS.map(n => (<PlanNode key={n.id} id={n.id} top={n.top} left={n.left} onClick={triggerOrb} />))}</div>
            <div className="relative z-10 mx-auto mt-28 max-w-4xl px-6 text-center"><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"><IconSparkles className="h-3.5 w-3.5" /> Quantum‑native AI Hosting</div><h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400">Q Panda — Teleport your site across the neural web</h1><p className="mx-auto mt-4 max-w-2xl text-slate-300">An AI co-pilot that anticipates traffic spikes, heals failures before they happen, and deploys in parallel like quantum superposition.</p><div className="mt-6 flex items-center justify-center gap-3"><Button onClick={openQubit} className="bg-cyan-500 text-slate-900 hover:bg-cyan-400">Launch in 30s</Button><Button onClick={handleSeePlans} className="border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10">See plans</Button></div></div>
            <PandaTrail pos={pandaPos} />
            <motion.div className="pointer-events-none fixed z-30" animate={{ x: pandaPos.x, y: pandaPos.y }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}><PandaFace /></motion.div>
            <TeleportRing x={ring.x} y={ring.y} show={ring.show} />
            <AnimatePresence>{clones.map(c => (<motion.div key={c.id} initial={{ x: c.x, y: c.y, scale: 0.6, opacity: 0.8 }} animate={{ y: c.y - 40, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="pointer-events-none fixed z-20"><PandaFace size={38} /></motion.div>))}</AnimatePresence>
          </section>

          <section ref={plansRef} id="plans" className="relative z-10 mx-auto -mt-10 max-w-6xl px-6 pb-24"><div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${highlightPlans ? 'rounded-3xl ring-2 ring-cyan-400/40 animate-pulse' : ''}`}>{PLANS.map(p => (<Card key={p.id} className="group relative overflow-hidden border border-cyan-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.15)]"><CardContent className="p-5"><motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{ x: -220 }} animate={{ x: 220 }} transition={{ repeat: Infinity, repeatType: 'mirror', duration: 3.4, ease: 'linear' }} style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(56,189,248,0.4) 50%, transparent 60%)' }} /><div className="mb-2 flex items-center gap-2 text-xs text-cyan-200"><span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5">{p.badge}</span></div><h3 className="text-lg font-bold text-cyan-100">{p.name}</h3><p className="mt-1 text-sm text-slate-300">{p.tagline}</p><div className="mt-4 text-2xl font-semibold text-cyan-200">{p.price}</div><ul className="mt-3 space-y-2 text-sm text-slate-200">{p.features.map(f => (<li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /> {f}</li>))}</ul><div className="mt-4"><Button className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400" onClick={(e) => { const r = e.currentTarget?.getBoundingClientRect?.(); const cx = r ? r.left + r.width / 2 : window.innerWidth / 2; const cy = r ? r.top : window.innerHeight / 2; teleportTo(p.id, cx, cy); }}>Choose {p.name}</Button></div></CardContent></Card>))}</div></section>

          {/* FEATURES */}
          <section id="features" className="mx-auto max-w-6xl px-6 pb-24"><div className="grid gap-6 md:grid-cols-3"><FeatureCard icon={<IconZap className="h-5 w-5" />} title="Parallel Deployments" desc="Ship multiple versions simultaneously, collapse to the best performer automatically." /><FeatureCard icon={<IconShield className="h-5 w-5" />} title="Predictive Shield" desc="Anomaly detection blocks threats before signatures exist." /><FeatureCard icon={<IconCpu className="h-5 w-5" />} title="Autonomic Scaling" desc="Resources entangle across regions to absorb viral spikes." /></div></section>

          <section id="benchmarks" className="mx-auto max-w-6xl px-6 pb-24"><div className="grid gap-6 sm:grid-cols-3"><MetricCard label="Avg. Cold Start" value="28ms" sub="Neural edge functions" /><MetricCard label="99.995%" value="SLA" sub="Past 90 days" /><MetricCard label="2.3x" value="Faster TTFB" sub="vs. baseline clouds" /></div></section>
          <section id="testimonials" className="mx-auto max-w-6xl px-6 pb-24"><div className="grid gap-6 md:grid-cols-3"><QuoteCard quote="Switched our launch to Q Panda - handled a 40x spike without blinking." author="Sara K., StreamKit" /><QuoteCard quote="Deploy previews in parallel changed our workflow overnight." author="Kenji M., FolioAI" /><QuoteCard quote="The predictive shield blocked a zero-day botnet before signatures were out." author="Nadia P., HexaSec" /></div></section>
          <section id="docs" className="mx-auto max-w-6xl px-6 pb-24"><Card className="border border-cyan-400/20 bg-white/5 transition-transform duration-300 hover:-translate-y-0.5"><CardContent className="p-6 md:p-8"><h3 className="text-2xl font-bold text-cyan-100">Docs preview</h3><p className="mt-2 text-slate-300">Install the CLI, initialize a project, and teleport your first deployment.</p><pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-cyan-200">{`npm i -g qpanda\nqpanda init\nqpanda deploy`}</pre><div className="mt-4"><Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400">Open full docs</Button></div></CardContent></Card></section>
          <section id="faq" className="mx-auto max-w-5xl px-6 pb-24"><h3 className="mb-6 text-2xl font-bold text-cyan-100">Frequently asked</h3><div className="divide-y divide-white/10 rounded-2xl border border-cyan-400/20 bg-white/5"><FAQItem q="What does 'quantum' mean here?" a="We simulate quantum-style parallelism - predictive routing, speculative deploys, and entangled failover - not literal qubits." /><FAQItem q="Can I bring my own domain?" a="Yes. Point your DNS to our Anycast edge. We generate and renew TLS automatically." /><FAQItem q="How is pricing calculated?" a="Plans are flat-rate by tier. Usage-based add-ons (edge functions, storage) are billed per unit with clear caps." /></div></section>
          <section className="mx-auto mb-28 max-w-5xl px-6"><Card className="border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-xl"><CardContent className="flex flex-col items-center justify-between gap-4 p-8 md:flex-row"><div><h3 className="text-2xl font-bold text-cyan-100">Ready to teleport?</h3><p className="mt-1 text-slate-300">Start free. Migrate in minutes with the Q Panda co-pilot.</p></div><div className="flex gap-2"><Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400"><IconRocket className="mr-2 h-4 w-4" /> Get started</Button><Button className="border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10">Talk to sales</Button></div></CardContent></Card></section>
        </>)}
        <footer className="mx-auto max-w-6xl px-6 pb-12 text-sm text-slate-400"><div className="border-t border-white/10 pt-6">© {new Date().getFullYear()} Q Panda Labs. All rights reserved.</div></footer>
        <PlanDialog open={dialogOpen} onOpenChange={setDialogOpen} planId={activePlan} />
      </div>
    </ErrorBoundary>
  );
}

// ——— Feature/Metric/Quote/FAQ ———
const FeatureCard = ({ icon, title, desc }) => (<div className="group rounded-2xl border border-cyan-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200">{icon} <span>{title}</span></div><p className="text-slate-300">{desc}</p><div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full" /></div>);
const MetricCard = ({ label, value, sub }) => (<Card className="border border-cyan-400/20 bg-white/5 transition-transform duration-300 hover:-translate-y-0.5 text-center"><CardContent className="p-6"><div className="text-sm text-slate-300">{label}</div><motion.div initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="mt-1 text-3xl font-extrabold text-cyan-200">{value}</motion.div><div className="mt-1 text-xs text-slate-400">{sub}</div></CardContent></Card>);
const QuoteCard = ({ quote, author }) => (<Card className="border border-cyan-400/20 bg-white/5 transition-transform duration-300 hover:-translate-y-0.5"><CardContent className="p-6"><p className="text-slate-200">“{quote}”</p><div className="mt-3 text-sm text-slate-400">— {author}</div></CardContent></Card>);
function FAQItem({ q, a }) { const [open, setOpen] = useState(false); return (<div className="px-4 py-4"><button type="button" onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between gap-4 text-left"><span className="text-cyan-100">{q}</span><span className="rounded-full border border-cyan-400/30 px-2 py-0.5 text-xs text-cyan-200">{open ? '−' : '+'}</span></button><AnimatePresence initial={false}>{open && (<motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="mt-2 overflow-hidden pr-8 text-slate-300">{a}</motion.p>)}</AnimatePresence></div>); }

// ——— Pages (hash-routed) ———
function SitePages({ route }) { if (route.name === 'contact') return <ContactPage />; if (route.name === 'status') return <StatusPage />; if (route.name === 'blog') return <BlogPage slug={route.slug} />; return null; }
function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' }); const [sent, setSent] = useState(false); const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value }); const onSubmit = (e) => { e.preventDefault(); if (!form.name || !form.email || !form.message) return; setSent(true); };
  return (<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-5xl px-6 py-16"><h2 className="text-3xl font-bold text-cyan-200">Contact</h2><p className="mt-2 text-slate-300">We usually reply within 1 business day.</p><Card className="mt-6 border border-cyan-400/20 bg-white/5"><CardContent className="p-6">{sent ? (<div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-cyan-200">Thanks! We received your message.</div>) : (<form onSubmit={onSubmit} className="grid gap-4"><input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none" /><input name="company" value={form.company} onChange={onChange} placeholder="Company (optional)" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none" /><input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none" /><input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none" /><textarea name="message" value={form.message} onChange={onChange} placeholder="Message" rows={5} className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none" /><div className="flex gap-2"><Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400" type="submit">Send</Button><a href="#/" className="inline-flex items-center rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200">Back</a></div></form>)}<div className="mt-6 flex flex-wrap items-center gap-3 text-sm"><a href={WHMCS_SUPPORT_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200 hover:bg-cyan-500/10">Open Support Portal</a><a href={WHMCS_CLIENT_AREA_URL} target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200 hover:bg-cyan-500/10">Client Area</a><a href="mailto:support@qpanda.io" className="rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200 hover:bg-cyan-500/10">Email Support</a></div></CardContent></Card></motion.section>);
}
function StatusPage() { const incidents = [{ id: 1, date: '2025-08-10', title: 'Edge PoP latency in APAC', status: 'Resolved', detail: 'Elevated latency due to upstream fiber maintenance. Auto-reroute engaged.' }, { id: 2, date: '2025-07-29', title: 'Functions cold starts', status: 'Monitoring', detail: 'Cold starts briefly spiked after deploy; tuned caches.' }]; return (<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-5xl px-6 py-16"><h2 className="text-3xl font-bold text-cyan-200">Status</h2><div className="mt-4 grid gap-6 sm:grid-cols-3"><MetricCard label="Uptime (30d)" value="99.995%" sub="Core services" /><MetricCard label="Edge PoPs" value="58" sub="Global" /><MetricCard label="Median TTFB" value="62ms" sub="Worldwide" /></div><div className="mt-8 rounded-2xl border border-cyan-400/20 bg-white/5">{incidents.map(i => (<div key={i.id} className="border-b border-white/10 p-4 last:border-0"><div className="flex items-center justify-between"><div className="text-cyan-100">{i.title}</div><span className="rounded-full border border-cyan-400/30 px-2 py-0.5 text-xs text-cyan-200">{i.status}</span></div><div className="mt-1 text-xs text-slate-400">{i.date}</div><p className="mt-2 text-slate-300">{i.detail}</p></div>))}</div><div className="mt-6"><a href="#/" className="text-cyan-300">← Back to home</a></div></motion.section>); }
function BlogPage({ slug }) { const post = slug ? POSTS.find(p => p.slug === slug) : null; if (post) { return (<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-3xl px-6 py-16"><a href="#/blog" className="text-cyan-300">← All posts</a><h2 className="mt-2 text-3xl font-bold text-cyan-200">{post.title}</h2><div className="text-xs text-slate-400">{post.date}</div><p className="mt-6 text-slate-300">{post.excerpt}</p><p className="mt-3 text-slate-300">(Full article content goes here.)</p></motion.section>); } return (<motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-3xl px-6 py-16"><h2 className="text-3xl font-bold text-cyan-200">Blog</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{POSTS.map(p => (<Card key={p.slug} className="border border-cyan-400/20 bg-white/5 transition-transform duration-300 hover:-translate-y-0.5"><CardContent className="p-6"><div className="text-xs text-slate-400">{p.date}</div><div className="mt-1 text-cyan-100">{p.title}</div><p className="mt-2 text-sm text-slate-300">{p.excerpt}</p><div className="mt-4"><a href={`#/blog/${p.slug}`} className="text-cyan-300">Read →</a></div></CardContent></Card>))}</div><div className="mt-6"><a href="#/" className="text-cyan-300">← Back to home</a></div></motion.section>); }