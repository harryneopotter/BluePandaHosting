"use client";
import React, { useRef, useState, useEffect, useContext, createContext } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PUBLIC_CONFIG } from "../config/publicConfig";

// ——— Icons (inline) ———
const IconSparkles = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M5 15l.75 1.75L7.5 17.5 5.75 18.25 5 20l-.75-1.75L2.5 17.5 4.25 16.75 5 15z"/><path d="M18.5 14l.5 1.25L20.25 16l-1.25.75L18.5 18l-.5-1.25L16.75 16l1.25-.75.5-1.25z"/></svg>);
const IconZap = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconShield = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconCpu = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>);
const IconRocket = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3c4 1 7 4 7 8-2 0-5 1-7 3-2 2-3 5-3 7-4 0-7-3-8-7 2 0 5-1 7-3 2-2 3-5 4-8z"/><path d="M6 18l2-2M8 20l2-2"/></svg>);
const IconServer = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="9" width="20" height="4" rx="1"/><rect x="2" y="15" width="20" height="4" rx="1"/><circle cx="7" cy="5" r="1"/><circle cx="7" cy="11" r="1"/><circle cx="7" cy="17" r="1"/></svg>);
const IconGlobe = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20"/><path d="M8 12h8M12 8v8"/></svg>);
const IconLifeBuoy = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8l-5.74 9.94M15.75 12l-7.5 0M12 2.25v3M12 18.75v3"/></svg>);
const IconChevronDown = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9l6 6 6-6"/></svg>);

// ——— Data ———
const PLANS = [
  {
    id: "quantum-entanglement",
    name: "Quantum Entanglement",
    tagline: "Ideal for personal sites, blogs, and startups.",
    price: "$25",
    period: "monthly",
    features: [
      "1 Website",
      "10GB NVMe Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "LiteSpeed Web Server",
      "24-hour Support"
    ],
    badge: "Starter"
  },
  {
    id: "superposition",
    name: "Superposition",
    tagline: "Perfect for small businesses and growing sites.",
    price: "$65",
    period: "monthly",
    features: [
      "5 Websites",
      "50GB NVMe Storage",
      "Unmetered Bandwidth",
      "Free Domain (1 year)",
      "Imunify360 Security",
      "12-hour Support"
    ],
    badge: "Business"
  },
  {
    id: "singularity",
    name: "Singularity",
    tagline: "For e-commerce, agencies, and high-traffic sites.",
    price: "$135",
    period: "monthly",
    features: [
      "Unlimited Websites",
      "100GB NVMe Storage",
      "Unmetered Bandwidth",
      "Priority Support",
      "CloudLinux OS",
      "4-hour Support"
    ],
    badge: "Enterprise"
  },
];


// Mega Menu Categories
const MEGA_MENU_CATEGORIES = [
  {
    id: 'shared-hosting',
    title: 'Shared Hosting',
    icon: IconServer,
    group: 'hosting'
  },
  {
    id: 'vps-hosting',
    title: 'VPS Hosting',
    icon: IconCpu,
    group: 'hosting'
  },
  {
    id: 'bare-metals',
    title: 'Bare Metals',
    icon: IconRocket,
    group: 'hosting'
  },
  {
    id: 'cloud-vms',
    title: 'Cloud VMs',
    icon: IconZap,
    group: 'hosting'
  },
  {
    id: 'managed-wordpress',
    title: 'Managed WordPress',
    icon: IconShield,
    group: 'managed'
  },
  {
    id: 'managed-vms',
    title: 'Managed VMs',
    icon: IconCpu,
    group: 'managed'
  },
  {
    id: 'managed-servers',
    title: 'Managed Servers',
    icon: IconServer,
    group: 'managed'
  },
  {
    id: 'ssl-certificates',
    title: 'SSL Certificates',
    icon: IconShield,
    group: 'security'
  },
  {
    id: 'site-monitoring',
    title: 'Site Monitoring',
    icon: IconZap,
    group: 'security'
  }
];

