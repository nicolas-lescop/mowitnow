
const fs = require('fs');

module.exports = class Config {

    /**
     * Set up Config with `configPath`
     * which is responsible for loading and parsing config file.
     *
     * @param {Object} configPath
     * @api public
     */
    constructor(configPath) {
        this.topRightPos = null;
        this.mowers = [];

        this.parseConfig(this.readFile(configPath));
    }

    /**
     * Read config file and return output
     *
     * @param {String} configPath
     * @return {String}
     * @api protected
     */
    readFile(configPath) {
        try {
            return fs.readFileSync(configPath, "utf-8");
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * Parse configuration file's content
     *
     * @param {String} configStr
     * @api protected
     */
    parseConfig(configRaw) {
        let config = {};
        let lines = configRaw.split(/\r?\n/); // Split lines
        const lastCellLine = lines[0].split(' '); // Save first line
        const mowersLines = lines.splice(1, lines.length-1); // Array of mowers
        this.topRightPos = {x:parseInt(lastCellLine[0]), y:parseInt(lastCellLine[1])}; // Define first line in config object
        
        for(let i=0; i<mowersLines.length; i++) {
            if (i%2){
                const position = mowersLines[i-1].split(' ');
                this.mowers.push({
                    pos:{x:parseInt(position[0]), y:parseInt(position[1])},
                    cardinal:position[2],
                    instructions:mowersLines[i].split('')
                });
            }
        }
    }
};
