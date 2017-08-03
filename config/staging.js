module.exports = {
  // Add dev speoific settings here
  assets: {
      compileAssets: true,
      host: 'ec2-54-173-20-206.compute-1.amazonaws.com:3001',
      urlPrefix: 'http://ec2-54-173-20-206.compute-1.amazonaws.com:3001'
  },

  sessionSettings: {
    secret: 'insecure-session-secret',
  }
}
