'use client'
import { LoaderDelay } from '@/constants'
import { usePrefersReducedMotion } from '@/hooks'
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  li {
    &:last-of-type {
      margin-bottom: 20px;
    }

    a {
      padding: 10px;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`

interface SideProps {
  orientation: string
}

const StyledSideElement = styled.div<SideProps>`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${({ orientation }) => (orientation === 'left' ? '40px' : 'auto')};
  right: ${({ orientation }) => (orientation === 'left' ? 'auto' : '40px')};
  z-index: 10;
  color: var(--light-slate);

  @media (max-width: 1080px) {
    left: ${({ orientation }) => (orientation === 'left' ? '20px' : 'auto')};
    right: ${({ orientation }) => (orientation === 'left' ? 'auto' : '20px')};
  }

  @media (max-width: 768px) {
    display: none;
  }
`

interface Props {
  isHome?: boolean
  orientation: string
  children: React.ReactNode
}

const Side = ({ children, isHome, orientation }: Props) => {
  const [isMounted, setIsMounted] = useState(!isHome)
  const prefersReducedMotion = usePrefersReducedMotion()
  const socialRef = useRef(null)

  useEffect(() => {
    if (!isHome || prefersReducedMotion) {
      return
    }
    const timeout = setTimeout(() => setIsMounted(true), LoaderDelay)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <StyledSideElement orientation={orientation}>
      {prefersReducedMotion ? (
        <>{children}</>
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition nodeRef={socialRef} classNames={isHome ? 'fade' : ''} timeout={isHome ? LoaderDelay : 0}>
              <StyledSocialList ref={socialRef}>{children}</StyledSocialList>
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </StyledSideElement>
  )
}

export default Side
