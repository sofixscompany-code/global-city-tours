import { useEffect, useState } from 'react'
import { company } from '../data/site.js'
import { Icon } from './Icon.jsx'
import { usePdfPreview } from './PdfPreview.jsx'

/** The three little buttons that follow you down the page. */
export default function Floats() {
  const [showTop, setShowTop] = useState(false)
  const openPdf = usePdfPreview()

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="floats">
      <a
        className="float float--wa"
        href={`https://wa.me/${company.phoneRaw[0]}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="whatsapp" className="ico ico--24" />
      </a>

      <button
        type="button"
        className="float float--pdf"
        onClick={openPdf}
        aria-label="Preview brochure"
      >
        <Icon name="file" className="ico ico--24" />
      </button>

      <a
        className="float float--call"
        href={`tel:+${company.phoneRaw[0]}`}
        aria-label="Call now"
      >
        <Icon name="phone" className="ico ico--24" />
      </a>

      <button
        type="button"
        className={`float float--top${showTop ? ' is-visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <Icon name="arrow" className="ico ico--24" style={{ transform: 'rotate(-90deg)' }} />
      </button>
    </div>
  )
}
