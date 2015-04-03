var Kabuki = require('./Kabuki');
var $ = require('jquery');

describe('Kabuki', function() {
    fdescribe('Kabuki.Theatre', function() {

      var $container;

      beforeEach(function() {
        $container = $('<div>');
        $('body').append($container);
      });

      afterEach(function() {
        $container.remove();
      });

      it('it should be defined', function() {
        expect(Kabuki.Theatre).toBeDefined();
      });

      it('should have a stage', function() {
        var t = new Kabuki.Theatre({el: $container});
        expect(t.stage).toBeDefined();
      });

      it('should show the curtains when starting', function() {
        var t = new Kabuki.Theatre({el: $container});
        var spy = spyOn(t, 'showCurtains');
        t.start();
        expect(spy).toHaveBeenCalled();
      });

      fit('should trigger the loading:end event after loading', function(done) {
        var t = new Kabuki.Theatre({el: $container});
        t.channel.on('loading:end', function() {
          done();
        });

        t.start();
      });
    });
});
