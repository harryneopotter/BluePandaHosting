"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LuminousCard from "../../../components/LuminousCard";

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
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load invoice");
        setData(json);
      } catch (err: any) {
        setError(err.message || "Failed to load invoice");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const items = data?.items?.item || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-cyan-200 sm:text-4xl">Invoice #{id}</h1>
        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && (
          <div className="mt-6 space-y-6">
            <LuminousCard className="space-y-3 p-6">
              <div className="text-sm text-slate-300">Status: {data?.status || "Unknown"}</div>
              <div className="text-sm text-slate-300">Invoice Number: {data?.invoicenum || `#${id}`}</div>
              <div className="text-sm text-slate-300">Issued: {data?.date || "Unknown"}</div>
              <div className="text-sm text-slate-300">Due: {data?.duedate || "Unknown"}</div>
              <div className="text-lg font-semibold text-cyan-100">Total: {data?.total || data?.amount || "Unknown"}</div>
              <a
                className="inline-flex text-sm font-semibold text-cyan-200 underline"
                href={`/api/invoices/${id}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download PDF
              </a>
            </LuminousCard>

            <LuminousCard className="divide-y divide-cyan-400/10">
              <div className="p-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Line Items
              </div>
              {items.length === 0 ? (
                <div className="p-4 text-slate-300">No line items returned for this invoice.</div>
              ) : (
                items.map((item: any, index: number) => (
                  <div key={item.id || `${item.description}-${index}`} className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <div className="font-medium text-slate-100">{item.description || item.type || "Invoice item"}</div>
                      {item.type && <div className="text-sm text-slate-400">Type: {item.type}</div>}
                    </div>
                    <div className="text-sm font-semibold text-cyan-100">{item.amount || "Unknown"}</div>
                  </div>
                ))
              )}
            </LuminousCard>
          </div>
        )}
      </div>
    </div>
  );
}
