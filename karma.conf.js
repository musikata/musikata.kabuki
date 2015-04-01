module.exports = function(karma) {
  karma.set({

    basePath: '',

    frameworks: [
      'browserify', 
      'jasmine'
    ],

    files: [
      'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
      { 
        pattern: 'test_assets/*',
        watched: true,
        served:  true,
        included: false
      },
      'src/**/*.spec.js'
    ],

    preprocessors: {
      'src/**/*.spec.js': [
        'browserify' 
      ]
    },

    browserify: {
      debug: true,
      transform: [
        'babelify' 
      ]
    },

    reporters: [
      'progress',
      'growl'
    ],

    colors: true,

    browsers: [
      //'PhantomJS'
      'Chrome'
    ],

    singleRun: false

  });
}
