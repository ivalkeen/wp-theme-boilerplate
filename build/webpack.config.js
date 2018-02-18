const path = require('path');
const isdev = require('isdev');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const template = require('lodash/template');

const CopyPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { default: ImageminPlugin } = require('imagemin-webpack-plugin');

const sassRule = require('./rules/sass');
const imagesRule = require('./rules/images');
const javascriptRule = require('./rules/javascript');

const config = require('./app.config');

module.exports = {
  /**
   * Should the source map be generated?
   *
   * @type {string|undefined}
   */
  devtool: (isdev && config.settings.sourceMaps) ? 'source-map' : undefined,

  /**
   * Application entry files for building.
   *
   * @type {Object}
   */
  entry: config.assets,

  /**
   * Output settings for application scripts.
   *
   * @type {Object}
   */
  output: {
    path: config.paths.dist,
    filename: config.outputs.javascript.filename
  },

  /**
   * External objects which should be accessible inside application scripts.
   *
   * @type {Object}
   */
  externals: config.externals,

  /**
   * Custom modules resolving settings.
   *
   * @type {Object}
   */
  resolve: config.resolve,

  /**
   * Performance settings to speed up build times.
   *
   * @type {Object}
   */
  performance: {
    hints: false
  },

  /**
   * Build rules to handle application assset files.
   *
   * @type {Object}
   */
  module: {
    rules: [
      sassRule,
      imagesRule,
      javascriptRule
    ]
  },

  /**
   * Common plugins which should run on every build.
   *
   * @type {Array}
   */
  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: !isdev }),
    new CleanPlugin(config.paths.dist, { allowExternal: true }),
    new ExtractTextPlugin(config.outputs.css),
    new CopyPlugin([{
      context: config.paths.theme,
      ignore: ['theme_slug.pot'],
      from: '**/*',
      transform: (content) => template(content)(config),
      to: config.outputs.dist
    }]),
    new CopyPlugin([{
      context: config.paths.theme,
      from: 'languages/theme_slug.pot',
      transform: (content) => template(content)(config),
      to: `languages/${config.theme.slug}.pot`
    }])
  ]
};

/**
 * Adds Stylelint plugin if
 * linting is configured.
 */
if (config.settings.styleLint) {
  module.exports.plugins.push(
    new StyleLintPlugin(config.settings.styleLint)
  );
}

/**
 * Adds BrowserSync plugin when
 * settings are configured.
 */
if (config.settings.browserSync) {
  module.exports.plugins.push(
    new BrowserSyncPlugin(config.settings.browserSync, {
      // Prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this.
      reload: false
    })
  );
}

/**
 * Adds optimalizing plugins when
 * generating production build.
 */
if (!isdev) {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  );

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: isdev,
      compress: { warnings: false },
      sourceMap: isdev
    })
  );

  module.exports.plugins.push(
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false }
    })
  );
}
;
