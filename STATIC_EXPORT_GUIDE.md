# Static Export Configuration Guide

Static export is retired in this repo. The deployable QPanda client-area runtime uses the server-capable Next.js path described in `readme.md`.

This project is configured for **static export** using Next.js `output: 'export'` setting. This generates static HTML, CSS, and JS files that can be deployed to any static hosting service.

## Important Limitations

### ❌ API Routes Not Supported
Static export **does not support API routes**. The following will cause build failures:
- Files in `app/api/` directory
- Route handlers with dynamic parameters like `[id]`
- Server-side functions that need to run at request time

### ✅ What Works with Static Export
- Static pages and components
- Client-side routing using hash routing or client-side libraries
- Static assets (images, fonts, etc.)
- Client-side JavaScript and React components
- CSS and styling

## Configuration

Current configuration in `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = { output: 'export' };
export default nextConfig;
```

## Build Process

The build generates static files in the `out/` directory:
```bash
npm run build
```

This creates:
- `out/index.html` - Static HTML file
- `out/_next/` - JavaScript and CSS assets
- Static assets and other pages

## Deployment

The `out/` directory contains all files needed for deployment. These can be:
- Uploaded to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
- Served from a CDN
- Deployed to any web server as static files

## If You Need API Functionality

If the project requires server-side functionality, you have these options:

### Option 1: Remove Static Export
1. Remove `output: 'export'` from `next.config.mjs`
2. Deploy to a server environment that supports Node.js
3. Add API routes in `app/api/` directory

### Option 2: Use External APIs
1. Keep static export
2. Use external API services
3. Make client-side API calls to external endpoints

### Option 3: Serverless Functions
1. Keep static export for main site
2. Use separate serverless functions (Netlify Functions, Vercel Functions)
3. Call these functions from the client-side

## Troubleshooting

### Build Error: "Page /api/... is missing generateStaticParams()"
This error occurs when:
1. API routes exist in the codebase with `output: 'export'`
2. Solution: Remove the API routes or change to server deployment

### Build Error: Dynamic routes without generateStaticParams
For dynamic routes like `[id]`, you need `generateStaticParams()`:
```javascript
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    // ... all possible values
  ];
}
```

## Current Project Status

⚠️ **Static export is retired for this repository**
⚠️ **Authenticated client-area functionality requires the server runtime**
⚠️ **API routes and dynamic detail pages are present in the codebase**
✅ **The supported deployment target is the server-capable Next.js runtime**
