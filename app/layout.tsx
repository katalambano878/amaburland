/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
};

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://example.com';

// Favicon & OG from public: add favicon.ico, favicon.png, og-image.png (1200×630) to public as needed
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DIYA'S ORGANICS",
    template: "%s | DIYA'S ORGANICS"
  },
  description: "Diya Organics crafts Ayurvedic-inspired hair care with herbs from Africa, India and the Middle East to help your hair grow stronger, thicker and healthier.",
  keywords: [
    "Diya Organics",
    "DIYAS ORGANICS",
    "Ayurvedic hair care",
    "natural hair growth",
    "stronger thicker hair",
    "African Ayurvedic herbs",
    "herbal hair oil",
    "herbal hair butter",
    "hair growth Ghana"
  ],
  authors: [{ name: "DIYA'S ORGANICS" }],
  creator: "DIYA'S ORGANICS",
  publisher: "DIYA'S ORGANICS",
  applicationName: "DIYA'S ORGANICS",
  referrer: "origin-when-cross-origin",
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
  icons: {
    icon: [
      { url: '/favicon.png?v=3', sizes: 'any', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.png?v=3',
    apple: '/favicon.png?v=3',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "DIYA'S ORGANICS",
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteUrl,
    title: "DIYA'S ORGANICS",
    description: "Diya Organics crafts Ayurvedic-inspired hair care with herbs from Africa, India and the Middle East to help your hair grow stronger, thicker and healthier.",
    siteName: "DIYA'S ORGANICS",
    images: [
      { url: "/OG.jpg?v=2", width: 1200, height: 630, alt: "DIYA'S ORGANICS", type: "image/jpeg" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIYA'S ORGANICS",
    description: "Diya Organics crafts Ayurvedic-inspired hair care with herbs from Africa, India and the Middle East to help your hair grow stronger, thicker and healthier.",
    images: ["/OG.jpg?v=2"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "shopping",
};

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
// Google reCAPTCHA v3 Site Key
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DIYA'S ORGANICS" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Favicon from public folder (orange t-shirt icon) - ?v=3 forces cache refresh */}
        <link rel="icon" href="/favicon.png?v=3" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/favicon.png?v=3" />

        {/* Apple Touch Icons from public */}
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
        <link rel="apple-touch-startup-image" href="/favicon.png?v=3" />

        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DIYA'S ORGANICS",
              "url": siteUrl,
              "description": "Diya Organics crafts Ayurvedic-inspired hair care with herbs from Africa, India and the Middle East to help your hair grow stronger, thicker and healthier."
            })
          }}
        />
      </head>

      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Google reCAPTCHA v3 */}
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      )}

      <body className="antialiased font-sans overflow-x-hidden pwa-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[10000] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <CartProvider>
          <WishlistProvider>
            <div id="main-content">
              {children}
            </div>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
