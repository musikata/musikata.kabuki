var $ = require('jquery');
var StageView = require('./StageView');
var Radio = require('backbone.radio');

describe('StageView', function() {
    var channel;
    var $container;

    beforeEach(function() {
        channel = Radio.channel('test-StageView');
        $container = $('<div>');
        $('body').append($container);
    });

    afterEach(function() {
        $container.remove();
        channel.reset();
    });

    it('should add a region', function() {
        var sv = new StageView({
            channel: channel,
            el: $container
        });

        var regionId = 'funko';
        sv.addRegion({id: regionId});

        expect(sv.getRegion(regionId)).not.toBeUndefined();
    });
});
