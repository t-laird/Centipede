const CentipedeWhole = require('../lib/Centipede-Whole.js');
const CentipedeSegment = require('../lib/Centipede-Segment.js');

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
});