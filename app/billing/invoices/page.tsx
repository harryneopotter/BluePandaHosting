"use client";

import React, { useEffect, useState } from "react";
import LuminousCard from "../../components/LuminousCard";

export default function InvoicesPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/invoices");
        const j = await res.json();
        if (!res.ok) throw new Error(j?.error || "Failed to load invoices");
        setData(j);
      } catch (e: any) {
        setError(e.message || "Failed to load invoices");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const invoices = data?.invoices?.invoice || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-200">My Invoices</h1>
        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && (
          <LuminousCard className="mt-6 divide-y divide-cyan-400/10">
            {invoices.length === 0 ? (
              <div className="p-4 text-slate-300">No invoices found.</div>
            ) : (
              invoices.map((inv: any) => (
                <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <div className="font-mono">#{inv.id}</div>
                    <div className="text-sm text-slate-300">Status: {inv.status}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      className="underline"
                      href={`/billing/invoices/${inv.id}`}
                    >
                      View
                    </a>
                    <a
                      className="underline"
                      href={`/api/invoices/${inv.id}/pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PDF
                    </a>
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
