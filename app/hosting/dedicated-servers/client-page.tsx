"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconRocket = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3c4 1 7 4 7 8-2 0-5 1-7 3-2 2-3 5-3 7-4 0-7-3-8-7 2 0 5-1 7-3 2-2 3-5 4-8z"/><path d="M6 18l2-2M8 20l2-2"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconServer = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="9" width="20" height="4" rx="1"/><rect x="2" y="15" width="20" height="4" rx="1"/><circle cx="7" cy="5" r="1"/><circle cx="7" cy="11" r="1"/><circle cx="7" cy="17" r="1"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-emerald-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const DEDICATED_PLANS = [
  {
    id: "quantum-steel",
    name: "Quantum Steel",
    tagline: "Entry-level bare-metal server",
    price: "$195/mo",
    features: ["AMD Ryzen 5 5600X (6 cores)", "32GB DDR4 ECC RAM", "2x 512GB NVMe SSD", "1Gbps Unmetered"],
    badge: "Entry",
    type: "dedicated"
  },
  {
    id: "quantum-titanium",
    name: "Quantum Titanium",
    tagline: "Powerful dedicated server for production workloads",
    price: "$395/mo",
    features: ["AMD Ryzen 9 5950X (16 cores)", "128GB DDR4 ECC RAM", "2x 1TB NVMe SSD", "1Gbps Unmetered"],
    badge: "Production",
    type: "dedicated"
  },
  {
    id: "quantum-platinum",
    name: "Quantum Platinum",
    tagline: "Enterprise-grade dedicated server",
    price: "$795/mo",
    features: ["Dual Intel Xeon Gold 6342 (48 cores)", "256GB DDR4 ECC RAM", "4x 2TB NVMe SSD", "10Gbps Unmetered"],
    badge: "Enterprise",
    type: "dedicated"
  }
];

// --- Page Specific Data ---

const MANAGED_DEDICATED_PLANS = [
  {
    id: "managed-quantum-steel",
    name: "Managed Quantum Steel",
    tagline: "Full server management for entry-level dedicated servers",
    price: "$345/mo",
    features: ["OS installation & hardening", "Weekly security updates", "Basic monitoring & alerts", "24-hour support"],
    badge: "Managed",
    type: "managed"
  },
  {
    id: "managed-quantum-titanium",
    name: "Managed Quantum Titanium",
    tagline: "Proactive management with faster support",
    price: "$595/mo",
    features: ["Daily security updates", "Web server optimization", "Performance monitoring", "12-hour support"],
    badge: "Business",
    type: "managed"
  },
  {
    id: "managed-quantum-platinum",
    name: "Managed Quantum Platinum",
    tagline: "White-glove management with priority support",
    price: "$1195/mo",
    features: ["Real-time security monitoring", "Proactive performance optimization", "Application-level monitoring", "4-hour support"],
    badge: "Enterprise",
    type: "managed"
  }
];

// --- Page Component ---

export default function DedicatedServersClientPage() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"><IconRocket className="h-3.5 w-3.5"/> Bare-Metal Performance</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-cyan-400">Dedicated Servers</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Entire physical servers dedicated to your applications. Latest AMD Ryzen and Intel Xeon processors, NVMe SSD storage, and 10Gbps networking. No virtualization overhead. No shared resources.
            </p>
        </div>

        {/* Managed vs Unmanaged Section */}
        <section id="managed-vs-unmanaged" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-emerald-200">Managed vs. Unmanaged Dedicated</h2>
            <div className="grid gap-8 md:grid-cols-2">
                <Card className="border border-emerald-400/20 bg-white/5 p-6">
                    <h3 className="text-2xl font-bold text-emerald-100">Unmanaged Dedicated</h3>
                    <p className="text-slate-300 mt-2">You have complete control. You handle everything, from OS installation to security hardening.</p>
                    <Button onClick={() => scrollToSection('unmanaged-plans')} className="mt-4 bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/20">
                        For experienced sysadmins
                    </Button>
                </Card>
                <Card className="border border-green-400/20 bg-white/5 p-6">
                    <h3 className="text-2xl font-bold text-green-100">Managed Dedicated</h3>
                    <p className="text-slate-300 mt-2">We handle the server. You focus on your application, with our team managing the server.</p>
                    <Button onClick={() => scrollToSection('managed-plans')} className="mt-4 bg-green-500/10 border border-green-400/30 text-green-200 hover:bg-green-500/20">
                        For businesses without IT staff
                    </Button>
                </Card>
            </div>
        </section>

        {/* When to Choose Dedicated Section */}
        <section id="when-to-choose-dedicated" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-emerald-200">When to Choose Dedicated</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconRocket className="h-5 w-5"/>}
                    title="Maximum Performance"
                    desc="For when VPS resources aren't enough and maximum performance is critical to your business."
                />
                <FeatureCard
                    icon={<IconServer className="h-5 w-5"/>}
                    title="Consistent High-I/O"
                    desc="For databases and file servers that require consistent high-I/O performance without any sharing."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Compliance & Security"
                    desc="For when compliance requires physical isolation, or security requires physical separation from other tenants."
                />
            </div>
        </section>

        {/* Unmanaged Pricing Section */}
        <section id="unmanaged-plans" className="my-16 scroll-mt-20">
            <h2 className="mb-8 text-center text-3xl font-bold text-emerald-200">Unmanaged Dedicated Server Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {DEDICATED_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-emerald-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,197,94,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(34,197,94,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-emerald-200">
                                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-emerald-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-emerald-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-emerald-500 text-slate-900 hover:bg-emerald-400">
                                    Choose {p.name}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* Managed Pricing Section */}
        <section id="managed-plans" className="my-16 scroll-mt-20">
            <h2 className="mb-8 text-center text-3xl font-bold text-green-200">Managed Dedicated Server Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MANAGED_DEDICATED_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-green-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(74,222,128,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(74,222,128,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-green-200">
                                <span className="rounded-full border border-green-400/30 bg-green-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-green-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-green-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-green-500 text-slate-900 hover:bg-green-400">
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
