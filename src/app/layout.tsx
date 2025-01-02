import { Footer } from '@/components'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import ThemeProvider from '@/components/ThemeProvider'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Jake Xu',
  description: 'Jake Xu is a software engineer who excels in building exceptional digital experiences, from backend to frontend.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            {children}
            <Footer />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
