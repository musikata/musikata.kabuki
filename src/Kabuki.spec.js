var Kabuki = require('./Kabuki');
var $ = require('jquery');

describe('Kabuki', function() {
    fdescribe('Kabuki.KabukiApp', function() {

      var $container;

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
        var ka = generateKabukiApp();
        expect(ka.theatre).toBeDefined();
      });

      it('should show the curtains when starting', function() {
        var ka = generateKabukiApp();
        var spy = spyOn(ka, 'showCurtains');
        ka.start();
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger the loading:end event after loading', function(done) {
        var ka = new Kabuki.KabukiApp({el: $container});
        ka.channel.on('loading:end', function() {
          done();
        });

        ka.start();
      });
    });
});
