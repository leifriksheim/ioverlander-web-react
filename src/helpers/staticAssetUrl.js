import config from 'config'

const constructStaticAssetUrl = (path) => {
  return config.get('assets').urlPrefix + path
}

export default constructStaticAssetUrl

