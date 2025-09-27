import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import { cn } from '../lib/utils'
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Job Matcher',
  description: 'Find your perfect job match with AI-powered recommendations tailored to your skills and preferences.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
