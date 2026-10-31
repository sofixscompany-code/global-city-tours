/**
 * Single source of truth for everything the site talks about.
 * Keeping copy in one place makes it easy to edit without touching markup.
 */

export const company = {
  name: 'Global City Tours and Travels Pvt. Ltd.',
  shortName: 'Global City',
  tagline: 'Travel Beyond Boundaries.',
  address: 'Gokarneshwor-8, Attarkhel, Kathmandu',
  addressLines: ['Gokarneshwor-8, Attarkhel', 'Kathmandu, Nepal'],
  phones: ['+977 9851150530', '+977 9851450530'],
  phoneRaw: ['9779851150530', '9779851450530'],
  email: 'globalcitytraveltours@gmail.com',
  hours: 'Sunday – Friday : 9:00 AM – 6:00 PM',
  hoursShort: 'Sun – Fri : 9:00 AM – 6:00 PM',
  mapsUrl: 'https://maps.google.com/?q=Gokarneshwor-8+Attarkhel+Kathmandu',
  brochure: '/assets/brochure.pdf?v=2',
}

export const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#airlines', label: 'Airlines' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#packages', label: 'Packages' },
  { href: '#contact', label: 'Contact' },
]

export const services = [
  {
    icon: 'flight',
    title: 'Domestic & International Air Ticketing',
    text: 'Instant bookings across 6 domestic and 14 international carriers, with fare comparison, group discounts and 24×7 re-issue support.',
    link: { href: '#airlines', label: 'See airline partners' },
  },
  {
    icon: 'hotel',
    title: 'Hotel Booking',
    text: 'Budget guesthouses to 5-star stays, in Nepal and worldwide. Handpicked properties, confirmed vouchers and best-rate matching.',
    link: { href: '#quote', label: 'Request a hotel' },
  },
  {
    icon: 'cargo',
    title: 'Cargo and Courier Service',
    text: 'Air cargo and courier movement to and from Nepal with secure handling, door-to-door pickup and real-time shipment updates.',
    link: { href: '#contact', label: 'Send a parcel' },
  },
  {
    icon: 'luggage',
    title: 'Holiday Packages',
    text: 'Ready-to-go holidays for couples, families and groups — flights, hotels, sightseeing and meals bundled into one simple price.',
    link: { href: '#packages', label: 'View packages' },
  },
  {
    icon: 'map',
    title: 'All Types of Tour Packages',
    text: 'Adventure, pilgrimage, wildlife, honeymoon and corporate tours — designed around your dates, budget and travel style.',
    link: { href: '#packages', label: 'Plan a tour' },
  },
  {
    icon: 'public',
    title: 'Domestic & International Travel Service',
    text: 'Visa assistance, airport transfers, travel insurance, SIM cards and itinerary planning — a complete door-to-door travel service.',
    link: { href: '#quote', label: 'Start planning' },
  },
]

export const airlines = [
  { name: 'Tara Air', type: 'domestic', color: '#0d7a43' },
  { name: 'Buddha Air', type: 'domestic', color: '#0b3d91' },
  { name: 'Shree Airlines', type: 'domestic', color: '#cc3029' },
  { name: 'Yeti Airlines', type: 'domestic', color: '#1b7a3d' },
  { name: 'Sita Air', type: 'domestic', color: '#123c7a' },
  { name: 'Saurya Airlines', type: 'domestic', color: '#c62025' },
  { name: 'Qatar Airways', type: 'international', color: '#5c0632' },
  { name: 'Emirates', type: 'international', color: '#d71921' },
  { name: 'Nepal Airlines', type: 'international', color: '#c8102e' },
  { name: 'Thai Airways', type: 'international', color: '#4b0082' },
  { name: 'Himalaya Airlines', type: 'international', color: '#1a3d7c' },
  { name: 'flydubai', type: 'international', color: '#c24700' },
  { name: 'Malaysia Airlines', type: 'international', color: '#c8102e' },
  { name: 'Air India', type: 'international', color: '#e30613' },
  { name: 'Air Arabia', type: 'international', color: '#e4002b' },
  { name: 'Jazeera Airways', type: 'international', color: '#0067a8' },
  { name: 'IndiGo', type: 'international', color: '#1a1f71' },
  { name: 'Singapore Airlines', type: 'international', color: '#9a6a00' },
  { name: 'Kuwait Airways', type: 'international', color: '#005baa' },
  { name: 'Oman Air', type: 'international', color: '#8a6a24' },
]

