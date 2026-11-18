import { services } from '../data/site.js'
import { askOnWhatsApp } from '../lib/enquiry.js'
import { Icon } from './Icon.jsx'

export default function Services() {
  return (
    <section className="section section--tint" id="services">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">What We Do</span>
          <h2 className="section__title">Our Services</h2>
          <p className="section__lead">
            Six core services, one trusted team — everything you need to travel, stay and ship.
          </p>
        </div>

        <div className="grid grid--3">
          {services.map((service, position) => (
            <article
              className="service reveal"
              key={service.title}
              data-num={String(position + 1).padStart(2, '0')}
            >
              <div className="service__icon">
                <Icon name={service.icon} className="ico ico--28" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service__foot">
                <a href={service.link.href} className="link-arrow">
                  {service.link.label}
                  <Icon name="arrow" />
                </a>
                <button
                  type="button"
                  className="link-arrow service__wa"
                  onClick={() => askOnWhatsApp(service.title)}
                >
                  <Icon name="whatsapp" />
                  Ask on WhatsApp
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
