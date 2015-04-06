var ScriptProcessor = require('./ScriptProcessor');

fdescribe('ScriptProcessor', function() {

    class MockCommandHandler {
        handle(cmd) {
        }
    }


    function generateScriptProcessor() {
        return new ScriptProcessor({
            commandHandler: new MockCommandHandler()
        });
    }

    it('should be defined', function() {
        expect(ScriptProcessor).toBeDefined();
    });

    it('should process sequential commands', function(){
        var scriptProcessor = generateScriptProcessor();
        var handler = scriptProcessor.commandHandler;
        spyOn(handler, 'handle');

        var script = {
            commands: [
                {cmd: 'a'},
                {cmd: 'b'}
            ]
        }

        scriptProcessor.processScript(script);

        expect(handler.handle).toHaveBeenCalledWith({cmd: 'a'});
        expect(handler.handle).toHaveBeenCalledWith({cmd: 'b'});

    });
});
