import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSL Certificates — QuantumPanda Security',
  description: 'DV, OV, EV, and wildcard SSL certificates with automated renewals.'
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-200">SSL Certificates</h1>
        <p className="mt-3 text-slate-300 max-w-2xl">Protect user data and boost SEO with industry-standard TLS. Flexible options for every need.</p>
        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-white/5 p-6">
          <ul className="grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border border-cyan-400/10 bg-slate-950/40 p-4">
              <div className="text-cyan-100 font-medium">Domain Validation (DV)</div>
              <div className="text-sm text-slate-400">Fast issuance, ideal for simple sites</div>
            </li>
            <li className="rounded-xl border border-cyan-400/10 bg-slate-950/40 p-4">
              <div className="text-cyan-100 font-medium">Organization Validation (OV)</div>
              <div className="text-sm text-slate-400">Business validation and higher trust</div>
            </li>
            <li className="rounded-xl border border-cyan-400/10 bg-slate-950/40 p-4">
              <div className="text-cyan-100 font-medium">Extended Validation (EV)</div>
              <div className="text-sm text-slate-400">Highest validation for enterprise</div>
            </li>
            <li className="rounded-xl border border-cyan-400/10 bg-slate-950/40 p-4">
              <div className="text-cyan-100 font-medium">Wildcard SSL</div>
              <div className="text-sm text-slate-400">Secure unlimited subdomains</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
