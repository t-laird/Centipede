var Mushrooms = require('./Mushrooms.js');
var Player = require('./Player.js');
var Spider = require('./Spider.js');
var Worm = require('./Worm.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');


var arrayOfMushrooms = [];

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
  })
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);