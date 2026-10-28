import { useState } from 'react'
import { company, enquiryServices } from '../data/site.js'
import { Icon } from './Icon.jsx'
import { submitEnquiry, todayISO } from '../lib/enquiry.js'
import { useToast } from './Toast.jsx'

const MAP_SRC =
  'https://www.google.com/maps?q=Gokarneshwor-8,+Attarkhel,+Kathmandu,+Nepal&output=embed'

export default function Contact() {
  const toast = useToast()
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    submitEnquiry(event, {
      onSuccess: ({ ok, message }) => {
        setStatus(ok ? 'Opening WhatsApp with your enquiry…' : message)
        toast(message)
      },
    })
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section__title">Send Us an Enquiry</h2>
          <p className="section__lead">
            Fill the form and it lands straight in our WhatsApp — usually answered within a few
            minutes during office hours.
          </p>
        </div>

        <div className="contact">
          <form className="cform reveal" noValidate onSubmit={handleSubmit}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="c-name">Full Name *</label>
                <input id="c-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="field">
                <label htmlFor="c-phone">Phone / WhatsApp *</label>
                <input id="c-phone" name="phone" type="tel" placeholder="98XXXXXXXX" required />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="c-service">Service Needed *</label>
                <select id="c-service" name="service" defaultValue="" required>
                  <option value="" disabled>
                    Select a service
                  </option>
                  {enquiryServices.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="c-from">From</label>
                <input id="c-from" name="from" type="text" defaultValue="Kathmandu" />
              </div>
              <div className="field">
                <label htmlFor="c-to">To</label>
                <input id="c-to" name="to" type="text" placeholder="Destination" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="c-date">Travel Date</label>
                <input id="c-date" name="date" type="date" min={todayISO()} />
              </div>
              <div className="field">
                <label htmlFor="c-pax">Travellers</label>
                <input id="c-pax" name="pax" type="number" min="1" max="99" defaultValue="1" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                name="message"
                placeholder="Tell us anything special — group size, hotel preference, baggage, cargo details…"
              />
            </div>

            <p className="cform__status" role="status">
              {status}
            </p>

            <button type="submit" className="btn btn--green btn--lg">
              Send via WhatsApp
              <Icon name="arrow" />
            </button>
          </form>

          <div className="cinfo reveal">
            <div className="cinfo__card">
              <h3>Reach the office</h3>
              <p>Walk in, call, or message us — whichever is easiest for you.</p>

              <ul className="cinfo__list">
                <li>
                  <Icon name="pin" />
                  <div>
                    <small>Address</small>
                    <span>{company.addressLines.join(', ')}</span>
                  </div>
                </li>
                <li>
                  <Icon name="phone" />
                  <div>
                    <small>Phone</small>
                    <a href={`tel:+${company.phoneRaw[0]}`}>{company.phones[0]}</a>
                    <a href={`tel:+${company.phoneRaw[1]}`}>{company.phones[1]}</a>
                  </div>
                </li>
                <li>
                  <Icon name="mail" />
                  <div>
                    <small>Email</small>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </div>
                </li>
                <li>
                  <Icon name="clock" />
                  <div>
                    <small>Office Hours</small>
                    <span>{company.hours}</span>
                  </div>
                </li>
              </ul>

              <a
                href={`https://wa.me/${company.phoneRaw[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--green btn--block"
              >
                <Icon name="whatsapp" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="cinfo__map">
              <iframe
                src={MAP_SRC}
                title="Global City Tours and Travels office location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
