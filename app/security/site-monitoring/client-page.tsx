"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconEye = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);


const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <div className="group rounded-2xl border border-yellow-400/20 bg-white/5 p-5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/7">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-500/10 px-2 py-1 text-xs text-yellow-200">{icon} <span>{title}</span></div>
        <p className="text-slate-300">{desc}</p>
        <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-yellow-400 to-amber-400 transition-all duration-500 group-hover:w-full"/>
    </div>
);

// --- Page Specific Data ---

const MONITORING_PLANS = [
  {
    id: 'basic-monitoring',
    name: 'Basic Monitoring',
    tagline: 'Essential uptime monitoring',
    price: '$9.99/mo',
    features: ['Uptime Monitoring', 'Email Alerts', '5-minute Checks', 'Status Page', 'Basic Reports'],
    badge: 'Starter'
  },
  {
    id: 'pro-monitoring',
    name: 'Pro Monitoring',
    tagline: 'Advanced monitoring with performance metrics',
    price: '$29.99/mo',
    features: ['Real User Monitoring', 'Performance Tracking', '1-minute Checks', 'Advanced Alerts', 'Custom Dashboards'],
    badge: 'Pro'
  },
  {
    id: 'enterprise-monitoring',
    name: 'Enterprise Monitoring',
    tagline: 'Complete monitoring solution',
    price: '$99.99/mo',
    features: ['Global Monitoring', 'API Monitoring', '30-second Checks', 'Slack Integration', 'SLA Reports'],
    badge: 'Enterprise'
  }
];

// --- Page Component ---

export default function SiteMonitoringClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-200"><IconEye className="h-3.5 w-3.5"/> AI-Powered Monitoring</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400">Site & Server Monitoring</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Go beyond simple uptime checks. Our AI-powered monitoring service is your early warning system, detecting issues and performance bottlenecks before they impact your users.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-yellow-200">See the Future</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconZap className="h-5 w-5"/>}
                    title="Predictive Alerts"
                    desc="Our AI analyzes trends to alert you about potential issues—like disk space shortages or traffic surges—before they become critical problems."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Smart Anomaly Detection"
                    desc="Forget alert fatigue. Our platform learns your site's normal behavior and only notifies you of statistically significant anomalies in performance or security."
                />
                <FeatureCard
                    icon={<IconEye className="h-5 w-5"/>}
                    title="Root Cause Analysis"
                    desc="When an issue is detected, our AI provides a detailed root cause analysis, helping you to resolve problems faster and more effectively."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-yellow-200">Monitoring Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MONITORING_PLANS.map(p => (
                    <Card key={p.id} className="group relative overflow-hidden border border-yellow-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(251,191,36,0.15)]">
                        <CardContent className="p-5">
                            <motion.div aria-hidden className="pointer-events-none absolute -inset-1 z-[1] opacity-10" initial={{x:-220}} animate={{x:220}} transition={{repeat:Infinity, repeatType:'mirror', duration:3.4, ease:'linear'}} style={{background:'linear-gradient(110deg, transparent 40%, rgba(251,191,36,0.4) 50%, transparent 60%)'}}/>
                            <div className="mb-2 flex items-center gap-2 text-xs text-yellow-200">
                                <span className="rounded-full border border-yellow-400/30 bg-yellow-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-yellow-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-yellow-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                                    Add Monitoring
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
