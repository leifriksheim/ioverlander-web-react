export default (models) => function (req, res, next) {
  const places = models.locations.findAll({
    where: {
      'latitude': {
        $gte: req.params.south,
        $lte: req.params.north
      },
      longitude: {
        $gte: req.params.west,
        $lte: req.params.east
      }
    },
    attributes: {
      exclude: ['address', 'state_code', 'country_code', 'country_id', 'gps', 'gpslat', 'gpslng', 'gpstime', 'horizontal_accuracy', 'vertical_accuracy']
    },
    include: [
      {
        model: models.places,
        attributes: {
          'exclude': ['blog_id', 'duplicate_of_id', 'date_verified', 'import_properties_blob']
        },
        include: [{
          model: models.place_categories,
          attributes: ['identifier', 'name', 'icon']
        }, {
          model: models.check_ins,
          attributes: ['id'],
          include: [{
            model: models.check_in_translations,
            attributes: ['comment'],
            where: {
              locale: 'en'
            }
          }]
        }, {
          model: models.place_translations,
          where: {
            locale: 'en'
          }
        }],
        where: {
          duplicate_of_id: null
        },
        attributes: {
          exclude: ['updated_at', 'cleaned', 'guid', 'rating', 'created_at', 'country_id', 'altitude', 'country_code', 'city']
        }
      }
    ],
    subQuery: false
  })

  places.then((data) => {
    data.filter((place) => place.dataValues).forEach((row) => {
      if (row.dataValues.place && row.dataValues.place.dataValues) {
        row = row.dataValues
        Object.keys(row.place.dataValues).forEach((key) => {
          if (row.place.dataValues[key] instanceof Buffer) {
            row.place.dataValues[key] = JSON.parse(row.place.dataValues[key].toString())
          }
        })
      }
    })
    res.json(data.filter((place) => place.dataValues.place.dataValues))
    return null
  }).catch((e) => { console.log(e.stack); res.status(500); res.end() })
}
