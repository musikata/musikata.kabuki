var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('lodash');
Backbone.$ = $;
var Base64Utils = require('./Base64Utils');

class AudioManager {

  constructor(options) {
    this.audioContext = options.audioContext;
    this.schedulingInterval = options.schedulingInterval || 1000/60.0;
    this.radio = options.radio || _.extend({}, Backbone.Events);
    this._scheduledEvents = [];
    this._actionHandlers = {};
    this._samples = {};

    // Set default action handlers.
    this.setActionHandler('sample:start', function(audioManager, event){
      var source = audioManager.getSampleSource(event.sample);
      source.connect( audioManager.audioContext.destination);
      source.start(event.time);
    });

    // Start scheduling loop.
    this._schedulingLoop();
  }

  getCurrentTime() {
    return this.audioContext.currentTime;
  }

  setActionHandler(actionId, handler) {
    this._actionHandlers[actionId] = handler;
  }

  getSampleSource(sample) {
    var _sample = this.getSample(sample);
    var source = this.audioContext.createBufferSource();
    source.buffer = _sample.buffer;
    return source;
  }

  registerSample(sample) {
    this._samples[sample.id] = _.extend({}, sample);
  }

  getSample(sample) {
    if (typeof sample === 'string'){
      sample = {id: sample};
    }
    return this._samples[sample.id];
  }

  sampleIsRegistered(sample) {
    return this._samples.hasOwnProperty(sample.id);
  }

  // Returns a promise object representing the
  // sample's loading state.
  loadSample(sample) {
    if (! this.sampleIsRegistered(sample)){
      this.registerSample(sample);
    }
    var _sample = this.getSample(sample);

    if (_sample.loadPromise){
      return _sample.loadPromise;
    }

    var loadDeferred = new $.Deferred();
    _sample.loadPromise = loadDeferred.promise();

    // URL
    if (_sample.url){
      var request = new XMLHttpRequest();
      request.open('GET', sample.url, true);
      request.responseType = 'arraybuffer';

      // Fetch and decode asynchronously
      var _this = this;
      request.onload = function(){
        _this.audioContext.decodeAudioData(request.response, function(audioBuffer){
          _sample.buffer = audioBuffer;
          loadDeferred.resolve(_sample);
        }, loadDeferred.reject);
      }
      request.send();
    } 
    // Base64
    else if (_sample.base64){
      // Decode asynchronously.
      var arrayBuffer = Base64Utils.base64DecToArr(_sample.base64).buffer;
      this.audioContext.decodeAudioData(arrayBuffer, function(audioBuffer){
        _sample.buffer = audioBuffer;
        loadDeferred.resolve();
      }, loadDeferred.reject);
    }

    return _sample.loadPromise;
  }

  getPromise(key) {
    var deferred = new $.Deferred();
    // Fake loading by creating noise buffer.
    var buffer = this.audioContext.createBuffer(1, 44100, 44100);
    var data = buffer.getChannelData(0);
    for (i = 0; i < data.length; i++) {
      data[i] = 0;
    }
    if (this.loadTime){
      setTimeout(function(){
        deferred.resolve(buffer);
      }, this.loadTime);
    }
    else{
      deferred.resolve(buffer);
    }
    return deferred.promise();
  }

  scheduleEvent(event) {
    var actionHandler = this._actionHandlers[event.action];
    actionHandler(this, event);
    this._scheduledEvents.push(event);
  }

  _schedulingLoop() {
    var currentTime = this.getCurrentTime();
    var scheduledIdx = this._scheduledEvents.length;
    while (scheduledIdx--){
      var event = this._scheduledEvents[scheduledIdx];
      if (event.time <= currentTime){
        // @TODO: not sure how performant this is, or if it matters.
        // But may want to switch to something w/ constant-time 
        // deletion later if it's a problem.
        this._scheduledEvents.splice(scheduledIdx,1);
        if (event.callback){
          event.callback();
        }
      }
    }
    
    this._schedulingTimer = setTimeout(() => {
      this._schedulingLoop()
    }, this.schedulingInterval);
  }

}

module.exports = AudioManager;
