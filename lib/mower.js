
const Move = require('./move');
const Position = require('./position');
const Grid = require('./grid');

/**
 * Set up Mower with `options`
 *
 * Parameters:
 *
 *   - `id` a valid number
 *   - `grid` a valid Grid object
 *   - `position` a valid Position object
 *   - `instructions` a valid Array that contains only the following instructions : 'A', 'G' and 'D'.
 *
 * @param {Number} id
 * @param {Object} grid
 * @param {Object} position
 * @param {Array} instructions
 * @api  public
 */
module.exports = class Mower {
    constructor(id, grid, position, instructions) {
        this.id = id;
        this.grid = grid;
        this.position = position;
        this.instructions = instructions;
        this.move = new Move(this, grid);

        this.isValid();
    }

    /**
     * Types validator
     *
     * @api public
     */
    isValid() {
        if(!Number.isInteger(this.id)) {
            throw new Error('Id is not valid');
        }
        if(this.grid instanceof Grid === false) {
            throw new Error('Grid is not valid');
        }
        if(this.position instanceof Position === false) {
            throw new Error('Position is not valid');
        }
        if(!Array.isArray(this.instructions)) {
            throw new Error('Instructions are not valid');
        }
    }

    /**
     * Run one step then pass to next instruction or resolve promise when instructions are finished
     *
     * @param {Number} step
     * @param {Function} end
     * @api public
     */
    async runStep(step = 0) {
        const nexStep = step + 1;
        if (nexStep >= 0 && nexStep <= this.instructions.length) {
            await this.move.runInstruction(this.instructions[step]);
            return await this.runStep(nexStep);
        } else {
            return this;
        }
    }
};
