/**
 * ScriptProcessor: handles commands given in a script.
 * @TODO: flesh out documentation.
 **/

var $ = require('jquery');


class ScriptProcessor {
    constructor(options) {
        this.commandHandler = options.commandHandler;
        this._script = null;
    }

    processScript(script) {
        this._script = script;
        // Kick-off command processing.
        this.processNextCommand();
    }

    /**
     * Process commands, returning a promise for
     * each result.
    **/
    processNextCommand() {
        var nextCmd = this._script.commands.shift();
        if (! nextCmd) {
            return;
        }

        // Process the next command when the current
        // command resolves.
        $.when(this.commandHandler.handle(nextCmd)).then(() => {
            this.processNextCommand();
        });
    }
}

module.exports = ScriptProcessor;
