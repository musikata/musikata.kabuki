var $ = require('jquery');
var Radio = require('backbone.radio');

var audioCtx = require('../../AudioManager/AudioContext.js');
var AudioManager = require('../../AudioManager/AudioManager.js');
var AudioPlugin = require('./Audio');

var audioManager = new AudioManager({audioContext: audioCtx});
var testSample = {
    id: 'testSample',
    // NOTE: this url should be served by the karma server.
    url: '/base/test_assets/test_audio.mp3'
};

describe('AudioWidget', function() {

    var channel;

    beforeEach(function(done){ 
        channel = Radio.channel('test');

        audioManager.loadSample(testSample).then(function(sample) {;
            done();
        })
    });

    afterEach(function() {
        channel.reset();
    });


    it('should be defined', function() {
        expect(AudioPlugin.widgets.AudioWidget).toBeDefined();
    });

    it('should play a sample', function(done) {
        var aw = new AudioPlugin.widgets.AudioWidget({
            audioManager: audioManager,
            channel: channel
        });
        aw.playSample({id: 'testSample'}).then(done);
    });
});
