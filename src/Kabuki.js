//
// Main Kabuki code.
//

var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('./marionette-shim');

var TheatreLayoutView = require('./TheatreLayoutView');
var ScriptProcessor = require('./ScriptProcessor');
var CommandHandler = require('./CommandHandler');


var Kabuki = {};

var KabukiApp = Marionette.Application.extend({

  initialize(opts) {

    this.script = opts.script;
    this.plugins = opts.plugins;

    this.scriptProcessor = new ScriptProcessor({
        commandHandler: new CommandHandler({
            channel: this.channel,
            plugins: this.plugins
        })
    });

    this.theatre = new TheatreLayoutView({
      el: opts.el,
      channel: this.channel
    });
  },

  onStart(options) {
    this.theatre.render();

    this.showCurtains();

    // start loading
    var loadPromises = [];

    // when loading finishes, show 'next' button.
    $.when.apply($, loadPromises).then(() => {
      this.channel.trigger('loading:end');
      if (this.script) {
          this.scriptProcessor.processScript(this.script);
      }
    });
  },

  showCurtains() {
    // Show a loading view.
    var loadingImgSrc = this.options.loadingImgSrc;
    var LoadingView = Marionette.ItemView.extend({
      template: _.template('<img src="' + loadingImgSrc + '"/>')
    });
    this.theatre.showChildView('stage', new LoadingView());
  },

  hideCurtains() {
  }

});

Kabuki.KabukiApp = KabukiApp;

module.exports = Kabuki;


