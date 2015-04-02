var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var fastBrowserify = require('broccoli-fast-browserify');
var path = require('path');


//
// Manual testing builds.
//

var manualTestTrees = {};

manualTestTrees.static = pickFiles('manualTest', {
  srcDir: '/',
  files: ['**/*.html'],
  destDir: 'manualTest'
});

manualTestTrees.js = fastBrowserify('manualTest', {
  bundles: {
    "**/index.browserify.js": {
      glob: true,
      entryPoints: function(relativePath) {
        return [relativePath];
      },
      outputPath: function(relativePath) {
        var out = relativePath.replace(/\.browserify.js$/,'.js');
        out = path.join('manualTest', out);
        return out;
      }
    }
  }
});

module.exports = mergeTrees([
  manualTestTrees.static, 
  manualTestTrees.js
]);
