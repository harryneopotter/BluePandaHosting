"use client";

import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Components ---

const IconZap = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></svg>);
const IconShield = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 2l7 3v6c0 5-3.5 9-7 11-3.5-2-7-6-7-11V5l7-3z"/></svg>);
const IconCpu = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>);
const IconServer = (p: any) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="9" width="20" height="4" rx="1"/><rect x="2" y="15" width="20" height="4" rx="1"/><circle cx="7" cy="5" r="1"/><circle cx="7" cy="11" r="1"/><circle cx="7" cy="17" r="1"/></svg>);

const Card = ({className="", children, ...p}: {className?: string, children: React.ReactNode}) => (<div className={`rounded-2xl ${className}`} {...p}>{children}</div>);

// --- Page Component ---

export default function FeaturesClientPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-cyan-400 to-sky-400">Technical Features Explained</h1>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
                Every piece of software we include serves a specific purpose: to make your site faster, more secure, and more reliable.
            </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<IconZap className="h-6 w-6 text-green-300" />}
            title="LiteSpeed Web Server"
            description="A high-performance web server that's 40% faster than Apache, with built-in caching and HTTP/3 support."
          />
          <FeatureCard
            icon={<IconCpu className="h-6 w-6 text-green-300" />}
            title="CloudLinux OS"
            description="Isolates each account into its own protected environment, guaranteeing resources and preventing noisy neighbors."
          />
          <FeatureCard
            icon={<IconShield className="h-6 w-6 text-green-300" />}
            title="Imunify360 Security"
            description="AI-powered security that provides real-time threat detection, malware scanning, and intrusion prevention."
          />
          <FeatureCard
            icon={<IconServer className="h-6 w-6 text-green-300" />}
            title="JetBackup"
            description="Automated backups with one-click restoration for files, databases, and email."
          />
          <FeatureCard
            icon={<IconZap className="h-6 w-6 text-green-300" />}
            title="NVMe SSD Storage"
            description="Next-generation solid-state storage that's 5-10x faster than traditional hard drives."
          />
          <FeatureCard
            icon={<IconShield className="h-6 w-6 text-green-300" />}
            title="DDoS Protection"
            description="Network-level filtering that detects and blocks distributed denial-of-service attacks."
          />
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string; }) => (
  <Card className="border border-green-400/20 bg-white/5 p-6">
    <div className="flex items-center gap-4">
      {icon}
      <h3 className="text-xl font-bold text-green-200">{title}</h3>
    </div>
    <p className="mt-4 text-slate-300">{description}</p>
  </Card>
);
