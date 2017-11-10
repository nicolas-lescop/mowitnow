
const cardinalPoints = ['N','E','S','W'];

/**
 * Set up Move with `mower` and `grid`
 * which is responsible for moving mowers
 *
 * @param {Object} mower
 * @param {String} grid
 * @api public
 */
module.exports = class Move {
    constructor(mower, grid){
        this.mower = mower;
        this.grid = grid;
    }

    /**
     * Call the movement method from an instruction
     *
     * @param {String} instruction
     * @api public
     */
    runInstruction(instruction) {
        return new Promise((resolve, reject) => {
            switch(instruction) {
                case 'A':
                    this.goForward();
                    break;
                case 'G':
                case 'D':
                    this.turn(instruction);
                    break;
                default:
                    reject( new Error('Invalid instruction: '+instruction) );
            }
            resolve(this.mower.position);
        });
    }

    /**
     * Update mower's position if not occupied
     *
     * @param {Object} newPosition
     * @api public
     */
    updatePosition(newPosition) {
        this.mower.position = newPosition;
        this.grid.setItemPosition(this.mower.id, newPosition); // save new position in grid object
    }

    /**
     * Return false if the given position is occupied or not allowed
     *
     * @param {Object} position
     * @return {Boolean}
     * @api public
     */

    isNextPositionAllowed(position) {
        const nextCellOccupation = this.grid.getCellOccupation(position);
        return (nextCellOccupation === null || nextCellOccupation === this.mower.id) &&
            (position.x >= 0 && position.x <= this.grid.width && position.y >= 0 && position.y <= this.grid.height);
    }

    /**
     * Move a mower forward.
     * The direction is the actual cardinal.
     *
     * @api public
     */
    goForward() {
        const actualPosition = this.mower.position.clone();
        const nextPosition = this.getNextPositionForward(actualPosition);
        if(this.isNextPositionAllowed(nextPosition)) {
            this.updatePosition(nextPosition);
        }
    }

    /**
     * Move a mower to the left or the right.
     *
     * @param {String} instruction
     * @api public
     */
    turn(instruction) {
        const mower = this.mower;
        const cardinalIndex = cardinalPoints.findIndex(c => c === mower.position.c);
        let newPosition = mower.position.clone();
        let newCardinalIndex = cardinalIndex;
        switch(instruction) {
            case 'D':
                newCardinalIndex = cardinalIndex+1 > cardinalPoints.length-1 ? 0 : cardinalIndex+1;
                break;
            case 'G':
                newCardinalIndex = cardinalIndex-1 < 0 ? cardinalPoints.length-1 : cardinalIndex-1;
                break;
            default:
                throw new Error('Invalid instruction: '+mower.position.c);
        }
        newPosition.c = cardinalPoints[newCardinalIndex];
        this.updatePosition(newPosition);
    }

    /**
     * Move a mower forward.
     * The direction is the actual cardinal.
     *
     * @api protected
     */
    getNextPositionForward(position) {
        const valueToAdd = position.c === 'N' || position.c === 'E' ? 1 : -1;
        const propToChange = position.c ==='W' || position.c === 'E' ? 'x' : 'y';
        position[propToChange] = position[propToChange] + valueToAdd;
        return position;
    }
};
