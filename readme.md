<div align="center">

# 🐼 Blue Panda Hosting

**Smart hosting with built-in AI assistance for performance, security, and scale**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.31-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.6-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.2.6-pink?logo=framer&logoColor=white)](https://www.framer.com/motion/)

**Project Status:** 🚀 75% Complete - Pre-Production Ready

[📖 Documentation](#documentation) • [🎯 Features](#features) • [🚀 Quick Start](#quick-start) • [📊 Status Report](./SITE-STATUS-REPORT.md)

---

</div>

## ✨ Overview

Blue Panda Hosting is a modern, premium web hosting platform built for **small businesses, agencies, and power users**. Featuring a stunning dark-themed UI with luminous card components, advanced animations, and full WHMCS integration, this platform delivers a seamless hosting experience from plan selection to service management.

### 🎭 What Makes It Special

- **🎨 Luminous Card Design** - Custom card components with glow effects, tap feedback, and slide-in animations
- **🤖 AI-Powered Intelligence** - Smart hosting with predictive monitoring and automated issue resolution
- **⚡ Premium Stack** - LiteSpeed, CloudLinux, Imunify360 security
- **🎯 Complete WHMCS Integration** - Full API integration for billing, support, and service management
- **📱 Fully Responsive** - Mobile-first design with modern glassmorphism and dark theme
- **🚀 Performance Optimized** - Code splitting, lazy loading, and optimized animations (85+ Lighthouse score)

---

## 🎯 Features

### 🏗️ Core Infrastructure
- ✅ **Next.js 14** - Modern React framework with App Router and TypeScript
- ✅ **Tailwind CSS** - Custom dark theme with quantum/AI styling
- ✅ **Framer Motion** - Smooth animations with spring physics and parallax
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **SEO Optimized** - Proper meta tags and performance tuning
- ✅ **Server Runtime Deployment** - Next.js runtime configured for WHMCS-backed authenticated routes

### 🎨 Interactive UI Components
- ✅ **Luminous Cards** - Custom card shell with gradient accents and motion feedback
- ✅ **Mega Menu System** - Interactive dropdown navigation with hover effects
- ✅ **Animated Background** - Quantum network visualization with moving nodes
- ✅ **Slide-in Animations** - Viewport-triggered entry effects
- ✅ **Tap Feedback** - Enhanced mobile touch interactions
- ✅ **Modal Dialogs** - Beautiful plan detail popups

### 🔐 Authentication & Security
- ✅ **WHMCS API Integration** - 18+ functional endpoints
- ✅ **JWT Session Management** - Secure authentication flow
- ✅ **Rate Limiting** - API request throttling
- ✅ **HMAC-Signed Sessions** - httpOnly, secure cookies
- ✅ **IDOR Protection** - Ownership verification
- ✅ **Mock Data System** - Complete development environment

### 🛒 Hosting & E-Commerce
- ✅ **Plan Selection System** - Interactive hosting plan cards
- ✅ **8 Hosting Categories** - Shared, VPS, Dedicated, Cloud, WordPress, Managed options
- ✅ **Order Processing** - Complete order API with invoice generation
- ✅ **Billing System** - Invoice management with PDF downloads
- ✅ **Domain Services** - Domain registration and management pages
- ✅ **SSL Certificates** - Security product pages

### 🎧 Support System
- ✅ **Complete Ticket System** - Create, view, and reply to support tickets
- ✅ **Department Management** - Dynamic support department loading
- ✅ **Ticket Attachments** - File upload support
- ✅ **Real-time Updates** - Live ticket status tracking

### 📱 Additional Pages
- ✅ **Email Services** - OX Suite and SpamExperts pages
- ✅ **Security Services** - Site monitoring and SSL certificates
- ✅ **Contact System** - Functional contact form
- ✅ **Blog System** - Content management with posts
- ✅ **Status Page** - System status monitoring

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher
- **WHMCS** installation (for API integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/harryneopotter/BluePandaHosting.git
cd BluePandaHosting

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file (copy from `.env.example`):

```env
# WHMCS API Configuration
WHMCS_API_URL=https://billing.example.com/includes/api.php
WHMCS_API_IDENTIFIER=your_api_identifier
WHMCS_API_SECRET=your_api_secret
WHMCS_BASE_URL=https://billing.example.com

# Application Configuration
APP_SESSION_SECRET=your_session_secret
NEXT_PUBLIC_FEATURE_WHMCS_BASIC=true

# Enable WHMCS Integration (disables static export)
ENABLE_WHMCS_INTEGRATION=true
```

### Development Server

```bash
# Start development server
npm run dev

# Open in browser
http://localhost:3000
```

### Production Build

```bash
# Build the deployable WHMCS-enabled runtime
npm run build

# Start the production server
npm run start

# Start the deployable runtime locally after build
npm run start
```

---

## 🏗️ Project Architecture

```
BluePandaHosting/
├── app/                          # Next.js App Router
│   ├── api/                      # Server-side API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── orders/               # Order processing
│   │   ├── invoices/             # Invoice management
│   │   ├── tickets/              # Support tickets
│   │   └── support/              # Support departments
│   ├── components/               # Reusable components
│   │   ├── LuminousCard.tsx      # Custom card component
│   │   ├── QPandaOnePager.jsx    # Homepage component
│   │   └── TechnicalFeatures.tsx # Feature showcase
│   ├── hosting/                  # Hosting plan pages
│   │   ├── shared-hosting/
│   │   ├── vps-hosting/
│   │   ├── dedicated-servers/
│   │   ├── cloud-hosting/
│   │   └── wordpress-hosting/
│   ├── billing/                  # Billing and invoices
│   ├── support/                  # Support tickets
│   ├── security/                 # Security products
│   ├── domains/                  # Domain services
│   └── email/                    # Email services
├── public/                       # Static assets
├── memory-bank/                  # Project documentation
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── techContext.md
│   ├── systemPatterns.md
│   └── progress.md
├── tests/                        # Playwright tests
└── docs/                         # Additional documentation
```

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build the server-capable Next.js runtime used for WHMCS-enabled deployment |
| `npm run build:server` | Explicit server-runtime build for Netlify/Node deployment |
| `npm run build:static` | Reserved legacy command; exits because static export is retired in this repo |
| `npm run start` | Start production server |
| `npm run serve` | Reserved legacy command; exits because static preview serving is retired |
| `npm run serve:static` | Reserved legacy command; exits because static preview serving is retired |
| `npm run lint` | Run ESLint code quality checks |
| `npm run playwright:install` | Install Playwright browsers |
| `npm run screenshot` | Run screenshot tests with Playwright |

---

## 🌐 Deployment Options

### Server Runtime on Netlify (Required)

Use this path for the deployable QPanda site when authenticated client-area routes are enabled.

```bash
# Netlify build path
npm run build

# Start locally after build
npm run start
```

Runtime contract:
- `ENABLE_WHMCS_INTEGRATION=true`
- `APP_SESSION_SECRET`
- `WHMCS_API_URL`
- `WHMCS_API_IDENTIFIER`
- `WHMCS_API_SECRET`
- `WHMCS_BASE_URL`
- `NEXT_PUBLIC_WHMCS_CLIENT_AREA_URL`
- `NEXT_PUBLIC_WHMCS_SUPPORT_URL`

Netlify is configured to publish `.next` for this mode. Static export has been retired in this repo because the restored authenticated client-area routes and detail pages require a server-capable deployment target.

---

## 🔧 WHMCS Integration

### API Configuration

1. **Generate API Credentials** in WHMCS:
   - Admin Area → Setup → Staff Management → API Credentials
   - Create new API credentials with appropriate permissions

2. **Whitelist Your IP**:
   - Add your server's IP address to API whitelist
   - Required for production deployment

3. **Configure Environment Variables**:
   - Set `WHMCS_API_URL`, `WHMCS_API_IDENTIFIER`, `WHMCS_API_SECRET`
   - Enable `NEXT_PUBLIC_FEATURE_WHMCS_BASIC=true`
   - Set `ENABLE_WHMCS_INTEGRATION=true` for deployable client-area builds
   - Set `APP_SESSION_SECRET` for signed session cookies

### Available API Routes

```
Authentication:
  POST /api/auth/login       - User login
  POST /api/auth/logout      - User logout
  GET  /api/me               - Get current user

Orders:
  POST /api/orders           - Create new order (bank transfer)

Invoices:
  GET  /api/invoices         - List user invoices
  GET  /api/invoices/:id     - Get invoice details
  GET  /api/invoices/:id/pdf - Download invoice PDF

Tickets:
  GET  /api/tickets          - List support tickets
  GET  /api/tickets/:id      - Get ticket details
  POST /api/tickets          - Create new ticket
  POST /api/tickets/:id/replies - Add ticket reply

Support:
  GET  /api/support/departments - List support departments
```

---

## 🎨 Customization Guide

### Modifying Luminous Cards

The `LuminousCard` component is used throughout the site:

```tsx
import LuminousCard from '@/app/components/LuminousCard';

<LuminousCard className="custom-class">
  <h3>Your Content</h3>
  <p>Card content goes here</p>
</LuminousCard>
```

Features:
- Automatic glow effects
- Hover lift animation (`-translate-y-1.5`)
- Tap feedback (`scale(0.96)`)
- Slide-in entry animation
- Brightness boost on hover

### Adding New Hosting Plans

Edit the plan data in your hosting page:

```tsx
const plans = [
  {
    name: "Your Plan",
    price: "$9.99/mo",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3"
    ],
    cta: "Get Started"
  }
];
```

### Theme Customization

Modify `tailwind.config.js` for color schemes:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

---

## 📊 Performance Metrics

- **Lighthouse Score**: 85+ (Good)
- **Load Time**: <2s on 3G
- **Bundle Size**: ~500KB (optimized)
- **API Response Time**: <200ms (with WHMCS)
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s

### Browser Support
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS/Android)

---

## 🚧 Current Status & Roadmap

### ✅ Completed (75%)
- Core infrastructure and UI
- WHMCS API integration
- All navigation and routing
- Support ticket system
- Billing and invoice management
- All hosting plan pages
- Responsive design
- Animation system

### 🚧 In Progress (Phase 1 - Critical)
- [ ] Complete order flow (plan dialog → checkout)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Domain search functionality
- [ ] Client dashboard post-login
- [ ] WHMCS IP whitelisting for production

### 📋 Upcoming (Phase 2 - Essential)
- [ ] Domain registration system
- [ ] Service management controls (start/stop/restart)
- [ ] Usage analytics and billing
- [ ] Live chat widget
- [ ] Knowledge base system

### 🔮 Future (Phase 3 - Enhancement)
- [ ] Admin panel
- [ ] Content management system
- [ ] Mobile app
- [ ] API documentation portal
- [ ] Advanced analytics dashboard

**Estimated Timeline to Production: 3-4 weeks**

For detailed status information, see [SITE-STATUS-REPORT.md](./SITE-STATUS-REPORT.md)

---

## 📚 Documentation

- **[SITE-STATUS-REPORT.md](./SITE-STATUS-REPORT.md)** - Comprehensive project status
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and updates
- **[PROGRESS.md](./PROGRESS.md)** - Detailed development log
- **[STATIC_EXPORT_GUIDE.md](./STATIC_EXPORT_GUIDE.md)** - Static deployment guide
- **[memory-bank/](./memory-bank/)** - Project context and patterns

---

## 🧪 Testing

### Playwright Tests

```bash
# Install test browsers
npm run playwright:install

# Run screenshot tests
npm run screenshot

# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/demo.spec.ts
```

### Manual Testing Checklist
- [ ] Homepage loads with animations
- [ ] All navigation links work (no 404s)
- [ ] Mega menus display correctly
- [ ] Mobile navigation functions
- [ ] Plan cards display with luminous effects
- [ ] Login flow completes
- [ ] Ticket creation works
- [ ] Invoice viewing and PDF download
- [ ] Responsive design on all breakpoints

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Follow existing patterns**:
   - Use `LuminousCard` for card components
   - Maintain TypeScript type safety
   - Follow Tailwind CSS utility-first approach
   - Add Framer Motion animations where appropriate
4. **Test on mobile and desktop**
5. **Update documentation** if needed
6. **Commit your changes** (`git commit -m 'Add amazing feature'`)
7. **Push to the branch** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

---

## 🐛 Troubleshooting

### WHMCS API Errors

**"Invalid IP" error:**
- Whitelist your server IP in WHMCS Admin → API Credentials
- Verify `WHMCS_API_URL` is correct

**Authentication failures:**
- Check `WHMCS_API_IDENTIFIER` and `WHMCS_API_SECRET`
- Ensure API credentials have proper permissions

### Build Issues

**Static export fails:**
- Ensure `ENABLE_WHMCS_INTEGRATION` is not set to `true`
- API routes are incompatible with static export

**Module not found:**
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` cache: `rm -rf .next`

### Development Server

**Port already in use:**
- Kill process using port 3000: `npx kill-port 3000`
- Or use different port: `npm run dev -- -p 3001`

---

## 📄 License

This project is proprietary software. All rights reserved.

---

<div align="center">

### 🌟 Built with Modern Web Technologies

**Next.js** • **React** • **TypeScript** • **Tailwind CSS** • **Framer Motion** • **WHMCS**

---

### 📞 Questions or Need Help?

Open an issue or contact the development team

**Made with ❤️ for premium hosting experiences**

</div>
