let domain = "localhost"
let baseUrl = "http://"+domain+":3000"

module.exports = {
  domain: domain,
  baseUrl: baseUrl,
  apiEndpoint: baseUrl+"/api",

  assets: {
      // Toggle between serving assets locally with webpack and static assets from cloudfront/s3
      compileAssets: true,
      urlPrefix: 'https://staging-bucket.s3.aws',
      s3Bucket: 'staging-bucket',
      s3AccessKey: process.env.ASSETS_S3_KEY,
      s3AccessToken: process.env.ASSETS_S3_TOKEN
  },

  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    database: "ioverlander_production",
    dialect: "postgres",
    storage: null
  },
  sessionSettings: {
    secure: false,
    secret: process.env.SESSION_SECRET,
  },
  sessionDb:{
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "ioverlander_production_node_sessions",
    host: "localhost",
    dialect: "postgres",
    storage: null,
    underscored: true,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  },
  email: {
    address: 'iOverlander.com@gmail.com',
    from: "iOverlander <iOverlander.com@gmail.com>",
    transport: {
      service: "gmail",
      pool: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    }
  }
}

