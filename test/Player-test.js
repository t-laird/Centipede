const Player = require('../lib/Player.js');
const chai = require('chai');
const Gun = require('../lib/Gun.js');
const CentipedeWhole = require('../lib/Centipede-Whole.js');
const CentipedeSegments = require('../lib/Centipede-Segment.js');
const Spider = require('../lib/Spider.js');
const assert = chai.assert;
let player;
let centipede;

describe('Player', function() {
  beforeEach (() => {
    player = new Player(360,672);
  });
  it('Should be instantiated at the location passed in.', function() {
    assert.equal(player.x,360);
    assert.equal(player.y, 672);
  });
  it('Should have default values for height and width', function () {
    assert.equal(player.height, 32);
    assert.equal(player.width, 20);
  });
  it('Should not have any x or y directional movement when instantiated', function () {
    assert.equal(player.xMovement, 0);
    assert.equal(player.yMovement, 0);
  });
  it('Should start with a gun and three lives', function () {
    assert.deepEqual(player.gun, new Gun(player));
    assert.equal(player.lives, 3);
  });
  it.skip('Should have a negative x direction when left arrow key is pressed', function () {
    player.start(37);
    assert.equal(player.xMovement, -1);
  }); //Test in document hell
  it.skip('Should have a positive x direction when right arrow key is pressed', function () {
    player.start(39);
    assert.equal(player.xMovement, 1);
  }); //Test in document hell
  it.skip('Should have a negative y direction when up arrow key is pressed', function () {
    player.start(38);
    assert.equal(player.yMovement, -1);
  }); //Test in document hell
  it.skip('Should have a positive y direction when down arrow key is pressed', function () {
    player.start(40);
    assert.equal(player.yMovement, 1);
  }); //Test in document hell
  it.skip('Should stop moving left when key is released', function () {
    player.start(37);
    assert.equal(player.xMovement,-1);
    player.stop(37);
    assert.equal(player.xMovement,0);
  }); //document reference breaks
  it.skip('Should stop moving right when key is released', function () {
    player.start(39);
    assert.equal(player.xMovement,1);
    player.stop(39);
    assert.equal(player.xMovement,0);
  }); //document reference breaks
  it.skip('Should stop moving up when key is released', function () {
    player.start(38);
    assert.equal(player.yMovement,-1);
    player.stop(38);
    assert.equal(player.yMovement,0);
  }); //document reference breaks
  it.skip('Should stop moving down when key is released', function () {
    player.start(40);
    assert.equal(player.yMovement,1);
    player.stop(40);
    assert.equal(player.yMovement,0);
  }); //document reference breaks
  it.skip('Should lose a life when colliding with the centipede', function () {
    assert.equal(player.lives, 3);
    centipede = new CentipedeWhole(3);
    centipede.segmentsArray = [[new CentipedeSegments(365,24, 24)]];
    centipede.segmentsArray[0][0].y = 668;
    player.wormCollision(centipede,{paused: false});
    assert.equal(player.lives, 2);
  }); //document reference breaks
  it.skip('Should lose a life when colliding with the spider', function () {
    assert.equal(player.lives, 3);
    let spiderArray = [new Spider(3,4)];
    spiderArray[0].x = 360;
    spiderArray[0].y = 672;
    player.spiderCollision(spiderArray,{paused: false});
    assert.equal(player.lives, 2);
  }); //document reference breaks





})