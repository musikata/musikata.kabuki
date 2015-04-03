var fs = require('fs');
var Marionette = require('kabuki/src/marionette-shim');


var TheatreLayoutView = Marionette.LayoutView.extend({
  template: fs.readFileSync(__dirname + '/TheatreLayoutView.html'),
    regions: {
      stage: '.kb-stage',
      controls: '.kb-stage-controls'
    }
});

module.exports = TheatreLayoutView;
