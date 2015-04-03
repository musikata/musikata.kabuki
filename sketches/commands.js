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
