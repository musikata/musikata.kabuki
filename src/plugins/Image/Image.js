/**
* Basic text plugin.
* Probably not that useful, mainly here to test out architecture ideas.
**/

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var ImageWidget = Marionette.View.extend({
    initialize: function(opts) {
        this.channel = opts.channel;
        this.channel.reply('showImage', (opts) => {
            this.showImage(opts.uri);
        });
    },

    showImage: function(imageUri) {
        this.$el.html('<img src="' + imageUri + '">');
    }
});

module.exports = {
    pluginId: 'Image',
    widgets: {
        'ImageWidget': ImageWidget
    }
};
