"use client";

import type { Metadata } from 'next';
import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconGlobe = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20"/><path d="M8 12h8M12 8v8"/></svg>);
const IconSearch = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const IconShuffle = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="16 21 21 21 21 16"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>);


const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);

// --- Page Specific Data ---

export const metadata: Metadata = {
  title: 'Domain Services — QuantumPanda',
  description: 'Find, register, and transfer your domains with ease, powered by our AI-assisted tools.'
};

const REGISTRATION_PLANS = [
  {
    id: 'com-domain',
    name: '.com Domain',
    tagline: 'Most popular domain extension',
    price: '$12.99/year',
    features: ['Free WHOIS Privacy', 'DNS Management', 'Email Forwarding', 'Auto-Renewal', '24/7 Support'],
    badge: 'Popular'
  },
  {
    id: 'premium-domains',
    name: 'Premium Extensions',
    tagline: 'Stand out with unique extensions',
    price: 'From $19.99/year',
    features: ['.tech', '.io', '.ai', '.dev', '.app'],
    badge: 'Premium'
  }
];

const TRANSFER_PLAN = {
    id: 'domain-transfer',
    name: 'Domain Transfer Service',
    tagline: 'Move your domains with zero downtime',
    price: 'Free with hosting',
    features: ['Zero Downtime', 'Free Migration', 'DNS Management', 'Email Preservation', 'Expert Support'],
    badge: 'Free'
};


// --- Page Component ---

export default function DomainServicesPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-200"><IconGlobe className="h-3.5 w-3.5"/> AI-Powered Domains</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400">Domain Services</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Your online identity starts with the perfect domain. Our AI-powered tools help you find available domains, manage your portfolio, and transfer domains seamlessly.
            </p>
        </div>

        {/* Domain Search Section */}
        <section id="domain-search" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-indigo-200">Find Your Perfect Domain</h2>
            <div className="mx-auto max-w-2xl">
                <div className="relative">
                    <input type="text" placeholder="Search for a domain..." className="w-full rounded-xl border border-white/10 bg-slate-950/60 p-4 pr-24 text-lg text-slate-100 outline-none" />
                    <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-500 text-slate-900 hover:bg-indigo-400">
                        <IconSearch className="mr-2 h-4 w-4"/> Search
                    </Button>
                </div>
                <p className="mt-2 text-center text-sm text-slate-400">Our AI can suggest creative alternatives if your first choice is taken.</p>
            </div>
        </section>

        {/* Pricing Sections */}
        <section id="plans" className="my-16">
            <div className="mb-12">
                <h3 className="mb-6 text-2xl font-bold text-indigo-200">Domain Registration</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                    {REGISTRATION_PLANS.map(p => (
                        <Card key={p.id} className="group relative overflow-hidden border border-indigo-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)]">
                            <CardContent className="p-5">
                                <div className="mb-2 flex items-center gap-2 text-xs text-indigo-200">
                                    <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5">{p.badge}</span>
                                </div>
                                <h3 className="text-lg font-bold text-indigo-100">{p.name}</h3>
                                <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                                <div className="mt-4 text-3xl font-semibold text-indigo-200">{p.price}</div>
                                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                    {p.features.map(f => (
                                        <li key={f} className="flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-300"/> {f}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="mb-6 text-2xl font-bold text-indigo-200">Domain Transfer</h3>
                <Card className="group relative overflow-hidden border border-indigo-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)]">
                    <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="mb-2 flex items-center gap-2 text-xs text-indigo-200">
                                <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5">{TRANSFER_PLAN.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-indigo-100">{TRANSFER_PLAN.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{TRANSFER_PLAN.tagline}</p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {TRANSFER_PLAN.features.slice(0, 2).map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-semibold text-indigo-200">{TRANSFER_PLAN.price}</div>
                            <Button className="mt-4 bg-indigo-500/80 text-slate-900 hover:bg-indigo-400">
                                <IconShuffle className="mr-2 h-4 w-4"/> Transfer Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
      </div>
    </div>
  );
}
