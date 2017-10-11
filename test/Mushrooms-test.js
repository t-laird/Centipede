const Mushrooms = require('../lib/Mushrooms.js');
const chai = require('chai');
const assert = chai.assert;
let mushroom;

describe('Mushrooms', function() {
  beforeEach( () => {
    mushroom = new Mushrooms(48,96,4);
  });
  
  it('Should be instantiated at the values passed in to it', function() {
    assert.equal(mushroom.x, 48);
    assert.equal(mushroom.y, 96);
    assert.equal(mushroom.level, 4);
  });
});