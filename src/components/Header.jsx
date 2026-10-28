import { useEffect, useState } from 'react'
import { company, navLinks } from '../data/site.js'
import { Icon, BrandMark } from './Icon.jsx'
import { usePdfPreview } from './PdfPreview.jsx'

export default function Header({ activeSection }) {
  const [open, setOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const openPdf = usePdfPreview()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`header${stuck ? ' is-stuck' : ''}`}>
        <div className="container header__inner">
          <a className="brand" href="#home">
            <BrandMark title={company.name} />
            <span className="brand__text">
              <span className="brand__name">
                GL<span className="brand__globe" aria-hidden="true" />
                BAL <em>CITY</em>
              </span>
              <span className="brand__sub">TOURS AND TRAVELS PVT.LTD.</span>
            </span>
          </a>

          <nav className={`nav${open ? ' is-open' : ''}`} id="nav" aria-label="Main navigation">
            <div className="nav__head">
              <span className="nav__head-title">Menu</span>
              <button
                type="button"
                className="nav__close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <Icon name="close" className="ico ico--24" />
              </button>
            </div>

            <ul className="nav__list">
              {navLinks.map((link, position) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav__link${activeSection === link.href.slice(1) ? ' is-active' : ''}`}
                    data-index={String(position + 1).padStart(2, '0')}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn btn--primary nav__cta" onClick={() => setOpen(false)}>
              Book Now
              <Icon name="arrow" />
            </a>

            <div className="nav__foot">
              <span className="nav__foot-label">Or reach us directly</span>
              <div className="nav__foot-links">
                <a href={`tel:+${company.phoneRaw[0]}`}>
                  <Icon name="phone" />
                  {company.phones[0]}
                </a>
                <a
                  href={`https://wa.me/${company.phoneRaw[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" className="ico ico--wa" />
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    openPdf()
                  }}
                >
                  <Icon name="file" />
                  View brochure
                </button>
              </div>
              <span className="nav__hours">
                <Icon name="clock" />
                {company.hoursShort}
              </span>
            </div>
          </nav>

          <button type="button" className="header__pdf" onClick={() => { setOpen(false); openPdf() }}>
        <Icon name="file" />
        Brochure
      </button>

      <div className="header__actions">
            <a
              href={`tel:+${company.phoneRaw[0]}`}
              className="btn btn--sm header__call"
              aria-label="Call Now"
            >
              <Icon name="phone" />
              <span>Call Now</span>
            </a>
            <button
              className="burger"
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav"
            >
              <Icon name={open ? 'close' : 'menu'} className="ico ico--24" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-overlay${open ? ' is-open' : ''}`}
        onClick={() => setOpen(false)}
        hidden={!open}
      />
    </>
  )
}