export const destinations = [
  { name: 'Dubai', country: 'United Arab Emirates', emoji: '🏙️', image: '/images/dest-dubai.jpg', alt: 'The Burj Al Arab standing on the Dubai coastline' },
  { name: 'Thailand', country: 'Bangkok & Phuket', emoji: '🛥️', image: '/images/dest-thailand.jpg', alt: 'Long-tail boats on a beach in Krabi, Thailand' },
  { name: 'Korea', country: 'Seoul & Beyond', emoji: '🗼', image: '/images/dest-korea.jpg', alt: 'Seoul city lights at dusk with mountains behind' },
  { name: 'Bahrain', country: 'Manama', emoji: '🌴', image: '/images/dest-bahrain.jpg', alt: 'Bahrain World Trade Center and the Manama skyline at sunset' },
  { name: 'USA', country: 'New York & Beyond', emoji: '🗽', image: '/images/dest-usa.jpg', alt: 'The Statue of Liberty against a clear blue sky' },
  { name: 'UK', country: 'London', emoji: '🌉', image: '/images/dest-uk.jpg', alt: 'Aerial view of Tower Bridge and the River Thames in London' },
  { name: 'China', country: 'Shanghai & Beyond', emoji: '🏯', image: '/images/dest-china.jpg', alt: 'The Shanghai Pudong skyline reflected in the Huangpu River' },
  { name: 'India', country: 'Agra, Delhi & More', emoji: '🕌', image: '/images/dest-india.jpg', alt: 'The Taj Mahal and its reflecting pool in Agra' },
  { name: 'Japan', country: 'Tokyo & Kyoto', emoji: '⛩️', image: '/images/dest-japan.jpg', alt: 'A pagoda on a traditional street in Kyoto, Japan' },
  { name: 'Qatar', country: 'Doha', emoji: '🌃', image: '/images/dest-qatar.jpg', alt: 'The Doha skyline seen across the bay in Qatar' },
  { name: 'Malaysia', country: 'Kuala Lumpur', emoji: '🌆', image: '/images/dest-malaysia.jpg', alt: 'The Petronas Twin Towers in Kuala Lumpur' },
  { name: 'Singapore', country: 'Garden City', emoji: '🏝️', image: '/images/dest-singapore.jpg', alt: 'Marina Bay Sands and the Singapore skyline' },
]

/** Photography used outside the destination grid. */
export const imagery = {
  aboutMain: '/images/about-nepal-stupa.jpg',
  aboutSide: '/images/about-airplane-wing.jpg',
  nepalBanner: '/images/nepal-himalaya-sunset.jpg',
}

export const packages = [
  {
    title: 'USA Discovery',
    badge: 'International',
    image: '/images/dest-usa.jpg',
    alt: 'The Statue of Liberty against a clear blue sky',
    when: 'Flexible dates',
    who: 'Family & Group',
    featured: false,
    highlights: [
      'International air ticketing from Kathmandu',
      'Hotel stays with daily breakfast',
      'City tours & airport transfers',
      'Visa documentation support',
    ],
  },
  {
    title: 'Dubai Escapade',
    badge: 'Most Booked',
    image: '/images/pkg-dubai-downtown.jpg',
    alt: 'Downtown Dubai with the Burj Khalifa at the centre',
    when: 'Flexible dates',
    who: 'Couples & Family',
    featured: true,
    highlights: [
      'flydubai / Air Arabia / Emirates fares',
      'Desert safari & Dhow cruise',
      'Burj Khalifa & city orientation tour',
      '4★ hotel with breakfast & transfers',
    ],
  },
  {
    title: 'Southeast Asia Triangle',
    badge: 'International',
    image: '/images/dest-thailand.jpg',
    alt: 'Long-tail boats on a beach in Krabi, Thailand',
    when: 'Flexible dates',
    who: 'Group Tour',
    featured: false,
    highlights: [
      'Thailand · Malaysia · Singapore combo',
      'Inter-country flights & transfers',
      'Sightseeing with English-speaking guide',
      '3★–5★ hotel options available',
    ],
  },
  {
    title: 'Pokhara & Sarangkot',
    badge: 'Nepal',
    image: '/images/pkg-pokhara-phewa.jpg',
    alt: 'Wooden boats moored on Phewa Lake in Pokhara',
    when: '3N / 4D',
    who: 'Family',
    featured: false,
    highlights: [
      'Kathmandu–Pokhara air ticketing',
      'Sunrise at Sarangkot, Phewa Lake boating',
      "Devi's Fall, Gupteshwor & World Peace Pagoda",
      'Hotel with breakfast included',
    ],
  },
  {
    title: 'Chitwan Wildlife Safari',
    badge: 'Nepal',
    image: '/images/pkg-chitwan-rhino.jpg',
    alt: 'A one-horned rhinoceros grazing in Chitwan National Park',
    when: '2N / 3D',
    who: 'Family & Group',
    featured: false,
    highlights: [
      'Jungle safari & canoe ride',
      'Tharu cultural program',
      'Bird watching with naturalist',
      'Resort stay with full board',
    ],
  },
  {
    title: 'Muktinath & Mustang Yatra',
    badge: 'Nepal',
    image: '/images/pkg-muktinath-flags.jpg',
    alt: 'Tibetan prayer flags fluttering in the mountains of Mustang',
    when: '4N / 5D',
    who: 'Pilgrimage',
    featured: false,
    highlights: [
      'Kathmandu–Pokhara–Jomsom flights',
      'Muktinath Temple darshan',
      'Marpha & Kagbeni heritage visit',
      'All transfers & accommodation included',
    ],
  },
]

