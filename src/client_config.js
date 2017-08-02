const config = require('config')

// Takes our server side config and generates an object with client side config options.
function makeClientConfig() {
  let clientConfig = {
    assets: {
        urlPrefix: config.get('assets.urlPrefix'),
    }
  }
  return clientConfig
}
export default makeClientConfig
