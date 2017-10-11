const Gun = require('../lib/Gun.js');
const chai = require('chai');
const assert = chai.assert;
const Bullet = require('../lib/Bullet');
const Mushrooms = require('../lib/Mushrooms.js');
const Flea = require('../lib/Flea.js');
const CentipedeSegment = require('../lib/Centipede-Segment.js');
const CentipedeWhole = require('../lib/Centipede-Whole.js');
const Spider = require('../lib/Spider.js')


let gun;

describe('Gun', function() {
	beforeEach( () => {
		gun = new Gun(1);
	})

	it('when the gun is fired, a bullet is created', function() {
	  assert.equal(gun.arrayOfBullets.length, 0);
	  gun.fire();
	  assert.equal(gun.arrayOfBullets.length, 1);
	});

	it('only 1 bullet is allowed on the screen at a time', function() {
	  assert.equal(gun.arrayOfBullets.length, 0);
	  gun.fire();
	  gun.fire();
	  assert.equal(gun.arrayOfBullets.length, 1);	
	});

	it('when a bullet hits a mushroom, mushroom health should decrease', function() {
	  let mushroomArray = [new Mushrooms(240, 240, 1)];
	  gun.arrayOfBullets = [new Bullet(250, 260, 1)];
	  assert.equal(mushroomArray[0].health, 4);
	  gun.move();
	  gun.collide(mushroomArray);
	  assert.equal(mushroomArray[0].health, 3);
	  //document reference breaks
	});

	it('when a bullet hits a flea, flea health should decrease', function() {
		let fleaArray = [new Flea(1)];
		fleaArray[0].x = 240;
		fleaArray[0].y = 240;
		gun.arrayOfBullets = [new Bullet(243, 256, 1)];
		assert.equal(fleaArray[0].health, 2);
		gun.move();
		gun.collide(fleaArray);
		assert.equal(fleaArray[0].health, 1);
		//document reference breaks
	});

	it('when a bullet hits a centipede segment, the centipede segment becomes a mushroom', function() {
	  let centipede = new CentipedeWhole(3);
    centipede.segmentsArray = [[(new CentipedeSegment(247, 24, 24)), (new CentipedeSegment(580, 24, 24))]];
    centipede.segmentsArray[0][0].y = 254;
    assert.equal(centipede.segmentsArray[0].length, 2);
    gun.arrayOfBullets = [new Bullet(250, 271, 1)];
    let mushroomArray = [new Mushrooms(240, 240, 1)];
   	assert.equal(mushroomArray.length, 1);
    gun.move();
    gun.wormCollide(centipede.segmentsArray, mushroomArray, 3);
    assert.equal(mushroomArray.length, 2);
    //document reference breaks
	});

	it('when a bullet hits a spider, the spider dies', function() {
	 let spiderArray = [new Spider(1,8)];
	 spiderArray[0].x = 240;
	 spiderArray[0].y = 240;
	 gun.arrayOfBullets = [new Bullet(250, 271, 1)];
	 assert.equal(spiderArray.length, 1)
	 gun.move();
	 gun.spiderCollide(spiderArray, 1);
	 assert.equal(spiderArray.length, 0);
	 //document reference breaks

	});

})