// Category Content Mapping
const CATEGORY_CONTENT = {
  'shared-hosting': {
    title: 'Shared Hosting',
    description: 'Perfect for personal websites and small businesses',
    items: PLANS
  },
  'cloud-vms': {
    title: 'Cloud Virtual Machines',
    description: 'Elastic cloud computing with auto-scaling',
    items: [
      {
        id: 'cloud-starter',
        name: 'Cloud Starter',
        tagline: 'Perfect for development and testing',
        price: '$19.99/mo',
        features: ['1 vCPU', '2GB RAM', '25GB SSD', 'Auto-scaling', '99.9% SLA'],
        badge: 'Popular'
      },
      {
        id: 'cloud-pro',
        name: 'Cloud Pro',
        tagline: 'Production-ready cloud infrastructure',
        price: '$49.99/mo',
        features: ['4 vCPU', '8GB RAM', '100GB SSD', 'Load Balancer', 'Premium Support'],
        badge: 'Business'
      }
    ]
  },
  'managed-wordpress': {
    title: 'Managed WordPress',
    description: 'Optimized WordPress hosting with automatic updates',
    items: [
      {
        id: 'wp-starter',
        name: 'WordPress Starter',
        tagline: 'Managed WordPress for beginners',
        price: '$29.99/mo',
        features: ['1 WP Site', 'Auto Updates', 'Daily Backups', 'CDN Included', 'SSL Certificate'],
        badge: 'Managed'
      },
      {
        id: 'wp-business',
        name: 'WordPress Business',
        tagline: 'Professional WordPress hosting',
        price: '$79.99/mo',
        features: ['5 WP Sites', 'Premium Themes', 'Advanced Security', 'Performance Optimization', 'Priority Support'],
        badge: 'Pro'
      }
    ]
  },
  'managed-vms': {
    title: 'Managed Virtual Machines',
    description: 'Fully managed VPS with monitoring and maintenance',
    items: PLANS
  },
  'managed-servers': {
    title: 'Managed Dedicated Servers',
    description: 'Enterprise servers with full management included',
    items: PLANS
  },
  'domain-registration': {
    title: 'Domain Registration',
    description: 'Register your perfect domain name',
    items: [
      {
        id: 'com-domain',
        name: '.com Domain',
        tagline: 'Most popular domain extension',
        price: '$12.99/year',
        features: ['Free WHOIS Privacy', 'DNS Management', 'Email Forwarding', 'Auto-Renewal', '24/7 Support'],
        badge: 'Popular'
      },
      {
        id: 'premium-domains',
        name: 'Premium Extensions',
        tagline: 'Stand out with unique extensions',
        price: 'From $19.99/year',
        features: ['.tech', '.io', '.ai', '.dev', '.app'],
        badge: 'Premium'
      }
    ]
  },
  'domain-transfer': {
    title: 'Domain Transfer',
    description: 'Transfer your domains to Q Panda',
    items: [
      {
        id: 'domain-transfer',
        name: 'Domain Transfer Service',
        tagline: 'Move your domains with zero downtime',
        price: 'Free with hosting',
        features: ['Zero Downtime', 'Free Migration', 'DNS Management', 'Email Preservation', 'Expert Support'],
        badge: 'Free'
      }
    ]
  },
  'ssl-certificates': {
    title: 'SSL Certificates',
    description: 'Secure your website with trusted SSL certificates',
    items: [
      {
        id: 'lets-encrypt-ssl',
        name: 'Free SSL Certificate',
        tagline: 'Basic SSL protection for your website',
        price: 'Free',
        features: ['Domain Validation', 'Auto-Renewal', '256-bit Encryption', 'Browser Trust', 'Easy Installation'],
        badge: 'Free'
      },
      {
        id: 'extended-ssl',
        name: 'Extended Validation SSL',
        tagline: 'Premium SSL with green address bar',
        price: '$99.99/year',
        features: ['Extended Validation', 'Green Address Bar', '$1M Warranty', 'Organization Verification', 'Premium Support'],
        badge: 'Premium'
      },
      {
        id: 'wildcard-ssl',
        name: 'Wildcard SSL Certificate',
        tagline: 'Secure unlimited subdomains',
        price: '$149.99/year',
        features: ['Unlimited Subdomains', 'Domain Validation', '256-bit Encryption', 'Auto-Renewal', 'Multi-Server License'],
        badge: 'Business'
      }
    ]
  },
  'site-monitoring': {
    title: 'Site Monitoring',
    description: '24/7 website monitoring and performance tracking',
    items: [
      {
        id: 'basic-monitoring',
        name: 'Basic Monitoring',
        tagline: 'Essential uptime monitoring',
        price: '$9.99/mo',
        features: ['Uptime Monitoring', 'Email Alerts', '5-minute Checks', 'Status Page', 'Basic Reports'],
        badge: 'Starter'
      },
      {
        id: 'pro-monitoring',
        name: 'Pro Monitoring',
        tagline: 'Advanced monitoring with performance metrics',
        price: '$29.99/mo',
        features: ['Real User Monitoring', 'Performance Tracking', '1-minute Checks', 'Advanced Alerts', 'Custom Dashboards'],
        badge: 'Pro'
      },
      {
        id: 'enterprise-monitoring',
        name: 'Enterprise Monitoring',
        tagline: 'Complete monitoring solution',
        price: '$99.99/mo',
        features: ['Global Monitoring', 'API Monitoring', '30-second Checks', 'Slack Integration', 'SLA Reports'],
        badge: 'Enterprise'
      }
    ]
  }
};
const POSTS = [
  { slug: 'launch-notes', title: 'Launch Notes: Q Panda v1', date: '2025-08-01', excerpt: 'Teleport-ready deployments, predictive shield, and neural edge functions.' },
  { slug: 'edge-functions', title: 'Designing Neural Edge Functions', date: '2025-07-18', excerpt: 'How we tuned cold starts to 28ms average at the edge.' },
  { slug: 'status-architecture', title: 'How Our Status Pipeline Works', date: '2025-07-05', excerpt: 'From probes to pages—transparent reliability.' }
];

// WHMCS links centralized via PUBLIC_CONFIG

