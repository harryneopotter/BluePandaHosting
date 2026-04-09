import Link from "next/link";

export const metadata = {
  title: "Q Panda Blog",
  description: "Product updates, hosting notes, and operational guidance from Q Panda.",
};

const posts = [
  {
    title: "Launch notes for the Q Panda hosting surface",
    date: "2026-04-03",
    excerpt: "An overview of the current launch-readiness work: crawl artifacts, route cleanup, and baseline security hardening.",
  },
  {
    title: "Why low-density hosting matters",
    date: "2026-03-25",
    excerpt: "A short explanation of the operational tradeoff behind capped server density and more predictable performance.",
  },
  {
    title: "What to expect during a migration",
    date: "2026-03-14",
    excerpt: "How Q Panda handles planning, cutover windows, and follow-up validation for incoming hosting migrations.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-6 py-20 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Blog</p>
        <h1 className="mt-3 text-4xl font-bold text-cyan-100">Notes from the Q Panda team</h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          This route replaces the old placeholder blog link with a stable destination for product and
          hosting updates.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-cyan-400/20 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-wide text-cyan-300">{post.date}</div>
              <h2 className="mt-2 text-lg font-semibold text-cyan-100">{post.title}</h2>
              <p className="mt-3 text-sm text-slate-400">{post.excerpt}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/" className="rounded-xl border border-white/10 px-4 py-2 text-slate-200 hover:bg-white/5">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
