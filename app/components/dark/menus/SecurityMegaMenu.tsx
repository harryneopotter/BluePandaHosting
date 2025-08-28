"use client";

import React from "react";
import Link from "next/link";

export default function SecurityMegaMenu() {
  const items = [
    { title: "SSL Certificates", desc: "DV, OV, EV, wildcard options", href: "/security/ssl-certificates" },
    { title: "Malware Scanning", desc: "Coming soon", href: "#" },
    { title: "Site Monitoring", desc: "Uptime & performance checks", href: "#" }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <Link key={it.title} href={it.href} className="group rounded-xl border border-cyan-400/20 bg-white/5 p-4 hover:border-cyan-400/40 hover:bg-cyan-500/5">
          <div className="text-cyan-100 font-medium">{it.title}</div>
          <div className="text-sm text-slate-400">{it.desc}</div>
        </Link>
      ))}
    </div>
  );
}
