/**
* Basic text plugin.
* Probably not that useful, mainly here to test out architecture ideas.
**/

var $ = require('jquery');
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

        // Tmp hack for actions. Should probably do this as a mixin for all widgets later.
        _.each(this.cmdTriggers, function(cmd, event) {
            this.$el.on(event, () => {
                this.broadcastChannel.trigger('cmd', cmd);
            });
        }, this);

    },

    showText: function(txt) {
        // @TODO: get this from settings.
        var dfd = new $.Deferred();
        var envSettings = this.broadcastChannel.request('settings:get');
        var txtSpeed = 10;
        if (envSettings && ! _.isUndefined(envSettings.textSpeed)) {
            txtSpeed = envSettings.textSpeed;
        }

        this.$el.empty();
        var words = txt.split(' ');

        var _showNextWord = () => {
            if (words.length == 0) {
                dfd.resolve();
                return;
            }
            var nextWord = words.shift();
            var $wordEl = $('<span style="opacity:0;">').html(' ' + nextWord);
            $wordEl.appendTo(this.$el).fadeTo(400, 1);
            setTimeout(_showNextWord, txtSpeed);
        };
        _showNextWord();

        return dfd.promise();
    },

});

module.exports = {
    pluginId: 'Text',
    widgets: {
        'TextWidget': TextWidget
    }
};
