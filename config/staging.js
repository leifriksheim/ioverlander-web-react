module.exports = {
  // Add dev speoific settings here
  assets: {
      compileAssets: true,
      host: 'localhost:8080',
      urlPrefix: 'http://localhost:8080/'
  },

  sessionSettings: {
    secret: 'insecure-session-secret',
  }
}
