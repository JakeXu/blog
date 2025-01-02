'use client'

import { Email, Loader, Nav, Social } from '@/components'
import { GlobalStyle, theme } from '@/styles'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider as SCThemeProvider } from 'styled-components'

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const StyledMainContainer = styled.main`
  counter-reset: section;
`

export default function ThemeProvider({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (location.hash) {
      const id = location.hash.substring(1) // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView()
          el.focus()
        }
      }, 0)
    }
  }, [isLoading])

  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle />
      {isLoading && isHome ? (
        <Loader loadFinished={() => setIsLoading(false)} />
      ) : (
        <StyledContent>
          <Nav isHome={isHome} />
          <Social isHome={isHome} />
          <Email isHome={isHome} />
          <StyledMainContainer className="fillHeight">{children}</StyledMainContainer>
        </StyledContent>
      )}
    </SCThemeProvider>
  )
}
