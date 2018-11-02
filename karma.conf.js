'use strict'

var isCI = process.env.CONTINUOUS_INTEGRATION === 'true'

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['mocha', 'sinon'],

    reporters: ['mocha'],

    files: ['test/fixtures/*.html', 'test.js'],

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    logLevel: config.LOG_INFO,

    browsers: [isCI ? 'ChromeTravisCI' : 'Chrome', 'Firefox'],

    customLaunchers: {
      ChromeTravisCI: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    preprocessors: {
      'test/fixtures/*.html': 'html2js',
      'test.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',

      entry: __dirname + '/test.js',
      module: {
        rules: [
          {
            test: /.js$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
        ],
      },
    },

    webpackServer: {
      noInfo: true,
    },
  })
}
