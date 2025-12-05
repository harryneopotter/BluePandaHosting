"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SCROLL_MARGIN_CLASS } from '../../config/uiConstants';
import { scrollToSection } from '../../lib/scrollUtils';

// --- Reusable Components ---

const IconSparkles = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M5 15l.75 1.75L7.5 17.5 5.75 18.25 5 20l-.75-1.75L2.5 17.5 4.25 16.75 5 15z"/><path d="M18.5 14l.5 1.25L20.25 16l-1.25.75L18.5 18l-.5-1.25L16.75 16l1.25-.75.5-1.25z"/></svg>);
const IconCpu = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-fuchsia-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-2 py-1 text-xs text-fuchsia-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-fuchsia-400 to-purple-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const VPS_PLANS = [
  {
    id: "quantum-flux",
    name: "Quantum Flux",
    tagline: "Entry-level VPS for experienced users",
    price: "$45/mo",
    features: ["2 vCPU cores", "4GB DDR4 ECC RAM", "80GB NVMe SSD", "3TB/month Bandwidth"],
    badge: "Starter",
    type: "unmanaged"
  },
  {
    id: "quantum-warp",
    name: "Quantum Warp",
    tagline: "Mid-tier VPS for growing applications",
    price: "$85/mo",
    features: ["4 vCPU cores", "8GB DDR4 ECC RAM", "160GB NVMe SSD", "5TB/month Bandwidth"],
    badge: "Popular",
    type: "unmanaged"
  },
  {
    id: "quantum-nexus",
    name: "Quantum Nexus",
    tagline: "High-performance VPS for demanding applications",
    price: "$165/mo",
    features: ["8 vCPU cores", "16GB DDR4 ECC RAM", "320GB NVMe SSD", "8TB/month Bandwidth"],
    badge: "Performance",
    type: "unmanaged"
  }
];

// --- Page Specific Data ---

const MANAGED_VPS_PLANS = [
  {
    id: "managed-quantum-flux",
    name: "Managed Quantum Flux",
    tagline: "Full server management for entry-level VPS",
    price: "$95/mo",
    features: ["OS installation & hardening", "Weekly security updates", "Basic monitoring & alerts", "24-hour support"],
    badge: "Managed",
    type: "managed"
  },
  {
    id: "managed-quantum-warp",
    name: "Managed Quantum Warp",
    tagline: "Proactive management with faster support",
    price: "$145/mo",
    features: ["Daily security updates", "Web server optimization", "Performance monitoring", "12-hour support"],
    badge: "Business",
    type: "managed"
  },
  {
    id: "managed-quantum-nexus",
    name: "Managed Quantum Nexus",
    tagline: "White-glove management with priority support",
    price: "$265/mo",
    features: ["Real-time security monitoring", "Proactive performance optimization", "Application-level monitoring", "4-hour support"],
    badge: "Enterprise",
    type: "managed"
  }
];

// --- Page Component ---

export default function VpsHostingClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-200"><IconCpu className="h-3.5 w-3.5"/> Virtual Private Servers</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-400 to-sky-400">VPS Hosting Built for Performance</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Dedicated resources, complete isolation, full control. KVM virtualization with NVMe storage, guaranteed RAM and CPU, and your choice of management level.
            </p>
        </div>

        {/* Managed vs Unmanaged Section */}
        <section id="managed-vs-unmanaged" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-fuchsia-200">Managed vs. Unmanaged VPS</h2>
            <div className="grid gap-8 md:grid-cols-2">
                <Card className="border border-fuchsia-400/20 bg-white/5 p-6">
                    <h3 className="text-2xl font-bold text-fuchsia-100">Unmanaged VPS</h3>
                    <p className="text-slate-300 mt-2">You have full control. You handle everything, from OS installation to security hardening.</p>
                    <Button onClick={() => scrollToSection('unmanaged-plans')} className="mt-4 bg-fuchsia-500/10 border border-fuchsia-400/30 text-fuchsia-200 hover:bg-fuchsia-500/20">
                        For experienced sysadmins
                    </Button>
                </Card>
                <Card className="border border-purple-400/20 bg-white/5 p-6">
                    <h3 className="text-2xl font-bold text-purple-100">Managed VPS</h3>
                    <p className="text-slate-300 mt-2">We handle the technical details. You focus on your application, with our team managing the server.</p>
                    <Button onClick={() => scrollToSection('managed-plans')} className="mt-4 bg-purple-500/10 border border-purple-400/30 text-purple-200 hover:bg-purple-500/20">
                        For businesses without IT staff
                    </Button>
                </Card>
            </div>
        </section>

        {/* When to Choose VPS Section */}
        <section id="when-to-choose-vps" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-fuchsia-200">When to Choose VPS</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconSparkles className="h-5 w-5"/>}
                    title="Guaranteed Performance"
                    desc="Your site consistently hits resource limits on shared hosting and needs guaranteed performance."
                />
                <FeatureCard
                    icon={<IconCpu className="h-5 w-5"/>}
                    title="Custom Software"
                    desc="You require custom software not available on shared hosting, or need root access for server-level configurations."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Better Security"
                    desc="You have multiple high-traffic sites or need better security isolation for sensitive data."
                />
            </div>
        </section>

        {/* Unmanaged Pricing Section */}
        <section id="unmanaged-plans" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-fuchsia-200">Unmanaged VPS Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {VPS_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-fuchsia-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(168,85,247,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-fuchsia-200">
                                <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-fuchsia-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-fuchsia-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-fuchsia-500 text-slate-900 hover:bg-fuchsia-400">
                                    Choose {p.name}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* Managed Pricing Section */}
        <section id="managed-plans" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-purple-200">Managed VPS Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MANAGED_VPS_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-purple-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(147,51,234,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(147,51,234,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-purple-200">
                                <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-purple-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-purple-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-purple-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-purple-500 text-slate-900 hover:bg-purple-400">
                                    Choose {p.name}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
