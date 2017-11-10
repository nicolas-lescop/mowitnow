
const os = require('os');
const EOL = os.EOL;
const Config = require('./config');
const Position = require('./position');
const Grid = require('./grid');
const Mower = require('./mower');

/**
 * Set up App with `options`
 * which is responsible for multiple-unit mower's remote control
 *
 * Options:
 *
 *   - `configFile` config file path
 *
 * @param {Object} options
 * @api public
 */
module.exports = class App {
    constructor(options) {
        this.options = options || {};
        this.config = new Config(this.options.configFile);
        this.logEnabled = this.options.debug || false;
        this.grid = new Grid(this.config.topRightPos);
        this.mowers = this.createMowers(this.config.mowers);
    }

    /**
     * Start mower's movement.
     *
     * @api protected
     */
    run() {
        this.mowers.forEach(mower => {
            mower.runStep().then(mower => {
                console.log(mower);
                this.log('Mower '+mower.id+' stopped at position: x:' +
                    mower.position.x+' y:'+mower.position.y+' cardinal: '+mower.position.c+EOL);
            }).catch(err => {
                console.log(err);
            });
        });
    }

    /**
     * Create mowers
     *
     * @param {Array} mowersConf
     * @api protected
     */
    createMowers(mowersConf) {
        let mowers = [];
        for (let i=0; i<mowersConf.length; i++) {
            const position = new Position(mowersConf[i].pos, mowersConf[i].cardinal);
            mowers.push(new Mower(i, this.grid, position, mowersConf[i].instructions));
        }
        return mowers;
    }

    /**
     * Stdout filtered by log option
     *
     * @param {String} message
     * @api protected
     */
    log(message) {
        if(this.logEnabled) {
            process.stdout.write(message);
        }
    }
};
