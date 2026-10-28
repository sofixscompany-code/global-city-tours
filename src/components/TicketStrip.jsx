import { Icon } from './Icon.jsx'
import { bookOnWhatsApp } from '../lib/enquiry.js'

const sectors = [
  {
    alt: false,
    label: 'Domestic Sector',
    route: 'Kathmandu',
    to: 'Pokhara · Bharatpur · Bhadrapur · Nepalgunj',
    carriers: 'Tara Air · Buddha Air · Shree Airlines · Yeti Airlines · Sita Air · Saurya Airlines',
  },
  {
    alt: true,
    label: 'International Sector',
    route: 'Kathmandu',
    to: 'Dubai · Doha · Bangkok · Kuala Lumpur · Singapore',
    carriers: 'Qatar Airways · Emirates · Thai · flydubai · Malaysia Airlines · IndiGo · Air Arabia & more',
  },
]

export default function TicketStrip() {
  return (
    <section className="strip">
      <div className="container strip__inner">
        {sectors.map((sector) => (
          <article className={`ticket reveal${sector.alt ? ' ticket--alt' : ''}`} key={sector.label}>
            <div className="ticket__body">
              <span className="ticket__label">{sector.label}</span>
              <h3 className="ticket__route">
                {sector.route}
                <Icon name="flight" />
                {sector.to}
              </h3>
              <p className="ticket__meta">{sector.carriers}</p>
            </div>
            <button
              type="button"
              className="ticket__cta"
              onClick={() => bookOnWhatsApp(`${sector.label} ticket: ${sector.route} → ${sector.to}`)}
            >
              Book Now
              <Icon name="arrow" />
            </button>
            <span className="ticket__notch ticket__notch--top" />
            <span className="ticket__notch ticket__notch--bottom" />
          </article>
        ))}
      </div>
    </section>
  )
}
