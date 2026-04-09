import Link from "next/link";
import { PUBLIC_CONFIG } from "../config/publicConfig";

export const metadata = {
  title: "Q Panda Status",
  description: "Q Panda service-status communication and support channels.",
};

const statusCards = [
  {
    title: "Public incident updates",
    body: "Major service notices will be posted here as the public status workflow expands.",
  },
  {
    title: "Account-specific support",
    body: "For site-specific outages or billing questions, use the support portal so the team can inspect your account directly.",
  },
  {
    title: "Launch-readiness note",
    body: "This route replaces the old placeholder hash link so customers land on a real destination instead of a dead fragment.",
  },
];

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Status</p>
        <h1 className="mt-3 text-4xl font-bold text-cyan-100">Service updates and support channels</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          Q Panda now has a dedicated status route. For anything account-specific, open a ticket so the
          support team can respond with the right context.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {statusCards.map((card) => (
            <section key={card.title} className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
              <h2 className="text-lg font-semibold text-cyan-100">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{card.body}</p>
            </section>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={PUBLIC_CONFIG.whmcs.supportUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-cyan-400/30 px-4 py-2 text-cyan-200 hover:bg-cyan-500/10"
          >
            Open support portal
          </a>
          <Link href="/" className="rounded-xl border border-white/10 px-4 py-2 text-slate-200 hover:bg-white/5">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
