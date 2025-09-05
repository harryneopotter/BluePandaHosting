"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components from QPandaOnePager.jsx ---

const IconSparkles = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M5 15l.75 1.75L7.5 17.5 5.75 18.25 5 20l-.75-1.75L2.5 17.5 4.25 16.75 5 15z"/><path d="M18.5 14l.5 1.25L20.25 16l-1.25.75L18.5 18l-.5-1.25L16.75 16l1.25-.75.5-1.25z"/></svg>);
const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-cyan-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const PLANS = [
  {
    id: "standard",
    name: "Standard",
    tagline: "Perfect for personal websites and blogs.",
    price: "$45.00 USD",
    period: "annually",
    features: ["cPanel hosting","1 Website","10GB SSD Storage","Unmetered Bandwidth","Free SSL Certificate"],
    badge: "Basic"
  },
  {
    id: "business",
    name: "Business",
    tagline: "Best for medium and dynamic websites.",
    price: "$59.99 USD",
    period: "annually",
    features: ["Unlimited Websites","25GB SSD Storage","Unmetered Bandwidth","Free Domain (1 year)","Advanced Security"],
    badge: "Popular"
  },
  {
    id: "executive",
    name: "Executive",
    tagline: "Best for business and eCommerce websites.",
    price: "$99.99 USD",
    period: "annually",
    features: ["Unlimited Everything","50GB SSD Storage","Premium Performance","eCommerce Ready","Priority Support"],
    badge: "Pro"
  }
];

// --- Page Component ---

export default function SharedHostingClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"><IconSparkles className="h-3.5 w-3.5"/> AI-Enhanced Hosting</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400">Shared Hosting</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                The perfect starting point for your online journey. Our Shared Hosting is not just affordable and reliable—it&apos;s supercharged with AI to ensure your website is fast, secure, and always online.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-cyan-200">Your AI Co-Pilot for Success</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconZap className="h-5 w-5"/>}
                    title="AI-Powered Performance"
                    desc="Our AI constantly monitors server load and predicts traffic patterns, allocating resources proactively to keep your site running at peak speed, even during unexpected traffic spikes."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Proactive Security Shield"
                    desc="Forget about threats. Our AI-driven security system detects and neutralizes malware and vulnerabilities in real-time, long before they become a problem."
                />
                <FeatureCard
                    icon={<IconSparkles className="h-5 w-5"/>}
                    title="Intelligent Resource Allocation"
                    desc="Experience hosting that adapts to you. Our platform intelligently manages CPU and RAM, ensuring fair resource distribution and consistent performance for all users."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
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
                            <div className="mt-4 text-3xl font-semibold text-cyan-200">{p.price}</div>
                            <p className="text-xs text-slate-400">{p.period}</p>
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
      </div>
    </div>
  );
}
