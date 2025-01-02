import ScrollRevealObject = scrollReveal.ScrollRevealObject

let sr: ScrollRevealObject | null = null

if (typeof window !== 'undefined') {
  import('scrollreveal')
    .then(module => {
      sr = module.default()
    })
    .catch(error => {
      console.error('Failed to load ScrollReveal:', error)
    })
}

export default sr
