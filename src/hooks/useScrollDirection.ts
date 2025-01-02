import { Direction } from '@/constants'
import { useEffect, useState } from 'react'

interface Props {
  direction: keyof typeof Direction
  threshold?: number
  off?: boolean
}

const useScrollDirection = ({ direction, threshold = 0, off }: Props) => {
  const [scrollDir, setScrollDir] = useState(direction)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false
        return
      }

      setScrollDir(scrollY > lastScrollY ? Direction.down : Direction.up)
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    !off ? window.addEventListener('scroll', onScroll) : setScrollDir(direction)

    return () => window.removeEventListener('scroll', onScroll)
  }, [direction, threshold, off])

  return scrollDir
}

export default useScrollDirection
