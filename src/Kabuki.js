//
// Main Kabuki code.
//

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
require('./radio.shim');
var Marionette = require('backbone.marionette');

var Kabuki = {};

class Theatre extends Marionette.Application {
  initialize(options) {

    this.stage = Marionette.LayoutView.extend({
      el: options.el
    })
  }

  onStart(options) {
    this.showCurtains();

    // start loading
    var loadPromises = [];

    // when loading finishes, hide curtains.
    $.when.apply($, loadPromises).then(() => {
      console.log('done loading');
      this.channel.trigger('loading:end');
    });
  }

  showCurtains() {
    console.log('showCurtains');
  }

  hideCurtains() {
    console.log('hideCurtains');
  }

}

Kabuki.Theatre = Theatre;

module.exports = Kabuki;


