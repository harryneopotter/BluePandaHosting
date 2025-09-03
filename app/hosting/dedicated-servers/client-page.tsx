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
    id: "xeon16gb",
    name: "Xeon 16GB",
    tagline: "Enterprise hardware with redundant power",
    price: "$205.00/mo",
    features: ["Intel Xeon CPU","8 Cores","16 GB RAM","1024 GB Disk","10 TB Bandwidth","99.9% Uptime SLA"],
    badge: "Enterprise",
    type: "dedicated"
  },
  {
    id: "xeon4gb",
    name: "Xeon 4GB",
    tagline: "Entry-level dedicated server",
    price: "Contact Sales",
    features: ["Intel Xeon CPU","4 Cores","4 GB RAM","500 GB Disk","5 TB Bandwidth","DDoS Protection"],
    badge: "Entry",
    type: "dedicated"
  },
  {
    id: "dualxeon24gb",
    name: "Dual Xeon 24GB",
    tagline: "Maximum performance dedicated server",
    price: "Contact Sales",
    features: ["Dual Intel Xeon","16 Cores","24 GB RAM","2048 GB Disk","20 TB Bandwidth","Premium Support"],
    badge: "Maximum",
    type: "dedicated"
  }
];

// --- Page Component ---

export default function DedicatedServersClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200"><IconRocket className="h-3.5 w-3.5"/> AI-Powered Bare Metal</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-cyan-400">Dedicated Servers</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                For the most demanding workloads, nothing beats a dedicated server. Get unparalleled performance, control, and security, backed by our proactive AI management platform.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-emerald-200">Your Mission Control</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconServer className="h-5 w-5"/>}
                    title="Preemptive Maintenance"
                    desc="Our AI analyzes hardware health in real-time to predict and prevent failures before they happen, ensuring maximum uptime for your critical applications."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Advanced Threat Intelligence"
                    desc="Dedicated servers get our most advanced AI security suite, with network-level threat detection and automated mitigation of sophisticated DDoS attacks."
                />
                <FeatureCard
                    icon={<IconRocket className="h-5 w-5"/>}
                    title="Automated Performance Tuning"
                    desc="Your server's performance is continuously optimized by our AI, which adjusts kernel parameters and resource priorities to match your workload."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-emerald-200">Dedicated Server Plans</h2>
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
      </div>
    </div>
  );
}
