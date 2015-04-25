/**
 * Kabuki Core Plugins
 **/

var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('kabuki/src/marionette-shim');

/**
 * Handler to wait for a given amount of time.
 **/
function wait(opts) {
    var dfd = new $.Deferred();
    setTimeout(function() {
        dfd.resolve();
    }, opts.time)
    return dfd.promise();
}

/**
 * Run a generic loader, passed in as a handler function.
 **/
function genericLoader(opts) {
    return $.when(opts.handler());
}

/**
 * A widget that can contain regions.
 **/
var LayoutWidget = Marionette.LayoutView.extend({
    template: _.template(''),
    initialize: function(opts) {
        this.channel = opts.channel;

        // Handle region commands.
        this.channel.reply('region:add', this.addRegion, this);
        this.channel.reply('region:remove', this.removeRegion, this);
        this.channel.reply('region:get', (cmdOpts) => {
            if (! cmdOpts || ! cmdOpts.id) {
                return this.regionManager.getRegions();
            }
            return this.getRegion(cmdOpts.id);
        });
    },

    addRegion: function(opts) {
        var regionElId = this.cid + '-r-' + opts.id;
        var classAttr = opts.className ? 'class="' + opts.className + '"' : '';
        var $regionEl = $('<div id="' + regionElId + '"' + classAttr + '>');
        if (opts.style) {
            $regionEl.css(opts.style);
        }
        this.$el.append($regionEl);
        return Marionette.LayoutView.prototype.addRegion.apply(this, [opts.id, '#' + regionElId]);
    },

    removeRegion: function(opts) {
        var $regionEl = this.getRegion(opts.id).$el;
        var res = Marionette.LayoutView.prototype.removeRegion.apply(this, [opts.id]);
        $regionEl.remove();
        return res;
    }
});

module.exports = {
  pluginId: 'Core',
  services: {
    'wait': wait
  },
  loaders: {
    'Generic': genericLoader
  },
  widgets: {
    'LayoutWidget': LayoutWidget
  }
};
