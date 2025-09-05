"use client";

import React, { useState } from "react";
import Link from "next/link";

// Sidebar-based Hosting mega menu matching the original pattern with a content panel
export default function HostingMegaMenu() {
  type Cat = { id: string; title: string; group: "hosting" | "managed" };
  const CATEGORIES: Cat[] = [
    { id: "shared-hosting", title: "Shared Hosting", group: "hosting" },
    { id: "vps-hosting", title: "VPS Hosting", group: "hosting" },
    { id: "dedicated-servers", title: "Dedicated Servers", group: "hosting" },
    { id: "cloud-hosting", title: "Cloud Hosting", group: "hosting" },
    { id: "wordpress-hosting", title: "WordPress Hosting", group: "managed" },
    { id: "fully-managed-vps", title: "Fully Managed VPS", group: "managed" },
    { id: "fully-managed-cloud", title: "Fully Managed Cloud", group: "managed" },
    { id: "fully-managed-bare-metal", title: "Fully Managed Bare Metal", group: "managed" },
  ];

  const ROUTES: Record<string, string> = {
    "shared-hosting": "/hosting/shared-hosting",
    "vps-hosting": "/hosting/vps-hosting",
    "dedicated-servers": "/hosting/dedicated-servers",
    "cloud-hosting": "/hosting/cloud-hosting",
    "wordpress-hosting": "/hosting/wordpress-hosting",
    "fully-managed-vps": "/hosting/fully-managed-vps",
    "fully-managed-cloud": "/hosting/fully-managed-cloud",
    "fully-managed-bare-metal": "/hosting/fully-managed-bare-metal",
  };

  type Item = { name: string; tagline: string; price: string; features: string[]; href: string };
  const CONTENT: Record<string, { title: string; description: string; items: Item[] }> = {
    "shared-hosting": {
      title: "Shared Hosting",
      description: "Perfect for personal websites and small businesses",
      items: [
        { name: "Standard", tagline: "Great for starters", price: "$45/yr", features: ["1 site", "10GB SSD", "Free SSL"], href: ROUTES["shared-hosting"] },
        { name: "Business", tagline: "Growing teams", price: "$59.99/yr", features: ["5 sites", "25GB SSD", "Daily backups"], href: ROUTES["shared-hosting"] }
      ]
    },
    "vps-hosting": {
      title: "VPS Hosting",
      description: "Scalable virtual servers with full control",
      items: [
        { name: "VPS 2048", tagline: "Most popular", price: "$39.99/mo", features: ["2 vCPU", "2GB RAM", "60GB SSD"], href: ROUTES["vps-hosting"] },
        { name: "VPS 4096", tagline: "Performance tier", price: "$59.99/mo", features: ["3 vCPU", "4GB RAM", "150GB SSD"], href: ROUTES["vps-hosting"] }
      ]
    },
    "dedicated-servers": {
      title: "Dedicated Servers",
      description: "Maximum performance and control",
      items: [
        { name: "Xeon 16GB", tagline: "Enterprise hardware", price: "$205/mo", features: ["8 cores", "16GB RAM", "1TB Disk"], href: ROUTES["dedicated-servers"] },
        { name: "Dual Xeon 24GB", tagline: "Maximum power", price: "Contact sales", features: ["16 cores", "24GB RAM", "2TB Disk"], href: ROUTES["dedicated-servers"] }
      ]
    },
    "cloud-hosting": {
      title: "Cloud Hosting",
      description: "Elastic resources on demand",
      items: [
        { name: "Cloud Starter", tagline: "Dev/test workloads", price: "$19.99/mo", features: ["1 vCPU", "2GB RAM", "25GB SSD"], href: ROUTES["cloud-hosting"] },
        { name: "Cloud Pro", tagline: "Production ready", price: "$49.99/mo", features: ["4 vCPU", "8GB RAM", "100GB SSD"], href: ROUTES["cloud-hosting"] }
      ]
    },
    "wordpress-hosting": {
      title: "WordPress Hosting",
      description: "Managed, optimized WordPress",
      items: [
        { name: "WP Starter", tagline: "Beginner friendly", price: "$29.99/mo", features: ["1 WP site", "Auto updates", "CDN"], href: ROUTES["wordpress-hosting"] },
        { name: "WP Business", tagline: "For teams", price: "$79.99/mo", features: ["5 WP sites", "Advanced security", "Priority support"], href: ROUTES["wordpress-hosting"] }
      ]
    },
    "fully-managed-vps": {
        title: "Fully Managed VPS",
        description: "The power of a VPS, with none of the hassle.",
        items: [
            { name: "VPSM 2048", tagline: "Popular managed solution", price: "$69.99/mo", features: ["2 vCPU", "2GB RAM", "Full Management"], href: ROUTES["fully-managed-vps"] },
            { name: "VPSM 4096", tagline: "Premium managed VPS", price: "$109.99/mo", features: ["3 vCPU", "4GB RAM", "Full Management"], href: ROUTES["fully-managed-vps"] }
        ]
    },
    "fully-managed-cloud": {
        title: "Fully Managed Cloud",
        description: "Scalability with a white-glove service.",
        items: [
            { name: "Managed Cloud Starter", tagline: "For growing businesses", price: "$59.99/mo", features: ["1 vCPU", "2GB RAM", "Full Management"], href: ROUTES["fully-managed-cloud"] },
            { name: "Managed Cloud Pro", tagline: "For production workloads", price: "$99.99/mo", features: ["4 vCPU", "8GB RAM", "Full Management"], href: ROUTES["fully-managed-cloud"] }
        ]
    },
    "fully-managed-bare-metal": {
        title: "Fully Managed Bare Metal",
        description: "Ultimate power, zero administration.",
        items: [
            { name: "Managed Xeon 16GB", tagline: "Enterprise hardware", price: "$349/mo", features: ["8 cores", "16GB RAM", "Full Management"], href: ROUTES["fully-managed-bare-metal"] },
            { name: "Managed Dual Xeon", tagline: "Maximum performance", price: "Contact Sales", features: ["16 cores", "24GB RAM", "Full Management"], href: ROUTES["fully-managed-bare-metal"] }
        ]
    }
  };

  const [selected, setSelected] = useState<string>("shared-hosting");
  const data = CONTENT[selected];

  return (
    <div className="flex h-[480px] gap-0">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-700/50 bg-slate-950/30 p-4">
        <div className="space-y-1">
          <div className="mb-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">HOSTING</div>
            {CATEGORIES.filter(c => c.group === "hosting").map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)} className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-left transition-colors ${selected === c.id ? 'bg-cyan-500/10 text-cyan-200 border border-cyan-400/20' : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50'}`}>
                {c.title}
              </button>
            ))}
          </div>
          <div className="h-px bg-slate-700/50 my-4" />
          <div className="mb-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">MANAGED SERVICES</div>
            {CATEGORIES.filter(c => c.group === "managed").map((c) => (
              <button key={c.id} onClick={() => setSelected(c.id)} className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-left transition-colors ${selected === c.id ? 'bg-cyan-500/10 text-cyan-200 border border-cyan-400/20' : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50'}`}>
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-cyan-200">{data?.title}</h3>
          <p className="text-sm text-slate-400 mt-1">{data?.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data?.items.slice(0, 2).map((it) => (
            <Link key={it.name} href={it.href} className="group block rounded-lg border border-cyan-400/10 p-4 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-cyan-100">{it.name}</div>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-200">{it.price}</span>
              </div>
              <div className="text-sm text-slate-400 mb-3">{it.tagline}</div>
              <ul className="space-y-1 text-xs text-slate-300">
                {it.features.map((f) => (
                  <li key={f} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-cyan-400" />{f}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          {ROUTES[selected] ? (
            <Link href={ROUTES[selected]} className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50">
              View All Plans
            </Link>
          ) : (
            <Link href="/hosting" className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50">
              View All Plans
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
