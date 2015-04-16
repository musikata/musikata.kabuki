/**
 * CommandHandler: for handling script commands.
 * @TODO: Flesh this out!
 **/

class CommandHandler {
    constructor(opts) {
        this.channel = opts.channel;
    }

    handle(cmd) {
        console.log('handle', cmd);
    }
}

module.exports = CommandHandler;
