export default (models) => function (req, res) {
  const countries = {}
  models.countries.findAll().then((rows) => {
    rows.forEach((row) => {
      countries[row.name] = {
        count: row.places_count || 0,
        latitude: row.latitude,
        longitude: row.longitude
      }
    })
    res.json(countries)
  })
}
