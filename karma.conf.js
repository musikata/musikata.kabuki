/**
 * Karma configuration file.
 **/

// Set browsers to use for testing here.
var browsers = [
    'PhantomJS'
    //'Chrome'
];

// Set files to use here.
var files = [
    'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
    { 
        pattern: 'test_assets/*',
        watched: true,
        served:  true,
        included: false
    },
    'src/**/*.spec.js'
];

// Exclude certain tests if running in phantom JS.
var exclude = [];
if (browsers.indexOf('PhantomJS') > -1) {
    exclude.push('src/AudioManager/**/*');
    exclude.push('src/plugins/Audio/**/*');
}


module.exports = function(karma) {
  karma.set({

    basePath: '',

    exclude: exclude,

    frameworks: [
      'browserify', 
      'jasmine'
    ],

    files: files,

    preprocessors: {
      'src/**/*.spec.js': [
        'browserify' 
      ]
    },

    browserify: {
      debug: true,
      transform: [
        'brfs',
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
      //'Chrome'
    ],

    singleRun: false

  });
}
