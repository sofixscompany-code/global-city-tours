import { company } from '../data/site.js'
import { Icon } from './Icon.jsx'

export default function CtaBand() {
  return (
    <section className="ctaband">
      <div className="container ctaband__inner reveal">
        <div className="ctaband__text">
          <h2>Ready to fly? Your next trip starts with one message.</h2>
          <p>
            Tell us the route and the dates — we will come back with the best fare across all our
            partner airlines.
          </p>
        </div>

        <div className="ctaband__actions">
          <a href="#quote" className="btn btn--green btn--lg">
            Get a Free Quote
            <Icon name="arrow" />
          </a>
          <a
            href={`https://wa.me/${company.phoneRaw[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--white btn--lg"
          >
            <Icon name="whatsapp" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}
