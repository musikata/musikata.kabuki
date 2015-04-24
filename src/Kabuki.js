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
    this.assetsToLoad = opts.assetsToLoad;

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

  onStart() {
    this.theatre.render();

    this.theatre.showCurtains({loadingImgSrc: this.options.loadingImgSrc});

    // start loading
    var loadPromises = [];
    if (this.assetsToLoad) {
        this.assetsToLoad.forEach((asset) => {
            var loader = this.plugins[asset.pluginId].loaders[asset.loaderId];
            loadPromises.push(loader(asset.loaderOpts));
        });
    }

    // when loading finishes, show 'next' button.
    $.when.apply($, loadPromises).then(() => {
      this.channel.trigger('loading:end');
      this.theatre.showStage();
      if (this.script) {
          this.scriptProcessor.processScript(this.script);
      }
    });
  },

});

Kabuki.KabukiApp = KabukiApp;

module.exports = Kabuki;


