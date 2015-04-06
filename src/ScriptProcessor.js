class ScriptProcessor {
    constructor(options) {
        this.commandHandler = options.commandHandler;
    }

    processScript(script) {
        script.commands.forEach((cmd) => {
            this.commandHandler.handle(cmd);
        });
    }
}

module.exports = ScriptProcessor;
