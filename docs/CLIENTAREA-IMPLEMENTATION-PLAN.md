# QPanda Client Area — Implementation Plan

> A comprehensive guide for building the QPanda client area with consistent design language, company ethos, and AI integration.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Design Language & Visual System](#2-design-language--visual-system)
3. [Company Ethos & Tone](#3-company-ethos--tone)
4. [AI Integration Philosophy](#4-ai-integration-philosophy)
5. [Technical Architecture](#5-technical-architecture)
6. [Page-by-Page Implementation](#6-page-by-page-implementation)
7. [Component Library](#7-component-library)
8. [State Management & Data Flow](#8-state-management--data-flow)
9. [Accessibility & Performance](#9-accessibility--performance)
10. [Testing Strategy](#10-testing-strategy)
11. [Rollout Phases](#11-rollout-phases)

---

## 1. Executive Summary

### Goal

Build a client area that makes hosting **feel safe, understandable, and human-supported** — while quietly leveraging AI to surface insights and recommendations without overwhelming or alarming users.

### Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Nothing auto-changes without consent** | All AI suggestions require explicit user action; no silent modifications |
| **AI suggests, never acts silently** | Recommendations are advisory; users confirm before any change |
| **Every screen answers: "Am I safe right now?"** | Prominent status indicators; healthy = green, attention = amber, critical = red |
| **Human support is always available** | Support CTA visible on every page; no chatbot-only dead ends |

### Language Rules

| ❌ Avoid | ✅ Prefer |
|----------|----------|
| quantum, neural, teleport, autonomous | monitor, assist, recommend, review |
| "AI will fix this" | "QPanda suggests reviewing this" |
| "Automated optimization" | "Suggested improvement" |

---

## 2. Design Language & Visual System

### Color Palette

Carry forward the homepage palette but with **reduced saturation** for the client area to create a calmer, productivity-focused environment.

```
Background:      slate-950 (#020617) — primary dark
Surface:         slate-900/80 with subtle border (cyan-400/10)
Text Primary:    slate-100 (#f1f5f9)
Text Secondary:  slate-400 (#94a3b8)
Accent:          cyan-400 (#22d3ee) — links, active states
Success:         emerald-400 (#34d399)
Warning:         amber-400 (#fbbf24)
Error:           rose-400 (#fb7185)
```

### Typography

| Element | Style |
|---------|-------|
| Page Heading | `text-2xl font-bold text-cyan-200` |
| Section Title | `text-lg font-semibold text-cyan-100` |
| Body | `text-sm text-slate-300` |
| Helper/Muted | `text-xs text-slate-400` |
| Status Badge | `text-xs font-medium px-2 py-0.5 rounded-full` |

### Spacing & Layout

- **Max content width:** `max-w-5xl` (narrower than homepage for focused tasks)
- **Page padding:** `px-6 py-8`
- **Card padding:** `p-5`
- **Section gap:** `space-y-6` between major sections
- **Grid gaps:** `gap-4` for card grids

### Card Style

Use the existing `LuminousCard` component with **toned-down motion** for the client area:

```tsx
// Client area variant — subtle hover, no aggressive glow
<LuminousCard variant="subtle" className="...">
  ...
</LuminousCard>
```

Characteristics:
- Border: `border border-cyan-400/10`
- Background: `bg-slate-900/60 backdrop-blur-sm`
- Hover: slight lift (`-translate-y-0.5`), gentle border glow (`border-cyan-400/20`)
- No pulsing or aggressive animations

### Iconography

Use consistent Lucide icons throughout:

| Concept | Icon |
|---------|------|
| Services | `Server` |
| Status OK | `CheckCircle` (emerald) |
| Warning | `AlertTriangle` (amber) |
| Error | `XCircle` (rose) |
| AI Suggestion | `Sparkles` (cyan) |
| Support | `LifeBuoy` |
| Billing | `CreditCard` |
| Settings | `Settings` |
| Security | `Shield` |

---

## 3. Company Ethos & Tone

### Brand Voice in Client Area

The client area is **not a marketing surface**. It's a tool. The tone should be:

| Attribute | Meaning |
|-----------|---------|
| **Calm** | No urgency language ("Act now!"), no flashing alerts for non-critical issues |
| **Clear** | Plain language; explain technical concepts if shown |
| **Honest** | If something is wrong, say so plainly; if everything is fine, say "all good" |
| **Supportive** | Always offer a path to human help; never dead-end the user |

### Example Copy Transformations

| ❌ Marketing-speak | ✅ Client area tone |
|--------------------|---------------------|
| "Supercharge your site with AI insights!" | "QPanda monitors your service and highlights potential issues here." |
| "Unlock premium performance!" | "Review your current resource usage below." |
| "Your quantum-powered dashboard" | "Overview" |

### Human Support Promise

Every page should have a visible path to support. Suggested pattern:

```
┌─────────────────────────────────────────┐
│  Need help? → Create a support ticket   │
└─────────────────────────────────────────┘
```

This appears as a subtle footer link or sidebar item on every client area page.

---

## 4. AI Integration Philosophy

### The QPanda AI Role

AI in the client area serves **three purposes**:

1. **Monitoring** — Continuously observe infrastructure health
2. **Surfacing** — Highlight potential issues before they become problems
3. **Suggesting** — Recommend actions the user can choose to take

AI does **not**:
- Auto-apply fixes
- Make decisions on behalf of the user
- Hide information behind "AI handled it" messaging

### Recommendation UI Pattern

```
┌─────────────────────────────────────────────────────────┐
│ ✨ Suggestion from QPanda                               │
├─────────────────────────────────────────────────────────┤
│ Traffic patterns suggest a temporary increase in load.  │
│ You may want to review scaling options to maintain      │
│ response times.                                         │
│                                                         │
│ [Review suggestion]  [Dismiss]                          │
│                                                         │
│ ℹ️ Suggestions are advisory only. No changes are        │
│    applied without your confirmation.                   │
└─────────────────────────────────────────────────────────┘
```

### AI Disclaimer (Global)

Include in footer or as tooltip on AI sections:

> AI assistance in QPanda is designed to support decision-making, not replace it. All critical actions require explicit user approval.

### Recommendation Categories

| Category | Icon | Color | Example |
|----------|------|-------|---------|
| Performance | `Zap` | cyan | "Consider enabling caching for faster load times" |
| Security | `Shield` | amber | "We noticed login attempts from unusual locations" |
| Cost | `DollarSign` | emerald | "Your usage is below plan limits — no action needed" |
| Maintenance | `Wrench` | slate | "A PHP update is available for your server" |

---

## 5. Technical Architecture

### File Structure

```
app/
├── client-area/
│   ├── layout.tsx              # Shared layout with sidebar nav
│   ├── page.tsx                # Dashboard (redirect or main view)
│   ├── dashboard/
│   │   └── page.tsx            # Main dashboard
│   ├── services/
│   │   ├── page.tsx            # Services list
│   │   └── [id]/
│   │       └── page.tsx        # Service detail
│   ├── support/
│   │   ├── page.tsx            # Ticket list
│   │   └── new/
│   │       └── page.tsx        # Create ticket
│   ├── billing/
│   │   └── page.tsx            # Billing overview
│   ├── settings/
│   │   └── page.tsx            # Account settings
│   └── components/
│       ├── ClientAreaNav.tsx   # Sidebar navigation
│       ├── StatusBadge.tsx     # Reusable status indicator
│       ├── AIRecommendationCard.tsx
│       ├── ServiceCard.tsx
│       ├── EmptyState.tsx
│       └── SupportCTA.tsx
```

### Data Sources

| Data | Source | Update Frequency |
|------|--------|------------------|
| Services list | WHMCS API | On page load + polling (60s) |
| Service metrics | Server monitoring API | Polling (30s) |
| AI recommendations | QPanda AI service | Polling (5min) or WebSocket |
| Invoices | WHMCS API | On page load |
| Tickets | WHMCS API | On page load + polling (60s) |

### Authentication

- Use existing session from WHMCS or custom auth
- Client area routes protected by middleware
- Session expiry: 30 min inactivity, 24 hr max

---

## 6. Page-by-Page Implementation

### 6.1 Login Page

**Route:** `/login` (existing)

**Additions:**
- Helper text below form: "Access your hosting services, system status, and support — all in one place."

---

### 6.2 Dashboard

**Route:** `/client-area/dashboard`

**Layout:**
```
┌──────────────────────────────────────────────────────────┐
│ Overview                                                 │
│ A quick snapshot of your services and system health.     │
├────────────────────┬─────────────────────────────────────┤
│ Active Services    │ System Health                       │
│ ┌────────────────┐ │ ┌─────────────────────────────────┐ │
│ │ 3 services     │ │ │ ✓ All systems operating normally│ │
│ │ View all →     │ │ └─────────────────────────────────┘ │
│ └────────────────┘ │                                     │
├────────────────────┴─────────────────────────────────────┤
│ Assistance & Recommendations                             │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ ✨ No action needed at the moment.                   │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

**Components:**
- `ServicesCountCard` — count + link to services list
- `SystemHealthCard` — aggregate status
- `AIRecommendationsPanel` — list of suggestions or empty state

**States:**
- First visit: Show welcome message (once per account)
- Empty: "You don't have any active services yet."
- Healthy: Green indicator, "All systems operating normally"
- Warning: Amber indicator, "Some services may need attention"

---

### 6.3 Services List

**Route:** `/client-area/services`

**Layout:**
```
┌──────────────────────────────────────────────────────────┐
│ Services                                                 │
│ View and manage your hosting services.                   │
├──────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────┐   │
│ │ Starter Plan – mywebsite.com                       │   │
│ │ ● Running   •   US-East   •   Last activity: 2m    │   │
│ │                                      [View details]│   │
│ └────────────────────────────────────────────────────┘   │
│ ┌────────────────────────────────────────────────────┐   │
│ │ Business VPS – api.myapp.io                        │   │
│ │ ● Running   •   EU-West   •   Last activity: 5m    │   │
│ │                                      [View details]│   │
│ └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

**Empty State:**
> Your services will appear here once you activate a hosting plan.
> [Browse plans →]

---

### 6.4 Service Detail

**Route:** `/client-area/services/[id]`

**Sections:**

1. **Header** — Service name, status badge, quick actions
2. **Current Status** — Health summary with plain language
3. **Resource Usage** — High-level metrics (CPU, RAM, bandwidth) as simple bars, not complex charts
4. **AI Suggestions** — Recommendations specific to this service
5. **Advanced Details** — Collapsed by default; contains logs, config

**AI Panel Copy:**
> Suggestions are advisory only. No changes are applied without your confirmation.

---

### 6.5 Support

**Route:** `/client-area/support`

**Layout:**
- Ticket list (table or cards)
- Prominent "Create a support ticket" CTA
- Empty state: "You haven't opened any support tickets yet."

**New Ticket Page (`/client-area/support/new`):**
- Simple form: subject, description, optional attachment
- Reassurance: "If you're unsure how to describe the problem, that's okay — just explain what you're seeing."
- Submit: "A human support engineer will review it."

---

### 6.6 Billing

**Route:** `/client-area/billing`

**Sections:**
1. **Current Plan** — Active services, next billing date
2. **Invoices** — List with status (Paid, Due, Overdue)
3. **Payment Methods** — Manage cards

**Transparency Note:**
> QPanda does not apply unexpected charges. Any usage-based costs are shown clearly before billing.

---

### 6.7 Account Settings

**Route:** `/client-area/settings`

**Sections:**
1. **Profile** — Name, email, timezone
2. **Security** — Password, 2FA toggle
3. **Notifications** — Email preferences

---

## 7. Component Library

### StatusBadge

```tsx
type Status = 'running' | 'attention' | 'paused' | 'error';

<StatusBadge status="running" />
// Renders: ● Running (emerald)
```

### AIRecommendationCard

```tsx
<AIRecommendationCard
  title="Traffic increase detected"
  description="You may want to review scaling options."
  onReview={() => {}}
  onDismiss={() => {}}
/>
```

### EmptyState

```tsx
<EmptyState
  icon={<Server />}
  title="No services yet"
  description="Your services will appear here once you activate a plan."
  action={{ label: "Browse plans", href: "/hosting" }}
/>
```

### SupportCTA

```tsx
<SupportCTA />
// Renders: "Need help? → Create a support ticket"
```

---

## 8. State Management & Data Flow

### Recommended Stack

| Concern | Solution |
|---------|----------|
| Server state | TanStack Query (React Query) for caching + polling |
| Client state | React useState/useReducer for local UI state |
| Global state | Context for user session, preferences |
| Forms | React Hook Form + Zod validation |

### Data Fetching Pattern

```tsx
// Example: Services list
const { data: services, isLoading, error } = useQuery({
  queryKey: ['services'],
  queryFn: fetchServices,
  refetchInterval: 60_000, // Poll every 60s
});
```

### Optimistic Updates

For actions like "Dismiss recommendation":
1. Immediately update UI
2. Send API request
3. Rollback if failed

---

## 9. Accessibility & Performance

### Accessibility Requirements

- All interactive elements keyboard-accessible
- Status colors paired with icons (not color-only)
- ARIA labels on status badges: `aria-label="Service status: running"`
- Focus visible on all interactive elements
- Form inputs have associated labels

### Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| TTI | < 3.5s |

### Optimization Strategies

- Server components for static content
- Client components only where interactivity needed
- Lazy load "Advanced Details" sections
- Skeleton loaders during data fetch
- Minimal JS bundle for initial load

---

## 10. Testing Strategy

### Unit Tests

- Component rendering (StatusBadge, EmptyState, etc.)
- Utility functions (status mapping, date formatting)

### Integration Tests

- Page renders with mocked API data
- User flows: view services → click detail → see recommendations

### E2E Tests (Playwright)

| Test | Description |
|------|-------------|
| Login → Dashboard | User logs in and sees dashboard |
| View services | Services list loads and displays correctly |
| Service detail | Clicking service shows detail page |
| AI recommendation dismiss | Dismissing recommendation updates UI |
| Create support ticket | Form submits successfully |

---

## 11. Rollout Phases

### Phase 1: Foundation (Week 1-2)

- [ ] Create `/client-area` route structure
- [ ] Implement shared layout with sidebar nav
- [ ] Build core components (StatusBadge, EmptyState, SupportCTA)
- [ ] Dashboard page with mock data

### Phase 2: Services (Week 3-4)

- [ ] Services list page
- [ ] Service detail page
- [ ] Connect to WHMCS API
- [ ] Resource usage display

### Phase 3: AI Integration (Week 5-6)

- [ ] AIRecommendationCard component
- [ ] Recommendations panel on dashboard
- [ ] Service-specific suggestions
- [ ] Dismiss/review actions

### Phase 4: Support & Billing (Week 7-8)

- [ ] Support ticket list
- [ ] New ticket form
- [ ] Billing overview
- [ ] Invoice display

### Phase 5: Polish & Launch (Week 9-10)

- [ ] Account settings
- [ ] E2E test coverage
- [ ] Performance audit
- [ ] Accessibility audit
- [ ] User acceptance testing

---

## Appendix: Copy Reference

All copy strings are defined in `/docs/qpanda-clientarea-pages.md`. When implementing, reference that file for exact wording. Key copy to use verbatim:

| Location | Copy |
|----------|------|
| Dashboard heading | "Overview" |
| Dashboard subheading | "A quick snapshot of your services and system health." |
| AI panel disclaimer | "Suggestions are advisory only. No changes are applied without your confirmation." |
| Global AI disclaimer | "AI assistance in QPanda is designed to support decision-making, not replace it. All critical actions require explicit user approval." |
| Support reassurance | "If you're unsure how to describe the problem, that's okay — just explain what you're seeing." |
| Billing transparency | "QPanda does not apply unexpected charges. Any usage-based costs are shown clearly before billing." |

---

*Document created: 2025-12-15*
*Reference: `/docs/qpanda-clientarea-pages.md`*
