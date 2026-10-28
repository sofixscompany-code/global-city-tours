import { imagery, company } from '../data/site.js'
import { Icon } from './Icon.jsx'

const chips = [
  'Kathmandu Valley',
  'Pokhara',
  'Chitwan Safari',
  'Muktinath Yatra',
  'Lumbini',
  'Everest View Flights',
]

export default function NepalBanner() {
  return (
    <section className="nepal">
      <div className="nepal__bg" aria-hidden="true">
        <img src={imagery.nepalBanner} alt="" loading="lazy" />
      </div>

      <div className="container nepal__inner reveal">
        <span className="eyebrow eyebrow--light">Explore Nepal</span>
        <h2>
          From the Himalayas to the Terai — we know this country route by route
        </h2>
        <p>
          Domestic flights, hotel stays, jeep hires and guided tours across Nepal. Whether it is a
          sunrise at Sarangkot, a jungle safari in Chitwan or darshan at Muktinath, our Kathmandu
          team plans it around your dates and budget.
        </p>

        <div className="nepal__chips">
          {chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>

        <div className="nepal__actions">
          <a href="#quote" className="btn btn--green btn--lg">
            Plan a Nepal Trip
            <Icon name="arrow" />
          </a>
          <a
            href={`https://wa.me/${company.phoneRaw[0]}?text=${encodeURIComponent('Hello Global City, I want to plan a trip inside Nepal.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--white btn--lg"
          >
            <Icon name="whatsapp" />
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
