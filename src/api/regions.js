export default (models) => function (req, res, next) {
  models.regions.findAll({
    include: [{
      model: models.countries,
      attributes: ['name', 'places_count', 'id', 'latitude', 'longitude']
    }],
    attributes: ['name']
  }).then(values => {
    res.json(values)
  }).catch(e => console.log(e.stack))
}
