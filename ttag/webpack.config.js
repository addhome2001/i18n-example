const path = require('path');
const webpack = require('webpack');

module.exports = ({ extract } = {}) => {
  const isDev = !!process.env.WEBPACK_SERVE;
  const locale = process.env.LOCALE || 'default';
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
      filename: !isDev ? `app_${locale}.js` : 'app.js',
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