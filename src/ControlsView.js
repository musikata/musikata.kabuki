var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');


var ControlsView = Marionette.ItemView.extend({
  template: _.template('next')
});

module.exports = ControlsView;
