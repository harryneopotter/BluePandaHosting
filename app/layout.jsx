import './globals.css';
import DarkHeader from './components/dark/DarkHeader';
import Script from 'next/script';
import { PUBLIC_CONFIG } from './config/publicConfig';

const appUrl = PUBLIC_CONFIG.app.url;

export const metadata = {
  title: "QPanda | Premium Hosting With Migration Help",
  description:
    "Premium hosting with migration help, lower-noise infrastructure, and human support for teams moving beyond crowded commodity platforms.",
  keywords:
    "premium hosting, migration help, managed hosting, shared hosting, VPS hosting, cloud hosting, dedicated servers, human support",
  authors: [{ name: "QPanda" }],
  creator: "QPanda",
  publisher: "QPanda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "QPanda | Premium Hosting With Migration Help",
    description:
      "Hosting for teams that are done gambling on crowded, generic platforms, with migration help and responsive human support.",
    url: appUrl,
    siteName: 'QPanda',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/qpanda.jpg',
        width: 1200,
        height: 630,
        alt: 'QPanda premium hosting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "QPanda | Premium Hosting With Migration Help",
    description:
      "Hosting with migration help, calmer operations, and responsive human support for teams leaving generic platforms.",
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
  name: 'QPanda',
  alternateName: 'Q Panda',
  url: appUrl,
  logo: `${appUrl}/favicon.svg`,
  description: 'Premium hosting with migration help and responsive human support.',
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
    name: 'QPanda',
    url: appUrl
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hosting and migration services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Shared Hosting',
          description: 'Shared hosting for business sites that need calmer operations and clearer support.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Migration Service',
          description: 'Migration planning, transfer support, and cutover help for hosting moves.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Advanced Hosting Paths',
          description: 'Managed VPS, cloud, and dedicated infrastructure for higher-control workloads.'
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
