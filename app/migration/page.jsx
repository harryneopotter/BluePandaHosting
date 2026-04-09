import Link from "next/link";
import { PUBLIC_CONFIG } from "../config/publicConfig";

export const metadata = {
  title: "Migration to Q Panda",
  description:
    "Plan a hosting migration with Q Panda and route deeper infrastructure rescue work to Blue Panda.",
};

const migrationSteps = [
  {
    title: "Plan the cutover",
    body: "We review the current stack, timing, DNS dependencies, and rollback constraints before anything moves.",
  },
  {
    title: "Move with support",
    body: "Migration help, launch questions, and account handoff stay on the Q Panda path instead of the legacy domain.",
  },
  {
    title: "Escalate custom systems work",
    body: "If the move becomes an infrastructure rescue, platform rewrite, or AI systems project, Blue Panda owns that consultation.",
  },
];

export default function MigrationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Migration</p>
        <h1 className="mt-3 text-4xl font-bold text-cyan-100">Move to Q Panda without guessing the cutover</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          This route is now the canonical migration handoff for hosting buyers coming from Q Panda,
          Blue Panda, or the retired legacy domain.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {migrationSteps.map((step) => (
            <section key={step.title} className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
              <h2 className="text-lg font-semibold text-cyan-100">{step.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{step.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            href="mailto:support@qpanda.io?subject=Migration%20planning"
            className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5 hover:border-cyan-300/40"
          >
            <div className="text-sm uppercase tracking-wide text-cyan-300">Migration intake</div>
            <div className="mt-2 text-lg font-semibold text-cyan-100">Email the Q Panda team</div>
            <p className="mt-2 text-sm text-slate-400">
              Best for hosting moves, pre-sales questions, and launch planning.
            </p>
          </a>
          <a
            href={PUBLIC_CONFIG.whmcs.supportUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 p-5 hover:border-cyan-300/40"
          >
            <div className="text-sm uppercase tracking-wide text-cyan-300">Support portal</div>
            <div className="mt-2 text-lg font-semibold text-cyan-100">Open a migration ticket</div>
            <p className="mt-2 text-sm text-slate-400">
              Use the portal when the migration is tied to an existing account or active service.
            </p>
          </a>
        </div>

        <div className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-500/5 p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-amber-200">Need deeper intervention?</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-100">Blue Panda handles custom infrastructure work</h2>
          <p className="mt-3 max-w-3xl text-sm text-slate-300">
            If the project is really a rescue, re-architecture, systems correction, or applied AI
            engagement, route it to Blue Panda consultation instead of treating it like commodity hosting.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={PUBLIC_CONFIG.bluePanda.consultationUrl}
              className="rounded-xl border border-amber-300/40 px-4 py-2 text-amber-100 hover:bg-amber-500/10"
            >
              Book Blue Panda consultation
            </a>
            <Link href="/hosting" className="rounded-xl border border-white/10 px-4 py-2 text-slate-200 hover:bg-white/5">
              See hosting plans
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-xl border border-cyan-400/30 px-4 py-2 text-cyan-200 hover:bg-cyan-500/10">
            Contact sales
          </Link>
          <Link href="/" className="rounded-xl border border-white/10 px-4 py-2 text-slate-200 hover:bg-white/5">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
