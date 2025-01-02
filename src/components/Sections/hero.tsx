'use client'
import { LoaderDelay, NavDelay } from '@/constants'
import { usePrefersReducedMotion } from '@/hooks'
import React, { useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 640px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const refs = useRef(new Map())

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const timeout = setTimeout(() => setIsMounted(true), NavDelay)
    return () => clearTimeout(timeout)
  }, [])

  const one = <h1>Hi, my name is</h1>
  const two = <h2 className="big-heading">Jake Xu.</h2>
  const three = <h3 className="big-heading">I build things for the web.</h3>
  const four = (
    <>
      <p>
        I’m a software engineer specializing in building exceptional digital experiences and has rich full-stack experience in MES, IOT, Big
        Data and Game Platform. Currently, I focus on front-end development and am very interested in the field of web3.
      </p>
    </>
  )
  const five = (
    <a className="email-link" href="https://new-to-web3-wallet.vercel.app/erc721" target="_blank" rel="noreferrer">
      Check out my demo!
    </a>
  )

  const items = [one, two, three, four, five]

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => {
              if (!refs.current.has(i)) {
                refs.current.set(i, React.createRef())
              }

              return (
                <CSSTransition key={i} nodeRef={refs.current.get(i)} classNames="fadeup" timeout={LoaderDelay}>
                  <div ref={refs.current.get(i)} style={{ transitionDelay: `${i + 1}00ms` }}>
                    {item}
                  </div>
                </CSSTransition>
              )
            })}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  )
}

export default Hero
