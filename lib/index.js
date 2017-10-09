var Mushrooms = require('./Mushrooms.js');
var Player = require('./Player.js');
var Spider = require('./Spider.js');
var Bullet = require('./Bullet.js');
var CentipedeSegment = require('./Centipede-Segment.js');
var CentipedeWhole = require('./Centipede-Whole.js');
var Game = require('./Game.js');
var Flea = require('./Flea.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var game = new Game();
var arrayOfMushrooms = [];
var playerInitialize = new Player(360,672);
var centipede = new CentipedeWhole(game.level);
var arrayOfSpiders = [];
var frameCounter = 0;

var arrayOfFleas = [];

centipede.createCentipede();


for (var i = 0; i < 45; i ++) {
  var randX = Math.floor(Math.random() * 30) * 24;
  var randY = Math.floor(Math.random() * 27 + 1) * 24;

  arrayOfMushrooms.push(new Mushrooms(randX,randY,0));
}




function gameLoop () {
  if (game.paused === 'start'){
    document.querySelector('.pause-screen').classList.add('menu-display');
    requestAnimationFrame(gameLoop);
  } else if (game.paused === true){
    document.querySelector('.pause-screen').classList.remove('menu-display');
    requestAnimationFrame(gameLoop);
  } else if (game.paused === 'next-level'){
    document.querySelector('.next-level').classList.remove('menu-display');
    requestAnimationFrame(gameLoop);
  } else if (game.paused === 'you-died'){
    document.querySelector('.you-died').classList.remove('menu-display');
    requestAnimationFrame(gameLoop);
  } else if (game.paused === 'game-over'){
    document.querySelector('.game-over').classList.remove('menu-display');
    requestAnimationFrame(gameLoop);
  } else {
    context.clearRect(0,0,canvas.width,canvas.height);
    arrayOfMushrooms.forEach(function (mushroom) {
      document.querySelector('.start-screen').classList.add('menu-display');
      document.querySelector('.pause-screen').classList.add('menu-display');
      document.querySelector('.next-level').classList.add('menu-display');
      document.querySelector('.you-died').classList.add('menu-display');
      document.querySelector('.game-over').classList.add('menu-display');
      
      mushroom.draw(context);
    });
  
    playerInitialize.update(context, arrayOfMushrooms);
  
    playerInitialize.gun.update(context);
  
    playerInitialize.gun.collide(arrayOfMushrooms);
  
    playerInitialize.gun.wormCollide(centipede.segmentsArray,arrayOfMushrooms,game.level);
  
    playerInitialize.draw(context,game.level);

    if (arrayOfSpiders.length !== 0) {
      arrayOfSpiders[0].draw(context);
      arrayOfSpiders[0].move();
      arrayOfSpiders[0].pickUpShrooms(arrayOfMushrooms);
      if (arrayOfSpiders[0].x > 720){
        frameCounter = 0;
        arrayOfSpiders.splice(0,1);
      }
    }
    if (frameCounter > 250){
      generateSpider();
    }

    centipede.draw(context,arrayOfMushrooms);
    centipede.move(arrayOfMushrooms);
    centipede.checkCentipedeHealth();
  

    if (game.level >= 0 && Math.floor(Math.random() * 30) === 0) {
    	arrayOfFleas.push(new Flea(game.level));
    }

    arrayOfFleas.forEach(function(flea) {
    	flea.update(context, arrayOfMushrooms);
    })
    playerInitialize.wormCollision(centipede, game);

    if (centipede.segmentsArray.length === 0){
      if (game.level === 5){
        game.level = 0;
      } else {
        game.level++;
      }
      game.paused = 'next-level';
      arrayOfMushrooms = [];
    }
    frameCounter++;
    requestAnimationFrame(gameLoop);
  }
  
}

requestAnimationFrame(gameLoop);

document.body.addEventListener('keydown', function(event) {
  let keyCodeArray = [32, 37, 38, 39, 40]
  if (keyCodeArray.includes(event.keyCode)) {
  	event.preventDefault();
  }

 


  playerInitialize.start(event.keyCode);

  playerInitialize.gun.startFiring(event.keyCode);
});

document.body.addEventListener('keyup', function(event) {
  
  playerInitialize.stop(event.keyCode);
  playerInitialize.gun.stopFiring(event.keyCode);

});

document.body.addEventListener('keyup', startGame);

var animateGame = requestAnimationFrame(gameLoop);
cancelAnimationFrame(animateGame);
function startGame(e) {
  if (e.keyCode === 80){
  	titleMusic.volume = 0;

    if (game.paused === false) {
      game.paused = true;
    } else if (game.paused === true || game.paused === 'start') {
      game.paused = false;
    } else if (game.paused === 'next-level') {
      game.paused = false;
      for (var i = 0; i < 45; i ++) {
        var randX = Math.floor(Math.random() * 30) * 24;
        var randY = Math.floor(Math.random() * 27 + 1) * 24;
        arrayOfMushrooms.push(new Mushrooms(randX,randY,game.level));
      }
      centipede = new CentipedeWhole(game.level);
      centipede.createCentipede();

    } else if (game.paused === 'you-died') {
      game.paused = false;
      centipede = new CentipedeWhole(game.level);
      centipede.createCentipede();
      arrayOfSpiders = [];
   } else if (game.paused === 'game-over') {
      game.paused = false;
      playerInitialize.lives = 3;
      centipede = new CentipedeWhole(game.level);
      centipede.createCentipede();
      arrayOfSpiders = [];
      game.level = 0;
      document.querySelector('.points-span').innerText = 0;
    }
  }
}

var titleMusic = new Audio();
titleMusic.src = 'assets/title-screen-song.mp3';
titleMusic.autoplay = true;
document.body.appendChild(titleMusic);


if (centipede.segmentsArray.length === 0){
  console.log('trying');
  game.level++;
}

function generateSpider () {
  if (arrayOfSpiders.length === 0) {
    arrayOfSpiders[0] = new Spider(game.level);
  }
}

var spiderTimeout = setTimeout(generateSpider, 5000);




