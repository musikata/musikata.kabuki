var $ = require('jquery');
var _ = require('underscore');
var Marionette = require('./marionette-shim');

var TheatreView = require('./TheatreView');


describe('TheatreView', function() {
    var $container;
    var ka;

    beforeEach(function() {
        $container = $('<div>');
        $('body').append($container);
    });

    afterEach(function() {
        $container.remove();
    });

    function generateTheatreView(opts) {
        var tv = new TheatreView(Object.assign({el: $container}, opts));
        tv.render();
        return tv;
    };

    fit('should show settings', function() {
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
