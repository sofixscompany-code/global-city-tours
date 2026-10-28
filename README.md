# Global City Tours and Travels Pvt. Ltd. — Website

Marketing + booking site for a travel agency in Kathmandu, built with **Vite + React**.
All copy, airline partners, destinations and packages are taken from the company's flyers.

## Getting started

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
```

## Production build

```bash
npm run build    # outputs static files to dist/
npm run preview  # serve the production build at http://localhost:4173
```

## Project structure

```
public/
  assets/logo.svg        Brand mark
  assets/brochure.pdf    3-page company brochure (auto-opens on first visit)
  images/                Locally hosted photography (Unsplash license) + WhatsApp QR
src/
  App.jsx                Page composition
  main.jsx               Entry point
  styles.css             Full stylesheet (incl. the "hand-crafted" detail layer)
  components/            One component per UI section
    Header, Hero, TicketStrip, About, Services, Airlines,
    Destinations, NepalBanner, Packages, WhyUs, Testimonials,
    Faq, CtaBand, Contact, Footer, Floats, TopBar …
    Brochure.jsx         Auto-opens the brochure PDF (+ fallback notice)
    Icon.jsx             Inline SVG sprite + Icon/BrandMark helpers
    Toast.jsx            Toast context for form feedback
    Counter.jsx          Scroll-triggered count-up numbers
  data/site.js           Single source of truth for all site copy
  hooks/
    useReveal.js         Staggered fade-in on scroll
    useScrollSpy.js      Active nav link highlighting
  lib/
    enquiry.js           Form validation + WhatsApp hand-off + booking helpers
    images.js            Image fallback helpers
tools/
  brochure.html          Print-rolled source for assets/brochure.pdf
  qa.html                Responsive QA harness (13 device widths)
```

## Features

- **Brochure PDF auto-opens** on a visitor's first load of the session
  (`src/components/Brochure.jsx`). Browsers usually block popups that aren't tied to a
  click, so a small "Open PDF" notice appears if that happens. The PDF is also linked
  from the header, a floating button and the footer.
- **Every booking path goes to WhatsApp** with a pre-filled message:
  - Quick Enquiry + full Contact forms → full enquiry details
  - "Book on WhatsApp" on every package card (package name, duration, audience)
  - "Book Now" on the ticket strip (sector + routes)
  - WhatsApp badge on every destination card ("USA trip from Kathmandu" etc.)
  - Nepal banner, CTA band, floats, Why-Us panel
- **Hand-crafted design layer** (`src/styles.css`, bottom section): Fraunces display
  headings, Caveat handwriting notes, squiggly underlines, scrapbook tape and rubber
  stamp on the About photos, tilted destination cards, numbered service cards,
  postcard-style contact card and a dotted paper background.
- **Responsive at 13 device widths** (320 → 1920 px) — verified with `tools/qa.html`.

## Notes

- **Forms have no backend.** Enquiries are composed into a pre-filled WhatsApp message
  to `+977 9851150530` and opened in a new tab.
- **Images are served locally** from `public/images/` so the site works offline and
  never hotlinks. All photos are from Unsplash (free license) and were visually
  verified to match their labels. The WhatsApp QR encodes `wa.me/9779851150530`.
- **Regenerating the brochure:** edit `tools/brochure.html`, then run Edge headless:
  ```
  msedge --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="public\assets\brochure.pdf" "tools/brochure.html"
  ```
- **Icons** are one inline SVG sprite (`src/components/Icon.jsx`) — no icon font.
- Contact details, addresses and phone numbers live in `src/data/site.js`.
