import { useEffect, useRef } from 'react'
import { company } from '../data/site.js'
import { usePdfPreview } from './PdfPreview.jsx'

/**
 * Opens the company brochure in the in-page preview on a visitor's
 * first load of the session. No popup window, so nothing to block —
 * the brochure simply slides in as a modal over the site.
 */
export default function Brochure() {
  const openPdf = usePdfPreview()
  const tried = useRef(false)

  useEffect(() => {
    if (tried.current) return
    if (sessionStorage.getItem('gc-brochure-seen')) return
    tried.current = true

    const timer = window.setTimeout(() => {
      sessionStorage.setItem('gc-brochure-seen', '1')
      openPdf()
    }, 2600)

    return () => window.clearTimeout(timer)
  }, [openPdf])

  return null
}
