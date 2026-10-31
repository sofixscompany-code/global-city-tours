import { company, navLinks, services, destinations } from '../data/site.js'
import { Icon } from './Icon.jsx'
import { usePdfPreview } from './PdfPreview.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  const openPdf = usePdfPreview()

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">
          <div className="footer__col">
            <a className="brand brand--footer" href="#home">
              {/* The full lockup (emblem + wordmark) on its white ground —
                  on the navy footer a transparent version would show the page
                  colour through the globe. */}
              <img
                className="footer__logo"
                src="/assets/logo.jpg"
                alt={company.name}
                width={560}
                height={481}
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="footer__about">
              A full-service travel company in Kathmandu — air ticketing, hotels, tours, holiday
              packages and cargo, handled end to end by one trusted team.
            </p>
            <p className="footer__tag">{company.tagline}</p>

            <div className="footer__social">
              <a href={`https://wa.me/${company.phoneRaw[0]}`} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" />
              </a>
              <a href={`mailto:${company.email}`} aria-label="Email">
                <Icon name="mail" />
              </a>
              <a href={`tel:+${company.phoneRaw[0]}`} aria-label="Call">
                <Icon name="phone" />
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {services.map((service) => (
                <li key={service.title}>
                  <a href={service.link.href}>{service.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Destinations</h4>
            <ul>
              {destinations.slice(0, 7).map((place) => (
                <li key={place.name}>
                  <a href="#destinations">{place.name}</a>
                </li>
              ))}
              <li>
                <a href="#destinations">View all</a>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link-btn"
                  onClick={openPdf}
                >
                  View Brochure (PDF)
                </button>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul className="footer__contact">
              <li>
                <Icon name="pin" />
                <span>
                  {company.addressLines[0]}
                  <br />{' '}
                  {company.addressLines[1]}
                </span>
              </li>
              <li>
                <Icon name="phone" />
                <span>
                  <a href={`tel:+${company.phoneRaw[0]}`}>{company.phones[0]}</a>
                  <a href={`tel:+${company.phoneRaw[1]}`}>{company.phones[1]}</a>
                </span>
              </li>
              <li>
                <Icon name="mail" />
                <span>
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </span>
              </li>
              <li>
                <Icon name="clock" />
                <span>{company.hoursShort}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            © {year} {company.name} All rights reserved.
          </p>
          <p>
            Kathmandu, Nepal · {company.tagline}
            <span className="footer__credit">
              {' '}· Powered by{' '}
              <a href="https://sofixs.com" target="_blank" rel="noopener noreferrer">Sofixs</a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
