/**
* Tests for Core plugins.
**/

var $ = require('jquery');
var Radio = require('backbone.radio');

var Core = require('./Core');



describe('Core Plugins', function() {
    describe('wait command', function() {
        it('should wait', function(done) {
            var waitTime = 100;
            var promise = Core.services.wait({time: waitTime});
            expect(promise.state()).toBe('pending');
            setTimeout(function() {
                expect(promise.state()).toBe('resolved');
                done();
            }, waitTime + 10);
        });
    })

    describe('LayoutWidget', function() {
        var $container;
        var channel;

        beforeEach(function() {
            channel = Radio.channel('LayoutWidget-test');
            $container = $('<div>');
            $('body').append($container);
        });

        afterEach(function() {
            $container.remove();
            channel.reset();
        });

        function generateLayoutWidget() {
            var lw = new Core.widgets.LayoutWidget({
                channel: channel
            });
            $container.append(lw.el);
            return lw;
        }

        it('can add regions', function() {
            var lw = generateLayoutWidget();
            channel.request('region:add', {id: 'a'});
            var regions = channel.request('region:get');
            expect(regions['a']).toBeDefined();
        });

        it('can get all regions', function() {
            var lw = generateLayoutWidget();
            channel.request('region:add', {id: 'a'});
            channel.request('region:add', {id: 'b'});
            var regions = channel.request('region:get');
            expect(Object.keys(regions).sort()).toEqual(['a', 'b']);
        });

        it('can get a specific region', function() {
            var lw = generateLayoutWidget();
            channel.request('region:add', {id: 'a'});
            channel.request('region:add', {id: 'b'});
            var region = channel.request('region:get', {id: 'a'});
            expect(region).toBeDefined();
        });

        it('can remove regions', function() {
            var lw = generateLayoutWidget();
            channel.request('region:add', {id: 'a'});
            channel.request('region:add', {id: 'b'});
            expect(Object.keys(channel.request('region:get')).sort()).toEqual(['a', 'b']);
            channel.request('region:remove', {id: 'a'});
            expect(Object.keys(channel.request('region:get')).sort()).toEqual(['b']);
        });

        it('can animate regions', function(done) {
            var lw = generateLayoutWidget();
            channel.request('region:add', {id: 'a'});
            var promise = channel.request('region:animate', {id: 'a',
                props: {opacity: .5},
                opts: {}
            });
            promise.then(function() {
                var region = channel.request('region:get', {id: 'a'});
                expect(parseFloat(region.$el.css('opacity'))).toEqual(.5);
                done();
            });
        });
    })
});

