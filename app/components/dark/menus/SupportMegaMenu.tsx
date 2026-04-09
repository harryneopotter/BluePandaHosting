"use client";

import React, { useState } from "react";
import { PUBLIC_CONFIG } from "../../../config/publicConfig";


// Sidebar-based Support mega menu matching Hosting pattern
export default function SupportMegaMenu() {
  type Cat = { id: string; title: string };
  const CATEGORIES: Cat[] = [
    { id: "help-center", title: "Help Center" },
    { id: "live-chat", title: "Live Chat" },
    { id: "ticket-system", title: "Ticket System" },
    { id: "knowledge-base", title: "Knowledge Base" },
    { id: "video-tutorials", title: "Video Tutorials" },
    { id: "community", title: "Community Forum" },
  ];

  const [selected, setSelected] = useState<string>("help-center");

  const CONTENT: Record<string, { title: string; description: string; items: { name: string; tagline: string; href: string }[] }> = {
    "help-center": {
      title: "Help Center",
      description: "Get answers to common questions",
      items: [
        { name: "Popular Articles", tagline: "Start with top topics", href: "/support/tickets" },
        { name: "Contact Support", tagline: "We are here 24/7", href: "/contact" },
      ]
    },
    "live-chat": {
      title: "Live Chat",
      description: "Chat with our experts",
      items: [
        { name: "Start Chat", tagline: "Instant assistance", href: "/contact" },
        { name: "Pre-sales Chat", tagline: "Talk to sales", href: "/contact" },
      ]
    },
    "ticket-system": {
      title: "Ticket System",
      description: "Open a support ticket",
      items: [
{ name: "Open Ticket", tagline: "Technical issues", href: PUBLIC_CONFIG.whmcs.supportUrl },
        { name: "Client Portal", tagline: "Manage tickets", href: PUBLIC_CONFIG.whmcs.clientAreaUrl },
      ]
    },
    "knowledge-base": {
      title: "Knowledge Base",
      description: "Self-help articles and guides",
      items: [
        { name: "Browse KB", tagline: "Troubleshooting & how-tos", href: "/support/tickets" },
        { name: "API Docs", tagline: "Developer documentation", href: "/blog" },
      ]
    },
    "video-tutorials": {
      title: "Video Tutorials",
      description: "Step-by-step walkthroughs",
      items: [
        { name: "Getting Started", tagline: "Setup in minutes", href: "/support/tickets" },
        { name: "Advanced Topics", tagline: "Deep dives", href: "/support/tickets" },
      ]
    },
    "community": {
      title: "Community Forum",
      description: "Ask questions and share knowledge",
      items: [
        { name: "Join Community", tagline: "Connect with others", href: "/support/tickets" },
        { name: "Status", tagline: "Service updates", href: "/status" },
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
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">SUPPORT</div>
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
            <a key={it.name} href={it.href} className="group block rounded-lg border border-cyan-400/10 p-4 hover:border-cyan-400/30 hover:bg-cyan-500/5 transition-all">
              <div className="font-medium text-cyan-100">{it.name}</div>
              <div className="text-sm text-slate-400">{it.tagline}</div>
            </a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/support/tickets" className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400/50">
            Visit Support Center
          </a>
        </div>
      </div>
    </div>
  );
}
