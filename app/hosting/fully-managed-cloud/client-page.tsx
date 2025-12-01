"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SCROLL_MARGIN_CLASS } from '../../config/uiConstants';

// --- Reusable Components ---

const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconLifeBuoy = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8l-5.74 9.94M15.75 12l-7.5 0M12 2.25v3M12 18.75v3"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-pink-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-2 py-1 text-xs text-pink-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-pink-400 to-fuchsia-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const MANAGED_CLOUD_PLANS = [
  {
    id: 'managed-cloud-starter',
    name: 'Managed Cloud Starter',
    tagline: 'For businesses that want to start small',
    price: '$59.99/mo',
    features: ['1 vCPU', '2GB RAM', '25GB SSD', 'Auto-scaling', 'Full Management', '24/7 Priority Support'],
    badge: 'Managed'
  },
  {
    id: 'managed-cloud-pro',
    name: 'Managed Cloud Pro',
    tagline: 'For production workloads and applications',
    price: '$99.99/mo',
    features: ['4 vCPU', '8GB RAM', '100GB SSD', 'Load Balancer', 'Full Management', 'Dedicated Account Manager'],
    badge: 'Business'
  }
];

// --- Page Component ---

export default function FullyManagedCloudClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-3 py-1 text-xs text-pink-200"><IconLifeBuoy className="h-3.5 w-3.5"/> AI Concierge</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-400 to-purple-400">Fully Managed Cloud Hosting</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Experience the scalability of the cloud with the peace of mind of a fully managed service. Our AI platform and expert engineers are your dedicated cloud operations team.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-pink-200">Your Cloud, Our Responsibility</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconZap className="h-5 w-5"/>}
                    title="AI-Driven Optimization"
                    desc="We don't just manage your cloud, we optimize it. Our AI continuously fine-tunes your infrastructure for the best balance of performance and cost."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Comprehensive Security"
                    desc="From network firewalls to application-level security, we provide a multi-layered defense, managed and monitored 24/7 by our AI and security experts."
                />
                <FeatureCard
                    icon={<IconLifeBuoy className="h-5 w-5"/>}
                    title="Expert Support & Guidance"
                    desc="Get strategic advice on your architecture, deployments, and scaling from a team of certified cloud engineers, assisted by our AI co-pilot."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className={`my-16 ${SCROLL_MARGIN_CLASS}`}>
            <h2 className="mb-8 text-center text-3xl font-bold text-pink-200">Managed Cloud Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {MANAGED_CLOUD_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-pink-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(236,72,153,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-pink-200">
                                <span className="rounded-full border border-pink-400/30 bg-pink-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-pink-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-pink-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-pink-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-pink-500 text-slate-900 hover:bg-pink-400">
                                    Get a Quote
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
