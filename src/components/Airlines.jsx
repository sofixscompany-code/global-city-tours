import { Fragment, useState } from 'react'
import { airlines } from '../data/site.js'
import { Icon } from './Icon.jsx'

const FILTERS = [
  { value: 'all', label: 'All Airlines' },
  { value: 'domestic', label: 'Domestic' },
  { value: 'international', label: 'International' },
]

const GROUPS = [
  { type: 'domestic', label: 'DOMESTIC' },
  { type: 'international', label: 'INTERNATIONAL' },
]

export default function Airlines() {
  const [filter, setFilter] = useState('all')
  const visibleGroups = GROUPS.filter((group) => filter === 'all' || group.type === filter)

  return (
    <section className="section" id="airlines">
      <div className="container">
        <div className="section__head reveal">
          <span className="eyebrow">Our Network</span>
          <h2 className="section__title">Airline Partners</h2>
          <p className="section__lead">
            We are authorised ticketing partners for leading domestic and international carriers —
            compare fares across all of them in one call.
          </p>

          <div className="filter" role="tablist" aria-label="Filter airlines">
            {FILTERS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={filter === option.value}
                className={`filter__btn${filter === option.value ? ' is-active' : ''}`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {visibleGroups.map((group) => (
          <Fragment key={group.type}>
            <p className="group-title group-title--blue">
              <span className="bar" />
              {group.label}
            </p>
            <div className="grid grid--4 airlines">
              {airlines
                .filter((airline) => airline.type === group.type)
                .map((airline) => (
                  <div className="airline" key={airline.name} style={{ '--ac': airline.color }}>
                    <span className="airline__name">{airline.name}</span>
                    <span className="airline__tag">
                      {airline.type === 'domestic' ? 'Domestic' : 'International'}
                    </span>
                  </div>
                ))}
            </div>
          </Fragment>
        ))}

        <div className="airline-note reveal">
          <Icon name="tag" className="ico ico--28" />
          <div>
            <strong>Fare not listed? We still have it.</strong>
            <span>
              Our ticketing desk issues and re-issues tickets on virtually every carrier flying to
              and from Nepal. Call{' '}
              <a href="tel:+9779851450530">+977 9851450530</a>.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
