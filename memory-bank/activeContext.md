# Active Context
- Branch: feature-add-markdown-content.
- Recent changes (2025-12-09): Added `"use client"` to LuminousCard to resolve Next.js prerender crash on `/hosting`; tap highlight + framer-motion feedback already in place. Wrapped plan and feature cards across active hosting pages with `LuminousCard` for consistent tap affordance. Playwright smoke previously passed.
- Status: Build now succeeds; no runtime issues observed; latest changes not yet exercised by automated tests.
- Next: Keep `PROGRESS.md` updated; leave helper files untracked as requested; optional: rerun Playwright/build to validate new luminous wrappers.
