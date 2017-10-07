var Mushrooms = require('./Mushrooms.js');
var Player = require('./Player.js');
var Spider = require('./Spider.js');
var Bullet = require('./Bullet.js');
var CentipedeSegment = require('./Centipede-Segment.js');
var CentipedeWhole = require('./Centipede-Whole.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var arrayOfMushrooms = [];
var playerInitialize = new Player(360,672);
var centipede = new CentipedeWhole;

centipede.createCentipede();


for (var i = 0; i < 45; i ++) {
  var randX = Math.floor(Math.random() * 30) * 24;
  var randY = Math.floor(Math.random() * 27 + 1) * 24;

  arrayOfMushrooms.push(new Mushrooms(randX,randY));
}

// arrayOfMushrooms = [
//   new Mushrooms(264, 384),
//   new Mushrooms(480, 408),
//   new Mushrooms(600, 384),
//   new Mushrooms(432, 456),
//   new Mushrooms(96, 552),
//   new Mushrooms(432, 528),
//   new Mushrooms(552, 504),
//   new Mushrooms(0, 72),
//   new Mushrooms(360, 456),
//   new Mushrooms(240, 72),
//   new Mushrooms( 120, 384),
//   new Mushrooms( 672, 24),
//   new Mushrooms( 480, 480),
//   new Mushrooms( 432, 96),
//   new Mushrooms( 408, 120),
//   new Mushrooms( 480, 576),
//   new Mushrooms( 624, 120),
//   new Mushrooms( 264, 288),
//   new Mushrooms( 72, 552),
//   new Mushrooms( 48, 192),
//   new Mushrooms( 672, 168),
//   new Mushrooms( 576, 96),
//   new Mushrooms( 0, 96),
//   new Mushrooms( 504, 288),
//   new Mushrooms( 648, 72),
//   new Mushrooms( 504, 264),
//   new Mushrooms( 48, 168),
//   new Mushrooms( 48, 24),
//   new Mushrooms( 192, 144),
//   new Mushrooms( 240, 504),
//   new Mushrooms( 600, 504),
//   new Mushrooms( 72, 192),
//   new Mushrooms( 576, 264),
//   new Mushrooms( 432, 264),
//   new Mushrooms( 0, 264),
//   new Mushrooms( 96, 480),
//   new Mushrooms( 336, 408),
//   new Mushrooms( 432, 264),
//   new Mushrooms( 168, 600),
//   new Mushrooms( 192, 480),
//   new Mushrooms( 192, 432),
//   new Mushrooms( 432, 552),
//   new Mushrooms( 72, 456),
//   new Mushrooms( 144, 264),
//   new Mushrooms( 144, 528),
//   new Mushrooms( 72, 48),
// ];



console.log(arrayOfMushrooms);

function gameLoop () {
  context.clearRect(0,0,canvas.width,canvas.height);
  arrayOfMushrooms.forEach(function (mushroom) {
    mushroom.draw(context);
  });

  playerInitialize.update(context, arrayOfMushrooms);

  playerInitialize.gun.update(context);

  playerInitialize.gun.collide(arrayOfMushrooms);

  playerInitialize.gun.wormCollide(centipede.segmentsArray,arrayOfMushrooms);
  
  centipede.draw(context,arrayOfMushrooms);
  centipede.move(arrayOfMushrooms);

  requestAnimationFrame(gameLoop);
}

document.body.addEventListener('keydown', function(event) {
  event.preventDefault();

  playerInitialize.start(event.keyCode);

  playerInitialize.gun.startFiring(event.keyCode);

  console.log(event.keyCode);

});

document.body.addEventListener('keyup', function(event) {
  event.preventDefault();
  playerInitialize.stop(event.keyCode);
  playerInitialize.gun.stopFiring(event.keyCode);
  console.log(event.keyCode);
});

requestAnimationFrame(gameLoop);






