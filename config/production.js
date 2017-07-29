let domain = "staging.ioverlander.com"
let baseUrl = "http://"+domain+":3000"

module.exports = {
  domain: domain,
  baseUrl: baseUrl,
  apiEndpoint: baseUrl+"/api",
  sessionSettings: {
    secure: true,
  },
}
