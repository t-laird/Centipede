var Mushrooms = require('./Mushrooms.js');
var Player = require('./Player.js');
var Spider = require('./Spider.js');
var Worm = require('./Worm.js');
var Bullet = require('./Bullet.js');
var CentipedeSegment = require('./Centipede-Segment.js');
var CentipedeWhole = require('./Centipede-Whole.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var arrayOfMushrooms = [];
var playerInitialize = new Player(360,672);
var centipede = new CentipedeWhole;
const then = Date.now();


for (var i = 0; i < 46; i ++) {
  var randX = Math.floor(Math.random() * 30) * 24;
  var randY = Math.floor(Math.random() * 29) * 24;

  arrayOfMushrooms.push(new Mushrooms(randX,randY));
}

console.log(arrayOfMushrooms);

function gameLoop () {
  context.clearRect(0,0,canvas.width,canvas.height);
  arrayOfMushrooms.forEach(function (mushroom) {
    mushroom.draw(context);
  });

  playerInitialize.update(context, arrayOfMushrooms);

  playerInitialize.gun.update(context);

  playerInitialize.gun.collide(arrayOfMushrooms);
  
  let now = Date.now();

  if ((now - then) % 3 === 0) {
    centipede.animate();
  }
  
  centipede.draw(context);
  centipede.move();

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

