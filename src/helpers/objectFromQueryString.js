export default (qs) => {
  let parts = qs.split(/\&\?/g)
  let query = {}

  parts.forEach((param) => {
    let split = param.split('=')
    query[split[0]] = query[split[1]]
  })
}
