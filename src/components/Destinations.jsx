import { destinations } from '../data/site.js'
import { imageFallback } from '../lib/images.js'
import { askOnWhatsApp } from '../lib/enquiry.js'
import { Icon } from './Icon.jsx'

export default function Destinations() {
  return (
    <section className="section section--tint" id="destinations">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Where We Send You</span>
          <h2 className="section__title">Popular Destinations</h2>
          <p className="section__lead">
            Short hops to Bharatpur and Pokhara, or long-haul escapes to Dubai, Bangkok, Seoul and
            beyond — we cover the map.
          </p>
        </div>

        <div className="grid grid--4 dests">
          {destinations.map((place) => (
            <a
              className="dest reveal"
              href="#quote"
              key={place.name}
              data-emoji={place.emoji}
            >
              <img
                src={place.image}
                alt={place.alt}
                loading="lazy"
                onError={imageFallback}
              />
              <span
                className="dest__wa"
                role="button"
                tabIndex={0}
                aria-label={`Ask about ${place.name} on WhatsApp`}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  askOnWhatsApp(`${place.name} trip from Kathmandu`)
                }}
                onKeyDown={(event) => {
                  if (event.key !== 'Enter' && event.key !== ' ') return
                  event.preventDefault()
                  event.stopPropagation()
                  askOnWhatsApp(`${place.name} trip from Kathmandu`)
                }}
              >
                <Icon name="whatsapp" />
              </span>
              <span className="dest__body">
                <strong>{place.name}</strong>
                <em>{place.country}</em>
              </span>
            </a>
          ))}
        </div>

        <p className="note note--tilt" style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          not listed? just ask — we book everywhere ✈
        </p>
      </div>
    </section>
  )
}
