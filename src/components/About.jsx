import { imagery } from '../data/site.js'
import { Icon } from './Icon.jsx'
import { hideBrokenImage } from '../lib/images.js'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about">
        <div className="about__media reveal">
          <span className="tape tape--tl" aria-hidden="true" />
          <span className="tape tape--tr" aria-hidden="true" />
          <div className="about__img about__img--main">
            <img
              src={imagery.aboutMain}
              alt="Boudhanath Stupa glowing at dusk in Kathmandu, Nepal"
              loading="lazy"
              onError={hideBrokenImage}
            />
          </div>
          <div className="about__img about__img--sub">
            <img
              src={imagery.aboutSide}
              alt="View from an aircraft window during a flight"
              loading="lazy"
              onError={hideBrokenImage}
            />
          </div>
          <div className="about__exp">
            <strong>20+</strong>
            <span>
              Airline Partners
              <br />
              across the globe
            </span>
          </div>
          <span className="stamp" style={{ position: 'absolute', bottom: '-26px', right: '10px', background: '#fff' }}>
            Kathmandu<br />Nepal<br />Since Day One
          </span>
        </div>

        <div className="about__content reveal">
          <span className="eyebrow">Who We Are</span>
          <h2 className="section__title">
            One window for every journey — <span className="hl">Global City Tours and Travels</span>
          </h2>
          <p className="section__lead">
            Headquartered in Gokarneshwor-8, Attarkhel, Kathmandu, we are a full-service travel
            company built on honest fares, fast processing and genuine care for every traveller.
          </p>
          <p>
            From a single domestic boarding pass to a multi-country holiday with hotels, transfers
            and cargo delivery at the other end — our team manages the complete travel lifecycle so
            you can simply pack and go.
          </p>

          <ul className="checks">
            <li>
              <Icon name="shield" className="ico ico--check" />
              <span>
                <b>Transparent pricing</b> — no hidden charges, no surprise fees at the counter.
              </span>
            </li>
            <li>
              <Icon name="flight" className="ico ico--check" />
              <span>
                <b>20+ airline partners</b> — domestic and international inventory compared in one
                call.
              </span>
            </li>
            <li>
              <Icon name="headset" className="ico ico--check" />
              <span>
                <b>End-to-end assistance</b> — visa guidance, hotel stays, transfers and on-trip
                support.
              </span>
            </li>
            <li>
              <Icon name="cargo" className="ico ico--check" />
              <span>
                <b>Cargo &amp; courier desk</b> — send and receive parcels worldwide, door to door.
              </span>
            </li>
          </ul>

          <div className="about__actions">
            <a href="#services" className="btn btn--primary">
              Explore Our Services
              <Icon name="arrow" />
            </a>
            <a
              href="https://wa.me/9779851150530"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              <Icon name="whatsapp" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
