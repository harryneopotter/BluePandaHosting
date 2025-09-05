"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTicketPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<any[]>([]);
  const [deptid, setDeptid] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/support/departments");
        const j = await res.json();
        const list = j?.departments?.department || [];
        setDepartments(list);
        if (list[0]?.id) setDeptid(String(list[0].id));
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deptid: Number(deptid), subject, message })
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Failed to open ticket");
      router.push(`/support/tickets/${j.ticketId}`);
    } catch (e: any) {
      setError(e.message || "Failed to open ticket");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-200">Open Ticket</h1>
        {loading ? (
          <p className="mt-4 text-slate-300">Loading…</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300">Department</label>
              <select value={deptid} onChange={(e) => setDeptid(e.target.value)} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-1">
                {departments.map((d: any) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300">Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-1" required />
            </div>
            <div>
              <label className="block text-sm text-slate-300">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 h-40" required />
            </div>
            {error && <div className="text-red-400">{error}</div>}
            <button type="submit" disabled={submitting} className="rounded-lg bg-cyan-400/20 border border-cyan-400/40 px-4 py-2 text-cyan-200 hover:bg-cyan-400/30">
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
