import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/site.js'
import { Icon } from './Icon.jsx'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)
  const touchX = useRef(null)
  const total = testimonials.length

  const goTo = (next) => setIndex((next + total) % total)

  useEffect(() => {
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % total), 6500)
    return () => window.clearInterval(timer.current)
  }, [total])

  const restart = (next) => {
    window.clearInterval(timer.current)
    goTo(next)
    timer.current = window.setInterval(() => setIndex((i) => (i + 1) % total), 6500)
  }

  const onTouchEnd = (event) => {
    if (touchX.current === null) return
    const delta = event.changedTouches[0].clientX - touchX.current
    if (Math.abs(delta) > 45) restart(index + (delta < 0 ? 1 : -1))
    touchX.current = null
  }

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Traveller Stories</span>
          <h2 className="section__title">What Our Customers Say</h2>
          <p className="section__lead">
            Real feedback from the people we book for — flights, holidays and cargo alike.
          </p>
        </div>

        <div className="tst reveal">
          <div
            className="tst__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX
            }}
            onTouchEnd={onTouchEnd}
          >
            {testimonials.map((item, position) => (
              <figure
                className="tst__item"
                key={item.name}
                aria-hidden={position !== index}
              >
                <blockquote>
                  <Icon name="quote" className="ico ico--28 tst__quote" />
                  {item.quote}
                </blockquote>
                <figcaption>
                  <span className="tst__avatar" aria-hidden="true">
                    {item.initials}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <em>{item.trip}</em>
                  </span>
                  <span className="tst__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="tst__nav">
            <button
              type="button"
              className="tst__btn"
              onClick={() => restart(index - 1)}
              aria-label="Previous testimonial"
            >
              <Icon name="arrow" />
            </button>

            <div className="tst__dots">
              {testimonials.map((item, position) => (
                <button
                  type="button"
                  key={item.name}
                  className={`tst__dot${position === index ? ' is-active' : ''}`}
                  aria-label={`Go to testimonial ${position + 1}`}
                  aria-current={position === index}
                  onClick={() => restart(position)}
                />
              ))}
            </div>

            <button
              type="button"
              className="tst__btn tst__btn--next"
              onClick={() => restart(index + 1)}
              aria-label="Next testimonial"
            >
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
