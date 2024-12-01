import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { LanguageProvider } from '../context/LanguageContext';


export const metadata: Metadata = {
  title: 'Solana Game Demo',
  description: 'A fun interactive game built on Solana',
  openGraph: {
    title: 'Solana Game Demo',
    description: 'A fun interactive game built on Solana',
    images: [
      {
        url: '/solanaw.png',
        width: 1200,
        height: 630,
        alt: 'Solana Game Demo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solana Game Demo',
    description: 'A fun interactive game built on Solana',
    images: ['/solanaw.png'],
    creator: '@arteesan', // Replace with your Twitter handle
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <Script
          src="https://telegram.org/js/telegram-web-app.js"
          // strategy="beforeInteractive" // ensures the script loads before the page renders
        />
        </head>
      <body className='tx-altfont-1' >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
