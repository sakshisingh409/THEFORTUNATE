import React from "react"
import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'

import './globals.css'

const _dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const _playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'The Fortunates | Breaking the Cycle of Poverty',
  description: 'The Fortunates is dedicated to breaking the cycle of poverty through education, health, women empowerment, and skill development. Join us in making a difference.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${_dmSans.variable} ${_playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
