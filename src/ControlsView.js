var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');


var ControlsView = Marionette.ItemView.extend({
  template: _.template('<span class="button expand">next</span>')
});

module.exports = ControlsView;
