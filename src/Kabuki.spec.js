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
        t.start();
        expect(t.stage).toBeDefined();
      });
    });
});
