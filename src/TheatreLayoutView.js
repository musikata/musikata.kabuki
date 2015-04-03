var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');

var ControlsView = require('./ControlsView');


var TheatreLayoutView = Marionette.LayoutView.extend({
  template: _.template('<div class="kb-stage"></div><div class="kb-stage-controls"></div>'),
  regions: {
    stage: '.kb-stage',
    controls: '.kb-stage-controls'
  },

    onRender: function() {
      this.showChildView('controls', new ControlsView());
    }
});

module.exports = TheatreLayoutView;
