'use strict';

const expect = require('expect.js');

const Position = require('../lib/position');
const Grid = require('../lib/grid');
const Mower = require('../lib/mower');

describe('Mower', function() {
    describe('runStep', function () {
        const grid = new Grid(new Position({x:5,y:5}, 'N'));
        it('should stop at positon 1 3 N', function (done) {
            const position = new Position({x:1,y:2}, 'N'),
                mower = new Mower(0, grid, position, ['G','A','G','A','G','A','G','A','A']);
            mower.runStep().then(function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:1, y:3, c:'N' });
                done();
            });
        });
        it('should stop at positon 4 1 E', function (done) {
            const position = new Position({x:3,y:3}, 'E'),
                mower = new Mower(0, grid, position, ['A','D','A','A','D','A','D','D','A']);
            mower.runStep().then(function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:4, y:1, c:'E' });
                done();
            });
        });
        it('should stop at positon 5 4 N', function (done) {
            const position = new Position({x:5,y:2}, 'S'),
                mower = new Mower(0, grid, position, ['A','G','A','G','A','A','D','A','G','A']);
            mower.runStep().then(function(mowerUpdated) {
                expect(mowerUpdated.position).to.eql({ x:5, y:4, c:'N' });
                done();
            });
        });
    });
    describe('isValid', function () {
        const grid = new Grid(new Position({x:8,y:8}, 'N')),
            position = new Position({x:3,y:3}, 'E');
        it('should throw an error when ID is not valid', function () {
            expect(function() {
                new Mower(false, grid, position, ['A']);
            }).to.throwException(/Id is not valid/);
        });
        it('should throw an error when GRID is not valid', function () {
            expect(function() {
                new Mower(0, false, position, ['A']);
            }).to.throwException(/Grid is not valid/);
        });
        it('should throw an error when POSITION is not valid', function () {
            expect(function() {
                new Mower(0, grid, false, ['A']);
            }).to.throwException(/Position is not valid/);
        });
        it('should throw an error when INSTRUCTIONS are not valid', function () {
            expect(function() {
                new Mower(0, grid, position, false);
            }).to.throwException(/Instructions are not valid/);
        });
    });
});