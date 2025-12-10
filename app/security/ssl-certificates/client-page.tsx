"use client";

import React from 'react';
import { motion } from 'framer-motion';
import LuminousCard from '@/app/components/LuminousCard';

// --- Reusable Components ---

const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconLock = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);
const CardContent = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`${className}`} {...p}>{children}</div>);
const Button = ({className="", children, ...p}: {className?: string, children: React.ReactNode, onClick?: () => void}) => (<button type="button" className={`inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition ${className}`} {...p}>{children}</button>);
const FeatureCard = ({icon, title, desc}: {icon: React.ReactNode, title: string, desc: string}) => (
    <LuminousCard className="h-full">
        <div className="p-5">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-500/10 px-2 py-1 text-xs text-green-200">{icon} <span>{title}</span></div>
            <p className="text-slate-300">{desc}</p>
            <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500 group-hover:w-full"/>
        </div>
    </LuminousCard>
);

// --- Page Specific Data ---

const SSL_PLANS = [
  {
    id: 'lets-encrypt-ssl',
    name: 'Free SSL Certificate',
    tagline: 'Basic SSL protection for your website',
    price: 'Free',
    features: ['Domain Validation', 'Auto-Renewal', '256-bit Encryption', 'Browser Trust', 'Easy Installation'],
    badge: 'Free'
  },
  {
    id: 'extended-ssl',
    name: 'Extended Validation SSL',
    tagline: 'Premium SSL with green address bar',
    price: '$99.99/year',
    features: ['Extended Validation', 'Green Address Bar', '$1M Warranty', 'Organization Verification', 'Premium Support'],
    badge: 'Premium'
  },
  {
    id: 'wildcard-ssl',
    name: 'Wildcard SSL Certificate',
    tagline: 'Secure unlimited subdomains',
    price: '$149.99/year',
    features: ['Unlimited Subdomains', 'Domain Validation', '256-bit Encryption', 'Auto-Renewal', 'Multi-Server License'],
    badge: 'Business'
  }
];

// --- Page Component ---

export default function SslCertificatesClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-3 py-1 text-xs text-green-200"><IconLock className="h-3.5 w-3.5"/> AI-Secured Certificates</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-400">SSL Certificates</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Encrypt your website&apos;s traffic and build trust with your visitors. Our SSL certificates are managed by our AI platform to ensure they are always valid, correctly configured, and renewed on time.
            </p>
        </div>

        {/* AI Features Section */}
        <section id="features" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-green-200">Beyond Encryption</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <FeatureCard
                    icon={<IconZap className="h-5 w-5"/>}
                    title="Automated Lifecycle Management"
                    desc="Our AI handles the entire SSL lifecycle: issuance, verification, and renewal. You&apos;ll never have to worry about an expired certificate again."
                />
                <FeatureCard
                    icon={<IconShield className="h-5 w-5"/>}
                    title="Continuous Configuration Monitoring"
                    desc="The platform constantly monitors your SSL/TLS configuration for weaknesses, ensuring you&apos;re always compliant with the latest security best practices."
                />
                <FeatureCard
                    icon={<IconLock className="h-5 w-5"/>}
                    title="Proactive Threat Response"
                    desc="If a vulnerability is discovered in an SSL/TLS protocol, our AI can automatically reconfigure your servers and reissue certificates to mitigate the threat."
                />
            </div>
        </section>

        {/* Pricing Section */}
        <section id="plans" className="my-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-green-200">Choose Your Certificate</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SSL_PLANS.map(p => (
                    <LuminousCard key={p.id} className="h-full">
                        <div className="p-5">
                            <div className="mb-2 flex items-center gap-2 text-xs text-green-200">
                                <span className="rounded-full border border-green-400/30 bg-green-500/10 px-2 py-0.5">{p.badge}</span>
                            </div>
                            <h3 className="text-lg font-bold text-green-100">{p.name}</h3>
                            <p className="mt-1 text-sm text-slate-300">{p.tagline}</p>
                            <div className="mt-4 text-3xl font-semibold text-green-200">{p.price}</div>
                            <ul className="mt-4 space-y-2 text-sm text-slate-200">
                                {p.features.map(f => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-300"/> {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <Button className="w-full bg-green-500 text-slate-900 hover:bg-green-400">
                                    Get Certificate
                                </Button>
                            </div>
                        </div>
                    </LuminousCard>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
