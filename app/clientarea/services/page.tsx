"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import LuminousCard from "../../components/LuminousCard";

interface Service {
  id: string;
  name?: string;
  product_name?: string;
  domain?: string;
  status?: string;
  billingcycle?: string;
  nextduedate?: string;
  amount?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load services");
        setServices(data.products || []);
      } catch (e: any) {
        setError(e.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-cyan-200 sm:text-4xl">My Services</h1>
          <Link
            href="/checkout"
            className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Order new service
          </Link>
        </div>

        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {!loading && !error && (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.length === 0 ? (
              <p className="text-slate-400 col-span-full">No services found.</p>
            ) : (
              services.map((svc: any) => (
                <LuminousCard key={svc.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-100">
                        {svc.name || svc.product_name || `Service #${svc.id}`}
                      </h3>
                      {svc.domain && (
                        <p className="mt-1 text-sm font-mono text-slate-400">{svc.domain}</p>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        svc.status === "Active"
                          ? "bg-green-500/20 text-green-300"
                          : svc.status === "Suspended"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {svc.status || "Unknown"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-1 text-sm text-slate-300">
                    {svc.billingcycle && (
                      <div>Billing: {svc.billingcycle}</div>
                    )}
                    {svc.nextduedate && <div>Next due: {svc.nextduedate}</div>}
                    {svc.amount && <div>{svc.amount}</div>}
                  </div>
                </LuminousCard>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
