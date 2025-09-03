"use client";

import type { Metadata } from 'next';
import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconMail = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const IconBriefcase = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>);
const IconUsers = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-teal-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-500/10 px-2 py-1 text-xs text-teal-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

export const metadata: Metadata = {
  title: 'OX Suite Business Email — QuantumPanda',
  description: 'Professional email and productivity suite for your business, powered by Open-Xchange and enhanced by AI.'
};

const OX_PLANS = [
  {
    id: 'ox-business-starter',
    name: 'Business Email Starter',
    tagline: 'Professional email for your domain',
    price: '$4.99/mo',
    features: ['10GB Mailbox', 'Shared Calendars', 'Contacts & Tasks', 'AI Spam Filtering', 'Mobile & Desktop Sync'],
    badge: 'Email'
  },
  {
    id: 'ox-business-pro',
    name: 'Business Email Pro',
    tagline: 'More storage and advanced features',
    price: '$7.99/mo',
    features: ['25GB Mailbox', 'Advanced Security', 'Email Archiving (1GB)', 'Shared Tasks', 'Priority Support'],
    badge: 'Email'
  },
  {
    id: 'ox-productivity-pro',
    name: 'Productivity Suite Pro',
    tagline: 'Full-featured office suite',
    price: '$12.99/mo',
    features: ['50GB Mailbox', 'Online Document Editor', 'Spreadsheet & Presentation Apps', '5GB Cloud Storage', 'Team Collaboration Tools'],
    badge: 'Suite'
  },
  {
    id: 'ox-productivity-enterprise',
    name: 'Productivity Suite Enterprise',
    tagline: 'For large teams and organizations',
    price: '$19.99/mo',
    features: ['100GB Mailbox', 'All Pro Features', 'Advanced Admin Controls', 'eDiscovery & Compliance', 'Dedicated Account Manager'],
    badge: 'Suite'
  },
];

// --- Page Component ---

export default function OxSuitePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-3 py-1 text-xs text-teal-200"><IconBriefcase className="h-3.5 w-3.5"/> AI-Powered Productivity</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-400">OX Suite Business Email</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Upgrade your business communication with a professional email and productivity suite. OX Suite, enhanced by our AI, helps your team collaborate more effectively.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-teal-200">Work Smarter, Not Harder</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconMail className="h-5 w-5"/>}
                    title="Smart Inbox"
                    desc="Our AI learns your email habits, prioritizing important messages, suggesting replies, and helping you reach inbox zero faster."
                />
                <FeatureCard
                    icon={<IconUsers className="h-5 w-5"/>}
                    title="Intelligent Collaboration"
                    desc="AI-powered scheduling finds the best meeting times for your team, and smart document suggestions help you find the files you need, when you need them."
                />
                <FeatureCard
                    icon={<IconBriefcase className="h-5 w-5"/>}
                    title="Automated Organization"
                    desc="Let our AI organize your life. It automatically categorizes emails, creates tasks from messages, and files documents in the right place for you."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-teal-200">OX Suite Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {OX_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-teal-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(20,184,166,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(20,184,166,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-teal-200">
                                <span className="rounded-full border border-teal-400/30 bg-teal-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-teal-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-teal-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-teal-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-teal-500 text-slate-900 hover:bg-teal-400">
                                    Choose Plan
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
