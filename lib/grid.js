
const Position = require('./position');

/**
 * Set up Grid with `topRightPos`
 *
 * Parameters:
 *
 *   - `topRightPos` coordinates of the cell at the top right of the grid. ({x:1,y:1})
 *
 * @param {Object} topRightPos
 * @api public
 */
module.exports = class Grid {
    constructor(topRightPos) {
        this.width = topRightPos.x;
        this.height = topRightPos.y;
        this.occupation = {};

        this.isValid();
    }

    /**
     * Types validator
     *
     * @api public
     */
    isValid() {
        if(!this.isCoordinates(this.width,this.height)) {
            throw new Error('Coordinates are not valid');
        }
    }

    /**
     * Save item's position inside the grid
     *
     * @param {Number} id
     * @param {Object} position
     * @api public
     */
    setItemPosition(id, position) {
        this.occupation[id] = position;
    }


    /**
     * Get cell occupation as a boolean
     *
     * @param {Object} position
     * @api public
     */
    getCellOccupation(position) {
        if(position instanceof Position){
            for(var id in this.occupation){
                if(this.occupation[id].x === position.x && this.occupation[id].y === position.y){
                    return parseInt(id);
                }
            }
            return null;
        }
        else {
            throw new Error('Position is not valid');
        }
    }

    /**
     * Coordinates validator
     *
     * @param {Number} x
     * @param {Number} y
     * @api protected
     */
    isCoordinates(x,y) {
        return (x === parseInt(x, 10) && x > -1) && (y === parseInt(y, 10) && y > -1);
    }
};
