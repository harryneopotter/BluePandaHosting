"use client";

import React, { useState } from "react";
import Link from "next/link";

// Sidebar-based Domains mega menu matching Hosting pattern
export default function DomainsMegaMenu() {
  type Cat = { id: string; title: string };
  const CATEGORIES: Cat[] = [
    { id: "register", title: "Domain Registration" },
    { id: "transfer", title: "Domain Transfer" },
    { id: "management", title: "Domain Management" },
    { id: "privacy", title: "Privacy Protection" },
    { id: "parking", title: "Domain Parking" },
    { id: "bulk", title: "Bulk Registration" },
  ];

  const [selected, setSelected] = useState<string>("register");

  const CONTENT: Record<string, { title: string; description: string; items: { name: string; tagline: string; price?: string; href: string }[] }> = {
    register: {
      title: "Domain Registration",
      description: "Find and secure your perfect domain name",
      items: [
        { name: ".com Domains", tagline: "Most popular TLD", price: "$12.99/yr", href: "/domains" },
        { name: ".net / .org", tagline: "Great alternatives", price: "$14.99/yr", href: "/domains" },
      ]
    },
    transfer: {
      title: "Domain Transfer",
      description: "Move your domains to QuantumPanda with ease",
      items: [
        { name: "Free Transfer", tagline: "With any hosting plan", href: "/domains" },
        { name: "Bulk Transfer", tagline: "Save time moving multiple domains", href: "/domains" },
      ]
    },
    management: {
      title: "Domain Management",
      description: "DNS, nameservers, renewals, and more",
      items: [
        { name: "DNS Manager", tagline: "Advanced DNS control", href: "/domains" },
        { name: "Renewals", tagline: "Auto-renew & reminders", href: "/domains" },
      ]
    },
    privacy: {
      title: "Privacy Protection",
      description: "Protect your personal information",
      items: [
        { name: "WHOIS Privacy", tagline: "Hide contact details", price: "$9.99/yr", href: "/domains" },
        { name: "Email Forwarding", tagline: "Anonymous contact", href: "/domains" },
      ]
    },
    parking: {
      title: "Domain Parking",
      description: "Park domains until you are ready to use them",
      items: [
        { name: "Basic Parking", tagline: "Reserve your brand", href: "/domains" },
        { name: "For Sale Page", tagline: "Monetize unused domains", href: "/domains" },
      ]
    },
    bulk: {
      title: "Bulk Registration",
      description: "Register multiple domains at once",
      items: [
        { name: "Bulk Search", tagline: "Quick availability checks", href: "/domains" },
        { name: "Bulk Discounts", tagline: "Save on volume", href: "/domains" },
      ]
    },
  };

  const data = CONTENT[selected];

  return (
    <div className="flex h-[420px] gap-0">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-700/50 bg-slate-950/30 p-4">
        <div className="space-y-1">
          <div className="mb-2">
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">DOMAINS</div>
            {CATEGORIES.map((c) => (
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
                {it.price && <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-200">{it.price}</span>}
              </div>
              <div className="text-sm text-slate-400">{it.tagline}</div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/domains" className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50">
            View All Domain Services
          </Link>
        </div>
      </div>
    </div>
  );
}
