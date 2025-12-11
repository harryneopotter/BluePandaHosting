"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconMail = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconArchive = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-orange-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-2 py-1 text-xs text-orange-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const SPAMEXPERTS_PLANS = [
  {
    id: 'spamexperts-starter',
    name: 'SpamExperts Starter',
    tagline: 'For personal and small domain use',
    price: '$2.99/mo',
    features: ['1 Domain', 'Incoming Filter', '99.98% Accuracy', 'Quarantine Reports', '24/7 Support'],
    badge: 'Starter'
  },
  {
    id: 'spamexperts-business',
    name: 'SpamExperts Business',
    tagline: 'For small to medium businesses',
    price: '$7.99/mo',
    features: ['Up to 5 Domains', 'Incoming & Outgoing Filter', 'Advanced Threat Detection', 'Per-User Black/Whitelist', 'Daily Reports'],
    badge: 'Business'
  },
  {
    id: 'spamexperts-enterprise',
    name: 'SpamExperts Enterprise',
    tagline: 'Complete email security and archiving',
    price: '$19.99/mo',
    features: ['Unlimited Domains', 'Incoming & Outgoing Filter', 'Email Archiving (10GB)', 'Advanced Reporting', 'API Access'],
    badge: 'Enterprise'
  }
];

// --- Page Component ---

export default function SpamExpertsClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-200"><IconShield className="h-3.5 w-3.5"/> AI-Powered Email Security</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-400">SpamExperts Email Security</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Reclaim your inbox. Our AI-enhanced SpamExperts service filters out spam, viruses, and phishing attacks with near-perfect accuracy, keeping your communication secure and efficient.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-orange-200">The Smartest Filter on the Web</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconMail className="h-5 w-5"/>}
                    title="Predictive Threat Detection"
                    desc="Our AI analyzes global email patterns to identify new spam and phishing campaigns in real-time, blocking them before they reach your inbox."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Intelligent Outbound Filtering"
                    desc="Protect your brand's reputation. Our AI monitors outgoing mail to prevent a compromised account from sending spam, which could get your domain blacklisted."
                />
                <FeatureCard
                    icon={<IconArchive className="h-5 w-5"/>}
                    title="Smart Archiving"
                    desc="Securely archive all your email communications in a searchable, compliant, and AI-organized cloud archive. Never lose an important email again."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-orange-200">SpamExperts Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SPAMEXPERTS_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-orange-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(251,146,60,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(251,146,60,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-orange-200">
                                <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-orange-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-orange-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-orange-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-orange-500 text-slate-900 hover:bg-orange-400">
                                    Add Protection
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
