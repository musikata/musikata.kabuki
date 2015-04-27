//
// Main Kabuki code.
//

var _ = require('underscore');
var $ = require('jquery');
var Marionette = require('./marionette-shim');

var TheatreView = require('./TheatreView');
var ScriptProcessor = require('./ScriptProcessor');
var WidgetRegistry = require('./WidgetRegistry');
var CommandHandler = require('./CommandHandler');


var Kabuki = {};

var KabukiApp = Marionette.Application.extend({

    initialize(opts) {

        this.script = opts.script;
        this.plugins = opts.plugins;
        this.assetsToLoad = opts.assetsToLoad;
        
        this.widgetRegistry = opts.widgetRegistry || new WidgetRegistry();

        this.commandHandler = opts.commandHandler || new CommandHandler({
            channel: this.channel,
            plugins: this.plugins,
            widgetRegistry: this.widgetRegistry
        });

        this.scriptProcessor = new ScriptProcessor({commandHandler: this.commandHandler});

        this.theatre = new TheatreView({
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

        // when loading finishes...
        $.when.apply($, loadPromises).then(() => {
            //Register the stage
            this.theatre.showStage();
            this.widgetRegistry.registerWidget({
                id: 'stage', 
                widget: this.theatre.stage, 
                channel: this.theatre.stage.channel
            });

            this.channel.trigger('loading:end');

            // Start running the script.
            if (this.script) {
                this.scriptProcessor.processScript(this.script);
            }
        });
    },

});

Kabuki.KabukiApp = KabukiApp;

module.exports = Kabuki;


