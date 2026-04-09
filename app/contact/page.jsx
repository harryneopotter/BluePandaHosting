import Link from "next/link";
import { PUBLIC_CONFIG } from "../config/publicConfig";

export const metadata = {
  title: "Contact Q Panda",
  description: "Talk to Q Panda about hosting, migrations, or account support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-cyan-400/20 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Contact</p>
          <h1 className="mt-3 text-4xl font-bold text-cyan-100">Talk to the Q Panda team</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Use the support portal for account-specific requests, or email us directly for migrations,
            pre-sales questions, and infrastructure planning.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <a
              href={PUBLIC_CONFIG.whmcs.supportUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5 hover:border-cyan-300/40"
            >
              <div className="text-sm uppercase tracking-wide text-cyan-300">Support portal</div>
              <div className="mt-2 text-lg font-semibold text-cyan-100">Open a ticket</div>
              <p className="mt-2 text-sm text-slate-400">Best for active-service or billing questions.</p>
            </a>
            <a
              href="mailto:support@qpanda.io"
              className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5 hover:border-cyan-300/40"
            >
              <div className="text-sm uppercase tracking-wide text-cyan-300">Email</div>
              <div className="mt-2 text-lg font-semibold text-cyan-100">support@qpanda.io</div>
              <p className="mt-2 text-sm text-slate-400">Best for migrations, product questions, or launch planning.</p>
            </a>
          </div>
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5">
            <div className="text-sm uppercase tracking-wide text-amber-200">Consulting handoff</div>
            <div className="mt-2 text-lg font-semibold text-slate-100">Need infrastructure rescue or custom systems work?</div>
            <p className="mt-2 text-sm text-slate-300">
              Hosting, migration, and account work stays with Q Panda. Deeper consulting, system correction,
              and applied AI engagements should route to Blue Panda.
            </p>
            <a
              href={PUBLIC_CONFIG.bluePanda.consultationUrl}
              className="mt-4 inline-flex rounded-xl border border-amber-300/40 px-4 py-2 text-amber-100 hover:bg-amber-500/10"
            >
              Book Blue Panda consultation
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/migration" className="rounded-xl border border-cyan-400/30 px-4 py-2 text-cyan-200 hover:bg-cyan-500/10">
              Start migration
            </Link>
            <a
              href={PUBLIC_CONFIG.whmcs.clientAreaUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-cyan-400/30 px-4 py-2 text-cyan-200 hover:bg-cyan-500/10"
            >
              Client area
            </a>
            <Link href="/" className="rounded-xl border border-white/10 px-4 py-2 text-slate-200 hover:bg-white/5">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
