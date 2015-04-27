var $ = require('jquery');
var _ = require('underscore');
var Radio = require('backbone.radio');
var Marionette = require('./marionette-shim');

var TheatreView = require('./TheatreView');


describe('TheatreView', function() {
    var $container;
    var ka;
    var channel;

    beforeEach(function() {
        $container = $('<div>');
        $('body').append($container);
        channel = Radio.channel('test-TheatreView');
    });

    afterEach(function() {
        $container.remove();
        channel.reset();
    });

    function generateTheatreView(opts) {
        var tv = new TheatreView(Object.assign({
            el: $container, channel: channel}, opts));
        tv.render();
        return tv;
    };

    it('should show settings', function() {
        var TestSettingsView = Marionette.ItemView.extend({template: _.template('FOO')});
        var settingsView = new TestSettingsView();

        var tv = generateTheatreView({
            getSettingsView: function() {return settingsView;}
        });

        expect($container.html()).not.toContain('FOO');
        tv.toggleSettingsView();
        expect($container.html()).toContain('FOO');
        tv.toggleSettingsView();
        expect($container.html()).not.toContain('FOO');
    });

});
