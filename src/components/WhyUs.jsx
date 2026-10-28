import { company, whyUs } from '../data/site.js'
import { Icon } from './Icon.jsx'

export default function WhyUs() {
  return (
    <section className="section section--tint" id="why">
      <div className="container why">
        <div>
          <div className="section__head section__head--left reveal">
            <span className="eyebrow">Why Global City</span>
            <h2 className="section__title">The reasons travellers keep coming back</h2>
            <p className="section__lead">
              Twenty-plus airline partners, one honest counter — and a team that picks up the phone.
            </p>
          </div>

          <div className="why__grid">
            {whyUs.map((item) => (
              <article className="why__item reveal" key={item.title}>
                <div className="why__icon">
                  <Icon name={item.icon} className="ico ico--24" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="panelcard reveal">
          <h3>Talk to a travel expert</h3>
          <p>
            No bots, no call queues — message us and a real person from our Kathmandu office replies.
          </p>

          <div className="panelcard__contacts">
            <a href={`tel:+${company.phoneRaw[0]}`}>
              <Icon name="phone" />
              <span>
                <small>Call us</small>
                {company.phones[0]}
              </span>
            </a>
            <a
              href={`https://wa.me/${company.phoneRaw[1]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              <span>
                <small>WhatsApp</small>
                {company.phones[1]}
              </span>
            </a>
            <a href={`mailto:${company.email}`}>
              <Icon name="mail" />
              <span>
                <small>Email</small>
                {company.email}
              </span>
            </a>
            <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" />
              <span>
                <small>Office</small>
                {company.address}
              </span>
            </a>
          </div>

          <a href="#contact" className="btn btn--green btn--block btn--lg">
            Send Your Enquiry
            <Icon name="arrow" />
          </a>
        </aside>
      </div>
    </section>
  )
}
