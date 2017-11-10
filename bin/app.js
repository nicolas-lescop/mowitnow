#! /usr/bin/env node 

const path = require('path');
const App = require('../lib/app');

if(process.argv.indexOf('run') !== -1) {
    const args = process.argv.slice(process.argv.indexOf('run')+1);
    const defaultConfig = path.normalize('config/default');
    const app = new App({
        configFile : args[0] || defaultConfig,
        debug: true
    });
    app.run();
}
else if(process.argv.indexOf('help') !== -1) {
    process.stdout.write("Usage:\n> mowitnow run [configPath]");
}
else {
    process.stdout.write("Unknown command.\nType ’mowitnow help’ to know about all commands.");
}