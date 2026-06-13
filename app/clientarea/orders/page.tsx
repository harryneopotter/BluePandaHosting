"use client";

import React, { useEffect, useState } from "react";
import LuminousCard from "../../components/LuminousCard";

interface Order {
  id: string;
  ordernum?: string;
  status?: string;
  amount?: string;
  date?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load orders");
        setOrders(data.orders || []);
      } catch (e: any) {
        setError(e.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-cyan-200 sm:text-4xl">Order History</h1>

        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}

        {!loading && !error && (
          <LuminousCard className="mt-6 divide-y divide-cyan-400/10">
            {orders.length === 0 ? (
              <div className="p-4 text-slate-300">No orders found.</div>
            ) : (
              orders.map((order: any) => (
                <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                  <div>
                    <span className="font-mono text-slate-200">#{order.id}</span>
                    {order.ordernum && (
                      <span className="ml-3 text-slate-400">Order #{order.ordernum}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={order.status === "Pending" ? "text-amber-200" : "text-slate-300"}>
                      {order.status || "Unknown"}
                    </span>
                    {order.amount && <span className="text-cyan-100">{order.amount}</span>}
                    {order.date && <span className="text-slate-400">{order.date}</span>}
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
