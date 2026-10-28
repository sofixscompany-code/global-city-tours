import { packages } from '../data/site.js'
import { bookOnWhatsApp } from '../lib/enquiry.js'
import { Icon } from './Icon.jsx'

function badgeClass(badge) {
  if (badge === 'Most Booked') return 'pkg__badge pkg__badge--hot'
  if (badge === 'Nepal') return 'pkg__badge pkg__badge--np'
  return 'pkg__badge'
}

export default function Packages() {
  return (
    <section className="section" id="packages">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Ready To Go</span>
          <h2 className="section__title">Featured Tour Packages</h2>
          <p className="section__lead">
            Handpicked itineraries our travellers book again and again — every one can be customised
            for your dates, hotel preference and group size.
          </p>
        </div>

        <div className="grid grid--3">
          {packages.map((pkg) => (
            <article
              className={`pkg reveal${pkg.featured ? ' pkg--feature' : ''}`}
              key={pkg.title}
            >
              <div className="pkg__img">
                <img src={pkg.image} alt={pkg.alt} loading="lazy" />
                <span className={badgeClass(pkg.badge)}>{pkg.badge}</span>
              </div>

              <div className="pkg__body">
                <h3>{pkg.title}</h3>

                <div className="pkg__meta">
                  <span>
                    <Icon name="calendar" />
                    {pkg.when}
                  </span>
                  <span>
                    <Icon name="user" />
                    {pkg.who}
                  </span>
                </div>

                <ul className="pkg__list">
                  {pkg.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>

                <div className="pkg__foot">
                  <span className="pkg__price">
                    <span>Package fare</span>
                    <strong>On request</strong>
                  </span>
                  <button
                    type="button"
                    className="link-arrow"
                    onClick={() => bookOnWhatsApp(`${pkg.title} package (${pkg.when}, ${pkg.who})`)}
                  >
                    Book on WhatsApp
                    <Icon name="whatsapp" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
