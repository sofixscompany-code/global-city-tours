import { useEffect } from 'react'

/**
 * Fades sections in as they enter the viewport, with a small stagger
 * between siblings so grids don't pop in all at once.
 *
 * A MutationObserver keeps the observer list fresh — some sections
 * lazy-mount after the first paint to keep the initial bundle light.
 */
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'))
      return undefined
    }

    const seen = new WeakSet()
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const el = entry.target
          const siblings = Array.from(el.parentElement.children).filter((node) =>
            node.classList?.contains('reveal'),
          )
          const position = Math.max(0, siblings.indexOf(el))
          el.style.transitionDelay = `${Math.min(position * 70, 420)}ms`
          el.classList.add('is-in')
          obs.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    const watch = (root) => {
      root.querySelectorAll?.('.reveal').forEach((el) => {
        if (seen.has(el)) return
        seen.add(el)
        observer.observe(el)
      })
    }

    watch(document)

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return
          if (node.classList?.contains('reveal')) {
            if (!seen.has(node)) {
              seen.add(node)
              observer.observe(node)
            }
          }
          watch(node)
        })
      })
    })

    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])
}
