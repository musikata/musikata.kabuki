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
        this.autoAdvance = opts.autoAdvance;

        this.channel.reply('showText', (opts) => {
            return this.showText(opts);
        });

        // Tmp hack for actions. Should probably do this as a mixin for all widgets later.
        _.each(this.cmdTriggers, function(cmd, event) {
            this.$el.on(event, () => {
                this.broadcastChannel.trigger('cmd', cmd);
            });
        }, this);

    },

    showText: function(opts) {
        // @TODO: get this from settings.
        var dfd = new $.Deferred();

        this.$el.empty();
        var words = opts.text.split(' ');

        var _showNextWord = () => {

            // Get settings.
            var settings = _.defaults({}, opts, this.options, 
                this.broadcastChannel.request('settings:get'));

            if (words.length == 0) {
                var advance = function() {
                    if (!settings.advanceDelay) {
                        dfd.resolve();
                        return;
                    }
                    setTimeout(function(){dfd.resolve()}, settings.advanceDelay);
                };

                if (settings.autoAdvance) {
                    advance();
                } else {
                    var $nextButton = $('<span class="button tiny">&gt;</span>');
                    this.$el.append($nextButton);
                    $nextButton.on('click', function() {
                        $nextButton.remove();
                        advance();
                    });
                }
                return;
            }


            var nextWord = words.shift();
            var $wordEl = $('<span style="opacity:0;">').html(' ' + nextWord);
            $wordEl.appendTo(this.$el).fadeTo(400, 1);
            setTimeout(_showNextWord, settings.textSpeed);
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
