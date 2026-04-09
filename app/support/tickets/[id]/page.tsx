"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LuminousCard from "../../../components/LuminousCard";

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/tickets/${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to load ticket");
      setData(json);
    } catch (err: any) {
      setError(err.message || "Failed to load ticket");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    load();
  }, [id, load]);

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/tickets/${id}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to send reply");
      setMessage("");
      await load();
    } catch (err: any) {
      setError(err.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  }

  const replies = data?.replies?.reply || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-extrabold text-cyan-200 sm:text-4xl">Ticket #{id}</h1>
        {loading && <p className="mt-4 text-slate-300">Loading…</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        {!loading && !error && (
          <div className="mt-6 space-y-6">
            <LuminousCard className="space-y-3 p-6">
              <div className="text-xl font-semibold text-slate-100">{data?.subject || "Ticket details"}</div>
              <div className="text-sm text-slate-300">Status: {data?.status || "Unknown"}</div>
              <div className="text-sm text-slate-300">Priority: {data?.priority || "Unknown"}</div>
              {data?.deptid && <div className="text-sm text-slate-300">Department ID: {data.deptid}</div>}
            </LuminousCard>

            <LuminousCard className="divide-y divide-cyan-400/10">
              <div className="p-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Conversation
              </div>
              {replies.length === 0 ? (
                <div className="p-4 text-slate-300">No replies returned for this ticket yet.</div>
              ) : (
                replies.map((reply: any, index: number) => (
                  <div key={reply.id || `${reply.date}-${index}`} className="space-y-2 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
                      <span>{reply.name || reply.email || "Support update"}</span>
                      <span>{reply.date || "Unknown time"}</span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">{reply.message || ""}</p>
                  </div>
                ))
              )}
            </LuminousCard>

            <LuminousCard className="p-6">
              <form onSubmit={sendReply} className="space-y-3">
                <label className="block text-sm text-slate-300">Reply</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-40 w-full rounded border border-slate-700 bg-slate-800 px-2 py-2"
                  required
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="rounded-lg border border-cyan-400/40 bg-cyan-400/20 px-4 py-2 text-cyan-200 hover:bg-cyan-400/30"
                >
                  {sending ? "Sending…" : "Send Reply"}
                </button>
              </form>
            </LuminousCard>
          </div>
        )}
      </div>
    </div>
  );
}
