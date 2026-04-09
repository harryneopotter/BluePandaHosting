# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Q Panda** is a Next.js 14 hosting application with a marketing surface and a WHMCS-backed client area. Server runtime support is the deployment path; static export is retired in this repo.

## Core Commands

**Install dependencies:**
```bash
npm install
```

**Development server:**
Never run `npm run dev` directly in the main terminal - it takes over the terminal. Always use PowerShell to run it in a separate process:
```powershell
Start-Process pwsh -ArgumentList '-NoExit','-Command','npm run dev'
```

**Build for production (server runtime):**
Run build in a separate PowerShell process to avoid blocking the terminal:
```powershell
Start-Process pwsh -ArgumentList '-NoExit','-Command','npm run build'
```

**Start production server:**
Run the production server in a separate PowerShell process:
```powershell
Start-Process pwsh -ArgumentList '-NoExit','-Command','npm run start'
```

**Linting:**
Run linting in a separate PowerShell process:
```powershell
Start-Process pwsh -ArgumentList '-NoExit','-Command','npm run lint'
```

## Architecture & Structure

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **React**: 18.2.0 with client-side components
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion 11.2.6 for complex animations and effects
- **Build**: Server-capable Next.js 14 runtime

### Key Components Architecture

**Main App Structure:**
- `app/layout.jsx` - Root layout with minimal HTML structure
- `app/page.jsx` - Entry point that renders the main component
- `app/components/QPandaOnePager.jsx` - Single massive component containing entire site

**Core Features:**
1. **Interactive Canvas Background** - Custom 2D quantum network visualization with moving nodes and photons
2. **Animated Panda Mascot** - Floating panda that teleports around the screen with particle effects
3. **Plan Selection System** - Interactive orbs positioned on the hero canvas that trigger modal dialogs
4. **Parallax Effects** - Mouse-controlled parallax layers and scroll-based parallax
5. **Route Mix** - Static marketing pages plus authenticated server handlers for WHMCS-backed client-area flows
6. **Modal System** - Custom dialog implementation with backdrop blur and animations

### Animation Patterns

The codebase heavily uses Framer Motion with these patterns:
- **Spring animations** for natural motion (panda movement, modal entrance)
- **Parallax transforms** using `useScroll`, `useTransform`, and `useSpring`
- **Particle systems** for visual effects (disintegration, trails, clones)
- **Complex state orchestration** for coordinated animations across components

### State Management

Uses React built-in state with complex coordination:
- Multiple `useState` hooks for different UI states
- Custom hooks for mouse parallax effects
- Context-free architecture - all state managed in main component
- Event-driven interactions with visual feedback

## Development Guidelines

### Component Architecture
- **Single-file approach**: The entire site lives in `QPandaOnePager.jsx`
- **Inline components**: UI primitives (Card, Button, Dialog) defined inline
- **Utility-first**: Heavy use of Tailwind utility classes
- **Motion-first**: Every interaction includes animation considerations

### Styling Conventions
- **Dark theme**: Slate color palette with cyan/fuchsia accents
- **Glass morphism**: Backdrop blur and transparency effects throughout
- **Gradient overlays**: Animated shimmer effects on cards and buttons
- **Ring/shadow system**: Custom glows and shadows for depth

### Animation Performance
- Uses `will-change-transform` for optimized animations
- Proper cleanup of intervals and event listeners
- Framer Motion's layout animations for smooth transitions
- Canvas operations optimized with RAF and DPR scaling

### Error Handling
- Custom ErrorBoundary component wraps the entire app
- Graceful fallbacks for animation failures
- ResizeObserver with try/catch for browser compatibility

## Notable Technical Patterns

### Canvas Background System
- Custom 2D context rendering with node network
- Real-time physics simulation with edge rebuilding
- Interactive mouse effects that influence node movement
- Optimized rendering with device pixel ratio scaling

### Teleportation Effect System
- Coordinated visual effects: ring expansion, particle trails, panda clones
- Plan-specific behaviors (entangle draws tethers, superposition creates extra clones)
- Screen coordinate system for consistent positioning

### Hash Routing Implementation
- Client-side routing using `window.location.hash`
- Route parsing with support for nested paths (`/blog/slug`)
- Smooth scroll navigation for anchor links
- Deep linking support for plan selection

## Integration with Copilot Instructions

The repository includes comprehensive Copilot instructions (`.github/copilot-instructions.md`) for a different project (Intervo.ai). These instructions are for a conversational AI platform and don't apply to this Q Panda demo. When working on this codebase, ignore the Copilot instructions as they're unrelated.

## Build Process & Troubleshooting

### Build Modes
- Deploy path uses a server-capable Next.js build and publishes `.next`
- Static export is retired because authenticated client-area routes and detail pages are now restored
- `ENABLE_WHMCS_INTEGRATION=true` is part of the deployment contract

### Known Build Issues
- **React Hook Warning**: The build may show a warning about missing dependency `length` in the useEffect hook for the PandaTrail component
- **Hydration**: Interactive features (canvas animations, panda movement, modal dialogs) won't work until JavaScript loads and hydrates
- **Static Serving**: Retired in this repo; use `npm run start` for local runtime verification
- **npm ci Lockfile Sync**: If you add new dependencies, always run `npm install` locally and commit the updated `package-lock.json`

### Testing the Build
1. Build the server runtime: `Start-Process pwsh -ArgumentList '-NoExit','-Command','npm run build'`
2. Start the app: `Start-Process pwsh -ArgumentList '-NoExit','-Command','npm run start'`

## Deployment

### DigitalOcean App Platform

Two deployment options are configured:

**Option 1: Server Runtime (Primary)**
- Use a platform that supports Next.js server execution for WHMCS-backed routes
- Required for authenticated client-area flows

**Option 2: Static Export**
- Retired in this repo
- Not suitable for authenticated client-area features

### Deployment Steps
1. Push code to GitHub repository
2. Connect DigitalOcean App Platform to your repository
3. Choose the appropriate `.do/app*.yaml` file during setup
4. DigitalOcean will automatically build and deploy

### Build Configuration
- **Build Command**: `npm ci && npm run build`
- **Primary Output Directory**: `/.next`
- **Serve Command**: `npm run start`

## Performance Considerations

- **Runtime contract**: server-capable build for authenticated flows
- **Animation optimization**: Proper use of CSS transforms and Framer Motion
- **Event listener cleanup**: Comprehensive cleanup in useEffect hooks
- **Canvas optimization**: RequestAnimationFrame and visibility API integration

## Common Development Tasks

- **Adding new plan types**: Update `PLANS` array and add corresponding visual effects
- **Modifying animations**: Work within the Framer Motion patterns established
- **Styling changes**: Use Tailwind utilities, maintain dark theme consistency  
- **Adding pages**: Extend the hash routing system in `SitePages` component
- **Performance tuning**: Focus on canvas rendering and animation frame rates