export const whyUs = [
  { icon: 'tag', title: 'Competitive Fares', text: 'Negotiated rates with 20+ carriers, passed straight to you.' },
  { icon: 'clock', title: 'Fast Processing', text: 'Tickets, vouchers and confirmations delivered in minutes.' },
  { icon: 'headset', title: 'Always Reachable', text: 'Phone, WhatsApp or walk-in — someone answers, every time.' },
  { icon: 'shield', title: 'Trusted & Transparent', text: 'Clear breakdowns, official receipts and no hidden mark-ups.' },
]

export const testimonials = [
  {
    quote:
      'Booked Kathmandu–Pokhara tickets the night before travel. Confirmed within ten minutes and the fare was lower than what I found online. Genuinely helpful people.',
    name: 'Ramesh B.',
    trip: 'Kathmandu → Pokhara',
    initials: 'RB',
  },
  {
    quote:
      "Our whole family's Dubai trip — flights, hotel, desert safari and transfers — was arranged by one team. Everything ran exactly as the itinerary promised.",
    name: 'Sunita G.',
    trip: 'Family trip to Dubai',
    initials: 'SG',
  },
  {
    quote:
      'I send parcels to my son in Qatar regularly. Their cargo desk is fast, the rates are fair and I always get an update when the shipment moves.',
    name: 'Krishna T.',
    trip: 'Cargo & courier service',
    initials: 'KT',
  },
  {
    quote:
      'They compared five airlines for our group booking and saved us a noticeable amount. The visa guidance for Singapore was a big bonus too.',
    name: 'Anil M.',
    trip: 'Group tour to Singapore',
    initials: 'AM',
  },
]

export const faqs = [
  {
    q: 'How do I book a flight ticket with Global City?',
    a: 'Call or WhatsApp us with your route and travel date, visit our office at Gokarneshwor-8, Attarkhel, or send the enquiry form on this website. We compare all partner airlines, share the best options and issue the ticket once you confirm.',
  },
  {
    q: 'Can you arrange both domestic and international flights?',
    a: 'Yes. We ticket on 6 domestic carriers including Buddha Air, Yeti Airlines, Shree Airlines, Tara Air, Sita Air and Saurya Airlines, plus 14 international airlines such as Qatar Airways, Emirates, Thai Airways, flydubai, Malaysia Airlines, Air India, Air Arabia, IndiGo and Singapore Airlines.',
  },
  {
    q: 'Do you provide hotel booking and full holiday packages?',
    a: 'We do. Hotel-only bookings, complete holiday packages, and customised tour itineraries inside Nepal and abroad — including flights, hotels, sightseeing, transfers and meals as required.',
  },
  {
    q: "How does your cargo and courier service work?",
    a: 'We handle air cargo and courier consignments to and from Nepal. Share the weight, dimensions and destination and our cargo desk will quote you, arrange door-step pickup and keep you updated until delivery.',
  },
  {
    q: 'Do you help with visa documentation?',
    a: 'Yes — we guide you through document checklists and application requirements for popular destinations, and we can recommend trusted visa processing partners where needed.',
  },
  {
    q: 'Where is your office and what are your hours?',
    a: 'Our office is at Gokarneshwor-8, Attarkhel, Kathmandu. We are open Sunday to Friday, 9:00 AM to 6:00 PM, and our phone lines remain available for travel emergencies.',
  },
]

export const enquiryServices = [
  'Domestic Air Ticketing',
  'International Air Ticketing',
  'Hotel Booking',
  'Cargo & Courier Service',
  'Holiday Package',
  'Tour Package',
  'Other Travel Service',
]

export const stats = [
  { value: 20, suffix: '+', label: 'Airline Partners' },
  { value: 12, suffix: '+', label: 'Destinations' },
  { value: 6, suffix: '', label: 'Core Services' },
]
