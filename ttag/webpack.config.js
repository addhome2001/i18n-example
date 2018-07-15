const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ extract } = {}) => {
  const isDev = !!process.env.WEBPACK_SERVE;
  const locale = process.env.LOCALE || 'default';
  const localePrefix = !isDev ? `_${locale}` : '';
  const ttag = {};

  if (extract) {
    // translations will be extracted to template.pot
    ttag.extract = {
      output: path.resolve(__dirname, './lang/template.pot')
    }
  }

  if (!isDev) {
    ttag.resolve = {
      translations: locale !== 'default' ? path.resolve(__dirname, `./lang/${locale}.po`) : 'default',
    }
  }

  return {
    entry: path.resolve(__dirname, './app.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      // the output filename is related to the locale
      filename: `app${localePrefix}.js`,
      publicPath: path.resolve(__dirname, './dist')
    },
    devServer: {
      port: 8080
    },
    resolve: {
      alias: {
        // minimize the resulting bundle size by using the version of mock
        'ttag': !isDev ? 'ttag/dist/mock' : 'ttag'
      }
    },
    mode: isDev ? 'development' : 'production',
    plugins: [
      new webpack.DefinePlugin({
        LOCALE: JSON.stringify(locale),
        IS_DEV: JSON.stringify(isDev),
      }),
      new HtmlWebpackPlugin({
        title: `Webpack with ttag demo`,
        template: path.resolve(__dirname, './template/index.html'),
        filename: path.resolve(__dirname, `./dist/index${localePrefix}.html`),
        inject: false,
        localePrefix,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { plugins: [['ttag', ttag]] }
          }
        },
        {
          test: /\.po$/,
          use: [
            { loader: 'json-loader' },
            { loader: 'po-gettext-loader' },
          ]
        }
      ]
    }
  }
};