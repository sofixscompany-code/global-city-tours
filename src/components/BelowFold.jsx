import { lazy, Suspense, useEffect, useState } from 'react'

/**
 * Everything below the fold.
 *
 * These sections wait for the browser to go idle before mounting, so the
 * hero, header and enquiry form paint first. Two hooks already cope with
 * the late mounting: `useReveal` re-scans for `.reveal` nodes and
 * `useScrollSpy` re-attaches to sections as they appear.
 */

const TicketStrip = lazy(() => import('./TicketStrip.jsx'))
const About = lazy(() => import('./About.jsx'))
const Services = lazy(() => import('./Services.jsx'))
const Airlines = lazy(() => import('./Airlines.jsx'))
const Destinations = lazy(() => import('./Destinations.jsx'))
const NepalBanner = lazy(() => import('./NepalBanner.jsx'))
const Packages = lazy(() => import('./Packages.jsx'))
const WhyUs = lazy(() => import('./WhyUs.jsx'))
const Testimonials = lazy(() => import('./Testimonials.jsx'))
const Faq = lazy(() => import('./Faq.jsx'))
const CtaBand = lazy(() => import('./CtaBand.jsx'))
const Contact = lazy(() => import('./Contact.jsx'))

function useIdleMount() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const go = () => setReady(true)

    // If someone taps a nav link before the sections exist, mount at once
    // so the anchor has somewhere to scroll to.
    const hurry = () => setReady(true)
    window.addEventListener('hashchange', hurry)
    document.addEventListener('click', hurry, { once: true, capture: true })
    document.addEventListener('keydown', hurry, { once: true })

    let idleId
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(go, { timeout: 1500 })
    } else {
      idleId = window.setTimeout(go, 400)
    }

    return () => {
      window.removeEventListener('hashchange', hurry)
      document.removeEventListener('click', hurry, { capture: true })
      document.removeEventListener('keydown', hurry)
      if ('requestIdleCallback' in window) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
    }
  }, [])

  return ready
}

export default function BelowFold() {
  const ready = useIdleMount()
  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <TicketStrip />
      <About />
      <Services />
      <Airlines />
      <Destinations />
      <NepalBanner />
      <Packages />
      <WhyUs />
      <Testimonials />
      <Faq />
      <CtaBand />
      <Contact />
    </Suspense>
  )
}
