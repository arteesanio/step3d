import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
