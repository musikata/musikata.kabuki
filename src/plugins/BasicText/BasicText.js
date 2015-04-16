/**
* Basic text plugin.
* Probably not that useful, mainly here to test out architecture ideas.
**/

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var TextWidget = Marionette.View.extend({
    initialize: function(opts) {
        this.channel = opts.channel;
        this.channel.reply('showText', (opts) => {
            this.showText(opts.text);
        });
    },

    showText: function(txt) {
        this.$el.html(txt);
    }
});

module.exports = {
    pluginId: 'BasicText',
    widgets: {
        'TextWidget': TextWidget
    }
};
