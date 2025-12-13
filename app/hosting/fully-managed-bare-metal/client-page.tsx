"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SCROLL_MARGIN_CLASS } from '../../config/uiConstants';
import { LuminousCard } from '../../components/LuminousCard';

// --- Reusable Components ---

const IconRocket = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 3c4 1 7 4 7 8-2 0-5 1-7 3-2 2-3 5-3 7-4 0-7-3-8-7 2 0 5-1 7-3 2-2 3-5 4-8z"/><path d="M6 18l2-2M8 20l2-2"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconLifeBuoy = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8l-5.74 9.94M15.75 12l-7.5 0M12 2.25v3M12 18.75v3"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<LuminousCard className={className} {...p}>{children}</LuminousCard>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <LuminousCard className="group border border-red-400/20 bg-white/5 p-5 backdrop-blur-xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-2 py-1 text-xs text-red-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-red-400 to-pink-400 transition-all duration-500 group-hover:w-full"/>
    </LuminousCard>
);

// --- Page Specific Data ---

const MANAGED_DEDICATED_PLANS = [
    {
        id: "managed-xeon16gb",
        name: "Managed Xeon 16GB",
        tagline: "Fully managed enterprise hardware",
        price: "$349.00/mo",
        features: ["Full Management", "Intel Xeon CPU","8 Cores","16 GB RAM","1024 GB Disk","10 TB Bandwidth","Proactive Monitoring"],
        badge: "Enterprise"
    },
    {
        id: "managed-dualxeon24gb",
        name: "Managed Dual Xeon 24GB",
        tagline: "Maximum performance, fully managed",
        price: "Contact Sales",
        features: ["Full Management", "Dual Intel Xeon","16 Cores","24 GB RAM","2048 GB Disk","20 TB Bandwidth","Dedicated Support Team"],
        badge: "Maximum"
    }
];

// --- Page Component ---

export default function FullyManagedBareMetalClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs text-red-200"><IconLifeBuoy className="h-3.5 w-3.5"/> White Glove Service</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-pink-400 to-fuchsia-400">Fully Managed Bare Metal</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Absolute power, zero administration. Get a dedicated physical server, fully managed and optimized by our AI platform, for your most critical applications.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-red-200">Your Outsourced Infrastructure Team</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconRocket className="h-5 w-5"/>}
                    title="Bespoke Performance Tuning"
                    desc="Our engineers, assisted by AI, will fine-tune every aspect of your server—from the OS kernel to the application stack—for your specific workload."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Ironclad Security"
                    desc="We provide a fortress of security with dedicated firewalls, intrusion detection systems, and a dedicated security team monitoring your server 24/7."
                />
                <FeatureCard
                    icon={<IconLifeBuoy className="h-5 w-5"/>}
                    title="Strategic Capacity Planning"
                    desc="Our AI analyzes your usage patterns to provide strategic advice on when to scale, ensuring you're always ahead of your growth curve."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-red-200">Managed Bare Metal Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {MANAGED_DEDICATED_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-red-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(248,113,113,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(248,113,113,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-red-200">
                                <span className="rounded-full border border-red-400/30 bg-red-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-red-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-red-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-red-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-red-500 text-slate-900 hover:bg-red-400">
                                    Contact Sales
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
