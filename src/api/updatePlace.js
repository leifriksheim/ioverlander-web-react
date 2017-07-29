import moment from 'moment'

export default (models) => function (req, res) {
  if (!req.user) {
    res.status(403)
    res.json({
      loggedIn: false
    })
    return
  }

  const placeProperties = Object.keys(req.body).filter((key) => {
    return key.includes('place')
  })

  if (req.body.placeId === 'create') {
    const properties_blob = {
      open_for_business: 'open_yes'
    }
    let PLACE_ID = null
    let LOCATION_ID = null

    Object.keys(req.body).filter((key) => {
      return placeProperties.indexOf(key) < 0
    }).forEach((key) => {
      properties_blob[key] = req.body[key]
    })

    const new_place = models.places.build({
      name: req.body.placeName,
      country_id: req.body.placeCountry,
      location_id: null,
      place_category_id: req.body.placeCategory,
      duplicate_of_id: null,
      blog_id: req.user.blog_id,
      date_verified: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      properties_blob: JSON.stringify(properties_blob),
      import_properties_blob: null,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    })

    const new_place_translation = models.place_translations.build({
      place_id: null,
      locale: 'en',
      created_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      description: req.body.placeDescription
    })

    const new_check_in = models.check_ins.build({
      blog_id: req.user.blog_id,
      place_id: null,
      visited: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      location_id: null,
      created_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    })

    const new_check_in_translation = models.check_in_translations.build({
      check_in_id: null,
      locale: 'en',
      created_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      comment: req.body.placeDescription
    })

    const new_location = models.locations.build({
      latitude: req.body.placeLatitude,
      longitude: req.body.placeLongitude,
      altitude: req.body.placeAltitude,
      country_id: req.body.placeCountry
    })

    // Do all of the things, phew
    new_location.save().then((location) => {
      LOCATION_ID = location.id
      new_place.location_id = LOCATION_ID
      return new_place.save()
    }).then((place) => {
      PLACE_ID = place.id
      new_place_translation.place_id = PLACE_ID
      return new_place_translation.save()
    }).then((translation) => {
      new_check_in.place_id = PLACE_ID
      new_check_in.location_id = LOCATION_ID
      return new_check_in.save()
    }).then((check_in) => {
      new_check_in_translation.check_in_id = check_in.id
      return new_check_in_translation.save()
    }).then((translation) => {
      res.json({ saved: true, id: PLACE_ID })
    }).catch((e) => {
      res.status(500)
      res.json({ saved: false })
    })
  }

  const amenities = Object.keys(req.body).filter((key) => {
    return placeProperties.indexOf(key) < 0
  })

  models.places.findOne({
    where: {
      id: req.body.placeId
    },
    include: [
      models.locations,
      {
        model: models.place_translations,
        where: {
          locale: 'en'
        }
      }
    ]
  }).then((place) => {
    const location = place.location
    const translation = place.place_translations[0]
    const properties = JSON.parse(place.properties_blob)

    properties['open_for_business'] = req.body.placeOpen === 'Yes' ? 'open_yes' : 'open_no'

    amenities.forEach((key) => {
      properties[key] = req.body[key]
    })

    const placeUpdate = place.update({
      place_category_id: req.body.placeCategory,
      name: req.body.placeName,
      country_id: req.body.placeCountry,
      properties_blob: JSON.stringify(properties)
    })

    const locationUpdate = location.update({
      latitude: req.body.placeLatitude,
      longitude: req.body.placeLongitude,
      altitude: req.body.placeAltitude
    })

    const translationUpdate = translation.update({
      description: req.body.placeDescription
    })

    Promise.all([placeUpdate, locationUpdate, translationUpdate]).then(() => {
      res.json({ success: true })
    }).catch((e) => {
      res.json({ success: false, err: e })
    })
  })
}
