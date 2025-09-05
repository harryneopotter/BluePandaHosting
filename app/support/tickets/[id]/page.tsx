"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function load() {
    try {
      const res = await fetch(`/api/tickets/${id}`);
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Failed to load ticket");
      setData(j);
    } catch (e: any) {
      setError(e.message || "Failed to load ticket");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;
    load();
  }, [id]);

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/tickets/${id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Failed to send reply");
      setMessage("");
      await load();
    } catch (e: any) {
      setError(e.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-200">Ticket #{id}</h1>
        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-white/5 p-6">
              <div className="font-semibold">{data?.subject}</div>
              <div className="text-sm text-slate-300">Status: {data?.status}</div>
            </div>
            <form onSubmit={sendReply} className="rounded-2xl border border-cyan-400/20 bg-white/5 p-6 space-y-3">
              <div>
                <label className="block text-sm text-slate-300">Reply</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 h-40" required />
              </div>
              <button type="submit" disabled={sending} className="rounded-lg bg-cyan-400/20 border border-cyan-400/40 px-4 py-2 text-cyan-200 hover:bg-cyan-400/30">
                {sending ? "Sending…" : "Send Reply"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
