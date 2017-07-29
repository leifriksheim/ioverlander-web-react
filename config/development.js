module.exports = {
  // Add dev speoific settings here
  assets: {
      compileAssets: false,
      urlPrefix: 'http://localhost:8080/'
  },

  db: {
    username:"ioverlander",
    password:"password",
  },

  sessionSettings: {
    secret: 'insecure-session-secret',
  }
}
