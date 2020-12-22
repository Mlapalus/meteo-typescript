const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './src/js/app.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
              presets: ['@babel/preset-env']
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js'
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
      allowEmptyValues: true
    })
  ],
  devServer: {
  contentBase: path.resolve(__dirname, "./public"),
  historyApiFallback: true,
  inline: true,
  open: true,
  hot: true
},
devtool: "eval-source-map"
};

module.exports = config;