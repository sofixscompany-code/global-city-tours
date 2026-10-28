import { Icon } from './Icon.jsx'

const items = [
  'Air Ticketing',
  'Hotel Booking',
  'Cargo & Courier',
  'Holiday Packages',
  'Tour Packages',
  'Domestic Flights',
  'International Flights',
  'Travel Service',
  'Visa Guidance',
  '20+ Partner Airlines',
]

/** One identical pass of the list — rendered twice so the CSS marquee loops seamlessly. */
function Row() {
  return (
    <div className="ticker__row">
      {items.map((label) => (
        <span className="ticker__item" key={label}>
          <Icon name="flight" className="ico" />
          {label}
        </span>
      ))}
    </div>
  )
}

/**
 * The scrolling strip under the hero. Pure CSS marquee (no JS, no layout
 * thrash) — it pauses on hover so people can actually read it.
 */
export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__view">
        <div className="ticker__track">
          <Row />
          <Row />
        </div>
      </div>
    </div>
  )
}
