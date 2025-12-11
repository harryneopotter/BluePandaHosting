"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconCpu = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconLifeBuoy = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8l-5.74 9.94M15.75 12l-7.5 0M12 2.25v3M12 18.75v3"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-purple-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-2 py-1 text-xs text-purple-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-purple-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const MANAGED_VPS_PLANS = [
  {
    id: "vpsm1024",
    name: "VPSM 1024",
    tagline: "Managed VPS with cPanel",
    price: "$45.99/mo",
    features: ["Linux VPS","1 Core CPU","1 GB Memory","40 GB Disk","Core Management","FREE cPanel"],
    badge: "Managed",
    type: "managed"
  },
  {
    id: "vpsm2048",
    name: "VPSM 2048",
    tagline: "Popular managed VPS solution",
    price: "$69.99/mo",
    features: ["Linux VPS","2 vCore CPU","2 GB Memory","60 GB Disk","Core Management","FREE cPanel"],
    badge: "Business",
    type: "managed"
  },
  {
    id: "vpsm4096",
    name: "VPSM 4096",
    tagline: "Premium managed VPS",
    price: "$109.99/mo",
    features: ["Linux VPS","3 vCore CPU","4 GB Memory","150 GB Disk","Core Management","FREE cPanel"],
    badge: "Premium",
    type: "managed"
  }
];

// --- Page Component ---

export default function FullyManagedVpsClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200"><IconLifeBuoy className="h-3.5 w-3.5"/> Fully Managed by AI</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400">Fully Managed VPS Hosting</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                All the power of a Virtual Private Server, with none of the hassle. Our AI-powered management platform handles all the technical details, so you can focus on what you do best.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-purple-200">Your AI Systems Administrator</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconLifeBuoy className="h-5 w-5"/>}
                    title="Proactive Support"
                    desc="Our AI anticipates issues and often resolves them before you're even aware. For everything else, our human experts are available 24/7."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Total Security Management"
                    desc="We manage firewall rules, run malware scans, and apply security patches. Your server is hardened and monitored by our AI security engine around the clock."
                />
                <FeatureCard
                    icon={<IconCpu className="h-5 w-5"/>}
                    title="Hands-Free Maintenance"
                    desc="From OS updates to backups and performance tuning, we handle everything. Enjoy a completely hands-off server management experience."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
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
