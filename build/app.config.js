const path = require('path');
const merge = require('webpack-merge');

const themeConfig = {
  distPath: '../dist', // WARNING: Be carefull when setting to to an external path: it will be deleted on every build!
  author: {
    name: 'Author Name',
    uri: 'www.example.com'
  },
  theme: {
    version: '0.0.1',
    uri: 'www.example.com',
    name: 'ThemeName',
    slug: 'theme_slug',
    description: 'Theme Description'
  }
};

const config = {
  'assets': {
    'app': [
      './src/js/app.js',
      './src/sass/app.scss'
    ]
  },

  'settings': {
    'browserSync': {
      'host': 'localhost',
      'port': 3000,
      'proxy': 'http://localhost:8080/'
    }
  }
};

module.exports = merge({
  /**
   * Project paths.
   *
   * @type {Object}
   */
  paths: {
    root: path.resolve(__dirname, '../'),
    dist: path.resolve(__dirname, themeConfig.distPath),
    src: path.resolve(__dirname, '../src'),
    theme: path.resolve(__dirname, '../src/theme'),
    sass: path.resolve(__dirname, '../src/sass'),
    fonts: path.resolve(__dirname, '../src/fonts'),
    images: path.resolve(__dirname, '../src/images'),
    javascript: path.resolve(__dirname, '../src/js'),
    relative: '../',
    external: /node_modules|bower_components/
  },

  /**
   * Collection of application front-end assets.
   *
   * @type {Array}
   */
  assets: [],

  /**
   * List of filename schemas for different
   * application assets.
   *
   * @type {Object}
   */
  outputs: {
    css: { filename: 'style.css' },
    image: { filename: 'images/[path][name].[ext]' },
    javascript: { filename: 'js/app.js' }
  },

  /**
   * List of libraries which will be provided
   * within application scripts as external.
   *
   * @type {Object}
   */
  externals: {
    jquery: 'jQuery'
  },

  /**
   * Settings of other build features.
   *
   * @type {Object}
   */
  settings: {
    sourceMaps: true,
    styleLint: {},
    autoprefixer: {
      browsers: ['last 2 versions', '> 1%']
    },
    browserSync: {
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/',
      open: false,
      reloadDelay: 500,
      files: ['src/**/*']
    }
  }

}, config, themeConfig);
