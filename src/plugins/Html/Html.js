/**
* Basic HTML plugin.
**/

var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('kabuki/src/marionette-shim');


var HtmlWidget = Marionette.View.extend({
    initialize: function(opts) {
        this.broadcastChannel = opts.broadcastChannel;
        this.channel = opts.channel;

        if (opts.html) {
            this.showHtml(opts.html);
        }

        this.channel.reply('showHtml', (opts) => {
            return this.showHtml(opts);
        });
    },

    showHtml: function(html) {
        this.$el.html(html);
    },

});

module.exports = {
    pluginId: 'Html',
    widgets: {
        'HtmlWidget': HtmlWidget
    }
};
