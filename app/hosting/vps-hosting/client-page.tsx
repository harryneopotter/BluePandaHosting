"use client";

import React from 'react';
import { motion } from 'framer-motion';

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
    id: "vps1024",
    name: "VPS 1024",
    tagline: "Unmanaged VPS for developers",
    price: "$25.99/mo",
    features: ["Linux VPS","1 Core CPU","1 GB Memory","40 GB Disk","1024 GB Bandwidth"],
    badge: "Starter",
    type: "unmanaged"
  },
  {
    id: "vps2048",
    name: "VPS 2048",
    tagline: "Most popular unmanaged option",
    price: "$39.99/mo",
    features: ["Linux VPS","2 vCore CPU","2 GB Memory","60 GB Disk","2048 GB Bandwidth"],
    badge: "Popular",
    type: "unmanaged"
  },
  {
    id: "vps4096",
    name: "VPS 4096",
    tagline: "High performance unmanaged VPS",
    price: "$59.99/mo",
    features: ["Linux VPS","3 vCore CPU","4 GB Memory","150 GB Disk","5120 GB Bandwidth"],
    badge: "Performance",
    type: "unmanaged"
  }
];

// --- Page Component ---

export default function VpsHostingClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-200"><IconCpu className="h-3.5 w-3.5"/> AI-Powered VPS</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-400 to-sky-400">VPS Hosting</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Take full control of your virtual environment. Our VPS hosting gives you the power and flexibility you need, with an AI assistant to manage scaling, security, and performance.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-fuchsia-200">Your Unfair Advantage</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconSparkles className="h-5 w-5"/>}
                    title="Intelligent Scaling"
                    desc="Our AI predicts your resource needs and suggests scaling options before you hit a bottleneck, ensuring smooth performance as you grow."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Automated Security Hardening"
                    desc="Your VPS is protected by an AI that constantly scans for vulnerabilities, applies patches, and configures firewall rules to keep you secure."
                />
                <FeatureCard
                    icon={<IconCpu className="h-5 w-5"/>}
                    title="Performance Optimization"
                    desc="Get recommendations from our AI on how to optimize your server configuration, database queries, and application code for maximum speed."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
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
      </div>
    </div>
  );
}
