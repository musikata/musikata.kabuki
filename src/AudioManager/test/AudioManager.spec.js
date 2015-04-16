var $ = require('jquery');
var AudioManager = require("../AudioManager");
var Base64Sample = require("./Base64Sample");
var audioCtx = require('../AudioContext');

// Karma server should serve an mp3 file at this url:
var AUDIO_ASSET_URL = '/base/test_assets/test_audio.mp3';

// Wait for timer to start for chrome.
audioCtx.createGain();
while (! audioCtx.currentTime){}

describe("AudioManager", function(){

  it("should be defined", function(){
    expect(AudioManager).toBeDefined();
  });

  describe("After initialization", function(){

    var audioManager;
    beforeEach(function(){
      audioManager = new AudioManager({
        audioContext: audioCtx
      });
      audioManager.setActionHandler('nop', function(){});
    });

    it("should getCurrentTime", function(){
      expect(audioManager.getCurrentTime()).toBe(audioCtx.currentTime);
    });

    it("should schedule events", function(){
      audioManager.scheduleEvent({
        action: 'nop',
        time: audioManager.getCurrentTime() + 100
      });
      expect(audioManager._scheduledEvents.length).toBe(1);
    });

    it("should be running the scheduling loop", function(done){
      var spy = spyOn(audioManager, '_schedulingLoop').and.callThrough();

     setTimeout(function() { 
       expect(spy).toHaveBeenCalled();
       done();
     }, 200);
    });

    it("should call event callbacks when they have been processed", function(done){
      var spy = jasmine.createSpy("callback");

      audioManager.scheduleEvent({
        action: 'nop',
        time: audioManager.getCurrentTime() + .1,
        callback: spy
      });

      setTimeout(function() { 
        expect(spy).toHaveBeenCalled();
        done();
      }, 200);
    });

    describe('loading samples', function(){

      it("should be able to load samples from url", function(done){
        // NOTE: This requires that the karma server
        // serves the resource at the url below.
        var sample = {
          id: 'testSample',
          url: AUDIO_ASSET_URL,
        };
        audioManager.loadSample(sample).then(function() {;
          var sample = audioManager.getSample('testSample');
          expect(sample.buffer).toBeDefined();
          done();
        })
      });

      it("should be able to load samples from base 64 string", function(done){
        var sample = {
          id: 'testSample',
          base64: Base64Sample
        };
        audioManager.loadSample(sample).then(function() {;
          var sample = audioManager.getSample('testSample');
          expect(sample.buffer).toBeDefined();
          done();
        })
      });

    });

    it("should be able to get source for sample", function(done){
      var sample = {
        id: 'testSample',
        url: AUDIO_ASSET_URL
      };
      audioManager.loadSample(sample).then(function() {;
        var source = audioManager.getSampleSource('testSample');
        expect(source).toBeDefined();
        done();
      })
    });

    it("should be able to process sample:start actions", function(done){
      var spy = jasmine.createSpy('sample:start spy');
      var sample = {
        id: 'testSample',
        url: AUDIO_ASSET_URL
      };
      audioManager.loadSample(sample).then(function() {
        audioManager.scheduleEvent({
          sample: 'testSample',
          time: 0,
          action: 'sample:start',
          callback: spy
        });

        setTimeout(function() {
          expect(spy).toHaveBeenCalled();
        }, 200);

        done();
      });
    });

  });
});
