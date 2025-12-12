# Product Requirements Document: AI-Integrated Client Area

**Project Codename:** Quantum Nexus  
**Version:** 1.0  
**Date:** 2025-12-10  
**Author:** QuantumPanda Engineering  
**Status:** Draft for Review

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Personas](#4-user-personas)
5. [Scope & Non-Goals](#5-scope--non-goals)
6. [System Architecture](#6-system-architecture)
7. [Feature Requirements](#7-feature-requirements)
8. [UX/UI Design Principles](#8-uxui-design-principles)
9. [Technical Requirements](#9-technical-requirements)
10. [Integration Requirements](#10-integration-requirements)
11. [Security & Compliance](#11-security--compliance)
12. [Risks, Pitfalls & Mitigations](#12-risks-pitfalls--mitigations)
13. [Dependencies](#13-dependencies)
14. [Timeline & Milestones](#14-timeline--milestones)
15. [Open Questions](#15-open-questions)

---

## 1. Executive Summary

QuantumPanda's AI-Integrated Client Area ("Quantum Nexus") is a next-generation customer portal that combines traditional hosting account management (via WHMCS API) with an intelligent AI assistant ("Quantum Assistant") and a custom AI infrastructure monitoring layer. The goal is to create an experience that feels less like a billing portal and more like a "Mission Control" for the customer's digital infrastructure.

### Key Differentiators
- **AI-First UX:** The Quantum Assistant can answer questions, explain data, AND execute actions.
- **Proactive Monitoring:** AI analyzes server health and alerts users BEFORE issues escalate.
- **Unified Dashboard:** Services, Billing, Support, and AI Insights in one place.
- **Luminous Design:** Extends the existing `LuminousCard` aesthetic with motion, glassmorphism, and space-age aesthetics.

---

## 2. Problem Statement

### The Current State
Traditional hosting client areas (including WHMCS's default) suffer from:
1. **Fragmented UX:** Separate pages for invoices, tickets, and services with no unified view.
2. **Reactive Support:** Users must identify problems, then create tickets.
3. **Technical Jargon:** Logs, metrics, and server data are often unintelligible to non-technical users.
4. **No Intelligence:** Static dashboards that don't learn or adapt.
5. **Outdated Design:** Feels corporate, not modern.

### The Desired State
A client area where:
1. A user can say "My site feels slow" and receive an AI-generated diagnosis and fix.
2. The system alerts users about expiring domains or potential security threats before they cause downtime.
3. Complex actions (deploy a new site, upgrade a server) are guided by AI.
4. The interface is visually stunning and delightful to use daily.
5. Everything is accessible and self-explanatory for non-technical users.

---

## 3. Goals & Success Metrics

### Primary Goals
| Goal | Metric | Target | Timeline |
| :--- | :--- | :--- | :--- |
| Reduce support ticket volume | Tickets per user per month | -30% | 6 months |
| Increase user engagement | Average session duration | +50% | 3 months |
| Improve user satisfaction | CSAT score | >4.5/5.0 | 3 months |
| Accelerate self-service adoption | Self-serve actions / Total actions | >70% | 6 months |

### Secondary Goals
- Establish QuantumPanda as a thought leader in AI-powered hosting.
- Create a platform that can upsell services intelligently (e.g., "Your site is getting popular, consider upgrading to VPS").
- Reduce operational overhead by automating common tasks.

### Success Criteria
- **Technical:** 99.9% uptime, <200ms API response time.
- **UX:** Mobile-responsive, accessible (WCAG 2.1 AA), zero UI blocking errors.
- **AI:** 85%+ intent recognition accuracy; users prefer AI-guided actions over manual steps.

---

## 4. User Personas

### Persona 1: "The Startup Founder" (Primary)
- **Name:** Alex Chen
- **Age:** 28
- **Background:** Non-technical founder of a SaaS startup; has a developer on the team but wants direct control.
- **Tech Fluency:** Low-Medium (understands URLs, basic troubleshooting).
- **Pain Points:** 
  - Doesn't understand server logs; wants things to "just work."
  - Wakes up at 3am worried about site being down.
  - Billing surprises frustrate them.
- **Needs:** 
  - Simple explanations (no jargon).
  - Proactive alerts.
  - One-click fixes.
  - Peace of mind.

### Persona 2: "The Agency Developer" (Secondary)
- **Name:** Maria Garcia
- **Age:** 35
- **Background:** Full-stack developer managing 20+ client sites; expert in cloud infrastructure.
- **Tech Fluency:** High (REST APIs, containers, monitoring).
- **Pain Points:** 
  - Switching between multiple dashboards is time-consuming.
  - Repetitive tasks (deployments, backups) take valuable time.
  - Wants API access to automate her workflow.
- **Needs:** 
  - Bulk actions.
  - Quick access to server controls.
  - API access for custom integrations.
  - Time-saving automation.

### Persona 3: "The E-commerce Owner" (Tertiary)
- **Name:** Sam Patel
- **Age:** 42
- **Background:** Runs a successful online store; business depends on uptime.
- **Tech Fluency:** Medium (understands uptime, traffic, conversions).
- **Pain Points:** 
  - Fears downtime during peak sales periods (Black Friday, Cyber Monday).
  - Confused by billing; wants cost predictability.
  - No visibility into "why" his site is slow during traffic spikes.
- **Needs:** 
  - Uptime guarantees with real SLAs.
  - Cost predictability and breakdown.
  - Performance insights tied to revenue impact.
  - Proactive alerts.

---

## 5. Scope & Non-Goals

### In Scope (MVP - Phase 1)
| Feature | Description | Priority |
| :--- | :--- | :--- |
| **Dashboard** | Unified view of services, invoices, tickets, AI insights. | P0 |
| **Service Management** | View, manage (basic actions), and provision services. | P0 |
| **Billing Module** | View invoices, pay invoices (via WHMCS SSO). | P0 |
| **Support Module** | View/create tickets, AI-assisted draft. | P1 |
| **Quantum Assistant** | Context-aware AI chatbot with action execution. | P0 |
| **AI Monitor** | Real-time view of security/performance metrics. | P1 |
| **Authentication** | Login, logout, session management (via WHMCS). | P0 |
| **Responsive Design** | Full support for mobile, tablet, desktop. | P0 |

### Out of Scope (Future Phases)
| Feature | Reason for Exclusion |
| :--- | :--- |
| Native Mobile App | Focus on responsive web first; reassess after MVP success. |
| Multi-tenancy / Reseller Portals | Complexity; target individual users first. |
| Full Payment Gateway Integration | Use WHMCS's SSO/payment gateway initially. |
| AI-driven auto-remediation | Requires robust testing and approval workflows. Start with recommendations. |
| API for Third-Party Integrations | Build internal UI first; expose API in Phase 2. |
| Advanced Analytics / Business Intelligence | Phase 2 feature; focus on core UX first. |
| Knowledge Base / Documentation | Use external wiki; link from UI. |

---

## 6. System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND (Next.js App Router)              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │  Dashboard  │  │  Services   │  │   Billing   │  │   Support   │ │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │
│         │                │                │                │        │
│         └────────────────┴────────────────┴────────────────┘        │
│                                   │                                  │
│                        ┌──────────┴──────────┐                       │
│                        │  Quantum Assistant  │ (Persistent Context) │
│                        │  (AI Helper Overlay)│                       │
│                        └──────────┬──────────┘                       │
└────────────────────────────────────┼────────────────────────────────┘
                                     │ (API Routes)
┌────────────────────────────────────┼────────────────────────────────┐
│                          BACKEND (Next.js API Routes)               │
│  ┌─────────────────────────────────┴──────────────────────────────┐ │
│  │                  BFF (Backend for Frontend)                    │ │
│  │  - Session Validation  - Request Transformation               │ │
│  │  - Rate Limiting       - Caching (Redis)                      │ │
│  │  - Error Handling      - Audit Logging                        │ │
│  └──────────────────────────────────────────────────────────────────┘│
│              │                            │                         │
│   ┌──────────┴──────────┐      ┌──────────┴──────────┐              │
│   │     WHMCS API       │      │    AI Infra API     │              │
│   │  (Billing, Support) │      │  (Monitoring, Gen)  │              │
│   │  (GetInvoices, etc) │      │  (Health, Metrics)  │              │
│   └─────────────────────┘      └─────────────────────┘              │
│         (External)                   (External)                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Breakdown
| Layer | Technology | Responsibility |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14+, React, Tailwind, Framer Motion | UI rendering, client state, animations. |
| **State Management** | React Context, TanStack Query | AI conversation context, server state caching. |
| **BFF** | Next.js API Routes | Proxy, validate, transform, secure WHMCS/AI calls. |
| **External APIs** | WHMCS, Custom AI Infra | Source of truth for data and AI operations. |
| **Caching** | Redis (optional, Phase 2) | Cache user data, reduce API calls. |

### Data Flow Example: "Show my invoices"
```
User Request
    ↓
Next.js API Route (/api/billing/invoices)
    ↓
Session Validation (is user logged in?)
    ↓
WHMCS API Call (GetInvoices action)
    ↓
Transform WHMCS Response (normalize, filter)
    ↓
Return JSON to Frontend
    ↓
React Component Renders Invoice List
    ↓
LuminousCard + Slide-in Animation
```

---

## 7. Feature Requirements

### 7.1 Dashboard ("Mission Control")

**Description:** The home page after login. A unified view of everything the user cares about.

**Key Components:**
1. **Welcome Card** (Top)
   - Personalized greeting: "Welcome back, Alex."
   - AI suggestion: "Your WordPress site had 2x traffic this week! Consider upgrading to VPS."
   
2. **Service Status Grid** (Left side, 60% width)
   - Active services (Hosting, Domains, SSL, Email).
   - Status indicator (green = healthy, yellow = caution, red = down).
   - Quick action buttons (Reboot, View Logs, Manage).
   
3. **Financial Widget** (Right side, 40% width)
   - Next invoice due (red if overdue).
   - Total monthly spend.
   - "View all invoices" button.
   
4. **Support Widget** (Bottom left)
   - Open tickets count.
   - "Create new ticket" button.
   
5. **AI Insights Widget** (Bottom right)
   - AI-generated alerts (e.g., "Unusual traffic from Russia detected").
   - "View all alerts" link.

**Interactions:**
- Click on service card → Navigate to `/services/[id]`.
- Click on invoice → Navigate to `/billing`.
- Click on alert → Navigate to `/ai-monitor`.

**Animation:**
- All cards slide in on page load (via LuminousCard).
- Widgets update in real-time (WebSocket for alerts, polling for summaries).

---

### 7.2 Service Management (`/services` and `/services/[id]`)

#### 7.2.1 Services List (`/services`)

**Description:** A grid of all active services (products) the user has purchased.

**Key Components:**
1. **Service Card** (Repeating, Grid layout)
   - Service name (e.g., "WordPress Shared Hosting").
   - Status icon + label.
   - Next billing date.
   - Quick actions: View, Manage, Upgrade, Renew.
   
2. **Filters/Sort** (Top)
   - Filter by type: Hosting, Domain, SSL, Email.
   - Sort by: Name, Status, Billing Date.
   
3. **"Provision New Service"** Button (Top right)
   - Leads to AI-guided provisioning wizard.

**Data Source:** WHMCS `GetProducts` + `GetProductsDetails`.

**Example Data:**
```
Service 1:
  - Name: "Quantum Entanglement (WordPress Hosting)"
  - Status: "Active"
  - Billing Date: "2025-12-15"
  - Actions: [View] [Manage] [Renew]

Service 2:
  - Name: "example.com (Domain Registration)"
  - Status: "Active"
  - Billing Date: "2026-01-10"
  - Actions: [Manage DNS] [Renew] [Transfer]
```

---

#### 7.2.2 Service Detail Page (`/services/[id]`)

**Description:** Deep dive into a specific service. This is the "Ship Control" for a single server.

**Key Components:**

##### A. Service Header
- Service name, type, status.
- Quick actions: Reboot, Suspend, Upgrade, Renew, Cancel.

##### B. Overview Tab (Default)
- Service plan details (storage, RAM, bandwidth).
- Billing info (renewal date, price).
- IP address / SSH access info.
- Status history (last 30 days).

##### C. Performance Tab
- CPU usage (graph, real-time).
- Memory usage (graph, real-time).
- Disk usage (graph, warning if >80%).
- Bandwidth usage (month-to-date vs. limit).
- Alerts triggered in the last 7 days.

##### D. Management Tab
- File manager (FTP/SFTP access).
- Database management (MySQL, PostgreSQL).
- Backup history + restore buttons.
- Security (SSL certificate info, malware scan results).

##### E. Logs Tab
- Error logs (PHP, Apache, Nginx).
- Access logs (last 1000 requests).
- AI analysis: "Unusual traffic pattern detected on 2025-12-10 at 14:32 UTC."

##### F. Support Tab
- Open tickets related to this service.
- "Create new ticket for this service" button.
- Knowledge base articles related to this service type.

**Data Source:** WHMCS `GetClientProducts`, custom AI Infra API for metrics.

---

### 7.3 Billing Module (`/billing`)

**Description:** Complete financial view and payment management.

**Key Pages:**

#### 7.3.1 Invoices (`/billing/invoices`)
- List of all invoices (current + archived).
- Status: Paid, Unpaid, Overdue.
- Quick actions: View, Download PDF, Pay Now.
- Filters: By date range, by status.
- AI prompt: "You have 1 overdue invoice. Pay now to avoid service suspension."

**Data Source:** WHMCS `GetInvoices`.

#### 7.3.2 Invoice Detail (`/billing/invoices/[id]`)
- Full invoice breakdown (services, discounts, taxes).
- Payment history.
- "Pay Invoice" button.
- AI explanation: "Your bill increased because you exceeded bandwidth limits by 50GB. Consider upgrading your plan."

**Data Source:** WHMCS `GetInvoice`.

#### 7.3.3 Payment Methods (`/billing/payment-methods`)
- List of stored credit cards (masked).
- Add/edit/delete payment method.
- Set default payment method.
- Auto-pay settings.

**Data Source:** WHMCS `GetPaymentMethods`.

#### 7.3.4 Billing History (`/billing/history`)
- Timeline of all transactions (charges, credits, refunds).
- CSV export option.
- Breakdown by service type (Hosting, Domains, etc.).

**Data Source:** WHMCS `GetInvoices` + `GetTransactions`.

---

### 7.4 Support Module (`/support`)

**Description:** Ticket management and self-service support.

**Key Pages:**

#### 7.4.1 Tickets List (`/support/tickets`)
- All tickets (open, in progress, closed).
- Filters: By status, by department, by priority.
- Search by subject or content.
- "Create New Ticket" button.

**Data Source:** WHMCS `GetTickets`.

#### 7.4.2 Ticket Detail (`/support/tickets/[id]`)
- Full conversation thread.
- Attachments (view, download).
- Ticket info: Status, Priority, Department, Assigned to.
- "Reply" button with AI-assisted draft.
- "Close Ticket" button.

**Data Source:** WHMCS `GetTicket`, `GetTicketReplies`.

#### 7.4.3 Create Ticket (`/support/tickets/new`)
- Form: Subject, Department, Priority, Message.
- AI-assisted subject suggestion: "Based on your description, I think this might be a DNS issue. Try these steps first..."
- Attachment upload.

**Data Source:** WHMCS `OpenTicket`, `AddTicketReply`.

#### 7.4.4 Knowledge Base (`/support/kb`)
- Searchable articles (locally indexed, or via external KB).
- AI-suggested articles based on user's tickets.
- "Was this article helpful?" feedback.

**Data Source:** Internal or external KB API.

---

### 7.5 Quantum Assistant (AI Helper)

**Description:** A persistent, context-aware AI chatbot that lives in the UI and can execute actions.

**Design:**
- **Position:** Bottom-right corner (or expandable sidebar on larger screens).
- **Icon:** Animated Quantum logo (a spinning electron or neural network).
- **States:**
  - **Closed:** Icon only. On hover/click, expands.
  - **Open (Compact):** Small chat bubble, height ~400px, width ~350px.
  - **Open (Expanded):** Full-height sidebar, can cover 1/3 of screen.

**Capabilities:**
1. **Question Answering**
   - "How do I renew my domain?"
   - "What's my current bandwidth usage?"
   - "Why is my invoice higher than usual?"
   
2. **Data Lookup**
   - "Show me my unpaid invoices" → AI queries WHMCS, displays results.
   - "What's the status of my website?" → AI checks service health, reports.
   
3. **Action Execution**
   - "Reboot my server" → AI prompts for confirmation, executes via WHMCS API.
   - "Create a support ticket about slow DNS" → AI opens new ticket form with pre-filled data.
   - "Pay my overdue invoice" → AI redirects to payment page (or initiates if payment method on file).

4. **Proactive Alerts**
   - AI observes user behavior and proactively suggests actions.
   - "Your domain expires in 7 days. Renew now?"
   - "Your site had 500 errors. Check the logs?"

**Technical Architecture:**
- **Backend:** Node.js/Python service that:
  - Processes natural language (intent recognition).
  - Queries WHMCS API + custom AI Infra API.
  - Executes safe actions (with user confirmation).
  - Maintains conversation context.
  
- **Frontend:** React component that:
  - Sends user messages to backend.
  - Displays AI responses with markdown rendering.
  - Shows action buttons ("Confirm", "Cancel", "Learn More").
  - Maintains conversation history (max 50 messages in session).

**Conversation Context:**
- AI knows current page, logged-in user, their services.
- AI can reference previous messages in the conversation.
- Context persists across page navigation (React Context).

**Example Conversation:**
```
User: "My site is slow"
AI: "I'm checking your site's performance now... 
    Your CPU usage is 95% and memory is at 87%. 
    Your site had 10x normal traffic yesterday, which might be causing the slowdown. 
    Would you like me to:
    a) Show you the traffic logs?
    b) Recommend upgrading to a higher plan?
    c) Create a support ticket?"
    
User: "Show logs"
AI: "Here are your access logs from yesterday at 14:30 UTC:
    [Table of logs]
    I notice unusual requests from these IPs: 192.168.1.x, 10.0.0.x
    These might be bots. Would you like me to:
    a) Block these IPs?
    b) Show only legitimate traffic?"
```

---

### 7.6 AI Monitor (`/ai-monitor`)

**Description:** Real-time dashboard of AI-powered security and performance metrics.

**Key Components:**

1. **System Health Summary**
   - Overall health score (0-100).
   - Last update timestamp.
   - Critical alerts count (red badge).

2. **Security Dashboard**
   - Threat level (Low, Medium, High, Critical).
   - Attack attempts detected (last 24h).
   - Malware scan results.
   - SSL certificate status.
   - Firewall rules (blocked IPs, ports).

3. **Performance Dashboard**
   - Response time (p50, p95, p99 latencies).
   - Error rate (5xx, 4xx).
   - Uptime % (last 7 days, 30 days).
   - Traffic trends (requests/sec, bandwidth).

4. **AI Insights**
   - Anomaly detection: "Traffic is 200% above normal for this time of day."
   - Recommendations: "Consider upgrading to VPS. Your CPU is consistently >80%."
   - Predictive alerts: "Based on your current usage, you'll exceed bandwidth limits in 8 days."

5. **Logs & Events**
   - Timeline of security events (attacks blocked, malware detected).
   - Timeline of performance events (slow pages, errors).
   - Filterable, searchable.

**Data Source:** Custom AI Infra API. Will mock initially.

---

## 8. UX/UI Design Principles

### Visual Design ("Luminous Glass")

1. **Color Palette**
   - **Primary:** Cyan (`#06B6D4`), Fuchsia (`#EC4899`), Slate (`#0F172A`).
   - **Backgrounds:** Deep space (gradients from Slate-950 to Slate-900).
   - **Accents:** Neon cyan/fuchsia for interactive elements.
   - **Text:** Slate-100 for primary, Slate-300 for secondary.

2. **Typography**
   - **Headings:** Geist Sans (or system font), bold, letter-spacing: -0.02em.
   - **Body:** Geist Sans, regular, 16px (mobile), 15px (desktop).
   - **Monospace:** JetBrains Mono for code, logs, IPs.

3. **Components**
   - **Cards:** Use existing `LuminousCard` component.
   - **Buttons:** Cyan bg, dark text, hover: brightness increase + scale up.
   - **Inputs:** Dark bg (Slate-900/50), border (Cyan-400/20), focus: border (Cyan-400/80).
   - **Modals:** Glassmorphism (backdrop-blur), border glow.

4. **Motion & Animation**
   - **Page Transitions:** Fade in 300ms.
   - **Card Entry:** Slide up + fade (via `LuminousCard`).
   - **Button Clicks:** Scale 0.96 on tap (via Framer Motion).
   - **Hover:** Lift + brightness increase.
   - **Loading States:** Shimmer animation (not spinners).

5. **Spacing & Layout**
   - **Grid:** 12-column responsive grid.
   - **Padding:** 16px (mobile), 24px (tablet), 32px (desktop).
   - **Gap:** 16px between cards.

### Interaction Design

1. **Navigation**
   - **Sidebar:** Always visible (desktop), collapsible (mobile).
   - **Breadcrumbs:** Visible on all pages (except dashboard).
   - **Back Button:** Consistent placement (top left).

2. **Forms**
   - **Validation:** Real-time, inline feedback (no red, use icons + messages).
   - **Required Fields:** Marked with `*`.
   - **Submission:** Disabled button + loading state during submission.
   - **Success:** Toast notification + redirect (if applicable).
   - **Error:** Toast notification + form error highlighting.

3. **Data Tables**
   - **Sorting:** Click header to sort; show sort direction.
   - **Pagination:** Show 25 items per page; allow user to change.
   - **Row Selection:** Checkboxes for bulk actions.
   - **Mobile:** Stack columns or use horizontal scroll.

4. **Mobile Experience**
   - **Sidebar:** Hamburger menu (toggle).
   - **Cards:** Full-width, single column.
   - **Buttons:** Touch-friendly (48px min height).
   - **Forms:** One input per line; large touch targets.

### Accessibility

1. **WCAG 2.1 AA Compliance:**
   - Color contrast ratios ≥4.5:1 for text.
   - All interactive elements keyboard-accessible.
   - Screen reader support (semantic HTML, ARIA labels).
   - Reduced motion support (respects `prefers-reduced-motion`).

2. **Keyboard Navigation:**
   - Tab through all interactive elements.
   - Enter to click buttons, Space to toggle.
   - Escape to close modals.

3. **Error Messages:**
   - Clear, jargon-free language.
   - Suggest corrective actions.
   - Example: ❌ Bad: "Invalid input." ✅ Good: "Email address must contain '@' symbol."

---

## 9. Technical Requirements

### Frontend Stack
- **Framework:** Next.js 14+ (App Router).
- **Language:** TypeScript.
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion.
- **State:** React Context (Quantum Assistant), TanStack Query (server state).
- **HTTP Client:** Fetch API (built-in).
- **Form Library:** React Hook Form + Zod (validation).
- **Testing:** Playwright (E2E), Vitest (unit).

### Backend Stack
- **Runtime:** Node.js 20+.
- **Framework:** Next.js API Routes.
- **Language:** TypeScript.
- **Session Management:** Secure HTTP-only cookies.
- **Rate Limiting:** Custom middleware (in-memory for MVP, Redis for scale).
- **Logging:** Structured logs (JSON format) to stdout.
- **Monitoring:** OpenTelemetry (optional, Phase 2).

### Database
- **MVP:** None (stateless). User data lives in WHMCS.
- **Phase 2:** PostgreSQL for session persistence, conversation history, audit logs.

### Deployment
- **Hosting:** Vercel (recommended), or self-hosted on Ubuntu 20.04+.
- **Container:** Docker (optional, for consistency).
- **CI/CD:** GitHub Actions (already in use).

### Performance Requirements
| Metric | Target | How to Achieve |
| :--- | :--- | :--- |
| Page Load (LCP) | <2.5s | Image optimization, code splitting, lazy loading. |
| Time to Interactive (TTI) | <3s | Reduce JS bundle, optimize critical path. |
| First Input Delay (FID) | <100ms | Defer non-critical JS, optimize event handlers. |
| API Response Time | <200ms | Efficient WHMCS queries, caching. |
| Lighthouse Score | >90 | Continuous monitoring via CI. |

### Security Requirements
- **HTTPS/TLS 1.3:** Enforce on all pages.
- **CSRF Protection:** Use same-site cookies, CSRF tokens for state-changing requests.
- **XSS Protection:** Content Security Policy (CSP) headers, input sanitization, output encoding.
- **SQL Injection:** Use parameterized queries (WHMCS API does this).
- **Rate Limiting:** 100 requests/minute per IP, 10 failed login attempts/15 minutes.
- **Audit Logging:** Log all sensitive actions (payment, ticket creation, service reboot).

---

## 10. Integration Requirements

### 10.1 WHMCS API Integration

**Endpoints Used:**
| Action | Purpose |
| :--- | :--- |
| `ValidateLogin` | Authenticate user with email + password. |
| `GetClientsDetails` | Fetch user profile (name, email, address). |
| `GetClientProducts` | List active services (hosting, domains). |
| `GetProductsDetails` | Fetch service specs (storage, bandwidth). |
| `GetInvoices` | List invoices. |
| `GetInvoice` | Fetch invoice details. |
| `AddOrder` | Provision new service (domain, hosting). |
| `GetTickets` | List support tickets. |
| `GetTicket` | Fetch ticket + replies. |
| `OpenTicket` | Create new ticket. |
| `AddTicketReply` | Reply to ticket. |
| `GetSupportDepartments` | List support departments (for ticket creation). |
| `GetPaymentMethods` | List stored payment methods. |

**Error Handling:**
- WHMCS API calls can fail. Implement retries (exponential backoff, max 3 attempts).
- Graceful degradation: If AI Infra API is down, show cached data + warning.

### 10.2 Custom AI Infra API Integration

**Endpoints (TBD, to be defined by AI team):**
| Endpoint | Purpose |
| :--- | :--- |
| `GET /metrics/:service_id` | Fetch real-time metrics (CPU, memory, disk). |
| `GET /health/:service_id` | Fetch service health status. |
| `GET /logs/:service_id` | Fetch error logs. |
| `GET /security/:service_id` | Fetch security alerts. |
| `POST /ai/intent` | Intent recognition (NLU). |
| `POST /ai/action` | Execute action (reboot, backup, etc.). |
| `POST /ai/chat` | Quantum Assistant chat endpoint. |

**Authentication:**
- Use API key (stored in environment, never in client).
- All calls go through Next.js BFF (backend-only).

**Data Freshness:**
- Metrics: Update every 30 seconds (client-side polling via TanStack Query).
- Logs: On-demand (user requests).
- Health: Real-time (WebSocket connection, optional Phase 2).

---

## 11. Security & Compliance

### Authentication
- Use WHMCS's built-in login validation.
- Store session in HTTP-only, secure cookie.
- Session timeout: 30 minutes of inactivity.
- Re-authenticate for sensitive actions (pay invoice, reboot server).

### Authorization
- All API routes must validate user session.
- User can only access their own data (enforce via WHMCS API; they handle user isolation).
- Admin users (QuantumPanda staff) need separate auth (not in scope for MVP).

### Data Protection
- Never log passwords, API keys, credit card details.
- Encrypt sensitive data in transit (HTTPS).
- Sanitize all user inputs before displaying (prevent XSS).
- Use parameterized queries (WHMCS does this for us).

### Compliance
- **GDPR:** User data deletion on request (delegate to WHMCS).
- **PCI DSS:** Never store credit card details; use WHMCS's payment gateway.
- **SOC 2:** Implement audit logging, monitoring, incident response (Phase 2).

### API Security
- Rate limiting: 100 req/min per IP, 10 failed logins per 15 mins.
- CORS: Only allow origin `https://yourdomain.com`.
- Disable debug endpoints in production.
- Implement request signing (HMAC) for critical actions.

---

## 12. Risks, Pitfalls & Mitigations

### 12.1 Critical Risks

| Risk | Impact | Likelihood | Mitigation |
| :--- | :--- | :--- | :--- |
| **WHMCS API Downtime** | Users can't view data, pay invoices, or create tickets. | Medium | Implement caching (Redis); show stale data + warning. |
| **Session/Auth Breach** | Attackers access customer accounts. | Low | Use secure cookies, CSRF tokens, rate limiting, MFA (future). |
| **Slow API Responses** | Poor UX; users abandon. | Medium | Optimize WHMCS queries; cache frequently accessed data. |
| **Mobile UX Issues** | Large portion of users (40%+) have poor experience. | Medium | Test early and often on real devices; responsive design. |
| **Data Exposure** | Customer data (IPs, logs) visible to wrong user. | Low | Implement proper authorization; audit regularly. |

### 12.2 Integration Pitfalls

| Pitfall | Symptom | Mitigation |
| :--- | :--- | :--- |
| **WHMCS API Rate Limits** | "Too many requests" errors when polling. | Check WHMCS rate limits; implement client-side debouncing. |
| **Incompatible WHMCS Version** | API calls fail due to missing/changed endpoints. | Test against target WHMCS version; version lock in docs. |
| **Timezone Issues** | Billing dates, invoice dates show incorrectly. | Store all times in UTC; convert client-side. |
| **Billing Cycle Mismatch** | User sees different due date in WHMCS vs. Portal. | Ensure WHMCS is source of truth; query every time. |

### 12.3 AI/ML Pitfalls

| Pitfall | Symptom | Mitigation |
| :--- | :--- | :--- |
| **Poor Intent Recognition** | AI misunderstands user's request. | Implement intent confidence scoring; fall back to human if <70%. |
| **Hallucinations** | AI makes up data (e.g., "You have $500 credit" when you don't). | Never allow AI to directly access financial data; always verify with WHMCS first. |
| **Outdated Information** | AI references stale cached data. | Always query fresh data for critical fields (invoices, balance). |
| **Unsafe Action Execution** | AI reboots server without confirmation. | Require explicit user confirmation for any destructive action. |
| **Context Window Exhaustion** | AI conversation becomes incoherent after many messages. | Implement conversation summarization; reset context every 50 messages. |

### 12.4 UX Pitfalls

| Pitfall | Symptom | Mitigation |
| :--- | :--- | :--- |
| **Overwhelming Dashboard** | New users don't know where to start. | Show onboarding tooltips; use progressive disclosure. |
| **Hidden Features** | Users don't find useful features. | Prominent CTA buttons; AI proactively suggests actions. |
| **Jargon Overload** | Non-technical users confused by "CPU", "bandwidth". | Explain in plain language; use tooltips and help links. |
| **Broken on Mobile** | 50%+ users on mobile have issues. | Test on real devices; prioritize mobile-first design. |
| **Unclear Error Messages** | User sees "Invalid input" and doesn't know how to fix. | Provide specific, actionable error messages. |

### 12.5 Performance Pitfalls

| Pitfall | Symptom | Mitigation |
| :--- | :--- | :--- |
| **Large JS Bundle** | Page takes >3s to load on 3G. | Code splitting; lazy load secondary features. |
| **Unoptimized Images** | Dashboard images are 2MB each. | Use WebP, compress, responsive images. |
| **N+1 Queries** | 1 user = 20 WHMCS API calls. | Batch API calls; aggregate data server-side. |
| **Memory Leaks** | App gets slower after 30 mins of use. | Monitor DevTools; clean up event listeners. |
| **Inefficient Polling** | Every 5 seconds polling WHMCS = 720 calls/hour. | Use exponential backoff; implement WebSocket (future). |

### 12.6 Operational Pitfalls

| Pitfall | Symptom | Mitigation |
| :--- | :--- | :--- |
| **Deployments Break Prod** | Users can't log in after a deployment. | Comprehensive E2E tests; canary deployments. |
| **No Monitoring** | Down for 2 hours before anyone notices. | Implement uptime monitoring, alerting (Sentry, New Relic). |
| **No Rollback Plan** | Bad deployment deployed; can't revert. | Keep previous versions; have rollback procedure. |
| **Database Migrations Fail** | Data corruption during schema change. | Test migrations on staging; have backup before deploying. |

---

## 13. Dependencies

### External Services
- **WHMCS Server:** Running WHMCS 8.0+; API enabled and configured.
- **AI Infra Service:** Custom service (to be built by AI team).
- **Email Service:** SendGrid or similar (for notifications).
- **Monitoring:** Sentry (error tracking), Vercel Analytics (performance).

### Libraries & Frameworks
- **Next.js 14+:** Core framework.
- **React 18+:** UI library.
- **Tailwind CSS:** Styling.
- **Framer Motion:** Animation.
- **TanStack Query:** Data fetching.
- **React Hook Form:** Form handling.
- **Zod:** Validation.
- **Axios or Fetch:** HTTP client.

### Development Tools
- **TypeScript:** Type safety.
- **ESLint:** Code quality.
- **Prettier:** Code formatting.
- **Vitest:** Unit testing.
- **Playwright:** E2E testing.
- **GitHub Actions:** CI/CD.

---

## 14. Timeline & Milestones

### Phase 1: MVP (Weeks 1-6)
**Goal:** Functional, visually stunning client area with core features.

| Week | Deliverable |
| :--- | :--- |
| 1-2 | Setup project structure; WHMCS integration; Dashboard layout. |
| 3 | Services listing & detail pages. |
| 4 | Billing module (invoices, payment). |
| 5 | Support module (tickets); Quantum Assistant V1. |
| 6 | AI Monitor; Testing & bug fixes. |

**Exit Criteria:**
- All P0 features complete.
- Lighthouse score >90.
- 50+ E2E tests passing.
- Internal QA sign-off.

### Phase 2: Polish & Scale (Weeks 7-10)
**Goal:** Production-ready; handle scale; advanced features.

| Week | Deliverable |
| :--- | :--- |
| 7 | Performance optimization; caching (Redis). |
| 8 | Advanced Quantum Assistant (action execution). |
| 9 | Security audit; penetration testing. |
| 10 | Load testing; deployment strategy. |

**Exit Criteria:**
- <2.5s page load time.
- 99.5% uptime SLA met.
- Security audit sign-off.

### Phase 3: Launch (Week 11+)
**Goal:** User onboarding; monitoring; feedback loop.

| Week | Deliverable |
| :--- | :--- |
| 11 | Beta launch (50 users). |
| 12 | Monitor feedback; bug fixes. |
| 13+ | Full GA launch; iterate based on feedback. |

---

## 15. Open Questions

1. **AI Infra API Ownership:** Who owns the AI Infra API? What's the contract/SLA?
2. **Payment Processing:** Do we handle payments directly, or always redirect to WHMCS?
3. **Mobile App:** Timeline for native mobile app?
4. **Metrics & Analytics:** What business metrics do we track? (E.g., feature adoption, conversion to upsells?)
5. **Quantum Assistant Training:** How will the AI assistant be trained? Supervised learning, RL, fine-tuned LLM?
6. **Multi-language Support:** Internationalization in MVP or Phase 2?
7. **Dark Mode:** Required, or nice-to-have?
8. **API for Partners:** Should we expose a public API for integrations (e.g., Zapier, Make)?
9. **White-label Option:** Can agencies resell this to their clients?
10. **Disaster Recovery:** Backup/restore strategy if primary WHMCS instance fails?

---

## Glossary

| Term | Definition |
| :--- | :--- |
| **BFF** | Backend for Frontend. A server layer that translates between client and external APIs. |
| **WHMCS** | Web Host Manager Complete Solution. Industry-standard billing and support software. |
| **Quantum Assistant** | AI-powered helper chatbot in the client area. |
| **Luminous Card** | Custom card component with glassmorphism and motion effects. |
| **AI Infra** | Custom AI infrastructure monitoring system (internal). |
| **LCP** | Largest Contentful Paint. Core Web Vital metric. |
| **TTI** | Time to Interactive. Metric for interactivity. |
| **FID** | First Input Delay. Responsiveness metric. |

---

## Appendix: Related Documents

- [WHMCS API Documentation](https://developers.whmcs.com/api-reference/) (External)
- [Security Checklist](../whmcs_clientarea_security_checklist_enhanced.txt) (Internal)
- [API Role Configuration](../whmcs_api_role_config_enhanced.json) (Internal)

---

**Document Version History:**
- **v1.0 (2025-12-10):** Initial PRD draft.

---

**Approval Status:**
- [ ] Product Manager
- [ ] Engineering Lead
- [ ] Design Lead
- [ ] Security Lead

---

*End of PRD. Questions? Discuss in team Slack or create an issue.*
