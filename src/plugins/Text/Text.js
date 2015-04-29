/**
* Basic text plugin.
* Probably not that useful, mainly here to test out architecture ideas.
**/

var _ = require('underscore');
var Marionette = require('kabuki/src/marionette-shim');


var TextWidget = Marionette.View.extend({
    initialize: function(opts) {
        this.broadcastChannel = opts.broadcastChannel;
        this.channel = opts.channel;
        this.cmdTriggers = opts.cmdTriggers || [];

        this.channel.reply('showText', (opts) => {
            this.showText(opts.text);
        });

        _.each(this.cmdTriggers, function(cmd, event) {
            this.$el.on(event, () => {
                this.broadcastChannel.trigger('cmd', cmd);
            });
        }, this);

    },

    showText: function(txt) {
        this.$el.html(txt);
    }
});

module.exports = {
    pluginId: 'Text',
    widgets: {
        'TextWidget': TextWidget
    }
};
