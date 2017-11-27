// Public URL
let domain = "staging.ioverlander.com"
let baseUrl = "http://"+domain

module.exports = {
  domain: domain,
  baseUrl: baseUrl,
  apiEndpoint: baseUrl+"/api",
  assets: {
    compileAssets: true,
    fileHash: process.env.GIT_SHA1,
  },
  sessionSettings: {
    secure: true,
  },
}
