//
// Main Kabuki code.
//

var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('./marionette-shim');

var TheatreView = require('./TheatreView');
var ScriptProcessor = require('./ScriptProcessor');
var WidgetRegistry = require('./WidgetRegistry');
var CommandHandler = require('./CommandHandler');
var SettingsView = require('./SettingsView');


var Kabuki = {};

var KabukiApp = Marionette.Application.extend({

    initialize(opts) {

        this.script = opts.script;
        this.plugins = opts.plugins;
        this.assetsToLoad = opts.assetsToLoad;
        
        this.widgetRegistry = opts.widgetRegistry || new WidgetRegistry();

        var settings = new Backbone.Model({
            textSpeed: 400
        });
        this.settings = settings;

        this.theatre = new TheatreView({
            el: opts.el,
            channel: this.channel,
            getSettingsView: function() {
                return new SettingsView({
                    model: settings
                });
            }
        });

        this.commandHandler = opts.commandHandler || new CommandHandler({
            channel: this.channel,
            plugins: this.plugins,
            widgetRegistry: this.widgetRegistry,
            theatreChannel: this.theatre.channel
        });
        this.channel.on('cmd', this.commandHandler.handle, this.commandHandler);

        this.channel.reply('settings:get', this.getSettings, this);
        this.channel.reply('settings:set', this.setSettings, this);

        this.scriptProcessor = new ScriptProcessor({commandHandler: this.commandHandler});
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

    getSettings: function() {
        return this.settings.toJSON();
    },

    setSettings: function(newValues) {
        this.settings.set(newValues);
    }

});

Kabuki.KabukiApp = KabukiApp;

module.exports = Kabuki;


