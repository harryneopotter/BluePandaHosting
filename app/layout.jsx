import './globals.css';
import DarkHeader from './components/dark/DarkHeader';
import Script from 'next/script';

export const metadata = {
  title: "Q Panda - AI-Powered Hosting That Delivers Unbeatable Speed | Premium Web Hosting",
  description: "Enterprise-grade AI-powered web hosting with LiteSpeed, CloudLinux, and Imunify360. Low-density servers (max 350 accounts), 99.9% uptime, and 24/7 support. Perfect for WordPress, e-commerce, and business websites.",
  keywords: "web hosting, AI hosting, fast web hosting, managed WordPress hosting, VPS hosting, cloud hosting, LiteSpeed hosting, secure web hosting, premium hosting",
  authors: [{ name: "Blue Panda Hosting" }],
  creator: "Blue Panda Hosting",
  publisher: "Blue Panda Hosting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://qpanda.bluepanda.cloud'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Q Panda - AI-Powered Hosting That Delivers Unbeatable Speed",
    description: "Enterprise-grade AI-powered web hosting with 99.9% uptime guarantee. Low-density servers, premium software stack, and real human support.",
    url: 'https://qpanda.bluepanda.cloud',
    siteName: 'Q Panda Hosting',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/qpanda.jpg',
        width: 1200,
        height: 630,
        alt: 'Q Panda - Premium AI-Powered Web Hosting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Q Panda - AI-Powered Hosting That Delivers Unbeatable Speed",
    description: "Enterprise-grade AI-powered web hosting with 99.9% uptime guarantee.",
    images: ['/assets/qpanda.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
    // bing: 'msvalidate.01-code',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blue Panda Hosting & Designs',
  alternateName: 'Q Panda',
  url: 'https://qpanda.bluepanda.cloud',
  logo: 'https://qpanda.bluepanda.cloud/favicon.svg',
  description: 'Premium AI-powered web hosting solutions with enterprise-grade infrastructure',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@qpanda.io',
    availableLanguage: 'English'
  },
  sameAs: [
    // Add social media URLs when available
    // 'https://twitter.com/qpanda',
    // 'https://facebook.com/qpanda',
    // 'https://linkedin.com/company/qpanda'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '500'
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '25',
    highPrice: '135',
    offerCount: '3'
  }
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Hosting',
  provider: {
    '@type': 'Organization',
    name: 'Blue Panda Hosting & Designs',
    url: 'https://qpanda.bluepanda.cloud'
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Hosting Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Shared Hosting',
          description: 'AI-powered shared hosting with LiteSpeed and CloudLinux'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'VPS Hosting',
          description: 'Virtual private servers with dedicated resources'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Managed WordPress Hosting',
          description: 'Optimized WordPress hosting with automatic updates'
        }
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data - Organization */}
        <Script
          id="structured-data-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          strategy="beforeInteractive"
        />
        {/* Structured Data - Service */}
        <Script
          id="structured-data-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        <DarkHeader />
        {children}
      </body>
    </html>
  );
}
