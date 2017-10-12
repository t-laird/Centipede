const CentipedeWhole = require('../lib/Centipede-Whole.js');
const CentipedeSegment = require('../lib/Centipede-Segment.js');
const Mushrooms = require('../lib/Mushrooms.js');

const chai = require('chai');
const assert = chai.assert;

let centipede;
let centipedeSegment;

describe('Centipede', function() {
  beforeEach( () => {
    centipede = new CentipedeWhole(3);
    centipedeSegment = new CentipedeSegment(360, 24, 24);
  });
  it('Segments should be instantiated with the x coordinates and width and height passed into it.', function() {
    assert.equal(centipedeSegment.x,360);
    assert.equal(centipedeSegment.w, 24);
    assert.equal(centipedeSegment.h, 24);
  });
  it('Segments should start with correct default values', function () {
  	assert.equal(centipedeSegment.animationState, 0);
  	assert.equal(centipedeSegment.isHead, false);
  	assert.equal(centipedeSegment.speed, 6);
  	assert.equal(centipedeSegment.yOffset, 24);
  });
  it('Should have a head animation if a head and a body animation if a body', function () {
    let centipedeSegment2 = new CentipedeSegment(459, 24, 24);
    centipedeSegment2.isHead = true;
    centipedeSegment2.headAnimation();
    centipedeSegment.headAnimation();

    assert.equal(centipedeSegment.animationState < 5, true);
    assert.equal(centipedeSegment2.animationState > 5, true);
  });
  it('Should have 13 segments in the segments array after being created', function () {
    assert.equal(centipede.segmentsArray[0].length, 0);
    centipede.createCentipede();
    assert.equal(centipede.segmentsArray[0].length, 13);
  });
  it('Should move at the specified pace if there are no obstacles', function() {
    centipede.createCentipede();
    let arrayOfMushrooms = [new Mushrooms(640,640,3)];
    assert.equal(centipede.segmentsArray[0][0].x, 0);
    centipede.move(arrayOfMushrooms);
    assert.equal(centipede.segmentsArray[0][0].x, 6);
  });
  it('Should go down a line and change directions when hitting a mushroom', function() {
    centipede.createCentipede();
    let arrayOfMushrooms = [new Mushrooms(48, 0,3)];
    assert.equal(centipede.segmentsArray[0][0].x, 0);
    for (let i = 0 ; i < 8 ; i++) {
      centipede.move(arrayOfMushrooms);
    }
    assert.equal(centipede.segmentsArray[0][0].y, 24);
    assert.equal(centipede.segmentsArray[0][0].speed, -6);
  });
  it('Should splice out worms if there are no segments remaining' , function() {
    centipede.createCentipede();
    assert.equal(centipede.segmentsArray.length, 1);
    centipede.segmentsArray[0]=[];
    centipede.checkCentipedeHealth();
    assert.equal(centipede.segmentsArray.length,0);
  });

});