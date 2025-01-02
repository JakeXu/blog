'use client'
import { Config } from '@/constants'
import { usePrefersReducedMotion } from '@/hooks'
import sr from '@/utils/sr'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const { srConfig } = Config

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`

const About = () => {
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr?.reveal(revealContainer.current!, srConfig())
  }, [])

  const skills = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Umi Max',
    'Next.js',
    'Node.js',
    'React Vant',
    'Material UI',
    'Styled Components',
    'React Spring'
  ]

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>
      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hi! My name is Jake, and my interest in front-end started in 2009 when I needed to do deep development based on BPMN. I had to
              shuttle through tens of thousands of lines of code every day, which made me appreciate the charm of JS!
            </p>
            <p>
              Fast-forward to today, and I’ve had the privilege of working at <a href="https://www.dhms.com.cn/">a start-up</a>,{' '}
              <a target="_blank" rel="noreferrer" href="https://www.benqguru.com.cn/">
                a huge corporation
              </a>
              , and <a href="https://accelbyte.io/">a multinational company</a>
              (remote), among others. My main focus these days is building CEX and deliver accessible, inclusive products and digital
              experiences at an unknown studio for a variety of clients.
            </p>
            <p>
              I'm responsible for the technical selection of the project, building from 0 to 1 and completing all functional development. I
              also study and research web3 related technologies and applications.
            </p>
            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>
          <ul className="skills-list">{skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
        </StyledText>
        <StyledPic>
          <div className="wrapper">
            <Image className="img" src="/me.jpeg" width={300} height={300} quality={95} alt="Headshot" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  )
}

export default About
