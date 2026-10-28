import { company } from '../data/site.js'

/** Enquiry forms hand off to WhatsApp — the way most Kathmandu agencies actually work. */

const FIELD_LABELS = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  service: 'Service',
  from: 'From',
  to: 'To',
  date: 'Travel Date',
  pax: 'Travellers',
  message: 'Message',
}

export function readForm(form) {
  const data = {}
  new FormData(form).forEach((value, key) => {
    data[key] = String(value).trim()
  })
  return data
}

export function validateForm(form) {
  const required = form.querySelectorAll('[required]')
  let firstInvalid = null

  required.forEach((field) => {
    const value = field.value.trim()
    const empty = !value
    const badEmail = field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
    const badPhone = field.type === 'tel' && value.replace(/\D/g, '').length < 7
    const invalid = empty || badEmail || badPhone

    field.classList.toggle('is-invalid', invalid)
    if (invalid && !firstInvalid) firstInvalid = field
  })

  if (firstInvalid) firstInvalid.focus()
  return !firstInvalid
}

export function buildMessage(data) {
  const lines = ['Hello Global City Tours and Travels,', 'I would like to make an enquiry.', '']

  Object.entries(FIELD_LABELS).forEach(([key, label]) => {
    if (data[key]) lines.push(`${label}: ${data[key]}`)
  })

  lines.push('', 'Sent from your website.')
  return lines.join('\n')
}

export function whatsAppLink(message) {
  return `https://wa.me/${company.phoneRaw[0]}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message) {
  window.open(whatsAppLink(message), '_blank', 'noopener')
}

/** One-liners for the booking buttons scattered across the site. */
export function bookOnWhatsApp(subject) {
  openWhatsApp(
    `Hello Global City Tours and Travels,\nI want to book: ${subject}\nPlease share the details and best price.`,
  )
}

export function askOnWhatsApp(subject) {
  openWhatsApp(
    `Hello Global City Tours and Travels,\nI am interested in: ${subject}\nPlease share fares, dates and inclusions.`,
  )
}

export function todayISO() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().split('T')[0]
}

/** Shared submit handler for both enquiry forms. */
export function submitEnquiry(event, { onSuccess }) {
  event.preventDefault()
  const form = event.currentTarget

  if (!validateForm(form)) {
    onSuccess({ ok: false, message: 'Please fill in the required fields correctly.' })
    return
  }

  const data = readForm(form)
  openWhatsApp(buildMessage(data))

  form.reset()
  const from = form.querySelector('[name="from"]')
  const pax = form.querySelector('[name="pax"]')
  if (from) from.value = 'Kathmandu'
  if (pax) pax.value = '1'

  onSuccess({
    ok: true,
    message: `Thanks ${data.name || ''}! Your enquiry is ready in WhatsApp.`,
  })
}
