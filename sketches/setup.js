// Idea for api for kicking things off.
//

// Play is an object that defines a play.
var play = new Play({
  acts: [
    {
      // Script to show during the loading act. Should
      // be stuff that doesn't require any loading.
      id: 'loading',
      script: [
        {cmd: 'Text', txt: "Preparing..."}
        {cmd: 'Text', txt: "Quiet your mind..."}
      ]
    },

    {
      id: 'act 1',
      script: [
        {cmd: 'Text', txt: "Let's listen."}
        {cmd: 'Audio', src: "song.mp3"}
      ]
    },

  ]
})

var theatre = new Kabuki.Theatre({
  play: myPlay
});

// Kicks things off by starting the loading...
// Everything else happens inside theatre.
theatre.start()

// Another idea is to do...
var play = new Kabuki.Play();
// And have play be the main object we interface with. Mainly semantic, whether
// it makes more sense to have theatre.play, or play.theatre.

// Or perhaps it's 
var script = new Kabuki.Script({
  assets: [
    // Define list of assets to load here.
  ],
  acts: [
    // Define cmds for each act here.
    {
      id: 'loading',
      script: [
        {cmd: 'Text', txt: "Preparing..."}
        {cmd: 'Text', txt: "Quiet your mind..."}
      ]
    }
  ]
});

play = new Kabuki.Play({
  script: script,
  theatre: {
    width: 400,
    height: 400
  }
});

play.start();


// Loading can be something like this...
loadAct(act) {
  var promises = [];
  for (asset in act.assets) {
    promises.push(this.loadAsset(asset));
  }

  $.when(promises) {
    this.startAct();
  }
}

loadAsset(asset) {
  // ...
}

// Think about how to show progress and the such. Hmm.
