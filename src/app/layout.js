import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import { SpeedInsights } from "@vercel/speed-insights/next"

const baseUrl = 'https://msaeed.tech';

const inter = Inter({ subsets: ['latin'] })
const transcity = localFont({
  src: './fonts/transcity-demo.otf',
  variable: '--font-display',
})

export const metadata = {
  title: 'Mohammed Saeed | Web Developer Portfolio',
  description: 'Modern web developer portfolio showcasing selected projects, case studies, and contact options.',
  keywords: 'Mohammed Saeed, web developer portfolio, Next.js, React, frontend developer Dubai, msaeed.tech',
  metadataBase: new URL(baseUrl),
  applicationName: 'Mohammed Saeed Portfolio',
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/icon.png', type: 'image/png' }],
  },
  openGraph: {
    title: 'Mohammed Saeed | Web Developer Portfolio',
    description: 'Explore selected projects and case studies by Mohammed Saeed.',
    url: baseUrl,
    siteName: 'Mohammed Saeed Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mohammed Saeed Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Saeed | Web Developer Portfolio',
    description: 'Explore selected projects and case studies by Mohammed Saeed.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Mohammed Saeed',
              url: baseUrl,
              jobTitle: 'Web Developer',
              sameAs: [
                'https://github.com/msn698',
                'https://www.linkedin.com/in/mohammed-saeed-nassar'
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Independent',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${transcity.variable}`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
