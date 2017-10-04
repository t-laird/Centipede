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
var arrayOfBullets = [];
var centipede = new CentipedeWhole;
const then = Date.now();

centipede.createCentipede();



for (var i = 0; i < 46; i ++) {
  var randX = Math.floor(Math.random() * 30) * 24;
  var randY = Math.floor(Math.random() * 29) * 24;

  arrayOfMushrooms.push(new Mushrooms(randX,randY));
}


function gameLoop () {
  context.clearRect(0,0,canvas.width,canvas.height);
  arrayOfMushrooms.forEach(function (mushroom) {
    mushroom.draw(context);
  });

  playerInitialize.update(context, arrayOfMushrooms);

  arrayOfBullets.forEach(function(bullet,index) {
    bullet.y -= 12;
    if (bullet.y < 0) {
      arrayOfBullets.splice(index,1);
    }
    bullet.draw(context);
  });
  
  arrayOfBullets.forEach(function (bullet, bulletIndex) {
    arrayOfMushrooms.forEach(function(mushroom,mushroomIndex) {
      if (bullet.x >= mushroom.x && bullet.x <= mushroom.x+24 && bullet.y >= mushroom.y && bullet.y <= mushroom.y + 24) {
        arrayOfBullets.splice(bulletIndex,1);
        mushroom.health--;
        if (mushroom.health === 0) {
          arrayOfMushrooms.splice(mushroomIndex,1)
        }
      }
    });
  })

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

  if (event.keyCode === 32) {
    arrayOfBullets.push(new Bullet(playerInitialize.x+10,playerInitialize.y));
  }
});

document.body.addEventListener('keyup', function(event) {
  event.preventDefault();
  playerInitialize.stop(event.keyCode);
});

requestAnimationFrame(gameLoop);



