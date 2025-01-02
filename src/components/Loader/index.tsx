'use client'
import { IconLoader } from '@/components/Icons'
import anime from 'animejs'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

interface StyledLoaderProps {
  $mounted?: boolean
}

interface LoaderProps {
  loadFinished?: () => void
}

const StyledLoader = styled.div<StyledLoaderProps>`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${({ $mounted }) => ($mounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }
`

const Loader = ({ loadFinished }: LoaderProps) => {
  const [isMounted, setIsMounted] = useState(false)

  const animate = () => {
    const loader = anime.timeline({
      complete: () => loadFinished?.()
    })

    loader
      .add({
        targets: '#logo path',
        delay: 300,
        duration: 1500,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0]
      })
      .add({
        targets: '#logo #B',
        duration: 700,
        easing: 'easeInOutQuart',
        opacity: 1
      })
      .add({
        targets: '#logo',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1
      })
  }

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (isMounted) {
      animate()
    }
  }, [isMounted])

  return (
    <StyledLoader className="loader" $mounted={isMounted}>
      <Helmet bodyAttributes={{ class: 'hidden' }} />
      <div className="logo-wrapper">{isMounted && <IconLoader />}</div>
    </StyledLoader>
  )
}

export default Loader
