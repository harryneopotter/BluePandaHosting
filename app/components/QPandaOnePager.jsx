"use client";
import React from "react";

// --- Icons (inline) ---
const IconSparkles = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.5 3.5L17 8l-3.5 1.5L12 13l-1.5-3.5L7 8l3.5-1.5L12 3z"/><path d="M5 15l.75 1.75L7.5 17.5 5.75 18.25 5 20l-.75-1.75L2.5 17.5 4.25 16.75 5 15z"/><path d="M18.5 14l.5 1.25L20.25 16l-1.25.75L18.5 18l-.5-1.25L16.75 16l1.25-.75.5-1.25z"/></svg>);
const IconZap = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>);
const IconRocket = (p) => (<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 16.5c-1.5 1.5-1.5 4 0 5.5s4 1.5 5.5 0L12 20l-2-2-2-2-3.5 .5z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);

// --- UI Components ---
const Button = ({ children, className = "", ...props }) => (
  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// --- Feature Components ---
const FeatureCard = ({ icon, title, description }) => (
  <Card className="border border-cyan-400/20 bg-white/5 p-6">
    <div className="mb-4 text-cyan-400">{icon}</div>
    <h3 className="mb-2 text-lg font-semibold text-cyan-100">{title}</h3>
    <p className="text-slate-300">{description}</p>
  </Card>
);

const MetricCard = ({ label, value, sub }) => (
  <Card className="border border-cyan-400/20 bg-white/5 p-6 text-center">
    <div className="text-2xl font-bold text-cyan-100">{value}</div>
    <div className="text-sm font-medium text-cyan-200">{label}</div>
    <div className="text-xs text-slate-400">{sub}</div>
  </Card>
);

const QuoteCard = ({ quote, author }) => (
  <Card className="border border-cyan-400/20 bg-white/5 p-6">
    <p className="mb-4 text-slate-300">"{quote}"</p>
    <p className="text-sm text-cyan-200">— {author}</p>
  </Card>
);

const FAQItem = ({ q, a }) => (
  <div className="p-6">
    <h4 className="mb-2 font-semibold text-cyan-100">{q}</h4>
    <p className="text-slate-300">{a}</p>
  </div>
);

// --- Main Component ---
export default function QPandaOnePager() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
              Q Panda
            </h1>
            <p className="mb-8 text-xl text-slate-300 md:text-2xl">
              Quantum-inspired cloud hosting that scales at the speed of thought
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400">
                <IconRocket className="mr-2 h-4 w-4" />
                Get started
              </Button>
              <Button className="border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10">
                View demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-bold text-cyan-100">
          Features that matter
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<IconZap className="h-8 w-8" />}
            title="Lightning Fast"
            description="Deploy in seconds with our quantum-inspired edge network"
          />
          <FeatureCard
            icon={<IconSparkles className="h-8 w-8" />}
            title="Auto-scaling"
            description="Handle traffic spikes without breaking a sweat"
          />
          <FeatureCard
            icon={<IconRocket className="h-8 w-8" />}
            title="Developer First"
            description="Built by developers, for developers. Simple yet powerful."
          />
        </div>
      </section>

      {/* Benchmarks Section */}
      <section id="benchmarks" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          <MetricCard 
            label="Avg. Cold Start" 
            value="28ms" 
            sub="Neural edge functions"
          />
          <MetricCard 
            label="99.995%" 
            value="SLA" 
            sub="Past 90 days"
          />
          <MetricCard 
            label="2.3x" 
            value="Faster TTFB" 
            sub="vs. baseline clouds"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <QuoteCard 
            quote="Switched our launch to Q Panda-handled a 40x spike without blinking." 
            author="Sara K., StreamKit"
          />
          <QuoteCard 
            quote="Deploy previews in parallel changed our workflow overnight." 
            author="Kenji M., FolioAI"
          />
          <QuoteCard 
            quote="The predictive shield blocked a zero-day botnet before signatures were out." 
            author="Nadia P., HexaSec"
          />
        </div>
      </section>

      {/* Docs Section */}
      <section id="docs" className="mx-auto max-w-6xl px-6 pb-24">
        <Card className="border border-cyan-400/20 bg-white/5">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-2xl font-bold text-cyan-100">Docs preview</h3>
            <p className="mt-2 text-slate-300">
              Install the CLI, initialize a project, and teleport your first deployment.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/70 p-4 text-sm text-cyan-200">
{`npm i -g qpanda
qpanda init
qpanda deploy`}
            </pre>
            <div className="mt-4">
              <Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400">
                Open full docs
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-5xl px-6 pb-24">
        <h3 className="mb-6 text-2xl font-bold text-cyan-100">Frequently asked</h3>
        <div className="divide-y divide-white/10 rounded-2xl border border-cyan-400/20 bg-white/5">
          <FAQItem 
            q="What does 'quantum' mean here?" 
            a="We simulate quantum-style parallelism - predictive routing, speculative deploys, and entangled failover - not literal qubits."
          />
          <FAQItem 
            q="Can I bring my own domain?" 
            a="Yes. Point your DNS to our Anycast edge. We generate and renew TLS automatically."
          />
          <FAQItem 
            q="How is pricing calculated?" 
            a="Plans are flat-rate by tier. Usage-based add-ons (edge functions, storage) are billed per unit with clear caps."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto mb-28 max-w-5xl px-6">
        <Card className="border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-xl">
          <CardContent className="flex flex-col items-center justify-between gap-4 p-8 md:flex-row">
            <div>
              <h3 className="text-2xl font-bold text-cyan-100">Ready to teleport?</h3>
              <p className="mt-1 text-slate-300">Start free. Migrate in minutes with the Q Panda co-pilot.</p>
            </div>
            <div className="flex gap-2">
              <Button className="bg-cyan-500 text-slate-900 hover:bg-cyan-400">
                <IconRocket className="mr-2 h-4 w-4" />
                Get started
              </Button>
              <Button className="border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/10">
                Talk to sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 pb-12 text-sm text-slate-400">
        <div className="border-t border-white/10 pt-6">
          (c) {new Date().getFullYear()} Q Panda Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
