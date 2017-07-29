import Client from 's3-uploader'

const createClient = (imageId) => {
  while (imageId.toString().length < 9) {
    imageId = '0' + imageId.toString()
  }

  const client = new Client('ioverlander.com', {
    aws: {
      accessKeyId: 'SECRET',
      secretAccessKey: 'SECRET',
      acl: 'public-read',
      region: 'us-west-2'
    },
    cleanup: {
      original: true,
      versions: true
    },
    versions: [{
      maxHeight: 960,
      maxWidth: 640,
      format: 'jpg',
      quality: 75,
      suffix: '-large'
    }, {
      maxHeight: 320,
      maxWidth: 480,
      format: 'jpg',
      quality: 75,
      suffix: '-medium'
    }, {
      maxHeight: 160,
      maxWidth: 240,
      format: 'jpg',
      quality: 75,
      suffix: '-small'
    }]
  })

  client._upload = client.upload
  client.upload = (src, opts, cb) => {
    opts = Object.assign({}, opts, {
      path: `images/jpgfiles/${imageId.substring(0, 3)}/${imageId.substring(3, 6)}/${imageId.substring(6, 9)}/image`
    })
    client._upload(src, opts, cb)
  }

  return client
}

export default createClient
