"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import LuminousCard from "../components/LuminousCard";

export default function ClientAreaHome() {
  const [profile, setProfile] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [meRes, svcRes, invRes, tixRes] = await Promise.all([
          fetch("/api/me"),
          fetch("/api/services"),
          fetch("/api/invoices"),
          fetch("/api/tickets"),
        ]);

        if (!meRes.ok) throw new Error("Not authenticated");

        const me = await meRes.json();
        const svcData = svcRes.ok ? await svcRes.json() : { products: [] };
        const invData = invRes.ok ? await invRes.json() : { invoices: { invoice: [] } };
        const tixData = tixRes.ok ? await tixRes.json() : { tickets: { ticket: [] } };

        setProfile(me);
        setServices(svcData.products || []);
        const invList = invData?.invoices?.invoice || [];
        setInvoices(Array.isArray(invList) ? invList : [invList]);
        const tixList = tixData?.tickets?.ticket || [];
        setTickets(Array.isArray(tixList) ? tixList : [tixList]);
      } catch (e: any) {
        setError(e.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-slate-300">Loading…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-red-400">{error}</p>
          <Link href="/login" className="mt-4 inline-block text-cyan-200 underline">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  const activeCount = services.filter((s: any) => s.status === "Active").length;
  const unpaidInvoices = invoices.filter((i: any) => i.status === "Unpaid");
  const openTickets = tickets.filter((t: any) =>
    ["Open", "In Progress", "Customer-Reply"].includes(t.status)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-cyan-200 sm:text-4xl">
          {profile?.client?.firstname
            ? `Welcome back, ${profile.client.firstname}`
            : "Client Area"}
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <LuminousCard className="p-6">
            <div className="text-sm text-slate-400">Active Services</div>
            <div className="mt-2 text-3xl font-bold text-cyan-200">{activeCount}</div>
            <Link href="/clientarea/services" className="mt-3 inline-block text-sm text-cyan-300 underline">
              View services
            </Link>
          </LuminousCard>

          <LuminousCard className="p-6">
            <div className="text-sm text-slate-400">Unpaid Invoices</div>
            <div className="mt-2 text-3xl font-bold text-amber-200">{unpaidInvoices.length}</div>
            <Link href="/billing/invoices" className="mt-3 inline-block text-sm text-cyan-300 underline">
              View invoices
            </Link>
          </LuminousCard>

          <LuminousCard className="p-6">
            <div className="text-sm text-slate-400">Open Tickets</div>
            <div className="mt-2 text-3xl font-bold text-cyan-200">{openTickets.length}</div>
            <Link href="/support/tickets" className="mt-3 inline-block text-sm text-cyan-300 underline">
              View tickets
            </Link>
          </LuminousCard>

          <LuminousCard className="p-6">
            <div className="text-sm text-slate-400">Order History</div>
            <div className="mt-6">
              <Link href="/clientarea/orders" className="text-sm text-cyan-300 underline">
                View orders
              </Link>
            </div>
          </LuminousCard>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <LuminousCard className="p-6">
            <h2 className="text-lg font-semibold text-cyan-100">Recent Invoices</h2>
            <div className="mt-4 divide-y divide-cyan-400/10">
              {invoices.slice(0, 5).length === 0 ? (
                <p className="py-2 text-sm text-slate-400">No invoices yet.</p>
              ) : (
                invoices.slice(0, 5).map((inv: any) => (
                  <div key={inv.id} className="flex items-center justify-between py-2 text-sm">
                    <span className="font-mono text-slate-300">#{inv.id}</span>
                    <span className={inv.status === "Unpaid" ? "text-amber-200" : "text-slate-400"}>
                      {inv.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </LuminousCard>

          <LuminousCard className="p-6">
            <h2 className="text-lg font-semibold text-cyan-100">Recent Tickets</h2>
            <div className="mt-4 divide-y divide-cyan-400/10">
              {tickets.slice(0, 5).length === 0 ? (
                <p className="py-2 text-sm text-slate-400">No tickets yet.</p>
              ) : (
                tickets.slice(0, 5).map((ticket: any) => (
                  <div key={ticket.id} className="flex items-center justify-between py-2 text-sm">
                    <span className="text-slate-300 truncate max-w-[240px]">{ticket.subject || `#${ticket.tid}`}</span>
                    <span className={ticket.status === "Open" ? "text-cyan-200" : "text-slate-400"}>
                      {ticket.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </LuminousCard>
        </div>
      </div>
    </div>
  );
}
