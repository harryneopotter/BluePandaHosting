"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SCROLL_MARGIN_CLASS } from '../../config/uiConstants';
import TechnicalFeatures from '../../components/TechnicalFeatures';
import { LuminousCard } from '../../components/LuminousCard';

// --- Reusable Components from QPandaOnePager.jsx ---

const IconSparkles = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M5 15l.75 1.75L7.5 17.5 5.75 18.25 5 20l-.75-1.75L2.5 17.5 4.25 16.75 5 15z"/><path d="M18.5 14l.5 1.25L20.25 16l-1.25.75L18.5 18l-.5-1.25L16.75 16l1.25-.75.5-1.25z"/></svg>);
const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconRocket = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3c4 1 7 4 7 8-2 0-5 1-7 3-2 2-3 5-3 7-4 0-7-3-8-7 2 0 5-1 7-3 2-2 3-5 4-8z"/><path d="M6 18l2-2M8 20l2-2"/></svg>);
const IconLifeBuoy = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8l-5.74 9.94M15.75 12l-7.5 0M12 2.25v3M12 18.75v3"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<LuminousCard className={className} {...p}>{children}</LuminousCard>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
  <LuminousCard className="group border border-cyan-400/20 bg-white/5 p-5 backdrop-blur-xl">
    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200">{icon} <span>{title}</span></div>
    <p className="text-slate-300">{desc}</p>
    <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full"/>
  </LuminousCard>
);

// --- Page Specific Data ---

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

// --- Page Component ---

export default function SharedHostingClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400">Shared Hosting That Doesn't Suck</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Most hosting companies advertise "unlimited everything" for $3/month. They cram 1,000+ websites onto a single server and hope you don't notice. We do the exact opposite.
            </p>
        </div>

        {/* Our Approach Section */}
        <section id="approach" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-cyan-200">Our Approach: Premium Infrastructure</h2>
            <div className="grid gap-6 md:grid-cols-2">
                <div>
                    <h3 className="text-xl font-bold text-cyan-100">Low-Density Hosting</h3>
                    <p className="text-slate-300 mt-2">We limit each server to 300-350 accounts. This means 3x more available resources per site, faster page loads, and better uptime.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-cyan-100">Enterprise-Grade Technology</h3>
                    <p className="text-slate-300 mt-2">Every plan includes LiteSpeed, CloudLinux, Imunify360, and JetBackup—a software stack worth over $150/month.</p>
                </div>
            </div>
        </section>

        {/* What You Actually Get Section */}
        <section id="what-you-get" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-cyan-200">What You Actually Get</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <FeatureCard icon={<IconZap className="h-5 w-5"/>} title="Speed That Matters" desc="NVMe SSD Storage, LiteSpeed + LSCache, and HTTP/3 Protocol." />
                <FeatureCard icon={<IconShield className="h-5 w-5"/>} title="Security That Works" desc="Daily malware scanning, Imunify360 protection, and free SSL certificates." />
                <FeatureCard icon={<IconRocket className="h-5 w-5"/>} title="Backups You Can Trust" desc="Automated daily backups with easy one-click restoration." />
                <FeatureCard icon={<IconLifeBuoy className="h-5 w-5"/>} title="Support That Responds" desc="Real humans with 13+ years of hosting experience." />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-cyan-200">Choose Your Plan</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-cyan-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(56,189,248,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-cyan-200">
                                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-cyan-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-cyan-200">{p.price}<span className="text-sm text-slate-400">/mo</span></div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400">
                                    Choose {p.name}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        <TechnicalFeatures />

      </div>
    </div>
  );
}
