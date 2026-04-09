"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { PUBLIC_CONFIG } from "../../config/publicConfig";

const primaryLinks = [
  { href: "/hosting", label: "Hosting" },
  { href: "/migration", label: "Migration" },
  { href: "/#why-qpanda", label: "Why QPanda" },
  { href: "/#support-path", label: "Support" },
  { href: "/contact", label: "Contact Sales" },
];

const utilityLinks = [
  { href: "/login", label: "Login", external: false },
  { href: PUBLIC_CONFIG.whmcs.clientAreaUrl, label: "Client Area", external: true },
  { href: "/status", label: "Status", external: false },
];

type HeaderLinkProps = {
  href: string;
  label: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

function HeaderLink({ href, label, external = false, onClick, className = "" }: HeaderLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  );
}

export default function DarkHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const previousActiveRef = useRef<Element | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow || "";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen || !mobileRef.current) {
      return undefined;
    }

    const container = mobileRef.current;
    previousActiveRef.current = document.activeElement;

    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }

      if (event.key === "Tab") {
        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      const previousActive = previousActiveRef.current as HTMLElement | null;
      previousActive?.focus?.();
      previousActiveRef.current = null;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [pathname, mobileOpen]);

  return (
    <header className="sticky top-0 z-[200] border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="border-b border-white/5">
        <div className="mx-auto hidden max-w-6xl items-center justify-end gap-5 px-6 py-2 text-xs font-medium text-slate-400 md:flex">
          {utilityLinks.map((link) => (
            <HeaderLink
              key={link.label}
              href={link.href}
              label={link.label}
              external={link.external}
              className="transition hover:text-cyan-200"
            />
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.18em] text-cyan-200">
          QPANDA
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-slate-300 lg:flex">
          {primaryLinks.map((link) => (
            <HeaderLink
              key={link.label}
              href={link.href}
              label={link.label}
              className="rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-cyan-200"
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/hosting"
            className="hidden rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 md:inline-flex"
          >
            See plans
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 transition hover:text-cyan-200 lg:hidden"
          >
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            ref={mobileRef}
            className="fixed inset-0 z-[220] min-h-screen overflow-y-auto bg-slate-950 lg:hidden"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="mx-auto max-w-3xl px-6 py-6"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.24 }}
            >
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setMobileOpen(false)} className="text-lg font-semibold tracking-[0.18em] text-cyan-200">
                  QPANDA
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center rounded-md p-2 text-slate-300 transition hover:text-cyan-200"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-2">
                {primaryLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.24, delay: 0.06 + index * 0.04 }}
                  >
                    <HeaderLink
                      href={link.href}
                      label={link.label}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl border border-white/5 px-4 py-3 text-lg text-slate-100 transition hover:bg-white/5 hover:text-cyan-200"
                    />
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Utility actions</p>
                <div className="mt-4 flex flex-col gap-2">
                  {utilityLinks.map((link) => (
                    <HeaderLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      external={link.external}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl border border-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-cyan-200"
                    />
                  ))}
                </div>
              </div>

              <Link
                href="/hosting"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                See plans
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
