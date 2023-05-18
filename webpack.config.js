const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',

  mode: process.env.NODE_ENV,

  output: {
    path: path.resolve(__dirname, 'dist'),
    // path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, './dist'),
      publicPath: './dist',
    },
    compress: true,
    port: 8080,
    hot: true,
    proxy: {
      '/user/**': 'http://localhost:3000/',
      '/fridge/**': 'http://localhost:3000/',
      // '*': 'http://localhost:3000',
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
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/transform-async-to-generator'],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: [/node_modules/, /client\/stylesheets\/modules/],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  
};
