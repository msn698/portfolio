import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mohammed Saeed | Personal Portfolio & Web Developer',
  description: 'The personal portfolio of Mohammed Saeed showcasing projects, skills, and web development expertise.',
  keywords: 'personal portfolio, web developer, Mohammed Saeed, msaeed.tech, frontend development, software engineer',
  metadataBase: new URL('https://msaeed.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mohammed Saeed | Personal Portfolio & Web Developer',
    description: 'Explore the projects and skills of Mohammed Saeed on his personal portfolio at msaeed.tech.',
    url: 'https://msaeed.tech',
    siteName: 'Mohammed Saeed Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammed Saeed | Personal Portfolio & Web Developer',
    description: 'Explore the projects and skills of Mohammed Saeed on his personal portfolio at msaeed.tech.',
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
              url: 'https://msaeed.tech',
              jobTitle: 'Web Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Personal Portfolio',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
