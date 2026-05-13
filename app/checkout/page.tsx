"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LuminousCard from "../components/LuminousCard";

const BILLING_CYCLES = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "semiannually", label: "Semi-Annually" },
  { value: "annually", label: "Annually" },
  { value: "biennially", label: "Biennially" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [pid, setPid] = useState("");
  const [billingcycle, setBillingcycle] = useState("monthly");
  const [promocode, setPromocode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid, billingcycle, promocode: promocode || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Order creation failed");

      setSuccess(`Order placed! Order #${data.orderId}, Invoice #${data.invoiceId}`);
      setPid("");
      setPromocode("");
    } catch (e: any) {
      setError(e.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-cyan-200 sm:text-4xl">Checkout</h1>
        <p className="mt-2 text-slate-400">Place an order for a new service or domain.</p>

        <LuminousCard className="mt-8 p-6">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300">Product ID</label>
              <input
                type="text"
                value={pid}
                onChange={(e) => setPid(e.target.value)}
                required
                placeholder="e.g. 123"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">Enter the WHMCS product ID you wish to order.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">Billing Cycle</label>
              <select
                value={billingcycle}
                onChange={(e) => setBillingcycle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none"
              >
                {BILLING_CYCLES.map((bc) => (
                  <option key={bc.value} value={bc.value}>
                    {bc.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300">
                Promo Code <span className="text-slate-500">(optional)</span>
              </label>
              <input
                type="text"
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
                placeholder="Enter promo code"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-lg border border-green-400/30 bg-green-500/10 p-3 text-sm text-green-300">
                {success}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
              >
                {loading ? "Placing order…" : "Place order"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/clientarea")}
                className="rounded-xl border border-white/10 px-5 py-2 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </form>
        </LuminousCard>
      </div>
    </div>
  );
}
