/**
 * SettingsView: for settings dialog.
 **/
var $ = require('jquery');
require('jquery-ui');
var Radio = require('backbone.radio');
var Marionette = require('kabuki/src/marionette-shim');
var _ = require('underscore');


var SettingsView = Marionette.ItemView.extend({
    className: 'kb-settings',
    template: _.template('SETTINGS' +
        '<div class="text-speed"></div>'
    ),

    ui: {
        textSpeed: '.text-speed'
    },

    initialize: function(opts) {
        this.channel = opts.channel;
    },

    onRender: function() {
        $(this.ui.textSpeed).slider({
            value: 50,
            min: 0,
            max: 100,
            step: 20
        });
    }
});

module.exports = SettingsView;
