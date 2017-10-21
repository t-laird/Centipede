var Mushrooms = require('./Mushrooms.js');
var Player = require('./Player.js');
var Spider = require('./Spider.js');
var CentipedeWhole = require('./Centipede-Whole.js');
var Flea = require('./Flea.js');

class Game {
  constructor (context, canvas){
    this.level = 0;
    this.difficultyLevel = 0;
    this.paused = 'start';
    this.context = context;
    this.canvas = canvas;
    this.arrayOfMushrooms = [];
    this.playerInitialize = new Player(360, 672);
    this.arrayOfSpiders = [];
    this.frameCounter = 0;
    this.arrayOfFleas = [];
    this.centipede = new CentipedeWhole(this.level);
  }

  initializeGame() {
    this.centipede.createCentipede();

    for (var i = 0; i < 45; i ++) {
      var randX = Math.floor(Math.random() * 30) * 24;
      var randY = Math.floor(Math.random() * 27 + 1) * 24;

      this.arrayOfMushrooms.push(new Mushrooms(randX,randY,0));
    }
  }

  playButtonAni() {
    document.querySelector('.play-button img').removeAttribute('src');
    document.querySelector('.play-button img').setAttribute('src', 'assets/play-down.svg')
    setTimeout(this.playUp, 150);
  }

  playUp() {
    document.querySelector('.play-button img').removeAttribute('src');
    document.querySelector('.play-button img').setAttribute('src', 'assets/play-up.svg')

  }

  pauseUp() {
    document.querySelector('.pause-button img').removeAttribute('src');
    document.querySelector('.pause-button img').setAttribute('src', 'assets/pause-up.svg')
  }

  pauseDown() {
    document.querySelector('.pause-button img').removeAttribute('src');
    document.querySelector('.pause-button img').setAttribute('src', 'assets/pause-down.svg')
  }

  gameLoop() {
    if (this.paused === 'start'){
      document.querySelector('.pause-screen').classList.add('menu-display');
      requestAnimationFrame(this.gameLoop.bind(this));
    } else if (this.paused === true){
      document.querySelector('.pause-screen').classList.remove('menu-display');
      this.pauseDown();
      requestAnimationFrame(this.gameLoop.bind(this));
    } else if (this.paused === 'next-level'){
      document.querySelector('.next-level').classList.remove('menu-display');
      requestAnimationFrame(this.gameLoop.bind(this));
    } else if (this.paused === 'you-died'){
      document.querySelector('.you-died').classList.remove('menu-display');
      requestAnimationFrame(this.gameLoop.bind(this));
    } else if (this.paused === 'game-over'){
      document.querySelector('.game-over').classList.remove('menu-display');
      requestAnimationFrame(this.gameLoop.bind(this));
    } else {

      this.pauseUp();
      this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

      document.querySelector('.start-screen').classList.add('menu-display');
      document.querySelector('.pause-screen').classList.add('menu-display');
      document.querySelector('.next-level').classList.add('menu-display');
      document.querySelector('.you-died').classList.add('menu-display');
      document.querySelector('.game-over').classList.add('menu-display');

      this.arrayOfMushrooms.forEach(mushroom => {
        mushroom.draw(this.context);
      });

      this.playerInitialize.update(this.context, this.arrayOfMushrooms);
      this.playerInitialize.gun.update(this.context, this.level);
      this.playerInitialize.gun.collide(this.arrayOfMushrooms);
      this.playerInitialize.gun.wormCollide(this.centipede.segmentsArray,this.arrayOfMushrooms,this.level);
      this.playerInitialize.gun.fleaCollide(this.arrayOfFleas);  
      this.playerInitialize.draw(this.context,this.level);
      this.playerInitialize.wormCollision(this.centipede, this);
      this.playerInitialize.fleaCollision(this.arrayOfFleas, this);
      this.playerInitialize.gun.move();

      this.centipede.draw(this.context,this.arrayOfMushrooms);
      this.centipede.move(this.arrayOfMushrooms);
      this.centipede.checkCentipedeHealth();

      if (this.arrayOfSpiders.length !== 0){
        this.playerInitialize.spiderCollision(this.arrayOfSpiders, this);
        this.playerInitialize.gun.spiderCollide(this.arrayOfSpiders, this);
        this.frameCounter = 0;
      }

      if (this.arrayOfSpiders.length !== 0) {
        this.arrayOfSpiders[0].draw(this.context);
        this.arrayOfSpiders[0].move(this.difficultyLevel);
        this.arrayOfSpiders[0].pickUpShrooms(this.arrayOfMushrooms);
        if (this.arrayOfSpiders[0].x > 720){
          this.frameCounter = 0;
          this.arrayOfSpiders.splice(0,1);
        }
      }

      if (this.frameCounter > 250){
        this.generateSpider();
      }

      this.centipede.segmentsArray.forEach((currentSeg, currentSegIndex) => {
        currentSeg.forEach((indivSeg) => {
          this.centipede.segmentsArray.forEach((currentSeg2, currentSegIndex2) => {
            currentSeg2.forEach((indivSeg2, indivIndex2) => {
              if (indivSeg.x === indivSeg2.x && indivSeg.y === indivSeg2.y && indivSeg.animationState && indivSeg2.animationState && indivSeg.tempAnimationState === indivSeg2.tempAnimationState && currentSegIndex !== currentSegIndex2){
                currentSeg2.splice(indivIndex2);
              }
            });
          });
        });
      });

      this.centipede.segmentsArray.forEach(segment => {
        segment.forEach(piece => {
          piece.headAnimation();
        });
      });


      if (this.centipede.segmentsArray.length === 0){
        this.levelUp();
      }					

      if (this.difficultyLevel >= 0 && (Math.floor(Math.random() * Math.max((1600 - this.difficultyLevel * 200), 700))) === 0) {
        this.arrayOfFleas.push(new Flea(this.level));
      }

      this.arrayOfFleas.forEach((flea,fleaIndex) => {
        flea.draw(this.context, this.level);
        flea.update(this.arrayOfMushrooms, this.difficultyLevel);
        if (flea.y > 720){
          this.arrayOfFleas.splice(fleaIndex,1);
        }
      });

      this.frameCounter++;
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  generateSpider () {
    if (this.arrayOfSpiders.length === 0) {
      this.arrayOfSpiders[0] = new Spider(this.level);
    }
  }

  levelUp () {
    this.playerInitialize.gun.increaseScore(500);
    if (this.level === 5){
      this.level = 0;
      this.difficultyLevel++;
      document.querySelector('.level-span').innerText = this.difficultyLevel + 1;
      this.playerInitialize.gun.level = 0;
    } else {
      this.level++;
      this.difficultyLevel++;
      document.querySelector('.level-span').innerText = this.difficultyLevel + 1;
      this.playerInitialize.gun.level++;
    }
		
    this.centipede = new CentipedeWhole(this.level);
    this.centipede.createCentipede();
    this.frameCounter = 0;
    this.arrayOfSpiders = [];

    this.arrayOfMushrooms.forEach( mushroom => {
      mushroom.level = this.level;
    });
  }

}






module.exports = Game;