var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  context: path.join(__dirname, './CLIENTSIDE/components'),
  entry: {
    main: ['webpack-hot-middleware/client',
    './Index'],
    survey: ['webpack-hot-middleware/client',
    './survey']
  },
    output: {
    path: path.join(__dirname, './CLIENTSIDE/static'),
    filename: '[name].js',
    publicPath: '/static/',
    plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js") ]

  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel',
                include: path.join(__dirname, './CLIENTSIDE/components')
            }
        ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
};
