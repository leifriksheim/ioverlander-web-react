export default (models) => function (req, res) {
  models.place_categories.findAll().then(types => {
    res.json(types.sort((a, b) => {
      if (a.id < b.id) {
        return -1
      }
      if (a.id > b.id) {
        return 1
      }
      return 0
    }))
  })
}
