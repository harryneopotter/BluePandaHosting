"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import LuminousCard from "../../components/LuminousCard";

export default function TicketsPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/tickets");
        const j = await res.json();
        if (!res.ok) throw new Error(j?.error || "Failed to load tickets");
        setData(j);
      } catch (e: any) {
        setError(e.message || "Failed to load tickets");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const tickets = data?.tickets?.ticket || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-200">Support Tickets</h1>
          <Link className="underline" href="/support/tickets/new">Open Ticket</Link>
        </div>
        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && (
          <LuminousCard className="mt-6 divide-y divide-cyan-400/10">
            {tickets.length === 0 ? (
              <div className="p-4 text-slate-300">No tickets found.</div>
            ) : (
              tickets.map((t: any) => (
                <div key={t.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <div className="font-mono">#{t.id}</div>
                    <div className="text-sm text-slate-300">{t.subject}</div>
                  </div>
                  <div>
                    <Link className="underline" href={`/support/tickets/${t.id}`}>View</Link>
                  </div>
                </div>
              ))
            )}
          </LuminousCard>
        )}
      </div>
    </div>
  );
}
