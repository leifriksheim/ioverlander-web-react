export default (models) => function (req, res) {
  const countries = []
  const getPlaces = models.places.findAll({
    where: {
      blog_id: req.params.id
    },
    attributes: ['id']
  })

  const getUser = models.users.findOne({
    where: {
      blog_id: req.params.id
    }
  })

  const getBlogDetails = models.blogs.findOne({
    where: { id: req.params.id.split('-')[0] },
    include: [{
      model: models.check_ins,
      attributes: ['location_id'],
      include: [{
        model: models.locations,
        attributes: ['latitude', 'longitude']
      }, {
        model: models.places,
        attributes: ['name'],
        include: [{
          model: models.countries,
          attributes: ['name']
        }]
      }]
    }, {
      model: models.vehicles,
      attributes: ['name', 'description']
    }],
    order: [
      [models.check_ins, 'visited', 'DESC']
    ]
  })

  Promise.all([getPlaces, getBlogDetails, getUser]).then((queries) => {
    const blog = queries[1]
    const places = queries[0]
    const user = queries[2]

    blog.check_ins.forEach((check_in) => {
      if (countries.indexOf(check_in.place.country.name) === -1) {
        countries.push(check_in.place.country.name)
      }
    })

    blog.dataValues.countries = countries
    blog.dataValues.placeCount = places.length
    blog.dataValues.userName = blog.name || user.name || blog.url || user.email.split('@')[0]
    res.json(blog)
  })
}
