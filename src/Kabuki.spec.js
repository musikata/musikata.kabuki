var Kabuki = require('./Kabuki');
var $ = require('jquery');

describe('Kabuki', function() {
    describe('Kabuki.KabukiApp', function() {

      var $container;
      var ka;

      beforeEach(function() {
        $container = $('<div>');
        $('body').append($container);
      });

      afterEach(function() {
        $container.remove();
      });

      function generateKabukiApp() {
        return new Kabuki.KabukiApp({el: $container});
      };

      it('it should be defined', function() {
        expect(Kabuki.KabukiApp).toBeDefined();
      });

      it('should have a theatre', function() {
        ka = generateKabukiApp();
        expect(ka.theatre).toBeDefined();
      });

      describe('when loading', function() {

        beforeEach(function() {
          ka = generateKabukiApp();
        });

        it('should show the curtains', function() {
          var spy = spyOn(ka.theatre, 'showCurtains');
          ka.start();
          expect(spy).toHaveBeenCalled();
        });

        it('should trigger the loading:end event when loading is done', function(done) {
          ka.channel.on('loading:end', function() {
            done();
          });

          ka.start();
        });
      });

      describe('after loading', function() {
        beforeEach(function(done) {
          ka = generateKabukiApp();
          ka.channel.on('loading:end', done);
          ka.start();
        });

        it('should show the next button', function() {
          expect(ka.el.html()).toContain('next');
        });

      });

      describe('settings', function() {
          beforeEach(function() {
              ka = generateKabukiApp();
          });

          it('should set settings', function() {
              ka.channel.request('settings:set', {foo: 'bar'});
              expect(ka.settings.get('foo')).toEqual('bar');
          });

          it('should get settings', function() {
              ka.channel.request('settings:set', {foo: 'bar'});
              var settings = ka.channel.request('settings:get');
              expect(settings.foo).toEqual('bar');
          });
      });

    });
});
