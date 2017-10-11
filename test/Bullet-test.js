const Bullet = require('../lib/Bullet.js');
const chai = require('chai');
const assert = chai.assert;

describe('Bullet', function() {
  it('it should be instantiated with values passed into it', function() {
  	let bullet = new Bullet(100, 200, 5);
  	assert.equal(bullet.x, 97);
  	assert.equal(bullet.y, 206);
  	assert.equal(bullet.level, 5);
  });

  it('it should be instantiated with default values', function() {
  	let bullet = new Bullet(100, 200, 5);
  	assert.equal(bullet.height, 12);
  	assert.equal(bullet.width, 3);
  });
})