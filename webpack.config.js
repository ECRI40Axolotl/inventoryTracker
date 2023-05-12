const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: 'client/index.js',

  mode: 'development',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html'
    })
  ],
    devServer: {
        static: {
        directory: path.resolve(__dirname, './dist'),
        publicPath: './dist',
        },
        compress: true,
        port: 8080,
        proxy: {
        '*': 'http://localhost:3000',
        },
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: [/node_modules/, /client\/stylesheets\/modules/],
        use: ['style-loader', 'css-loader'],
      },
    ]
  }

}