// ——— Utils ———
const rand = (a,b)=>Math.random()*(b-a)+a; const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function getDeepLinkPlanFromURL(s){ try{ const u=new URL(s, PUBLIC_CONFIG.app.url); const h=u.hash||''; const qp=u.searchParams.get('plan'); const fromHash=h.startsWith('#plan=')?h.slice(6):null; return qp||fromHash||null; } catch{ return null; } }
function getRouteFromHash(hash){ const h=(hash??(typeof window!=='undefined'?window.location.hash:''))?.replace(/^#/,''); if(h==='/'||h==='') return {name:'home'}; if(h.startsWith('/contact')) return {name:'contact'}; if(h.startsWith('/status')) return {name:'status'}; if(h.startsWith('/blog')){ const p=h.split('/'); return {name:'blog', slug:p[2]||null}; } return {name:'home'}; }

// ——— Error boundary ———
class ErrorBoundary extends React.Component{ constructor(p){super(p); this.state={hasError:false,error:null};} static getDerivedStateFromError(e){return{hasError:true,error:e};} componentDidCatch(e,i){console.error('QPanda ErrorBoundary',e,i);} render(){ return this.state.hasError? (<div className="p-6 text-center text-red-200">Something went wrong.<pre className="mt-2 whitespace-pre-wrap text-xs text-red-300">{String(this.state.error)}</pre></div>): this.props.children; } }

// ——— Headless Dialog ———
const DialogCtx=createContext({open:false,onOpenChange:()=>{},dismissOnBackdrop:true});
function Dialog({open,onOpenChange,dismissOnBackdrop=true,children}){ return <DialogCtx.Provider value={{open,onOpenChange,dismissOnBackdrop}}>{children}</DialogCtx.Provider>; }
function DialogContent({className="",children}){
  const {open,onOpenChange,dismissOnBackdrop}=useContext(DialogCtx);
  const ref=useRef(null); const [fxId,setFxId]=useState(0); const [playFx,setPlayFx]=useState(false);
  useEffect(()=>{ if(typeof window==='undefined'||!open) return; const prev=document.activeElement; const onKey=(e)=>{ if(e.key==='Escape'){ setPlayFx(true); setFxId(n=>n+1); setTimeout(()=>{ onOpenChange(false); setPlayFx(false); },260); } }; document.addEventListener('keydown',onKey); const prevOv=document.body.style.overflow; document.body.style.overflow='hidden'; setTimeout(()=>{ref.current&&ref.current.focus?.();},0); return ()=>{ document.removeEventListener('keydown',onKey); document.body.style.overflow=prevOv; prev&&prev.focus&&prev.focus(); }; },[open,onOpenChange]);
	if (typeof window === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {open&&(
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={()=>{ if(dismissOnBackdrop){ setPlayFx(true); setFxId(n=>n+1); setTimeout(()=>{ onOpenChange(false); setPlayFx(false); },260); } }} />
          <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" className={`relative z-[101] w-[92vw] max-w-md rounded-2xl overflow-hidden ${className}`} initial={{scale:0.94,y:10,opacity:0}} animate={{scale:1,y:0,opacity:1}} exit={{ scale:0.98, y:8, opacity:0, filter: 'blur(6px)' }} transition={{opacity: { duration: 0.30, ease: [0.16,1,0.3,1] }, y: { duration: 0.30, ease: [0.16,1,0.3,1] },filter:  { duration: 0.30, ease: [0.16,1,0.3,1] }, scale: { type: "spring", stiffness: 220, damping: 26 }}} >
            <AnimatePresence initial={false}>
              {playFx && (
                <motion.div key={`fx-${fxId}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}} className="pointer-events-none absolute inset-0 z-[102]">
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
const DialogHeader = ({children}) => <div className="mb-3 space-y-1.5">{children}</div>;
const DialogTitle = ({className="",children}) => <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const DialogDescription = ({className="",children}) => <p className={`text-sm text-slate-300 ${className}`}>{children}</p>;

// ——— Simple UI ———
const Card=({className="",children,...p})=>(<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent=({className="",children,...p})=>(<div className={`${className}`} {...p}>{children}</div>);
const Button=({className="",children,...p})=>(<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);

// ——— Background canvas ———
function QuantumBackground2D(){
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return; const ctx=canvas.getContext('2d'); if(!ctx) return;
    let raf=0,w=0,h=0,dpr=window.devicePixelRatio||1,frame=0; const N=220; const nodes=Array.from({length:N},()=>({x:Math.random(),y:Math.random(),vx:rand(-0.0006,0.0006),vy:rand(-0.0006,0.0006),pulse:Math.random()})); const parentEl=canvas.parentElement;
    const buildEdges=()=>{const k=2,ed=[]; for(let i=0;i<N;i++){const a=nodes[i],ds=[]; for(let j=0;j<N;j++){if(i===j) continue; const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y; ds.push([dx*dx+dy*dy,j]);} ds.sort((a,b)=>a[0]-b[0]); for(let m=0;m<k;m++) ed.push([i,ds[m][1]]);} return ed;};
    let edges=buildEdges(); const P=40; let photons=Array.from({length:P},()=>({e:Math.floor(Math.random()*edges.length),t:Math.random(),v:rand(0.004,0.012)}));
    const resize=()=>{const rect=(parentEl||canvas).getBoundingClientRect(); dpr=window.devicePixelRatio||1; const cssW=Math.max(1,rect.width), cssH=Math.max(1,rect.height); const newW=Math.floor(cssW*dpr), newH=Math.floor(cssH*dpr); if(newW!==w||newH!==h){w=newW;h=newH; canvas.width=w; canvas.height=h; canvas.style.width=cssW+'px'; canvas.style.height=cssH+'px';}};
    const step=()=>{frame++; resize(); ctx.clearRect(0,0,w,h); ctx.fillStyle='rgba(2,6,23,1)'; ctx.fillRect(0,0,w,h); for(let i=0;i<N;i++){const n=nodes[i]; n.x+=n.vx; n.y+=n.vy; if(n.x<0||n.x>1) n.vx*=-1; if(n.y<0||n.y>1) n.vy*=-1; n.vx=clamp(n.vx+rand(-0.00003,0.00003),-0.0012,0.0012); n.vy=clamp(n.vy+rand(-0.00003,0.00003),-0.0012,0.0012); n.pulse+=0.02;} if(frame%(60*8)===0) edges=buildEdges(); ctx.lineWidth=0.6*dpr; ctx.strokeStyle='rgba(168,85,247,0.10)'; for(let k=0;k<edges.length;k++){const [ai,bi]=edges[k],a=nodes[ai],b=nodes[bi]; ctx.beginPath(); ctx.moveTo(a.x*w,a.y*h); ctx.lineTo(b.x*w,b.y*h); ctx.stroke();} for(let i=0;i<photons.length;i++){const ph=photons[i]; ph.t+=ph.v; if(ph.t>1){ph.e=Math.floor(Math.random()*edges.length); ph.t=0; ph.v=rand(0.004,0.012);} const [ai,bi]=edges[ph.e],a=nodes[ai],b=nodes[bi]; const x=(a.x+(b.x-a.x)*ph.t)*w, y=(a.y+(b.y-a.y)*ph.t)*h; ctx.beginPath(); ctx.arc(x,y,1.3*dpr,0,Math.PI*2); ctx.fillStyle='rgba(56,189,248,0.95)'; ctx.fill();} for(let i=0;i<N;i++){const n=nodes[i],px=n.x*w,py=n.y*h,r=(1.1+Math.sin(n.pulse)*0.6)*dpr; ctx.beginPath(); ctx.arc(px,py,r,0,Math.PI*2); ctx.fillStyle='rgba(56,189,248,0.85)'; ctx.fill();} raf=requestAnimationFrame(step); };
    const onPointerMove=(e)=>{const rect=(parentEl||canvas).getBoundingClientRect(); const mx=(e.clientX-rect.left)/rect.width, my=(e.clientY-rect.top)/rect.height; for(let i=0;i<N;i++){const n=nodes[i],dx=n.x-mx,dy=n.y-my,d2=dx*dx+dy*dy; if(d2<0.02){n.vx+=dx*0.002; n.vy+=dy*0.002;}}};
    const onVisibility=()=>{ if(!document.hidden && !raf){ raf=requestAnimationFrame(step); } };
    resize(); raf=requestAnimationFrame(step); window.addEventListener('resize',resize); let ro; try{ro=new ResizeObserver(()=>resize()); ro.observe(parentEl||canvas);}catch{} canvas.addEventListener('pointermove',onPointerMove); document.addEventListener('visibilitychange',onVisibility);
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize',resize); try{ro&&ro.disconnect();}catch{} canvas.removeEventListener('pointermove',onPointerMove); document.removeEventListener('visibilitychange',onVisibility); };
  },[]);
  useEffect(() => {
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href') || "";
    if (href.startsWith('#/') ) return; // routed pages (blog, status, contact)
    const id = href.replace('#','');
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}, []);
  return <canvas data-qpanda-bg ref={ref} className="absolute inset-0"/>;
}

function StaticOrnaments(){
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute left-[-10%] top-[60vh] h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      <svg className="absolute inset-x-0 top-[85vh] opacity-[0.05]" height="220" viewBox="0 0 1440 220">
        <defs>
          <pattern id="qp-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#qp-grid)" className="text-cyan-400"/>
      </svg>
    </div>
  );
}


function DisintegrateParticles({count=60}){ return (<div className="absolute inset-0">{Array.from({length:count}).map((_,i)=>(<motion.span key={i} className="absolute h-1 w-1 rounded-full bg-cyan-300/90" style={{left:'50%',top:'50%'}} initial={{x:0,y:0,opacity:0.9,scale:1}} animate={{x:(Math.random()-0.5)*180,y:(Math.random()-0.5)*160,opacity:0,scale:0.6}} transition={{duration:0.45,ease:[0.16,1,0.3,1]}}/>))}</div>); }

const PLAN_NODE_POS=[{id:'quantum-entanglement',top:24,left:18},{id:'superposition',top:42,left:55},{id:'singularity',top:66,left:28}];
const PlanNode=({id,top,left,onClick})=>(<button onClick={(e)=>{const r=e.currentTarget?.getBoundingClientRect?.(); const cx=r? r.left+r.width/2:window.innerWidth/2; const cy=r? r.top+r.height/2:window.innerHeight/2; onClick&&onClick(id,cx,cy);}} className="group absolute z-20 h-4 w-4 rounded-full bg-cyan-300/80 shadow-[0_0_18px_6px_rgba(34,211,238,0.6)] hover:shadow-[0_0_28px_12px_rgba(34,211,238,0.8)] ring-2 ring-cyan-200/70" style={{top:`${top}%`,left:`${left}%`}} aria-label={`Open ${id} plan`}><span className="absolute -inset-3 rounded-full bg-cyan-400/10 blur-md opacity-0 group-hover:opacity-100"/></button>);

function PandaFace({size=68}){ return (<svg width={size} height={size} viewBox="0 0 128 128" className="drop-shadow-[0_0_18px_rgba(59,130,246,0.5)]"><defs><radialGradient id="g" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="#b3e5fc"/><stop offset="100%" stopColor="#38bdf8"/></radialGradient></defs><circle cx="64" cy="64" r="52" fill="url(#g)" stroke="#0ea5e9" strokeWidth="4"/><circle cx="36" cy="34" r="16" fill="#111827"/><circle cx="92" cy="34" r="16" fill="#111827"/><ellipse cx="64" cy="72" rx="42" ry="36" fill="#f8fafc"/><circle cx="48" cy="66" r="10" fill="#111827"/><circle cx="80" cy="66" r="10" fill="#111827"/><path d="M50 92 C64 104 78 104 92 92" stroke="#111827" strokeWidth="6" fill="none" strokeLinecap="round"/></svg>); }
function PandaTrail({pos,length=10}){ const [trail,setTrail]=useState([]); useEffect(()=>{ setTrail(t=>{const next=[...t,{id:Date.now(),x:pos.x,y:pos.y}]; return next.slice(-length);}); },[pos.x,pos.y,length]); return (<AnimatePresence>{trail.map(p=>(<motion.div key={p.id} className="pointer-events-none fixed z-20 h-2 w-2 rounded-full bg-cyan-400/60" initial={{x:p.x,y:p.y,opacity:0.45,scale:1}} animate={{opacity:0,scale:0.6,y:p.y-20}} exit={{opacity:0}} transition={{duration:0.9,ease:'easeOut'}}/>))}</AnimatePresence>); }
const TeleportRing=({x,y,show})=>(<AnimatePresence>{show&&(<motion.div initial={{scale:0.2,opacity:0.8}} animate={{scale:1.8,opacity:0}} exit={{opacity:0}} transition={{duration:0.6,ease:'easeOut'}} className="pointer-events-none fixed z-30 h-6 w-6 rounded-full border-2 border-cyan-300 shadow-[0_0_24px_6px_rgba(34,211,238,0.5)]" style={{left:(x||0)-12,top:(y||0)-12}}/>)}</AnimatePresence>);

function PlanDialog({open,onOpenChange,planId}){
  const plan = PLANS.find(p => p.id === planId) || null;
  return (
    <Dialog open={!!open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-cyan-300/20 bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-4 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-cyan-200">
            <IconSparkles className="h-5 w-5"/> {plan ? plan.name : "Plan"}
            {plan?.badge && <span className="ml-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-200">{plan.badge}</span>}
          </DialogTitle>
          <DialogDescription className="text-slate-300">{plan ? plan.tagline : "Quantum-grade hosting plan."}</DialogDescription>
        </DialogHeader>
        <Card className="relative overflow-hidden border border-cyan-400/20 bg-white/5">
          <CardContent className="p-4">
            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-20" initial={{x:-200}} animate={{x:200}} transition={{repeat:Infinity,repeatType:'mirror',duration:2.2,ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(56,189,248,0.6) 50%, transparent 60%)'}}/>
            <div className="mb-2 text-2xl font-semibold text-cyan-200">{plan ? plan.price : ""}<span className="text-sm text-slate-400">/mo</span></div>
            <ul className="space-y-2 text-slate-200">
              {(plan?.features || []).map(f => (
                <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]"/>{f}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-lg shadow-cyan-500/30">Start Your Plan Now</Button>
              <Button className="border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10">View All Features</Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

// ——— Mega Menu Components ———
function MegaMenu({ activeMenu, onClose, onMenuChange, onMenuEnter, onMenuLeave }) {
  if (typeof window === "undefined") return null;

  const handleMenuEnter = () => {
    // Clear any pending close timeout from header menu
    if (onMenuEnter) onMenuEnter();
  };

  const handleMenuLeave = () => {
    // Use the same timeout system as header menu
    if (onMenuLeave) onMenuLeave();
  };

  return createPortal(
    <AnimatePresence>
      {activeMenu && (
        <motion.div
          className="fixed inset-0 z-[150] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.div
            className="relative z-[151] mx-auto mt-16 w-full max-w-6xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="mx-6 border border-cyan-400/20 bg-gradient-to-b from-slate-900/95 to-slate-950/98 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6">
                {activeMenu === 'hosting' && <HostingMegaMenu />}
                {activeMenu === 'domains' && <DomainsMegaMenu />}
                {activeMenu === 'support' && <SupportMegaMenu />}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function HostingMegaMenu() {
  const [selectedCategory, setSelectedCategory] = useState('shared-hosting');
  const selectedContent = CATEGORY_CONTENT[selectedCategory];

  return (
    <div className="flex h-[480px] gap-0">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r border-slate-700/50 bg-slate-950/30 p-4">
        <div className="space-y-1">
          {/* Hosting Group */}
          <div className="mb-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">HOSTING</div>
            {MEGA_MENU_CATEGORIES.filter(cat => cat.group === 'hosting').map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500/10 text-cyan-200 border border-cyan-400/20'
                      : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="h-px bg-slate-700/50 my-4" />

          {/* Managed Group */}
          <div className="mb-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">MANAGED SERVICES</div>
            {MEGA_MENU_CATEGORIES.filter(cat => cat.group === 'managed').map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500/10 text-cyan-200 border border-cyan-400/20'
                      : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="h-px bg-slate-700/50 my-4" />

          {/* Security Group */}
          <div className="mb-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">SECURITY</div>
            {MEGA_MENU_CATEGORIES.filter(cat => cat.group === 'security').map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-left transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500/10 text-cyan-200 border border-cyan-400/20'
                      : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-cyan-200">{selectedContent?.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{selectedContent?.description}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid gap-4 md:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1
              }}
            >
              {selectedContent?.items?.slice(0, 2).map((item, index) => (
                <motion.a
                  key={item.id}
                  href="#plans"
                  className="group block rounded-lg border border-cyan-400/10 p-4 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-cyan-100">{item.name}</div>
                    {item.badge && (
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-400 mb-3">{item.tagline}</div>
                  <div className="text-lg font-semibold text-cyan-300 mb-3">{item.price}</div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {item.features?.slice(0, 3).map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-cyan-400" />
                        {feature}
                      </li>
                    ))}
                    {item.features?.length > 3 && (
                      <li className="text-cyan-400">+{item.features.length - 3} more features</li>
                    )}
                  </ul>
                </motion.a>
              ))}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {selectedContent?.items && selectedContent.items.length > 2 && (
              <motion.div
                key={`button-${selectedCategory}`}
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.25,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <Button
                  className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50"
                  onClick={() => window.location.href = '#plans'}
                >
                  View All {selectedContent.items.length} Plans
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Image/Graphic */}
        <div className="w-48 p-6 flex items-center justify-center">
          <div className="relative">
            {/* Quantum-style decorative graphic */}
            <div className="relative h-32 w-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/30">
              <div className="absolute inset-2 rounded-xl bg-slate-900/60 border border-cyan-400/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconSparkles className="h-8 w-8 text-cyan-300" />
                </div>
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  {Array.from({length: 8}).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-1 w-1 rounded-full bg-cyan-400/60"
                      style={{
                        left: `${20 + (i * 12)}%`,
                        top: `${30 + (i * 8)}%`
                      }}
                      animate={{
                        scale: [0.5, 1, 0.5],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DomainsMegaMenu() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <IconGlobe className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-cyan-200">Domain Services</h3>
        </div>
        <div className="space-y-3">
          <a href="#" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Domain Registration</div>
            <div className="text-sm text-slate-400">Register your perfect domain name</div>
            <div className="text-sm font-semibold text-cyan-300">From $12.99/year</div>
          </a>
          <a href="#" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Domain Transfer</div>
            <div className="text-sm text-slate-400">Transfer domains with ease</div>
            <div className="text-sm font-semibold text-cyan-300">Free with hosting</div>
          </a>
          <a href="#" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">DNS Management</div>
            <div className="text-sm text-slate-400">Advanced DNS control panel</div>
            <div className="text-sm font-semibold text-cyan-300">Included</div>
          </a>
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-2">
          <IconShield className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-cyan-200">Domain Protection</h3>
        </div>
        <div className="space-y-3">
          <a href="#" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">WHOIS Privacy</div>
            <div className="text-sm text-slate-400">Protect personal information</div>
            <div className="text-sm font-semibold text-cyan-300">$9.99/year</div>
          </a>
          <a href="#" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Domain Lock</div>
            <div className="text-sm text-slate-400">Prevent unauthorized transfers</div>
            <div className="text-sm font-semibold text-cyan-300">Free</div>
          </a>
        </div>
      </div>
    </div>
  );
}

function SupportMegaMenu() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <IconLifeBuoy className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-cyan-200">Get Help</h3>
        </div>
        <div className="space-y-3">
<a href={PUBLIC_CONFIG.whmcs.supportUrl} target="_blank" rel="noreferrer" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Support Tickets</div>
            <div className="text-sm text-slate-400">Open a new support ticket</div>
          </a>
          <a href="#" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Knowledge Base</div>
            <div className="text-sm text-slate-400">Browse tutorials and guides</div>
          </a>
          <a href="#/contact" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Contact Sales</div>
            <div className="text-sm text-slate-400">Pre-sales questions</div>
          </a>
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-2">
          <IconZap className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-cyan-200">Quick Actions</h3>
        </div>
        <div className="space-y-3">
<a href={PUBLIC_CONFIG.whmcs.clientAreaUrl} target="_blank" rel="noreferrer" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Client Portal</div>
            <div className="text-sm text-slate-400">Manage services & billing</div>
          </a>
          <a href="#/status" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">System Status</div>
            <div className="text-sm text-slate-400">Check service uptime</div>
          </a>
        </div>
      </div>
      <div>
        <div className="mb-4 flex items-center gap-2">
          <IconSparkles className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-cyan-200">Resources</h3>
        </div>
        <div className="space-y-3">
          <a href="#/blog" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Blog</div>
            <div className="text-sm text-slate-400">Latest news and tutorials</div>
          </a>
          <a href="#docs" className="group block rounded-lg border border-cyan-400/10 p-3 hover:border-cyan-400/30 hover:bg-cyan-500/5">
            <div className="font-medium text-cyan-100">Documentation</div>
            <div className="text-sm text-slate-400">API docs and guides</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function QPandaOnePager(){
  const [pandaPos,setPandaPos]=useState({x:120,y:320}); const [ring,setRing]=useState({x:0,y:0,show:false}); const [dialogOpen,setDialogOpen]=useState(false); const [activePlan,setActivePlan]=useState(null); const [clones,setClones]=useState([]); const [route,setRoute]=useState(getRouteFromHash()); const plansRef=useRef(null); const [highlightPlans,setHighlightPlans]=useState(false);
  const [activeMenu,setActiveMenu]=useState(null); const [menuTimeout,setMenuTimeout]=useState(null);

  useEffect(()=>{ setPandaPos({x:window.innerWidth*0.5,y:Math.min(window.innerHeight*0.35,360)}); },[]);
  useEffect(()=>{ const plan=getDeepLinkPlanFromURL(window.location.href); if(plan&&PLANS.some(p=>p.id===plan)){ setTimeout(()=>{ teleportTo(plan,window.innerWidth*0.5,window.innerHeight*0.35); },300);} },[]);
  useEffect(()=>{ const onHash=()=>setRoute(getRouteFromHash(window.location.hash)); window.addEventListener('hashchange',onHash); return ()=>window.removeEventListener('hashchange',onHash); },[]);

  const teleportTo=(id,x,y)=>{ const cx=clamp(Number(x)||window.innerWidth/2,0,window.innerWidth); const cy=clamp(Number(y)||window.innerHeight/2,0,window.innerHeight); setRing({x:cx,y:cy,show:true}); setTimeout(()=>setRing(r=>({...r,show:false})),450); setPandaPos({x:cx,y:cy}); setActivePlan(id); setDialogOpen(true); const mini=Array.from({length:3}).map((_,i)=>({id:Date.now()+i,x:cx+rand(-60,60),y:cy+rand(-60,60)})); setClones(mini); setTimeout(()=>setClones([]),900); };
  const handleSeePlans=()=>{ const el=plansRef.current; if(el?.scrollIntoView){ el.scrollIntoView({behavior:'smooth',block:'start'}); setHighlightPlans(true); setTimeout(()=>setHighlightPlans(false),1200);} };
  const openQuantumEntanglement=(e)=>{ const r=e?.currentTarget?.getBoundingClientRect?.(); const cx=r? r.left+r.width/2:window.innerWidth/2; const cy=r? r.top:window.innerHeight/2; teleportTo('quantum-entanglement',cx,cy); };

  const handleMenuOpen = (menu) => {
    if (menuTimeout) { clearTimeout(menuTimeout); setMenuTimeout(null); }
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    const timeout = setTimeout(() => setActiveMenu(null), 500);
    setMenuTimeout(timeout);
  };

  const handleMenuClose = () => {
    setActiveMenu(null);
    if (menuTimeout) { clearTimeout(menuTimeout); setMenuTimeout(null); }
  };

  const clearMenuTimeout = () => {
    if (menuTimeout) {
      clearTimeout(menuTimeout);
      setMenuTimeout(null);
    }
  };

  useEffect(()=>{ const i=setInterval(()=>{ setPandaPos(p=>({x:clamp(p.x+rand(-6,6),0,window.innerWidth),y:clamp(p.y+rand(-4,4),0,window.innerHeight)})); },1400); return()=>clearInterval(i); },[]);
  useEffect(()=>{ const fly=setInterval(()=>{ if(dialogOpen) return; const x=window.innerWidth*(0.15+Math.random()*0.7); const y=window.innerHeight*(0.15+Math.random()*0.5); setRing({x,y,show:true}); setTimeout(()=>setRing(r=>({...r,show:false})),320); setPandaPos({x,y}); setClones(Array.from({length:2}).map((_,i)=>({id:Date.now()+i,x:x+rand(-50,50),y:y+rand(-50,50)}))); setTimeout(()=>setClones([]),900); },12000); return()=>clearInterval(fly); },[dialogOpen]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
		<StaticOrnaments />
        {route.name!=='home'? (<SitePages route={route}/>) : (<>
          <section className="relative h-[90vh] overflow-hidden">
            <QuantumBackground2D/>
            <div className="pointer-events-none absolute inset-0">{PLAN_NODE_POS.map((n,i)=>(<div key={i} className="absolute" style={{top:`${n.top}%`,left:`${n.left}%`}}><div className="h-1 w-16 origin-left rotate-12 bg-gradient-to-r from-cyan-400/60 to-fuchsia-400/10 blur-[1px]"/></div>))}</div>
            <div className="absolute inset-0 hidden sm:block">{PLAN_NODE_POS.map(n=>(<PlanNode key={n.id} id={n.id} top={n.top} left={n.left} onClick={teleportTo}/>))}</div>
            <div className="relative z-10 mx-auto mt-16 sm:mt-20 md:mt-28 max-w-4xl px-4 sm:px-6 text-center">
  <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-cyan-200">
    <IconSparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5"/> Premium Hosting Infrastructure
  </div>
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 leading-tight">
    AI-Powered Hosting That Delivers Unbeatable Speed
  </h1>
  <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 px-2 sm:px-0">
    An AI co-pilot that monitors your site 24/7, optimizes performance in real-time, and instantly deploys your site across our global network for maximum performance and reliability.
  </p>
  <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
    <Button onClick={openQuantumEntanglement} className="w-full sm:w-auto bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30">
      Get Started Now
    </Button>
    <Button onClick={handleSeePlans} className="w-full sm:w-auto border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10">
      Compare Plans
    </Button>
  </div>

  {/* Social Proof Above The Fold */}
  <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-slate-900 bg-gradient-to-br from-cyan-400 to-blue-500"></div>
        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-slate-900 bg-gradient-to-br from-purple-400 to-pink-500"></div>
        <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border-2 border-slate-900 bg-gradient-to-br from-green-400 to-emerald-500"></div>
      </div>
      <div className="text-left">
        <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-cyan-200">
          <span>★★★★★</span>
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400">4.9/5 from 500+ reviews</div>
      </div>
    </div>
    <div className="hidden sm:block h-8 w-px bg-slate-700"></div>
    <div>
      <div className="text-lg sm:text-2xl font-bold text-cyan-200">10,000+</div>
      <div className="text-[10px] sm:text-xs text-slate-400">Websites powered</div>
    </div>
    <div className="hidden sm:block h-8 w-px bg-slate-700"></div>
    <div>
      <div className="text-lg sm:text-2xl font-bold text-cyan-200">99.9%</div>
      <div className="text-[10px] sm:text-xs text-slate-400">Uptime guarantee</div>
    </div>
  </div>
</div>
            <PandaTrail pos={pandaPos}/>
            <motion.div className="group fixed z-30" animate={{x:pandaPos.x,y:pandaPos.y}} transition={{type:'spring',stiffness:120,damping:16}}>
              <PandaFace/>
              <motion.div
                className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-cyan-400/30 bg-slate-900/95 px-2 py-1 text-xs text-cyan-200 opacity-0 backdrop-blur-sm group-hover:opacity-100 transition-opacity"
                initial={{opacity: 0, y: -5}}
                whileHover={{opacity: 1, y: 0}}
              >
                AI Assistant
              </motion.div>
            </motion.div>
            <TeleportRing x={ring.x} y={ring.y} show={ring.show}/>
            <AnimatePresence>{clones.map(c=>(<motion.div key={c.id} initial={{x:c.x,y:c.y,scale:0.6,opacity:0.8}} animate={{y:c.y-40,opacity:0}} exit={{opacity:0}} transition={{duration:0.8,ease:'easeOut'}} className="pointer-events-none fixed z-20"><PandaFace size={38}/></motion.div>))}</AnimatePresence>
          </section>

          <section ref={plansRef} id="plans" className="relative z-10 mx-auto -mt-10 max-w-6xl px-6 pb-24">
  <div className="mb-12">
    <h3 className="mb-6 text-2xl font-bold text-cyan-200">Shared Hosting Plans</h3>
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${highlightPlans?'rounded-3xl ring-2 ring-cyan-400/40 animate-pulse':''}`}>
      {PLANS.map(p => (
        <Card key={p.id} className="group relative overflow-hidden border border-cyan-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.15)]">
          <CardContent className="p-5">
            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity,repeatType:'mirror',duration:3.4,ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(56,189,248,0.4) 50%, transparent 60%)'}}/>
            <div className="mb-2 flex items-center gap-2 text-xs text-cyan-200">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5">{p.badge}</span>
            </div>
            <h3 className="text-lg font-bold text-cyan-100">{p.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
            <div className="mt-4 text-2xl font-semibold text-cyan-200">{p.price}<span className="text-sm text-slate-400">/mo</span></div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {p.features.map(f=>(<li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300"/> {f}</li>))}
            </ul>
            <div className="mt-4">
              <Button className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20" onClick={(e)=>{const r=e.currentTarget?.getBoundingClientRect?.(); const cx=r? r.left+r.width/2:window.innerWidth/2; const cy=r? r.top:window.innerHeight/2; teleportTo(p.id,cx,cy);}}>
                Start Your {p.badge} Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

          {/* TRUST SIGNALS */}
<section id="trust-signals" className="mx-auto max-w-6xl px-6 pb-24">
  <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-6">
    <div>
      <div className="text-3xl font-bold text-cyan-200">350</div>
      <div className="text-sm text-slate-400">Max accounts per server</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-cyan-200">$150+</div>
      <div className="text-sm text-slate-400">Value of included software</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-cyan-200">99.9%</div>
      <div className="text-sm text-slate-400">Uptime guarantee</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-cyan-200">13+</div>
      <div className="text-sm text-slate-400">Years hosting websites</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-cyan-200">4-24hrs</div>
      <div className="text-sm text-slate-400">Support response times</div>
    </div>
    <div>
      <div className="text-3xl font-bold text-cyan-200">30 days</div>
      <div className="text-sm text-slate-400">Money-back guarantee</div>
    </div>
  </div>
</section>

{/* WHAT MAKES US DIFFERENT */}
<section id="what-makes-us-different" className="mx-auto max-w-6xl px-6 pb-24">
  <h2 className="mb-12 text-center text-3xl font-bold text-cyan-200">What Makes Us Different</h2>
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <FeatureCard icon={<IconRocket className="h-5 w-5" />} title="Premium Stack, Standard Price" desc="LiteSpeed + CloudLinux + Imunify360 + low density = fast sites, reliable performance." />
    <FeatureCard icon={<IconServer className="h-5 w-5" />} title="Low-Density Infrastructure" desc="We limit servers to 300-350 accounts maximum. Each site has guaranteed resources." />
    <FeatureCard icon={<IconSparkles className="h-5 w-5" />} title="Enterprise Software, Included" desc="Software we include that competitors charge $100-150+/month extra for." />
    <FeatureCard icon={<IconLifeBuoy className="h-5 w-5" />} title="Real Support From Real Humans" desc="No AI chatbots. No offshore support reading from scripts." />
  </div>
</section>

{/* TECHNOLOGY STACK */}
<section id="tech-stack" className="mx-auto max-w-6xl px-6 pb-24">
  <h2 className="mb-12 text-center text-3xl font-bold text-cyan-200">Modern Performance Architecture</h2>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
    <div><h4 className="font-bold text-cyan-100">Web Server</h4><p className="text-slate-300">LiteSpeed + HTTP/3 + QUIC</p></div>
    <div><h4 className="font-bold text-cyan-100">Storage</h4><p className="text-slate-300">NVMe SSD in RAID</p></div>
    <div><h4 className="font-bold text-cyan-100">Operating System</h4><p className="text-slate-300">CloudLinux with CageFS</p></div>
    <div><h4 className="font-bold text-cyan-100">Caching</h4><p className="text-slate-300">LSCache + OpCache + Redis</p></div>
  </div>
</section>

{/* COMPARISON TABLE */}
<section id="comparison" className="mx-auto max-w-6xl px-6 pb-24">
  <h2 className="mb-12 text-center text-3xl font-bold text-cyan-200">Us vs. Budget Hosting</h2>
  <div className="overflow-x-auto rounded-lg border border-cyan-400/20 bg-white/5">
    <table className="w-full min-w-[600px] text-left">
      <thead>
        <tr className="border-b border-cyan-400/20">
          <th className="p-4" scope="col">Feature</th>
          <th className="p-4" scope="col">Budget Hosting</th>
          <th className="p-4" scope="col">Our Hosting</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-cyan-400/10"><th className="p-4 font-semibold" scope="row">Accounts per server</th><td className="p-4">1,000+</td><td className="p-4 text-cyan-200">300-350 max</td></tr>
        <tr className="border-b border-cyan-400/10"><th className="p-4 font-semibold" scope="row">Web server</th><td className="p-4">Apache 2.4</td><td className="p-4 text-cyan-200">LiteSpeed + HTTP/3</td></tr>
        <tr className="border-b border-cyan-400/10"><th className="p-4 font-semibold" scope="row">Resource guarantees</th><td className="p-4">None</td><td className="p-4 text-cyan-200">CloudLinux isolation</td></tr>
        <tr><th className="p-4 font-semibold" scope="row">Security suite</th><td className="p-4">Basic</td><td className="p-4 text-cyan-200">Imunify360 AI</td></tr>
      </tbody>
    </table>
  </div>
</section>

{/* USE CASES */}
<section id="use-cases" className="mx-auto max-w-6xl px-6 pb-24">
  <h2 className="mb-12 text-center text-3xl font-bold text-cyan-200">Perfect For</h2>
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <FeatureCard icon={<IconCpu className="h-5 w-5"/>} title="Small Business Websites" desc="Professional online presence with consistent performance." />
    <FeatureCard icon={<IconCpu className="h-5 w-5"/>} title="E-Commerce Stores" desc="Fast loading for better conversion rates." />
    <FeatureCard icon={<IconCpu className="h-5 w-5"/>} title="WordPress Sites" desc="Optimized with LiteSpeed Cache." />
  </div>
</section>

<section id="testimonials" className="mx-auto max-w-6xl px-6 pb-24">
  <div className="grid gap-6 md:grid-cols-3">
    <QuoteCard quote="Moved from a budget host after constant slowdowns. Night and day difference in performance." author="Client, Web Agency" />
    <QuoteCard quote="The migration was completely painless. They handled everything, and my site was faster instantly." author="Client, E-Commerce" />
    <QuoteCard quote="Support responds within hours, not days. Worth every penny." author="Client, Small Business" />
  </div>
</section>

<section id="faq" className="mx-auto max-w-6xl px-6 pb-24">
  <h3 className="mb-6 text-2xl font-bold text-cyan-100">Frequently Asked Questions</h3>
  <div className="divide-y divide-white/10 rounded-2xl border border-cyan-400/20 bg-white/5">
    <FAQItem q="Why are you more expensive than budget hosts?" a="We limit server density and include premium software worth over $150/month. Better infrastructure delivers better results." />
    <FAQItem q="Can I try it risk-free?" a="Yes, we have a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment." />
    <FAQItem q="Will you migrate my existing site?" a="Yes, we offer free basic migration with all plans." />
  </div>
</section>

<section className="mx-auto mb-28 max-w-6xl px-6">
  <Card className="border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-xl">
    <CardContent className="flex flex-col items-center justify-between gap-4 p-8 md:flex-row">
      <div>
        <h3 className="text-2xl font-bold text-cyan-100">Ready to Boost Your Site's Performance?</h3>
        <p className="mt-1 text-slate-300">Start in minutes. Free migration and 30-day money-back guarantee.</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSeePlans} className="bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30">
          <IconRocket className="mr-2 h-4 w-4" /> Get Started Today
        </Button>
      </div>
    </CardContent>
  </Card>
</section>
        </>)}
        <footer className="mx-auto max-w-6xl px-6 pb-12 text-sm text-slate-400"><div className="border-t border-white/10 pt-6 text-center space-y-2"><div>Powered by WHMCompleteSolution</div><div>© {new Date().getFullYear()} Blue Panda. All Rights Reserved.</div></div></footer>
        <PlanDialog open={dialogOpen} onOpenChange={setDialogOpen} planId={activePlan}/>
      </div>
    </ErrorBoundary>
  );
}

// ——— Feature/Metric/Quote/FAQ ———
const FeatureCard=({icon,title,desc})=>(<div className="group rounded-2xl border border-cyan-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200">{icon} <span>{title}</span></div><p className="text-slate-300">{desc}</p><div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full"/></div>);
const MetricCard=({label,value,sub})=>(<Card className="border border-cyan-400/20 bg-white/5 transition-transform duration-300 hover:-translate-y-0.5 text-center"><CardContent className="p-6"><div className="text-sm text-slate-300">{label}</div><motion.div initial={{opacity:0,y:4}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.4,ease:[0.16,1,0.3,1]}} className="mt-1 text-3xl font-extrabold text-cyan-200">{value}</motion.div><div className="mt-1 text-xs text-slate-400">{sub}</div></CardContent></Card>);
const QuoteCard=({quote,author})=>(<Card className="border border-cyan-400/20 bg-white/5 transition-transform duration-300 hover:-translate-y-0.5"><CardContent className="p-6"><p className="text-slate-200">“{quote}”</p><div className="mt-3 text-sm text-slate-400">— {author}</div></CardContent></Card>);
function FAQItem({q,a}){ const [open,setOpen]=useState(false); return (<div className="px-4 py-4"><button type="button" onClick={()=>setOpen(o=>!o)} className="flex w-full items-center justify-between gap-4 text-left"><span className="text-cyan-100">{q}</span><span className="rounded-full border border-cyan-400/30 px-2 py-0.5 text-xs text-cyan-200">{open?'−':'+'}</span></button><AnimatePresence initial={false}>{open&&(<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25,ease:[0.16,1,0.3,1]}} className="mt-2 overflow-hidden pr-8 text-slate-300">{a}</motion.p>)}</AnimatePresence></div>); }

// ——— Pages (hash-routed) ———
function SitePages({route}){ if(route.name==='contact') return <ContactPage/>; if(route.name==='status') return <StatusPage/>; if(route.name==='blog') return <BlogPage slug={route.slug}/>; return null; }
function ContactPage(){ const [form,setForm]=useState({name:'',company:'',email:'',phone:'',message:''}); const [sent,setSent]=useState(false); const onChange=(e)=>setForm({...form,[e.target.name]:e.target.value}); const onSubmit=(e)=>{ e.preventDefault(); if(!form.name||!form.email||!form.message) return; setSent(true); };
  return (<motion.section initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.35, ease:[0.16,1,0.3,1]}} className="mx-auto max-w-5xl px-6 py-16"><h2 className="text-3xl font-bold text-cyan-200">Contact</h2><p className="mt-2 text-slate-300">We usually reply within 1 business day.</p><Card className="mt-6 border border-cyan-400/20 bg-white/5"><CardContent className="p-6">{sent? (<div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-cyan-200">Thanks! We received your message.</div>) : (<form onSubmit={onSubmit} className="grid gap-4"><input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none"/><input name="company" value={form.company} onChange={onChange} placeholder="Company (optional)" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none"/><input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none"/><input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)" className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none"/><textarea name="message" value={form.message} onChange={onChange} placeholder="Message" rows={5} className="rounded-xl border border-white/10 bg-slate-950/60 p-3 text-slate-100 outline-none"/><div className="flex gap-2"><Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400" type="submit">Send</Button><a href="#/" className="inline-flex items-center rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200">Back</a></div></form>)}<div className="mt-6 flex flex-wrap items-center gap-3 text-sm"><a href={PUBLIC_CONFIG.whmcs.supportUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200 hover:bg-cyan-500/10">Open Support Portal</a><a href={PUBLIC_CONFIG.whmcs.clientAreaUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200 hover:bg-cyan-500/10">Client Area</a><a href="mailto:support@qpanda.io" className="rounded-xl border border-cyan-400/30 px-3 py-2 text-cyan-200 hover:bg-cyan-500/10">Email Support</a></div></CardContent></Card></motion.section>); }
function StatusPage(){ const incidents=[{id:1,date:'2025-08-10',title:'Edge PoP latency in APAC',status:'Resolved',detail:'Elevated latency due to upstream fiber maintenance. Auto-reroute engaged.'},{id:2,date:'2025-07-29',title:'Functions cold starts',status:'Monitoring',detail:'Cold starts briefly spiked after deploy; tuned caches.'}]; return (<motion.section initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.35, ease:[0.16,1,0.3,1]}} className="mx-auto max-w-5xl px-6 py-16"><h2 className="text-3xl font-bold text-cyan-200">Status</h2><div className="mt-4 grid gap-6 sm:grid-cols-3"><MetricCard label="Uptime (30d)" value="99.995%" sub="Core services"/><MetricCard label="Edge PoPs" value="58" sub="Global"/><MetricCard label="Median TTFB" value="62ms" sub="Worldwide"/></div><div className="mt-8 rounded-2xl border border-cyan-400/20 bg-white/5">{incidents.map(i=>(<div key={i.id} className="border-b border-white/10 p-4 last:border-0"><div className="flex items-center justify-between"><div className="text-cyan-100">{i.title}</div><span className="rounded-full border border-cyan-400/30 px-2 py-0.5 text-xs text-cyan-200">{i.status}</span></div><div className="mt-1 text-xs text-slate-400">{i.date}</div><p className="mt-2 text-slate-300">{i.detail}</p></div>))}</div><div className="mt-6"><a href="#/" className="text-cyan-300">← Back to home</a></div></motion.section>); }
function BlogPage({slug}){ const post=slug?POSTS.find(p=>p.slug===slug):null; if(post){ return (<motion.section initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.35, ease:[0.16,1,0.3,1]}} className="mx-auto max-w-3xl px-6 py-16"><a href="#/blog" className="text-cyan-300">← All posts</a><h2 className="mt-2 text-3xl font-bold text-cyan-200">{post.title}</h2><div className="text-xs text-slate-400">{post.date}</div><p className="mt-6 text-slate-300">{post.excerpt}</p><p className="mt-3 text-slate-300">(Full article content goes here.)</p></motion.section>);} return (<motion.section initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.35, ease:[0.16,1,0.3,1]}} className="mx-auto max-w-3xl px-6 py-16"><h2 className="text-3xl font-bold text-cyan-200">Blog</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{POSTS.map(p=>(<Card key={p.slug} className="border border-cyan-400/20 bg-white/5 transition-transform duration-300 hover:-translate-y-0.5"><CardContent className="p-6"><div className="text-xs text-slate-400">{p.date}</div><div className="mt-1 text-cyan-100">{p.title}</div><p className="mt-2 text-sm text-slate-300">{p.excerpt}</p><div className="mt-4"><a href={`#/blog/${p.slug}`} className="text-cyan-300">Read →</a></div></CardContent></Card>))}</div><div className="mt-6"><a href="#/" className="text-cyan-300">← Back to home</a></div></motion.section>); }