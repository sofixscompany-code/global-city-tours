import { useEffect, useRef, useState } from 'react'

/** Counts up to its target the first time it scrolls into view. */
export function Counter({ value, suffix = '', duration = 1500 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    if (!('IntersectionObserver' in window)) {
      setDisplay(value)
      return undefined
    }

    let frame
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return
        obs.disconnect()

        const startedAt = performance.now()
        const step = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(value * eased))
          if (progress < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.5 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <strong ref={ref}>
      {display}
      {suffix}
    </strong>
  )
}
