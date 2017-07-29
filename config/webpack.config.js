require('dotenv').config()
const config = require('config')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: !config.get('assets.compileAssets'),
    allChunks: true
});

let configObj = {
  entry: [
    './src/client.js',
  ],
  output: {
    path: __dirname+'build/',
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      config: path.resolve(__dirname, '../src/client_config.shim')
    },
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ],
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.md$/,
        use: ['raw-loader'],
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../src/assets/icons'),
        to:'icons/',
    }])

  ]
}

if (config.get('assets.compileAssets')) {
  configObj.plugins.push(extractSass)
  configObj.module.loaders.push({
    test: /\.scss$/,
    use: extractSass.extract({
      use: [
        { loader: "css-loader" },
        { loader: "sass-loader" }
      ],
      fallback: "style-loader"
    })
  })
  configObj.module.loaders.push({
    test: /\.css$/,
     use: extractSass.extract({
      use: [
        { loader: "css-loader" },
      ],
      fallback: "style-loader"
    }),
  })
} else {
  configObj.module.loaders.push({
    test: /\.scss$/,
    use: [ "style-loader", "css-loader", "sass-loader"],
  })
  configObj.module.loaders.push({
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  })
}

module.exports = configObj
