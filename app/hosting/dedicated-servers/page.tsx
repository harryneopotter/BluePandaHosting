import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dedicated Servers — QuantumPanda',
  description: 'Maximum performance and control with dedicated hardware.'
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-200">Dedicated Servers</h1>
        <p className="mt-3 text-slate-300 max-w-2xl">Enterprise-grade hardware with our predictive shield.</p>
        <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-white/5 p-6">
          <p className="text-slate-300">Detailed plans coming soon. Explore other hosting options from the Hosting overview.</p>
        </div>
      </div>
    </div>
  );
}
