export default (models) => function (req, res) {
  const results = {
    currentPage: parseInt(req.params.page, 10),
    currentCountry: req.params.country,
    filter: {
      excludeTypes: (req.query.excludedTypes || '').split(','),
      amenities: (req.query.amenities || '').split(','),
      lastVisited: req.query.lastVisited
    }
  }
  // TODO: Why not use a join here?
  models.countries.findOne({
    where: {
      id: req.params.country
    }
  }).then((data) => {
    results.countryName = data.name

    const exclude_place_types = (req.query.excludedTypes || '').split(',').filter(v => v)
    const require_amenities = (req.query.amenities || '').split(',').filter(v => v)
    const where_clause = {
      place_country_id: req.params.country,
      open_for_business: true
    }


    if (exclude_place_types.length) {
      where_clause.place_category_id = {
        $notIn: exclude_place_types
      }
    }

    require_amenities.forEach((col) => {
      where_clause[col] = true
    })

    const getCount = models.place_properties.count({
      where: where_clause
    }).then((count) => {
      results.total = count
      results.pages = Math.ceil(count / 20)
    })

    return Promise.all([getCount, models.place_properties.findAll({
      where: where_clause,
      offset: (req.params.page - 1) * 20,
      limit: 20,
      attributes: ['place_id']
    })])
  }).then((searchResults) => {
    const place_ids = searchResults[1].map((result) => result.place_id)

    let placesWhereClause = {
      id: {
        $in: place_ids
      }
    };

    const last_verified = (req.query.lastVisited||0)*30.5*24*60*60*1000 // 30.5 days 24hrs 60min 60secs 1000mss
    if (last_verified) {
        placesWhereClause.date_verified = {
          $gte: new Date(new Date() - last_verified)
        }
    }
    return models.locations.findAll({
      include: [{
        model: models.places,
        where: placesWhereClause,
        include: [models.place_translations, models.place_categories]
      }]
    })
  }).then((places) => {
    places.forEach((row) => {
      row = row.dataValues
      Object.keys(row.place.dataValues).forEach((key) => {
        if (row.place.dataValues[key] instanceof Buffer) {
          row.place.dataValues[key] = JSON.parse(row.place.dataValues[key].toString())
        }
      })
    })
    results.results = places

    return models.place_categories.findAll()
  }).then((types) => {
    results.placeTypes = types

    res.json(results)
  })
}
