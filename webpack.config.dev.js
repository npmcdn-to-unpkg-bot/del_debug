var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    main: ['webpack-hot-middleware/client',
    './client/Index'],
    shark: ['webpack-hot-middleware/client',
    './client/sharkicorn']
  },
    output: {
    path: path.join(__dirname, 'static'),
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
                include: path.join(__dirname, 'client')
            }
        ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
};
