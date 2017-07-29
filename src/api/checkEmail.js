export default (models) => function (req, res) {
  models.users.count({
    where: {
      email: req.body.email
    }
  }).then((count) => {
    res.json({ exists: !!count })
  })
}
