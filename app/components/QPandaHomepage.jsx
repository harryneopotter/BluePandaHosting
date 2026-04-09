"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PUBLIC_CONFIG } from "../config/publicConfig";

const planEntryCards = [
  {
    title: "Shared hosting",
    body: "A cleaner foundation for business sites, WordPress installs, and early-stage ecommerce that need better care than commodity hosting.",
    cta: "Compare plans",
    href: "/hosting",
  },
  {
    title: "Migration service",
    body: "Move existing sites with planning, transfer, and cutover help so the switch feels managed instead of improvised.",
    cta: "Start migration",
    href: "/migration",
  },
  {
    title: "Performance and security add-ons",
    body: "Add the right operational layers when the site needs more speed, resilience, and confidence after launch.",
    cta: "Talk to sales",
    href: "/contact",
  },
  {
    title: "Managed VPS, cloud, and dedicated paths",
    body: "Step into higher-control infrastructure when shared hosting is no longer the right fit for the workload.",
    cta: "Discuss advanced hosting",
    href: "/contact",
  },
];

const proofCards = [
  {
    title: "Migration support",
    body: "A clearer path off crowded or frustrating hosting without leaving transfer planning to guesswork.",
  },
  {
    title: "Lower-noise infrastructure",
    body: "Hosting positioned around calmer operations and cleaner account stewardship instead of oversold-server rhetoric.",
  },
  {
    title: "Human support",
    body: "Real operators available when templated reassurance is not enough and the site needs accountable follow-through.",
  },
  {
    title: "Room to grow",
    body: "A path from simpler plans into stronger infrastructure without forcing a platform change the moment requirements increase.",
  },
];

const comparisonPoints = [
  "Migration help instead of self-serve guesswork",
  "Support access that feels accountable",
  "Plan framing that matches real growth stages",
  "A clearer path to higher-capability infrastructure",
];

const supportActions = [
  {
    title: "Login",
    body: "Use the account login when you already know the environment you need to manage.",
    href: "/login",
    external: false,
  },
  {
    title: "Client Area",
    body: "Billing, services, and account-level actions stay in the client area instead of competing with acquisition CTAs.",
    href: PUBLIC_CONFIG.whmcs.clientAreaUrl,
    external: true,
  },
  {
    title: "Status",
    body: "Check platform updates and current service state without having to navigate through sales copy.",
    href: "/status",
    external: false,
  },
];

function CtaLink({ href, children, variant = "primary", external = false }) {
  const classes = {
    primary:
      "inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300",
    secondary:
      "inline-flex items-center justify-center rounded-xl border border-cyan-400/30 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/10",
    tertiary:
      "inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5",
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes[variant]}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes[variant]}>
      {children}
    </Link>
  );
}

