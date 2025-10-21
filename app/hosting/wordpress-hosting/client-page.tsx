"use client";

import React from 'react';
import { motion } from 'framer-motion';
import TechnicalFeatures from '../../components/TechnicalFeatures';

// --- Reusable Components ---

const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconSparkles = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M5 15l.75 1.75L7.5 17.5 5.75 18.25 5 20l-.75-1.75L2.5 17.5 4.25 16.75 5 15z"/><path d="M18.5 14l.5 1.25L20.25 16l-1.25.75L18.5 18l-.5-1.25L16.75 16l1.25-.75.5-1.25z"/></svg>);


const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-blue-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-1 text-xs text-blue-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const WP_PLANS = [
    {
        id: 'quantum-wp-solo',
        name: 'Quantum WP Solo',
        tagline: 'Perfect for single high-performance WordPress sites',
        price: '$85/mo',
        features: ['1 WordPress site', '25GB NVMe SSD storage', '100GB bandwidth/month', '50,000 monthly visits', 'LiteSpeed + LSCache optimization'],
        badge: 'Solo'
    },
    {
        id: 'quantum-wp-professional',
        name: 'Quantum WP Professional',
        tagline: 'For agencies and multiple WordPress sites',
        price: '$175/mo',
        features: ['5 WordPress sites', '100GB NVMe SSD storage', '250GB bandwidth/month', '250,000 monthly visits', 'Multi-site management dashboard'],
        badge: 'Professional'
    },
    {
        id: 'quantum-wp-enterprise',
        name: 'Quantum WP Enterprise',
        tagline: 'Maximum performance for high-traffic WordPress',
        price: '$395/mo',
        features: ['Unlimited WordPress sites', '250GB NVMe SSD storage', '500GB bandwidth/month', '1M+ monthly visits', 'Enterprise caching'],
        badge: 'Enterprise'
    }
];

// --- Page Component ---

export default function WordPressHostingClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200"><IconShield className="h-3.5 w-3.5"/> Fully Managed WordPress</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-400 to-sky-400">Managed WordPress Hosting</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Zero server management. Automatic updates, performance optimization, and security hardening. We handle the technical details so you can focus on your content.
            </p>
        </div>

        {/* Why Managed WordPress Section */}
        <section id="why-managed-wp" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-blue-200">Why Managed WordPress?</h2>
            <div className="text-center max-w-2xl mx-auto">
                <p className="text-slate-300">
                    WordPress is easy to install but hard to optimize. It can be slow and insecure if not maintained. We handle all of this automatically, so you can focus on what matters.
                </p>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-blue-200">Your Intelligent WordPress Partner</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconZap className="h-5 w-5"/>}
                    title="Performance Optimization"
                    desc="CMS-specific caching, CDN integration, image optimization, and database query optimization."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Security Management"
                    desc="Daily malware scanning, automatic security updates, and a firewall specific to your CMS."
                />
                <FeatureCard
                    icon={<IconSparkles className="h-5 w-5"/>}
                    title="Maintenance & Updates"
                    desc="Automatic core updates with rollback, plugin/theme update management, and database optimization."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-blue-200">Managed WordPress Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {WP_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-blue-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(59,130,246,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-blue-200">
                                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-blue-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-blue-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-blue-500 text-slate-900 hover:bg-blue-400">
                                    Get Started
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
