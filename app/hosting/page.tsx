import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hosting — QuantumPanda',
  description: 'Choose from Shared, VPS, Dedicated, Cloud, or Managed WordPress hosting — all in a fast, secure dark UI.'
}

export default function HostingPage() {
  const cards = [
    { title: 'Shared Hosting', desc: 'Perfect for small websites', href: '/hosting/shared-hosting' },
    { title: 'VPS Hosting', desc: 'Scalable virtual servers', href: '/hosting/vps-hosting' },
    { title: 'Dedicated Servers', desc: 'Maximum performance', href: '/hosting/dedicated-servers' },
    { title: 'Cloud Hosting', desc: 'Elastic resources on demand', href: '/hosting/cloud-hosting' },
    { title: 'WordPress Hosting', desc: 'Optimized for WordPress', href: '/hosting/wordpress-hosting' },
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute left-[-10%] top-[20%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="absolute right-[-10%] bottom-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
            Quantum‑native Hosting
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400">
            Choose the right platform for your project
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            From shared to dedicated, scale seamlessly with our neural edge and predictive shield.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-white/5 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(34,211,238,0.15)]"
            >
              <div className="p-6">
                <div className="mb-1 text-lg font-bold text-cyan-100">{c.title}</div>
                <div className="text-sm text-slate-300">{c.desc}</div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 z-[1] opacity-10"
                style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(56,189,248,0.4) 50%, transparent 60%)' }}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
