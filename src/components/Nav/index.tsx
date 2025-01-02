'use client'
import { Menu } from '@/components'
import { IconHex, IconLogo } from '@/components/Icons'
import { Config, Direction, LoaderDelay } from '@/constants'
import { usePrefersReducedMotion, useScrollDirection } from '@/hooks'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled, { css } from 'styled-components'

interface HeaderProps {
  $scrollDirection: string
  $scrolledToTop?: boolean
}

const { navLinks } = Config

const StyledHeader = styled.header<HeaderProps>`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${({ $scrollDirection, $scrolledToTop }) =>
      $scrollDirection === Direction.up &&
      !$scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${({ $scrollDirection, $scrolledToTop }) =>
      $scrollDirection === Direction.down &&
      !$scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green);
      width: 42px;
      height: 42px;
      position: relative;
      z-index: 1;

      .hex-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition);
        }
      }

      .logo-container {
        position: relative;
        z-index: 1;
        svg {
          fill: none;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
          polygon {
            fill: var(--navy);
          }
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        transform: translate(-4px, -4px);
        .hex-container {
          transform: translate(4px, 3px);
        }
      }
    }
  }
`

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`

interface Props {
  isHome?: boolean
}

const Nav = ({ isHome }: Props) => {
  const [isMounted, setIsMounted] = useState(!isHome)
  const scrollDirection = useScrollDirection({ direction: Direction.down })
  const [scrolledToTop, setScrolledToTop] = useState(true)
  const prefersReducedMotion = usePrefersReducedMotion()
  const refs = useRef(new Map())
  const logoRef = useRef(null)
  const resumeRef = useRef(null)
  const menuRef = useRef(null)

  const handleScroll = () => {
    setScrolledToTop(window.scrollY < 50)
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const timeout = setTimeout(() => {
      setIsMounted(true)
    }, 100)

    // window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timeout)
      // window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const timeout = isHome ? LoaderDelay : 0
  const fadeClass = isHome ? 'fade' : ''
  const fadeDownClass = isHome ? 'fadedown' : ''

  const Logo = (
    <div ref={logoRef} className="logo" tabIndex={-1}>
      {isHome ? (
        <Link href="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </Link>
      ) : (
        <Link href="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </Link>
      )}
    </div>
  )

  const ResumeLink = (
    <a className="resume-button" href="/resume.png" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  )

  return (
    <StyledHeader $scrollDirection={scrollDirection} $scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}
            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link href={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              <div>{ResumeLink}</div>
            </StyledLinks>
            <Menu />
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition nodeRef={logoRef} classNames={fadeClass} timeout={timeout}>
                  {Logo}
                </CSSTransition>
              )}
            </TransitionGroup>
            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks.map(({ url, name }, i) => {
                      if (!refs.current.has(name)) {
                        refs.current.set(name, React.createRef())
                      }

                      return (
                        <CSSTransition key={i} nodeRef={refs.current.get(name)} classNames={fadeDownClass} timeout={timeout}>
                          <li key={i} ref={refs.current.get(name)} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                            <Link href={url}>{name}</Link>
                          </li>
                        </CSSTransition>
                      )
                    })}
                </TransitionGroup>
              </ol>
              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition nodeRef={resumeRef} classNames={fadeDownClass} timeout={timeout}>
                    <div ref={resumeRef} style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>

            {isMounted && (
              <CSSTransition classNames={fadeClass} timeout={timeout}>
                <Menu />
              </CSSTransition>
            )}
          </>
        )}
      </StyledNav>
    </StyledHeader>
  )
}

export default Nav
