import React from "react"
import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const _outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' })

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
      <body className={`${_inter.variable} ${_outfit.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
