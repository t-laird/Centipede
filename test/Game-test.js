const Game = require('../lib/Game.js');
const chai = require('chai');
const assert = chai.assert;
const CentipedeSeg = require('../lib/Centipede-Segment.js')
const CentipedeWhole = require('../lib/Centipede-Whole.js')

let game;

describe('Game', function() {
	beforeEach( () => {
		game = new Game(1, 2);
	})

  it('should instantiate a centipede when game begins', function() {
    assert.equal(game.centipede.segmentsArray[0].length, 0);
    game.initializeGame();
    assert.equal(game.centipede.segmentsArray[0].length, 13);
  });

  it('should instantiate 45 mushrooms when game begins', function() {
  	assert.equal(game.arrayOfMushrooms.length, 0);
    game.initializeGame();
    assert.equal(game.arrayOfMushrooms.length, 45);
  });

  it('should level up when centipede is gone', function() {
    assert.equal(game.level,0);
   	game.centipede.segmentsArray = [];
   	game.levelUp();
   	assert.equal(game.level,1);
  });
});

