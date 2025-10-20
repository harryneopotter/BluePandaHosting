"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconCpu = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-sky-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-2 py-1 text-xs text-sky-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-sky-400 to-cyan-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const CLOUD_PLANS = [
  {
    id: 'starter-cloud',
    name: 'Starter Cloud',
    tagline: 'Auto-scaling, multi-zone redundancy',
    price: '$75/mo',
    features: ['Auto-scaling', 'Multi-zone redundancy', '99.95% uptime', 'Load balancing', 'Object storage'],
    badge: 'Starter'
  },
  {
    id: 'professional-cloud',
    name: 'Professional Cloud',
    tagline: 'Production-ready cloud infrastructure',
    price: '$175/mo',
    features: ['Auto-scaling', 'Multi-zone redundancy', '99.99% uptime', 'Load balancing', 'CDN included'],
    badge: 'Professional'
  },
  {
    id: 'enterprise-cloud',
    name: 'Enterprise Cloud',
    tagline: 'API-driven infrastructure',
    price: '$395/mo',
    features: ['Auto-scaling', 'Multi-zone redundancy', '99.99% uptime', 'Load balancing', 'API-driven infrastructure'],
    badge: 'Enterprise'
  }
];

// --- Page Component ---

export default function CloudHostingClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs text-sky-200"><IconZap className="h-3.5 w-3.5"/> API-Driven Cloud</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-400 to-fuchsia-400">Cloud Hosting</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Infinitely scalable, resilient, and intelligent cloud hosting, powered by an API-driven infrastructure for ultimate control.
            </p>
        </div>

        {/* Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-sky-200">The Future of Cloud is Here</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconCpu className="h-5 w-5"/>}
                    title="Auto-Scaling"
                    desc="Resources scale up or down instantly based on real-time traffic, ensuring you only pay for what you use."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Multi-Zone Redundancy"
                    desc="Your application is automatically distributed across multiple availability zones for high availability."
                />
                <FeatureCard
                    icon={<IconZap className="h-5 w-5"/>}
                    title="API-Driven Infrastructure"
                    desc="Manage your entire infrastructure through a powerful and intuitive API, giving you complete control."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-sky-200">Cloud Hosting Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {CLOUD_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-sky-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(14,165,233,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-sky-200">
                                <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-sky-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-sky-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-sky-500 text-slate-900 hover:bg-sky-400">
                                    Deploy Now
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
