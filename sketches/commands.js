// Playing with the idea of how to sequence commands.
// A few scenarios for commands.
// - Running in sequence.
// - Running in parallel
// - Running when a specific event or signal happens
// - Running composite commands
// - Specifying time to wait before or after command runs

// Some possible script examples:

// One that demonstrates using signals.
startPlayingMusic 'myMusic'
showText 'barley wine' when 'myMusic' is at 96 seconds, go to next command
fadeOut 'barley wine', wait 2 seconds before next command
showText 'koogly barg' when 'myMusic' is at 120 seconds
fadeOut 'koogly barg', wait 2 seconds before next command
showText 'fin' when 'myMusic' is at 120 seconds, wait for user input to finish

// One the demonstrates comands in parallel and signals.
startPlayingMusic 'myMusic'
cmdGroup1:
  showText 'dancing time', wait 5 seconds
  showText 'more dancing', wait for 'dancer2:show'
cmdGroup2:
  show dancer1
  hide dancer1 when 'myMusic' is at 10 seconds
  show dancer2 when 'myMusic' is at 11 seconds
  hide dancer2 when 'myMusic' ends
  
// Some implementation ideas:
// For waiting, run by repeatedly calling function? Or w/ recursion?
// Use promises for sequential commands. When previous promise finishes, run the next one.
// Wire up commands that depend on signals at the beginning. Then just run the other commands to trip the signals.

// Basically the goal of what we're trying to do is make it easy to write scripts that are readable.
// And then to make it possible to implement those scripts without having to do all nitty gritty infrastructure to make it work.
// Just basic scripting.

// Here's one idea:
// Process a queue iteratively and recursively.
// Use promises to delay processing the next queue item
// if desired. (Each commmand returns a promise or value).
// Find response commands before processing and wire them up
// ahead of time.
function processScriptQueue(script, recursionLevel:0) {

  if(! script.promise) {
    if (script.isSynchronousCmd) {
      script.dfd = new Deferred();
      script.promise = dfd.promise();
    } else{
      script.promise = 1;
    }
  }

  if (recursionLevel = 0) {
    // First dig out responses and wire them, so that
    // they're ready to go when we start.
    var responses = findResponses(script);
    wireResponses(responses);
  }

  // If no more commands, script is done running.
  if ! script.commands:
    script.dfd.resolve();

  // Then start processing.
  // Each iteration of this function processes a single command.
  command = script.commands.pop();
  if command isa script {
    result = processScriptQueue(command.data.script, recursionLevel+1)
  } else {
    result = doCommand(command);
  }

  when(result).then(function(){
    processScriptQueue(script, recursionLevel);
  });

  return script.promise;
};

function findResponses(script) {
  var responses = [];
  for command in script:
    if command isa script:
      responses.extend(findResponses(command));
    elif command is a response:
      responses.push(command);
  return responses;
  // Note: this is a simple implementation.
  // It does not handle the case when there are duplicate responses
  // in a single script block.
  // For example, something like:
  // ---
  // scriptId: 'myScript'
  // startMusic 'music'
  // when 'music' hits chorus say 'chorus' once
  // when 'music' hits chorus say 'chorus' once
  // ---
  // For the above script, we have two responses (when 'music' ...)
  // that respond to the same event.
  // We could solve this by grouping responses queues, where each group is keyed
  // by the id of the script block.
  // Then we would process responses in turn whenever the signal is raised.
}
