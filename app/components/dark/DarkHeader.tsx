"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const MegaMenuOverlay = dynamic(() => import("./MegaMenuOverlay"), { ssr: false });
const HostingMegaMenu = dynamic(() => import("./menus/HostingMegaMenu"), { ssr: false });
const DomainsMegaMenu = dynamic(() => import("./menus/DomainsMegaMenu"), { ssr: false });
const SupportMegaMenu = dynamic(() => import("./menus/SupportMegaMenu"), { ssr: false });
const SecurityMegaMenu = dynamic(() => import("./menus/SecurityMegaMenu"), { ssr: false });
const EmailMegaMenu = dynamic(() => import("./menus/EmailMegaMenu"), { ssr: false });

export default function DarkHeader() {
  const [activeMenu, setActiveMenu] = useState<null | "hosting" | "domains" | "support" | "security" | "email">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const openMenu = (menu: typeof activeMenu) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const closeMenuWithDelay = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => setActiveMenu(null), 500);
  };

  const closeNow = () => {
    setActiveMenu(null);
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Close on route hash change for one-pager navigation
  useEffect(() => {
    const onHash = () => setActiveMenu(null);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <header className="sticky top-0 z-[200] border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
<Link href="/" className="text-lg font-bold text-cyan-300">Q Panda</Link>

        <nav className="hidden gap-1 text-base text-slate-300 md:flex">
  <Link href="/" className="px-3 py-2 hover:text-cyan-300">Home</Link>

          {/* Hosting */}
          <div className="relative" onMouseEnter={() => openMenu("hosting")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "hosting"} aria-controls="mega-hosting">
              Hosting
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "hosting" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Domains */}
          <div className="relative" onMouseEnter={() => openMenu("domains")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "domains"} aria-controls="mega-domains">
              Domains
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "domains" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Email */}
          <div className="relative" onMouseEnter={() => openMenu("email")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "email"} aria-controls="mega-email">
              Email
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "email" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Security */}
          <div className="relative" onMouseEnter={() => openMenu("security")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "security"} aria-controls="mega-security">
              Security
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "security" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Support */}
          <div className="relative" onMouseEnter={() => openMenu("support")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "support"} aria-controls="mega-support">
              Support
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "support" ? "rotate-180" : ""}`} />
            </button>
          </div>

          <a href="#/blog" className="px-3 py-2 hover:text-cyan-300">Blog</a>
          <a href="#/status" className="px-3 py-2 hover:text-cyan-300">Status</a>
          <a href="#/contact" className="px-3 py-2 hover:text-cyan-300">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
  <Link href="/login" className="hidden text-sm text-slate-300 hover:text-cyan-300 md:block">Client Area</Link>
  <Link href="/hosting" className="hidden md:inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition bg-cyan-500 text-slate-900 hover:bg-cyan-400">Get Started</Link>
          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-cyan-300"
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <MegaMenuOverlay
        activeKey={activeMenu}
        onClose={closeNow}
        onMenuEnter={() => {
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }}
        onMenuLeave={closeMenuWithDelay}
        render={(key) => {
          switch (key) {
            case "hosting":
              return <HostingMegaMenu />;
            case "domains":
              return <DomainsMegaMenu />;
            case "email":
              return <EmailMegaMenu />;
            case "security":
              return <SecurityMegaMenu />;
            case "support":
              return <SupportMegaMenu />;
            default:
              return null;
          }
        }}
      />

        {/* Mobile menu overlay */}
        <div
          className={`md:hidden fixed inset-0 z-[220] bg-slate-950/95 backdrop-blur-sm transform ${mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'}`} 
          aria-hidden={!mobileOpen}
          style={{ transition: 'opacity 180ms ease, transform 180ms ease' }}
        >
          <div className="mx-auto max-w-3xl px-6 py-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-lg font-bold text-cyan-300">Q Panda</Link>
              <button type="button" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-cyan-300"><XMarkIcon className="h-6 w-6"/></button>
            </div>

            <nav className="mt-6 flex flex-col gap-4 text-lg text-slate-200">
              <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2">Home</Link>
              <Link href="/hosting" onClick={() => setMobileOpen(false)} className="px-3 py-2">Hosting</Link>
              <Link href="/domains" onClick={() => setMobileOpen(false)} className="px-3 py-2">Domains</Link>
              <Link href="/email/ox-suite" onClick={() => setMobileOpen(false)} className="px-3 py-2">Email</Link>
              <Link href="/security/site-monitoring" onClick={() => setMobileOpen(false)} className="px-3 py-2">Security</Link>
              <Link href="/support/tickets" onClick={() => setMobileOpen(false)} className="px-3 py-2">Support</Link>
              <Link href="#/blog" onClick={() => setMobileOpen(false)} className="px-3 py-2">Blog</Link>
              <Link href="#/status" onClick={() => setMobileOpen(false)} className="px-3 py-2">Status</Link>
              <Link href="#/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2">Contact</Link>
            </nav>
          </div>
        </div>
    </header>
  );
}
