var path = require('path');

var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var fastBrowserify = require('broccoli-fast-browserify');
var compileSass = require('broccoli-sass');


// SASS
var sassTree = compileSass(['styles/kabuki', 'styles/foundation'], 'app.scss', 'styles/kabuki/app.css');


var srcTree = 'src';

//
// Manual testing builds.
//

var manualTestTrees = {};

manualTestTrees.static = pickFiles('manualTest', {
  srcDir: '/',
  files: ['**/*.html', '**/*.gif', '**/*.svg'],
  destDir: 'manualTest'
});

var testAssetsTree = pickFiles('test_assets', {
    srcDir: '/',
    files: ['**/*.*'],
    destDir: 'test_assets'
});

manualTestTrees.js = fastBrowserify(mergeTrees([srcTree, 'manualTest']), {
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
      },
      transform: require('babelify'),
    }
  }
});

module.exports = mergeTrees([
  sassTree,
  manualTestTrees.static, 
  manualTestTrees.js,
  testAssetsTree
]);
