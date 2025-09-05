/*
  app/lib/whmcsClient.ts
  Lightweight WHMCS API client (server-only)
*/

import { NextResponse } from "next/server";

export type WhmcsParams = Record<string, string | number | boolean | undefined | null>;

function requiredEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const API_URL = process.env.WHMCS_API_URL;
const API_IDENTIFIER = process.env.WHMCS_API_IDENTIFIER;
const API_SECRET = process.env.WHMCS_API_SECRET;

function toFormBody(params: Record<string, any>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "boolean") {
      usp.set(k, v ? "true" : "false");
    } else {
      usp.set(k, String(v));
    }
  }
  return usp.toString();
}

export async function whmcs<T = any>(action: string, params: WhmcsParams = {}): Promise<T> {
  // Mock mode for local development
  if (process.env.USE_MOCK_WHMCS === 'true') {
    return getMockWhmcsResponse(action, params) as T;
  }

  const url = API_URL || requiredEnv("WHMCS_API_URL");
  const identifier = API_IDENTIFIER || requiredEnv("WHMCS_API_IDENTIFIER");
  const secret = API_SECRET || requiredEnv("WHMCS_API_SECRET");

  const body = toFormBody({
    identifier,
    secret,
    action,
    responsetype: "json",
    ...params,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WHMCS ${action} HTTP ${res.status}: ${text?.slice(0, 200)}`);
  }

  const json: any = await res.json();
  if (json?.result && json.result !== "success") {
    const msg = json.message || json.result || "unknown_error";
    const code = json?.errorcode || json?.code;
    const err = new Error(`WHMCS ${action} failed: ${msg}${code ? ` (${code})` : ""}`);
    // Attach raw for debugging (not to be sent to client)
    (err as any).whmcs = json;
    throw err;
  }
  return json as T;
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Mock WHMCS responses for local development
 */
function getMockWhmcsResponse(action: string, params: WhmcsParams): any {
  switch (action) {
    case 'GetSupportDepartments':
      return {
        result: 'success',
        departments: {
          department: [
            { id: '1', name: 'General Support' },
            { id: '2', name: 'Technical Support' },
            { id: '3', name: 'Billing Support' }
          ]
        }
      };

    case 'ValidateLogin':
      // Mock successful login for test credentials
      if (params.email === 'test@example.com' && params.password === 'password') {
        return { result: 'success', userid: 1 };
      }
      // Throw error for invalid credentials (like real WHMCS would)
      const error = new Error('WHMCS ValidateLogin failed: Invalid login credentials');
      (error as any).whmcs = { result: 'error', message: 'Invalid login credentials' };
      throw error;

    case 'GetClientsDetails':
      return {
        result: 'success',
        userid: 1,
        client: {
          id: '1',
          uuid: 'mock-uuid-123',
          firstname: 'John',
          lastname: 'Doe',
          email: 'test@example.com',
          address1: '123 Test St',
          city: 'Test City',
          state: 'Test State',
          postcode: '12345',
          country: 'US'
        }
      };

    case 'GetInvoices':
      return {
        result: 'success',
        totalresults: 2,
        invoices: {
          invoice: [
            {
              id: '101',
              invoicenum: 'INV-001',
              userid: '1',
              date: '2025-08-01',
              duedate: '2025-08-15',
              subtotal: '9.99',
              total: '11.99',
              status: 'Paid'
            },
            {
              id: '102',
              invoicenum: 'INV-002',
              userid: '1',
              date: '2025-08-15',
              duedate: '2025-08-30',
              subtotal: '19.99',
              total: '23.99',
              status: 'Unpaid'
            }
          ]
        }
      };

    case 'GetInvoice':
      const invoiceId = params.invoiceid;
      return {
        result: 'success',
        invoiceid: invoiceId,
        invoicenum: `INV-${String(invoiceId).padStart(3, '0')}`,
        userid: '1',
        date: '2025-08-01',
        duedate: '2025-08-15',
        subtotal: '9.99',
        total: '11.99',
        status: 'Paid',
        items: {
          item: [
            {
              id: '1',
              type: 'hosting',
              relid: '1',
              description: 'Shared Hosting Basic - Monthly',
              amount: '9.99'
            }
          ]
        }
      };

    case 'GetTickets':
      return {
        result: 'success',
        totalresults: 2,
        tickets: {
          ticket: [
            {
              id: '201',
              tid: 'ABC123',
              c: '1',
              deptid: '1',
              subject: 'Test Ticket 1',
              status: 'Open',
              priority: 'Medium',
              lastreply: '2025-08-30 10:00:00'
            },
            {
              id: '202',
              tid: 'DEF456',
              c: '1',
              deptid: '2',
              subject: 'Test Ticket 2',
              status: 'Answered',
              priority: 'High',
              lastreply: '2025-08-29 15:30:00'
            }
          ]
        }
      };

    case 'GetTicket':
      const ticketId = params.ticketid;
      return {
        result: 'success',
        ticketid: ticketId,
        tid: `ABC${ticketId}`,
        c: '1',
        clientid: '1',
        deptid: '1',
        userid: '1',
        name: 'John Doe',
        email: 'test@example.com',
        subject: `Test Ticket ${ticketId}`,
        status: 'Open',
        priority: 'Medium',
        replies: {
          reply: [
            {
              id: '1',
              userid: '1',
              name: 'John Doe',
              email: 'test@example.com',
              date: '2025-08-30 10:00:00',
              message: 'This is the original ticket message.'
            }
          ]
        }
      };

    case 'AddOrder':
      return {
        result: 'success',
        orderid: Math.floor(Math.random() * 1000) + 1000,
        invoiceid: Math.floor(Math.random() * 1000) + 2000
      };

    case 'OpenTicket':
      const newTicketId = Math.floor(Math.random() * 1000) + 3000;
      return {
        result: 'success',
        id: newTicketId,
        ticketid: newTicketId,
        tid: `TKT${Math.floor(Math.random() * 10000)}`
      };

    case 'AddTicketReply':
      return {
        result: 'success',
        replyid: Math.floor(Math.random() * 1000) + 4000
      };

    case 'CreateSsoToken':
      return {
        result: 'success',
        access_token: 'mock-sso-token-' + Date.now()
      };

    default:
      throw new Error(`Mock WHMCS action '${action}' not implemented`);
  }
}
