'use client'
import { Config, KEY_CODES } from '@/constants'
import { useClickAway } from 'ahooks'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const { navLinks } = Config

interface ButtonProps {
  $menuOpen?: boolean
}

interface SidebarProps {
  $menuOpen?: boolean
}

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`

const StyledHamburgerButton = styled.button<ButtonProps>`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    color: inherit;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${({ $menuOpen }) => ($menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${({ $menuOpen }) => ($menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(${({ $menuOpen }) => ($menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)});
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: var(--green);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: ${({ $menuOpen }) => ($menuOpen ? `100%` : `120%`)};
      top: ${({ $menuOpen }) => ($menuOpen ? `0` : `-10px`)};
      opacity: ${({ $menuOpen }) => ($menuOpen ? 0 : 1)};
      transition: ${({ $menuOpen }) => ($menuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)')};
    }
    &:after {
      width: ${({ $menuOpen }) => ($menuOpen ? `100%` : `80%`)};
      bottom: ${({ $menuOpen }) => ($menuOpen ? `0` : `-10px`)};
      transform: rotate(${({ $menuOpen }) => ($menuOpen ? `-90deg` : `0`)});
      transition: ${({ $menuOpen }) => ($menuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
  }
`

const StyledSidebar = styled.aside<SidebarProps>`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: var(--light-navy);
    box-shadow: -10px 0 30px -15px var(--navy-shadow);
    z-index: 9;
    transform: translateX(${({ $menuOpen }) => ($menuOpen ? 0 : 100)}vw);
    visibility: ${({ $menuOpen }) => ($menuOpen ? 'visible' : 'hidden')};
    transition: var(--transition);
  }

  nav {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }

      &:before {
        content: '0' counter(item) '.';
        display: block;
        margin-bottom: 5px;
        color: var(--green);
        font-size: var(--fz-sm);
      }
    }

    a {
      ${({ theme }) => theme.mixins.link};
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton};
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useClickAway(() => setMenuOpen(false), wrapperRef)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)

  let focusableMenus: (HTMLButtonElement | HTMLAnchorElement)[]
  let firstFocusableEl: HTMLButtonElement | HTMLAnchorElement
  let lastFocusableEl: HTMLButtonElement | HTMLAnchorElement

  const setFocusable = () => {
    focusableMenus = [buttonRef.current!, ...Array.from(navRef.current!.querySelectorAll<HTMLAnchorElement>('a'))]
    firstFocusableEl = focusableMenus[0]!
    lastFocusableEl = focusableMenus[focusableMenus.length - 1]!
  }

  const handleBackwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault()
      lastFocusableEl.focus()
    }
  }

  const handleForwardTab = (e: KeyboardEvent) => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault()
      firstFocusableEl.focus()
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false)
        break
      }

      case KEY_CODES.TAB: {
        if (focusableMenus && focusableMenus.length === 1) {
          e.preventDefault()
          break
        }
        if (e.shiftKey) {
          handleBackwardTab(e)
        } else {
          handleForwardTab(e)
        }
        break
      }

      default: {
        break
      }
    }
  }

  const onResize = (e: Event) => {
    if ((e.currentTarget as Window).innerWidth > 768) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    setFocusable()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} />
      </Helmet>

      <div ref={wrapperRef}>
        <StyledHamburgerButton onClick={toggleMenu} $menuOpen={menuOpen} ref={buttonRef} aria-label="Menu">
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>
        <StyledSidebar $menuOpen={menuOpen} aria-hidden={!menuOpen} tabIndex={menuOpen ? 1 : -1}>
          <nav ref={navRef}>
            {navLinks && (
              <ol>
                {navLinks.map(({ url, name }, i) => (
                  <li key={i}>
                    <Link href={url} onClick={() => setMenuOpen(false)}>
                      {name}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
            <a target="_blank" rel="noreferrer" href="/resume.png" className="resume-link">
              Resume
            </a>
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  )
}

export default Menu
