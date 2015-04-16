/**
 * Tests for Core plugins.
 **/

var Core = require('./Core');

fdescribe('Core Plugins', function() {
    describe('wait command', function() {
        it('should wait', function(done) {
            var waitTime = 100;
            var promise = Core.handlers.wait({time: waitTime});
            expect(promise.state()).toBe('pending');
            setTimeout(function() {
                expect(promise.state()).toBe('resolved');
                done();
            }, waitTime + 10);
        });
    })
});

