var $ = require('jquery');
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

  beforeEach(function(done){ 
    audioManager.loadSample(testSample).then(function(sample) {;
      done();
    })
  });


  it('should be defined', function() {
    expect(AudioPlugin.widgets.AudioWidget).toBeDefined();
  });

  it('should play a sample', function(done) {
    var aw = new AudioPlugin.widgets.AudioWidget({audioManager: audioManager});
    aw.playSample({id: 'testSample'}).then(done);
  });
});
