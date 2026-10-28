import { company } from '../data/site.js'
import { Icon } from './Icon.jsx'

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__group">
          <a href={`tel:+${company.phoneRaw[0]}`} className="topbar__item">
            <Icon name="phone" />
            {company.phones[0]}
          </a>
          <a href={`tel:+${company.phoneRaw[1]}`} className="topbar__item topbar__item--hide-sm">
            <Icon name="phone" />
            {company.phones[1]}
          </a>
          <a href={`mailto:${company.email}`} className="topbar__item topbar__item--hide-md">
            <Icon name="mail" />
            {company.email}
          </a>
        </div>
        <div className="topbar__group topbar__group--end">
          <span className="topbar__item topbar__item--pin">
            <Icon name="pin" />
            {company.address}
          </span>
          <span className="topbar__hours">
            <Icon name="clock" />
            {company.hoursShort}
          </span>
        </div>
      </div>
    </div>
  )
}
