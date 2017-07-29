export default (models) => function (req, res) {
  const BLOG_ID = parseInt(req.params.id.split('-')[0], 10)

  const results = {
    blogId: BLOG_ID,
    currentPage: parseInt(req.params.page, 10)
  }
  const offset = 20 * (req.params.page - 1)

  const query1 = models.check_ins.findAll({
    where: {
      blog_id: BLOG_ID
    },
    attributes: ['visited', 'place_id', 'rating'],
    offset: offset,
    limit: 20,
    order: [['visited', 'DESC']],
    include: [{
      model: models.check_in_translations,
      where: { locale: 'en' }
    }, {
      model: models.places,
      attributes: ['name', 'id']
    }]
  }).then((queryResults) => {
    results.results = queryResults
  })

  const query2 = models.blogs.findOne({
    where: {
      id: BLOG_ID
    }
  }).then((queryResults) => {
    results.blog = queryResults
  })

  const query3 = models.check_ins.count({
    where: {
      blog_id: BLOG_ID
    }
  }).then((count) => {
    results.total = count
    results.pages = Math.ceil(count / 20)
  })

  Promise.all([query1, query2, query3]).then(() => {
    res.json(results)
  })
}
