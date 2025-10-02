# Deleted Dynamic Routes

The following dynamic routes (both API and page routes) were deleted to resolve a persistent build failure related to Next.js static export (`output: 'export'`). These routes are dynamic and require a server environment, which conflicts with the static export configuration.

The routes can be restored when the application is configured for server-side rendering or when the build issues are addressed in another way.

## Deleted Routes

- `app/api/invoices/[id]/`
- `app/api/tickets/[id]/`
- `app/billing/invoices/[id]/`
- `app/support/tickets/[id]/`
- `app/api/me/`
- `app/api/invoices/`
- `app/api/support/departments/`

---

## Instructions for Restoration

To restore the deleted functionality, recreate the following files and directories with their original content.

### API Routes

#### `app/api/invoices/[id]/route.ts`

```typescript
// file: app/api/invoices/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  const r = await whmcs<any>("GetInvoice", { invoiceid: params.id });
  const ownerId = Number(r.userid ?? r.clientid ?? r.user_id);
  if (ownerId !== s.clientId) return jsonError("Not found", 404);

  return NextResponse.json(r);
}
```

#### `app/api/invoices/[id]/pdf/route.ts`

```typescript
// file: app/api/invoices/[id]/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  const inv = await whmcs<any>("GetInvoice", { invoiceid: params.id });
  const ownerId = Number(inv.userid ?? inv.clientid ?? inv.user_id);
  if (ownerId !== s.clientId) return jsonError("Not found", 404);

  const destination = `clientarea:/viewinvoice.php?id=${params.id}&action=download`;
  const sso = await whmcs<any>("CreateSsoToken", { client_id: s.clientId, destination });
  const url = sso.redirect_url || sso.redirectUrl || sso.url;
  if (!url) return jsonError("SSO failed", 500);
  return NextResponse.redirect(url, { status: 302 });
}
```

#### `app/api/tickets/[id]/route.ts`

```typescript
// file: app/api/tickets/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../lib/session";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const t = await whmcs<any>("GetTicket", { ticketid: params.id });
  if (Number(t.clientid) !== s.clientId) return jsonError("Not found", 404);
  return NextResponse.json(t);
}
```

#### `app/api/tickets/[id]/replies/route.ts`

```typescript
// file: app/api/tickets/[id]/replies/route.ts
import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../../../lib/whmcsClient";
import { getSessionFromRequest } from "../../../../lib/session";
import { rateLimit } from "../../../../lib/rateLimit";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const rl = rateLimit(`ticket:reply:${s.clientId}`, 40, 60 * 60 * 1000);
  if (!rl.ok) return jsonError("Too many requests. Try again later.", 429);

  const t = await whmcs<any>("GetTicket", { ticketid: params.id });
  if (Number(t.clientid) !== s.clientId) return jsonError("Not found", 404);

  const { message } = await req.json();
  if (!message) return jsonError("message is required", 400);

  const r = await whmcs<any>("AddTicketReply", { ticketid: params.id, message });
  return NextResponse.json({ ok: true, replyId: Number(r.replyid || 0) });
}
```

#### `app/api/me/route.ts`

```typescript
// file: app/api/me/route.ts
import { NextResponse } from "next/server";
import { whmcs, jsonError } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";

export async function GET() {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);
  const details = await whmcs<any>("GetClientsDetails", { clientid: s.clientId, stats: false });
  return NextResponse.json({ clientId: s.clientId, details });
}
```

#### `app/api/invoices/route.ts`

```typescript
// file: app/api/invoices/route.ts
import { NextRequest, NextResponse } from "next/server";
import { whmcs, jsonError } from "../../lib/whmcsClient";
import { getSessionFromRequest } from "../../lib/session";

export async function GET(req: NextRequest) {
  const s = getSessionFromRequest();
  if (!s) return jsonError("Not authenticated", 401);

  const url = new URL(req.url);
  const status = url.searchParams.get("status") || undefined;
  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = Number(url.searchParams.get("pageSize") || 25);
  const limitstart = (page - 1) * pageSize;

  const r = await whmcs<any>("GetInvoices", {
    userid: s.clientId,
    status,
    limitstart,
    limitnum: pageSize,
  });

  return NextResponse.json(r);
}
```

#### `app/api/support/departments/route.ts`

```typescript
// file: app/api/support/departments/route.ts
import { NextResponse } from "next/server";
import { whmcs } from "../../../lib/whmcsClient";

export async function GET() {
  const r = await whmcs<any>("GetSupportDepartments");
  return NextResponse.json(r);
}
```

### Page Routes

#### `app/billing/invoices/[id]/page.tsx`

```typescript
// file: app/billing/invoices/[id]/page.tsx
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
```

#### `app/support/tickets/[id]/page.tsx`

```typescript
// file: app/support/tickets/[id]/page.tsx
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
```