import getSlug from 'speakingurl'
import moment from 'moment'
import React from 'react'
import NavLink from '../NavLink/NavLink'
import constructAssetUrl from '../../helpers/staticAssetUrl'

export default (props) => {
  const location = props.location
  let description = null

  description = location.place.place_translations[0].description

  const showElipsis = description.length > (props.truncate || 250)

  if (showElipsis) {
    description = description.substr(0, (props.truncate || 250))
  }

  const latitudeStr = location.latitude.toString()
  const longitudeStr = location.longitude.toString()

  const latitude = latitudeStr.indexOf('.') > -1 ? latitudeStr.split('.')[0] + '.' + latitudeStr.split('.')[1].substr(0, 6) : latitudeStr
  const longitude = longitudeStr.indexOf('.') > -1 ? longitudeStr.toString().split('.')[0] + '.' + longitudeStr.toString().split('.')[1].substr(0, 6) : longitudeStr
  const amenities = Object.keys(location.place.properties_blob).filter((key) => {
    return location.place.properties_blob[key] && location.place.properties_blob[key].indexOf('no') === -1 && location.place.properties_blob[key].indexOf('Unknown') === -1
  }).slice(2).map((amenity) => {
    return amenity.split('_').map((str) => str.substr(0, 1).toUpperCase() + str.substr(1)).join(' ')
  })

  if (!location.place.place_category) {
    return null
  }

  return <div>
    <header className='selected-location-header'>
      <img src=constructAssetUrl('icons/'+location.place.place_category.icon+'.png') />
      <h3 className='h5'>{location.place.name}</h3>
    </header>
    <span className='selected-location-info'>
      {location.place.properties_blob.open_for_business.includes('yes') && <dl>
        <dt>Type:</dt>
        <dd>{location.place.place_category.name}</dd>
        <dt>Last verified:</dt>
        <dd>{moment(location.place.date_verified.split(' ')[0], 'YYYY-MM-DD').fromNow()}</dd>
        <dt>GPS:</dt>
        <dd>{latitude}, {longitude}</dd>
      </dl>}
      {!location.place.properties_blob.open_for_business.includes('yes') && <strong style={{color: 'red', fontSize: 18, display: 'block', 'text-align': 'center'}}>THIS PLACE IS CLOSED</strong>}
    </span>
    <p dangerouslySetInnerHTML={{__html: description.replace(/\n/g, '<br>') + (showElipsis ? '...' : '')}} />

    <div className='amenity-container'>
      {amenities.map((amenity, i) => <span key={i} className='amenity-badge'>{amenity}</span>)}
    </div>

    {!props.useNavLink && <a className='navlink' href={`/places/${getSlug([location.place.id, location.place.name].join(' '))}`}>More Details...</a>}
    {props.useNavLink && <NavLink href={`/places/${getSlug([location.place.id, location.place.name].join(' '))}`}>More Details...</NavLink>}
  </div>
}