export default function QPandaHomepage() {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 440);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-slate-950 text-slate-100">
      <section className="border-b border-amber-400/15 bg-amber-500/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Primary domain update</p>
            <p className="mt-1 text-sm text-amber-50/85">
              QPanda now lives on bluepandahosting.in. Blue Panda remains the path for consulting, AI systems work, and
              deeper infrastructure engagements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CtaLink href="/hosting" variant="secondary">
              Go to QPanda hosting
            </CtaLink>
            <CtaLink href={PUBLIC_CONFIG.bluePanda.url} variant="tertiary" external>
              Go to Blue Panda
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-cyan-500/15 blur-[120px]" />
          <div className="absolute right-[-10rem] top-24 h-96 w-96 rounded-full bg-sky-500/10 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Premium hosting with migration help</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Hosting for teams that are done gambling on crowded, generic platforms
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              QPanda gives growing sites and critical workloads a more attentive hosting experience, with migration support,
              lower-noise infrastructure, and real humans when you need help.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/hosting">See plans</CtaLink>
              <CtaLink href="/migration" variant="secondary">
                Start migration
              </CtaLink>
              <CtaLink href="/contact" variant="tertiary">
                Talk to sales
              </CtaLink>
            </div>
            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-white/5 p-5 text-sm text-slate-300">
              Moving off a noisy host or planning a fresh launch? Start with plans and migration first. If the work turns into
              infrastructure rescue or custom systems work, the Blue Panda handoff is already built in.
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Plan entry</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">What QPanda is built to do</h2>
            <p className="mt-4 text-slate-300">
              QPanda is for businesses that want hosting to feel calmer, faster to manage, and less disposable. It combines
              practical platform tooling, migration support, and human guidance for teams that have outgrown bargain-hosting
              behavior.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {planEntryCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-6">
                <h3 className="text-xl font-semibold text-cyan-100">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.body}</p>
                <div className="mt-5">
                  <CtaLink href={card.href} variant="secondary">
                    {card.cta}
                  </CtaLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Migration support</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Move to QPanda without guessing the cutover
            </h2>
            <p className="mt-4 text-slate-300">
              Migration risk is usually the main blocker. QPanda should make that risk legible by clarifying what moves, when
              DNS changes happen, who owns communication, and how escalation works if the project becomes more than standard
              hosting.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Review the current stack, cutover constraints, and rollback expectations before anything changes.",
              "Handle transfer, migration questions, and support coordination on the QPanda path instead of the legacy domain.",
              "Escalate deeper platform rescue, re-architecture, or AI systems work to Blue Panda when the brief demands it.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">
                {item}
              </div>
            ))}
            <div className="pt-2">
              <CtaLink href="/migration">Start migration</CtaLink>
            </div>
          </div>
        </div>
      </section>

      <section id="why-qpanda" className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Why buyers switch</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Proof before commodity-hosting claims</h2>
            <p className="mt-4 text-slate-300">
              Lead with the operating experience, migration help, and infrastructure posture. Keep numeric trust bars out of the
              page until those claims are validated.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {proofCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-6">
                <h3 className="text-lg font-semibold text-cyan-100">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Comparison</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Built for buyers who have already tried cheap hosting
            </h2>
            <p className="mt-4 text-slate-300">
              Budget hosting often wins on headline price and loses on operational peace. QPanda frames the difference around
              support quality, migration guidance, and infrastructure care instead of unverified superiority claims.
            </p>
          </div>
          <div className="grid gap-4">
            {comparisonPoints.map((point) => (
              <div key={point} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm font-medium text-slate-200">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="support-path" className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Support and trust</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Existing customers know where to go</h2>
            <p className="mt-4 text-slate-300">
              Support, client area, and status live as utility actions. They should reassure existing customers without taking
              over the acquisition path for new buyers landing on the homepage.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {supportActions.map((action) => (
              <div key={action.title} className="rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-6">
                <h3 className="text-lg font-semibold text-cyan-100">{action.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{action.body}</p>
                <div className="mt-5">
                  <CtaLink href={action.href} variant="secondary" external={action.external}>
                    Open {action.title}
                  </CtaLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/5 p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-200">Backed by Blue Panda</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Need custom infrastructure, rescue work, or applied AI systems?
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            QPanda is the hosting offer inside the broader Blue Panda operating model. When a customer outgrows standard hosting
            and needs deeper infrastructure or consulting support, the handoff path is already built in.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink href={PUBLIC_CONFIG.bluePanda.consultationUrl} external>
              Book consultation with Blue Panda
            </CtaLink>
            <CtaLink href={PUBLIC_CONFIG.bluePanda.url} variant="tertiary" external>
              Meet Blue Panda
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 pb-24 pt-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Final CTA</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Move to hosting that feels better run</h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-300">
            If your current provider is noisy, crowded, or hard to trust, QPanda gives you a cleaner next step with migration
            help and a stronger support experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink href="/hosting">See plans</CtaLink>
            <CtaLink href="/migration" variant="secondary">
              Start migration
            </CtaLink>
            <CtaLink href="/contact" variant="tertiary">
              Talk to sales
            </CtaLink>
          </div>
        </div>
      </section>

      {showStickyCta ? (
        <div className="fixed inset-x-0 bottom-4 z-[190] flex justify-center px-4 md:hidden">
          <CtaLink href="/hosting">See plans</CtaLink>
        </div>
      ) : null}
    </main>
  );
}
