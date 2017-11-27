require('dotenv').config()
const config = require('config')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')

let configObj = {
  entry: [
    './src/client.js',
  ],
  output: {
    path: __dirname +'/../build',
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
    new GitRevisionPlugin(),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../src/assets/icons'),
        to:'icons/',
    }])
  ]
}

if (config.get('assets.compileAssets')) {
  // Production settings
  configObj.output.filename = 'bundle.[git-revision-hash].js';
 
  const extractSass = new ExtractTextPlugin({
    filename: "style.[git-revision-hash].css",
    allChunks: true
  });
  configObj.plugins = configObj.plugins.concat([
    extractSass, 
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new S3Plugin({
      exclude: /.*\.(html)/,
      s3Options: {
        accessKeyId: config.get('assets.s3AccessKey'),
        secretAccessKey: config.get('assets.s3AccessToken'),
      },
      s3UploadOptions: {
        Bucket: config.get('assets.s3Bucket')
      }
    })
  ]);
  configObj.module.loaders = configObj.module.loaders.concat([
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ],
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [
          { loader: "css-loader" },
        ],
      }),
    }
  ]);
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
