var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  entry: './main.js',
  output: {
    path: 'public',
    filename: 'index.js'
  },
  devServer: {
    inline: true,
    port: 3333,
    outputPath: path.join(__dirname, 'public')
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
      { from: 'index.html' },
    ])
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
