var Mushrooms = require('./Mushrooms.js');
var CentipedeWhole = require('./Centipede-Whole.js');
var Game = require('./Game.js');
var canvas = document.getElementById('game'); //keep
var context = canvas.getContext('2d'); //keep

var game = new Game(context, canvas); //keep


game.initializeGame();

game.gameLoop();

document.body.addEventListener('keydown', function(event) {
  let keyCodeArray = [32, 37, 38, 39, 40];
  if (keyCodeArray.includes(event.keyCode)) {
    event.preventDefault();
    if (event.repeat) {
      return;
    }
  }
  game.playerInitialize.start(event.keyCode);
  game.playerInitialize.gun.startFiring(event.keyCode);
});

document.body.addEventListener('keyup', function(event) {
  game.playerInitialize.stop(event.keyCode);
  game.playerInitialize.gun.stopFiring(event.keyCode);
});

document.body.addEventListener('keyup', function(event) {
  if (event.keyCode === 220){
    game.centipede.segmentsArray = [];
  }
});

document.body.addEventListener('keyup', startGame);

function startGame(e) {
  if (e.keyCode === 80){

    if (game.paused === false) {
      game.paused = true;
    } else if (game.paused === true || game.paused === 'start') {
      game.paused = false;
      game.playButtonAni();
    } else if (game.paused === 'next-level') {
      game.paused = false;


      game.centipede = new CentipedeWhole(game.level%5);
      game.centipede.createCentipede();
      game.frameCounter = 0;
      game.arrayOfSpiders = [];

      game.arrayOfMushrooms.forEach( mushroom => {
        mushroom.level =(game.level%5);
      });

    } else if (game.paused === 'you-died') {
      game.paused = false;
      game.playButtonAni();
      
      game.centipede = new CentipedeWhole(game.level%5);
      game.centipede.createCentipede();
      game.arrayOfSpiders = [];

      game.frameCounter = 0;
    } else if (game.paused === 'game-over') {
      game.paused = false;
      game.playerInitialize.lives = 3;
      game.level = 0;
      game.difficultyLevel = 0;
      game.centipede = new CentipedeWhole(game.level%5);
      game.centipede.createCentipede();
      game.arrayOfSpiders = [];
      document.querySelector('.points-span').innerText = 0;
      document.querySelector('.level-span').innerText = this.difficultyLevel + 1;
      game.arrayOfMushrooms = [];
      for (var i = 0; i < 45; i ++) {
        var randX = Math.floor(Math.random() * 30) * 24;
        var randY = Math.floor(Math.random() * 27 + 1) * 24;
        game.arrayOfMushrooms.push(new Mushrooms(randX,randY, game.level%5));
      }
      game.frameCounter = 0;

      var life1 = document.querySelector('.life-holder-1');
      var life2 = document.querySelector('.life-holder-2');
      var life3 = document.querySelector('.life-holder-3');

      life1.removeAttribute('hidden');
      life2.removeAttribute('hidden');
      life3.removeAttribute('hidden');
    }
  }
}

if (game.centipede.segmentsArray.length === 0){
  game.level++; 
  game.difficultyLevel++; 
}




