const Spider = require('../lib/Spider.js');
const Mushroom = require('../lib/Mushrooms.js');
const chai = require('chai');
const assert = chai.assert;
// const context = require('../lib/index.js');
let spider;


describe('Spider', function() {
  beforeEach( () => {
    spider = new Spider(3, 9);
  });

  it('Should be instantiated at x=24 and y=432', function() {
    assert.equal(spider.x, 24);
    assert.equal(spider.y, 432);
  });

  it('Should be 45px wide and 24 tall by default', function (){
    assert.equal(spider.width, 45);
    assert.equal(spider.height, 24);
  });

  it('Should be in its first animation state and initialized with y and x speeds of 4',function () {
    assert.equal(spider.animationState, 0);
    assert.equal(spider.dX, 4);
    assert.equal(spider.dY, 4);
  });

  it('Should be instantiated with the level passed in via its first argument.', function () {
    assert.equal(spider.alreadyDown, false);
    assert.equal(spider.level, 3);
  });

  it('Move to the correct positions when moved once', function() {
    spider.move(4);
    assert.equal(spider.x,28);
    assert.equal(spider.y,436);
  });
  
  
  it('Should reverse y direction at the bottom of the canvas', function () {
    //move spider to first reverse point
    for (let i = 0 ; i < 67; i++){
      spider.move(4)
    }
    assert.equal(spider.dY, -3.8);
  });

  it('Should reverse y direction again at x>288 and y<504', function () {
    //move spider to second reverse point
    for (let i = 0; i < 120; i++){
      spider.move(4);
    }
    assert.equal(spider.dY, 3.8);
    assert.equal(spider.dX, 3.8);
  });

  it('Should pick up a mushroom if it crosses its path', function() {
    let mushroomArray = [new Mushroom(68,468,4)];
    spider.move(4);
    spider.pickUpShrooms(mushroomArray);
    assert.equal(mushroomArray.length, 1);
    for (let i = 0 ; i < 10 ; i++){
      spider.move(4);
      spider.pickUpShrooms(mushroomArray);
    }
    assert.equal(mushroomArray.length, 0);
  });
});