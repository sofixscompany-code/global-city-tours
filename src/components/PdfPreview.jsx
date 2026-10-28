import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { company } from '../data/site.js'
import { Icon } from './Icon.jsx'

/**
 * In-page brochure viewer.
 *
 * Opening the raw PDF in a new tab fights popup blockers and drops the
 * visitor into the browser's grey PDF chrome. This modal keeps them on
 * the site with a branded frame, and still offers the original file.
 */

const PdfContext = createContext(() => {})

export function usePdfPreview() {
  return useContext(PdfContext)
}

function PdfModal({ onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <div
      className="pdfmodal"
      role="dialog"
      aria-modal="true"
      aria-label="Brochure preview"
      onClick={onClose}
    >
      <div className="pdfmodal__card" onClick={(event) => event.stopPropagation()}>
        <div className="pdfmodal__bar">
          <Icon name="file" className="ico ico--24 pdfmodal__ico" />
          <div className="pdfmodal__meta">
            <strong>Global City — Brochure</strong>
            <span>3 pages · services, airlines, destinations &amp; contacts</span>
          </div>
          <a
            className="pdfmodal__dl"
            href={company.brochure}
            download="Global-City-Tours-Brochure.pdf"
            aria-label="Download brochure PDF"
          >
            <Icon name="download" />
            <span>Download</span>
          </a>
          <button type="button" className="pdfmodal__close" onClick={onClose} aria-label="Close brochure preview">
            <Icon name="close" className="ico ico--24" />
          </button>
        </div>

        <iframe
          className="pdfmodal__frame"
          src={`${company.brochure}#view=FitH`}
          title="Global City Tours and Travels brochure"
        />

        <div className="pdfmodal__foot">
          <span>Want it simpler? Just message us — we reply in minutes.</span>
          <a
            className="btn btn--green btn--sm"
            href={`https://wa.me/${company.phoneRaw[0]}?text=${encodeURIComponent('Hello Global City, please share your latest tour packages and fares.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export function PdfPreviewProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openPdf = useCallback(() => setOpen(true), [])
  const closePdf = useCallback(() => setOpen(false), [])

  return (
    <PdfContext.Provider value={openPdf}>
      {children}
      {open && <PdfModal onClose={closePdf} />}
    </PdfContext.Provider>
  )
}
