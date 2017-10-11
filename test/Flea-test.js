const Flea = require('../lib/Flea.js');
const chai = require('chai');
const assert = chai.assert;

let flea;


describe('Flea', function() {
	beforeEach( () => {
		flea = new Flea(5);
	});

  it('should be instantiated at y=24', function() {
    assert.equal(flea.y, 24);
  });

  it('should be 27px tall and 24px wide', function() {
    assert.equal(flea.width, 27);
    assert.equal(flea.height, 24);
  });

	it('should be instantiated with a health of 2', function() {
    assert.equal(flea.health, 2);
  });

	it('it should drop mushrooms as it moves', function() {
    var mushroomArray = [];
    assert.equal(mushroomArray.length, 0)
    for (let i = 0; i < 240; i++) {
      flea.update(mushroomArray, 5);
    }
    assert.equal(mushroomArray.length > 0, true)
  });

  it('it should move faster on higher levels', function() {
    let slowFlea = new Flea(2);
    let fasterFlea = new Flea(6);
    assert.equal(slowFlea.y === fasterFlea.y, true)
    slowFlea.update([],2);
    fasterFlea.update([],6);
    assert.equal(slowFlea.y < fasterFlea.y, true)
  });

  it('it should have a max speed of 5', function() {
    let level30Flea = new Flea(30)
    let level40Flea = new Flea(40);
    level30Flea.update([], 30);
    level40Flea.update([], 40);
    assert.equal(level30Flea.y === level40Flea.y, true);
  });
})