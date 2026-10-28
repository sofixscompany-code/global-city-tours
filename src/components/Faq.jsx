import { useRef, useState } from 'react'
import { faqs } from '../data/site.js'
import { Icon } from './Icon.jsx'

export default function Faq() {
  const [openAt, setOpenAt] = useState(0)
  const listRef = useRef(null)

  // Only one answer stays open at a time.
  const handleToggle = (event, position) => {
    if (!event.currentTarget.open) return
    setOpenAt(position)
    listRef.current?.querySelectorAll('details').forEach((item, index) => {
      if (index !== position) item.open = false
    })
  }

  return (
    <section className="section section--tint" id="faq">
      <div className="container faq">
        <div className="faq__head reveal">
          <span className="eyebrow">Questions</span>
          <h2 className="section__title">Frequently asked questions</h2>
          <p className="section__lead">
            Everything travellers usually ask us before booking. Still unsure? Call the office — we
            are happy to talk it through.
          </p>
          <a href="#contact" className="btn btn--primary">
            Ask a Question
            <Icon name="arrow" />
          </a>
        </div>

        <div className="faq__list reveal" ref={listRef}>
          {faqs.map((item, position) => (
            <details
              className="faq__item"
              key={item.q}
              open={position === openAt}
              onToggle={(event) => handleToggle(event, position)}
            >
              <summary>
                {item.q}
                <span className="faq__sign" aria-hidden="true" />
              </summary>
              <div className="faq__body">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
