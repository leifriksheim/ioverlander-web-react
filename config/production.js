let domain = "staging.ioverlander.com"
let baseUrl = "http://"+domain+":3000"

module.exports = {
  domain: domain,
  baseUrl: baseUrl,
  apiEndpoint: baseUrl+"/api",
  assets: {
    fileHash: process.env.GIT_SHA1,
  },
  sessionSettings: {
    secure: true,
  },
}
