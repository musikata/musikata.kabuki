module.exports = function(karma) {
  karma.set({

    basePath: '',

    frameworks: [
      'browserify', 
      'jasmine'
    ],

    files: [
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
      'PhantomJS'
    ],

    singleRun: false

  });
}
