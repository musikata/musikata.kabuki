/**
* Basic audio plugin.
* Probably not that useful yet, mainly here to test out architecture ideas.
**/

var $ = require('jquery');

class AudioWidget {
  constructor(opts) {
    this.audioManager = opts.audioManager;
    this.channel = opts.channel;

    this.channel.reply('playSample', this.playSample, this);
  }

  playSample(sampleOpts) {
    var playDfd = new $.Deferred();
    this.audioManager.loadSample(sampleOpts).then((sample) => {
      this.audioManager.scheduleEvent({
        action: 'sample:start',
        time: this.audioManager.getCurrentTime(),
        sample: sample,
        callback: () => {
          playDfd.resolve();
        }
      });

    });

    return playDfd.promise();
  }
}

module.exports = {
  pluginId: 'Audio',
  widgets: {
    'AudioWidget': AudioWidget
  }
};
