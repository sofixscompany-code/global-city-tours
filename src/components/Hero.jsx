import { useEffect, useRef } from 'react'
import { company, enquiryServices, stats } from '../data/site.js'
import { Icon } from './Icon.jsx'
import { Counter } from './Counter.jsx'
import { submitEnquiry, todayISO } from '../lib/enquiry.js'
import { useToast } from './Toast.jsx'

function QuickQuote() {
  const toast = useToast()

  return (
    <div className="quotecard reveal" id="quote">
      <div className="quotecard__head">
        <h2>Quick Enquiry</h2>
        <p>Send your requirement — we reply with the best fare within minutes.</p>
      </div>

      <form
        className="qform"
        noValidate
        onSubmit={(event) => submitEnquiry(event, { onSuccess: ({ message }) => toast(message) })}
      >
        <div className="field">
          <label htmlFor="q-service">Service</label>
          <select id="q-service" name="service" defaultValue="" required>
            <option value="" disabled>
              Select a service
            </option>
            {enquiryServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="q-from">From</label>
            <input id="q-from" name="from" type="text" defaultValue="Kathmandu" />
          </div>
          <div className="field">
            <label htmlFor="q-to">To</label>
            <input id="q-to" name="to" type="text" placeholder="Destination" required />
          </div>
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="q-date">Travel Date</label>
            <input id="q-date" name="date" type="date" min={todayISO()} />
          </div>
          <div className="field">
            <label htmlFor="q-pax">Travellers</label>
            <input id="q-pax" name="pax" type="number" min="1" max="99" defaultValue="1" />
          </div>
        </div>

        <div className="field">
          <label htmlFor="q-phone">Phone / WhatsApp</label>
          <input id="q-phone" name="phone" type="tel" placeholder="98XXXXXXXX" required />
        </div>

        <button type="submit" className="btn btn--green btn--block btn--lg">
          Send Enquiry
          <Icon name="arrow" />
        </button>

        <p className="qform__note">
          <Icon name="shield" />
          No spam. Your details stay private.
        </p>
      </form>
    </div>
  )
}

/**
 * Gentle scroll parallax for the hero sky. Skipped for reduced-motion
 * and for coarse pointers, where it would only cost battery.
 */
function useSkyParallax() {
  const bgRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return undefined

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const depth = Math.min(window.scrollY, window.innerHeight)
        bgRef.current?.style.setProperty('--sky-shift', `${depth}px`)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return bgRef
}

export default function Hero() {
  const skyRef = useSkyParallax()

  return (
    <section className="hero" id="home">
      <div className="hero__bg" aria-hidden="true" ref={skyRef}>
        <div className="hero__dots" />
        <svg className="hero__map" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <g className="hero__routes" stroke="#8fc4ff" strokeWidth="2" strokeDasharray="9 11" fill="none" opacity=".55">
            <path d="M120 330 C 300 180, 520 140, 760 210" />
            <path d="M180 180 C 380 320, 620 380, 880 300" />
            <path d="M420 420 C 560 300, 700 250, 900 150" />
          </g>
          <g className="hero__nodes" fill="#ffffff" opacity=".9">
            <circle cx="120" cy="330" r="7" />
            <circle cx="760" cy="210" r="7" />
            <circle cx="180" cy="180" r="6" />
            <circle cx="880" cy="300" r="6" />
            <circle cx="420" cy="420" r="6" />
            <circle cx="900" cy="150" r="7" />
          </g>
        </svg>
        <div className="hero__aurora" />
        <svg className="hero__plane" viewBox="0 0 24 24">
          <use href="#i-flight" />
        </svg>
        <svg className="hero__plane hero__plane--slow" viewBox="0 0 24 24">
          <use href="#i-flight" />
        </svg>
        <span className="hero__cloud hero__cloud--1" />
        <span className="hero__cloud hero__cloud--2" />
        <span className="hero__cloud hero__cloud--3" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content reveal">
          <span className="badge badge--light badge--tilt">
            <span className="badge__dot" />
            Nepal&apos;s Trusted Travel Partner — Since Day One
          </span>

          <h1 className="hero__title">
            {/* The {' '} between words is whitespace-only, so the flex container
                won't render it as an item — but it does land in textContent,
                which is what search engines and screen readers read. */}
            <span className="hero__word">
              <span>Travel</span>
            </span>
            {' '}
            <span className="hero__word">
              <span className="hero__title-accent">Beyond</span>
            </span>
            {' '}
            <span className="hero__word">
              <span>Boundaries</span>
            </span>
          </h1>

          <p className="hero__lead">
            Domestic &amp; international air ticketing, hotels, holiday and tour packages, plus cargo
            and courier — all under one roof in Kathmandu. One call, and your journey is handled end
            to end.
          </p>

          <ul className="hero__points">
            <li>
              <Icon name="shield" className="ico ico--check" />
              20+ Airline Partners
            </li>
            <li>
              <Icon name="tag" className="ico ico--check" />
              Best Fares Guaranteed
            </li>
            <li>
              <Icon name="headset" className="ico ico--check" />
              24×7 Travel Support
            </li>
          </ul>

          <div className="hero__cta">
            <a href="#quote" className="btn btn--green btn--lg">
              Get a Free Quote
              <Icon name="arrow" />
            </a>
            <a href={`tel:+${company.phoneRaw[0]}`} className="btn btn--white btn--lg">
              <Icon name="phone" />
              {company.phones[0]}
            </a>
          </div>

          <div className="hero__stats">
            {stats.map((stat) => (
              <div className="hstat" key={stat.label}>
                <Counter value={stat.value} suffix={stat.suffix} />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="note note--light note--tilt" style={{ marginTop: '18px' }}>
            <svg className="note__arrow" viewBox="0 0 44 34" aria-hidden="true">
              <path pathLength="100" d="M2 30 C 12 6, 30 2, 40 8" />
              <path pathLength="100" d="M33 4 L 41 8 L 35 15" />
            </svg>
            psst — the brochure opens itself ↓
          </p>
        </div>

        <QuickQuote />
      </div>

      <div className="hero__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path
            d="M0,60 C220,10 420,90 720,58 C1020,26 1220,80 1440,42 L1440,90 L0,90 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
