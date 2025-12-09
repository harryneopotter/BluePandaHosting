"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation';
import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

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
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const previousActiveRef = useRef<Element | null>(null);
  const pathname = usePathname();

  const openMenu = (menu: typeof activeMenu) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleNavClick = () => {
    setActiveMenu(null);
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

  // Lock body scroll and trap focus when mobile menu is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow || '';
    }
    return () => {
      document.body.style.overflow = prevOverflow || '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !mobileRef.current) return;
    const el = mobileRef.current;
    previousActiveRef.current = document.activeElement;
    const focusable = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus?.();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      // restore previous focus if it exists
      try {
        const prev = previousActiveRef.current as HTMLElement | null;
        prev?.focus?.();
      } catch (err) {
        // ignore focus restore errors
      }
      previousActiveRef.current = null;
    };
  }, [mobileOpen]);

  // Close mobile menu automatically when the route/pathname changes
  useEffect(() => {
    // only run after mount when pathname changes
    if (mobileOpen) setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close desktop mega menu when route changes
  useEffect(() => {
    if (activeMenu) setActiveMenu(null);
  }, [pathname, activeMenu]);

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
        <Link href="/" onClick={handleNavClick} className="px-3 py-2 hover:text-cyan-300">Home</Link>

          {/* Hosting */}
          <div className="relative" onMouseEnter={() => openMenu("hosting")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "hosting"} aria-controls="mega-hosting" onClick={handleNavClick}>
              Hosting
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "hosting" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Domains */}
          <div className="relative" onMouseEnter={() => openMenu("domains")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "domains"} aria-controls="mega-domains" onClick={handleNavClick}>
              Domains
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "domains" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Email */}
          <div className="relative" onMouseEnter={() => openMenu("email")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "email"} aria-controls="mega-email" onClick={handleNavClick}>
              Email
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "email" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Security */}
          <div className="relative" onMouseEnter={() => openMenu("security")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "security"} aria-controls="mega-security" onClick={handleNavClick}>
              Security
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "security" ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Support */}
          <div className="relative" onMouseEnter={() => openMenu("support")} onMouseLeave={closeMenuWithDelay}>
            <button type="button" className="flex items-center gap-1 px-3 py-2 hover:text-cyan-300" aria-haspopup="true" aria-expanded={activeMenu === "support"} aria-controls="mega-support" onClick={handleNavClick}>
              Support
              <ChevronDownIcon className={`h-3 w-3 transition-transform ${activeMenu === "support" ? "rotate-180" : ""}`} />
            </button>
          </div>

          <a href="#/blog" onClick={handleNavClick} className="px-3 py-2 hover:text-cyan-300">Blog</a>
          <a href="#/status" onClick={handleNavClick} className="px-3 py-2 hover:text-cyan-300">Status</a>
          <a href="#/contact" onClick={handleNavClick} className="px-3 py-2 hover:text-cyan-300">Contact</a>
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

        {/* Mobile menu overlay with Framer Motion */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={mobileRef}
              className="md:hidden fixed inset-0 top-0 z-[220] bg-slate-950 min-h-screen h-full overflow-y-auto"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Solid background to fully cover hero */}
              <div className="absolute inset-0 bg-slate-950" />
              
              <motion.div
                className="relative z-10 mx-auto max-w-3xl px-6 py-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-lg font-bold text-cyan-300">Q Panda</Link>
                  <button type="button" onClick={() => setMobileOpen(false)} className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-cyan-300">
                    <XMarkIcon className="h-6 w-6"/>
                  </button>
                </div>

                <nav className="mt-8 flex flex-col gap-1">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/hosting', label: 'Hosting' },
                    { href: '/domains', label: 'Domains' },
                    { href: '/email/ox-suite', label: 'Email' },
                    { href: '/security/site-monitoring', label: 'Security' },
                    { href: '/support/tickets', label: 'Support' },
                    { href: '#/blog', label: 'Blog' },
                    { href: '#/status', label: 'Status' },
                    { href: '#/contact', label: 'Contact' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.25, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-4 py-3 text-lg text-slate-200 hover:bg-white/5 hover:text-cyan-300 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="mt-8 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center rounded-xl py-3 text-sm font-medium border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10 transition-colors"
                  >
                    Client Area
                  </Link>
                  <Link
                    href="/hosting"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 block w-full text-center rounded-xl py-3 text-sm font-medium bg-cyan-500 text-slate-900 hover:bg-cyan-400 transition-colors"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
}
