var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, './CLIENTSIDE/components'),
  entry: {
    main: [
    './Index'],
    shark: [
    './sharkicorn']
  },
    output: {
    path: path.join(__dirname, './CLIENTSIDE/static'),
    filename: '[name].js',
    publicPath: '/static/',
    plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js") ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: path.join(__dirname, './CLIENTSIDE/components'),
                query: {
                    cacheDirectory: false,
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};
