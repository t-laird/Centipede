var Mushrooms = require('./Mushrooms.js');
var Player = require('./Player.js');
var Spider = require('./Spider.js');
var Worm = require('./Worm.js');

function gameLoop () {
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);