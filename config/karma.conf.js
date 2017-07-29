var path = require('path')

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: [ 'mocha' ], // use the mocha test framework
    files: [
      '../**/*.spec.js' // just load this file
    ],
    preprocessors: {
      '../**/*.spec.js': [ 'webpack', 'sourcemap' ] // preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'progress', 'junit', 'coverage' ], // report results in this format
    junitReporter: {
      outputDir: process.cwd() + '/reports',
      outputFile: 'junit.xml'
    },
    coverageReporter: {
      dir: process.cwd() + '/reports/coverage',
      reporters: [
        { type: 'html' },
        { type: 'cobertura', file: 'cobertura.txt' }
      ]
    },
    webpack: { // kind of a copy of your webpack config
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      resolve: {
        extensions: ['', '.js', '.jsx']
      },
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        babel: {
          presets: ['es2015', 'react']
        }
      },
      module: {
        preLoaders: [
          // transpile all files except testing sources with babel as usual
          {
            test: /\.jsx?$/,
            exclude: [
              path.resolve(process.cwd() + '/src/db/models'),
              path.resolve(process.cwd() + '/node_modules/')
            ],
            loaders: ['babel', 'isparta']
          }
        ],
        loaders: [
          {
            test: /\.spec\.js$/,
            loader: 'babel?{"presets":["es2015", "react"]}',
            exclude: /(node_modules|bower_components)/
          },
          {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
          }
        ]
      }
    }
  })
}
