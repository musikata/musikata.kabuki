//
// Main Kabuki code.
//

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var Kabuki = {};

class Theatre extends Marionette.Application {
  initialize(options) {
    this.stage = Marionette.LayoutView.extend({
      el: options.el
    })
  }
}

Kabuki.Theatre = Theatre;

module.exports = Kabuki;

