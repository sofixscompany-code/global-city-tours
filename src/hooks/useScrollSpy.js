import { useEffect, useState } from 'react'

/**
 * Highlights the nav link of whichever section is near the middle of the screen.
 *
 * Some sections lazy-mount after the first paint, so the section list is
 * kept fresh with a MutationObserver instead of a one-time lookup.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined

    const observed = new WeakSet()
    const wanted = new Set(ids)
    let observer

    const handle = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id)
      })
    }

    const attach = (root) => {
      root.querySelectorAll?.('main section[id]').forEach((section) => {
        if (!wanted.has(section.id) || observed.has(section)) return
        observed.add(section)
        observer.observe(section)
      })
    }

    observer = new IntersectionObserver(handle, { rootMargin: '-45% 0px -50% 0px', threshold: 0 })
    attach(document)

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) attach(node)
      }))
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [ids.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps

  return active
}
