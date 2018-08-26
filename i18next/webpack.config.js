const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = () => {
  const isDev = !!process.env.WEBPACK_SERVE;

  return {
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.js',
    },
    devServer: {
      port: 8080,
      contentBase: path.join(__dirname, 'dist')
    },
    mode: isDev ? 'development' : 'production',
    plugins: [
      new HtmlWebpackPlugin({
        title: `Webpack with ttag demo`,
        template: path.resolve(__dirname, 'template/index.html'),
        filename: path.resolve(__dirname, 'dist/index.html'),
        inject: false,
      }),
      !isDev && new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'src/lang/'),
        to: path.resolve(__dirname, 'dist/lang/')
      }])
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        },
      ]
    }
  }
};