
const cardinalPoints = ['N','E','S','W'];

/**
 * Set up Position with `coordinate` and `cardinal`

 * @param {Object} coordinate
 * @param {String} cardinal
 * @api public
 */
module.exports = class Position {
    constructor(coordinate, cardinal) {
        this.x = coordinate.x;
        this.y = coordinate.y;
        this.c = cardinal;

        this.isValid();
    }

    /**
     * Types validator
     *
     * @api public
     */

    isValid() {
        if(!this.isCoordinates(this.x,this.y)) {
            throw new Error('Coordinates are not valid');
        }
        if(!this.isCardinal(this.c)) {
            throw new Error('Cardinal point is not valid');
        }
    }

    /**
     * Coordinates validator
     *
     * @api protected
     */

    isCoordinates() {
        return this.x === parseInt(this.x, 10) && this.y === parseInt(this.y, 10);
    }

    /**
     * Cardinal validator helper
     *
     * @param {String} cardinal
     * @api protected
     */

    isCardinal() {
        return typeof this.c === 'string' && typeof cardinalPoints.find(c => c === this.c) !== 'undefined';
    }

    clone() {
        let clone = Object.assign({}, this);
        Object.setPrototypeOf(clone, Object.getPrototypeOf(this));
        return clone;
    }
};
