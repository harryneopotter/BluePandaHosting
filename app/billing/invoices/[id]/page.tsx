"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function InvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/invoices/${id}`);
        const j = await res.json();
        if (!res.ok) throw new Error(j?.error || "Failed to load invoice");
        setData(j);
      } catch (e: any) {
        setError(e.message || "Failed to load invoice");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-200">Invoice #{id}</h1>
        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && (
          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-white/5 p-6 space-y-3">
            <div>Status: {data?.status || data?.invoice?.status}</div>
            <div>Total: {data?.total || data?.invoice?.total || data?.amount}</div>
            <a
              className="underline"
              href={`/api/invoices/${id}/pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
