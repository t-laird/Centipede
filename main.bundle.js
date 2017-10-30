/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var Mushrooms = __webpack_require__(1);
	var CentipedeWhole = __webpack_require__(2);
	var Game = __webpack_require__(4);
	var canvas = document.getElementById('game'); //keep
	var context = canvas.getContext('2d'); //keep

	var game = new Game(context, canvas); //keep


	game.initializeGame();

	game.gameLoop();

	document.body.addEventListener('keydown', function (event) {
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

	document.body.addEventListener('keyup', function (event) {
	  game.playerInitialize.stop(event.keyCode);
	  game.playerInitialize.gun.stopFiring(event.keyCode);
	});

	document.body.addEventListener('keyup', function (event) {
	  if (event.keyCode === 220) {
	    game.centipede.segmentsArray = [];
	  }
	});

	document.body.addEventListener('keyup', startGame);

	function startGame(e) {
	  if (e.keyCode === 80) {

	    if (game.paused === false) {
	      game.paused = true;
	    } else if (game.paused === true || game.paused === 'start') {
	      game.paused = false;
	      game.playButtonAni();
	    } else if (game.paused === 'next-level') {
	      game.paused = false;

	      game.centipede = new CentipedeWhole(game.level % 5);
	      game.centipede.createCentipede();
	      game.frameCounter = 0;
	      game.arrayOfSpiders = [];

	      game.arrayOfMushrooms.forEach(mushroom => {
	        mushroom.level = game.level % 5;
	      });
	    } else if (game.paused === 'you-died') {
	      game.paused = false;
	      game.playButtonAni();

	      game.centipede = new CentipedeWhole(game.level % 5);
	      game.centipede.createCentipede();
	      game.arrayOfSpiders = [];

	      game.frameCounter = 0;
	    } else if (game.paused === 'game-over') {
	      game.paused = false;
	      game.playerInitialize.lives = 3;
	      game.level = 0;
	      game.difficultyLevel = 0;
	      game.centipede = new CentipedeWhole(game.level % 5);
	      game.centipede.createCentipede();
	      game.arrayOfSpiders = [];
	      document.querySelector('.points-span').innerText = 0;
	      document.querySelector('.level-span').innerText = this.difficultyLevel + 1;
	      game.arrayOfMushrooms = [];
	      for (var i = 0; i < 45; i++) {
	        var randX = Math.floor(Math.random() * 30) * 24;
	        var randY = Math.floor(Math.random() * 27 + 1) * 24;
	        game.arrayOfMushrooms.push(new Mushrooms(randX, randY, game.level % 5));
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

	if (game.centipede.segmentsArray.length === 0) {
	  game.level++;
	  game.difficultyLevel++;
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	class Mushrooms {
	  constructor(x, y, level) {
	    this.x = x;
	    this.y = y;
	    this.width = 24;
	    this.height = 24;
	    this.health = 4;
	    this.level = level;
	  }

	  draw(context) {
	    var mushroom = document.getElementById("mushroom");

	    context.drawImage(mushroom, (this.health - 1) * 96, this.level * 96, 96, 96, this.x, this.y, 24, 24);
	    // context.drawImage(mushroom, this.x, this.y, this.width, this.height);
	  }

	  // createMushroom () {
	  //   for (var i = 0; i < 45; i++) {
	  //     this.segmentsArray[0].push(new CentipedeSeg(i*24,21,24));
	  //   }
	  // }
	}

	//3 shots to destroy
	//45 mushrooms


	module.exports = Mushrooms;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const CentipedeSeg = __webpack_require__(3);

	class CentipedeWhole {
	  constructor(level) {
	    this.segmentsArray = [[]];
	    this.y = 0;
	    this.segmentFrames = 0;
	    this.yOffset = 24;
	    this.yMin = 0;
	    this.level = level;
	  }

	  createCentipede() {
	    for (var i = 0; i < 13; i++) {
	      this.segmentsArray[0].push(new CentipedeSeg(i * 24, 21, 24));
	    }
	  }

	  draw(context) {
	    this.segmentsArray.forEach(centipede => {
	      centipede.forEach((segment, index, segments) => {
	        var centipedeImg = document.getElementById('centipede');
	        if (index === segments.length - 1) {
	          segment.isHead = true;
	        } else {
	          segment.isHead = false;
	        }
	        segment.headAnimation();
	        if (segment.speed < 0) {
	          context.drawImage(centipedeImg, segment.animationState * 84 + 840, this.level * 96, 84, 96, segment.x, segment.y, segment.h, segment.w);
	        } else {
	          context.drawImage(centipedeImg, segment.animationState * 84, this.level * 96, 84, 96, segment.x, segment.y, segment.h, segment.w);
	        }
	      });
	    });
	  }

	  move(mushrooms) {
	    this.segmentsArray.forEach(centipede => {
	      centipede.forEach(segment => {
	        mushrooms.forEach(mushroom => {
	          if (segment.speed > 0 && (segment.x === 720 - segment.speed || segment.x + 24 === mushroom.x && segment.y === mushroom.y)) {
	            segment.y += segment.yOffset;
	            var changeDir = -1;
	            mushrooms.forEach(shroomTwo => {
	              if (shroomTwo.x === segment.x - 24 && shroomTwo.y === segment.y) {
	                changeDir *= -1;
	              }
	            });
	            segment.speed *= changeDir;
	          } else if (segment.speed < 0 && (segment.x < 0 || segment.x - 24 === mushroom.x && segment.y === mushroom.y)) {
	            var changeDir2 = -1;
	            segment.y += segment.yOffset;
	            mushrooms.forEach(shroomThree => {
	              if (shroomThree.x === segment.x + 24 && shroomThree.y === segment.y) {
	                changeDir2 *= -1;
	              }
	            });
	            segment.speed *= changeDir2;
	          }
	        });

	        segment.x += segment.speed;
	        if (segment.y === 696 && (segment.x === 0 || segment.x === 696)) {
	          segment.yOffset = -24;
	          this.yMin = 552;
	        } else if (segment.y === this.yMin) {
	          segment.yOffset = 24;
	        }
	      });
	    });
	  }

	  checkCentipedeHealth() {
	    this.segmentsArray.forEach((worm, wormIndex) => {
	      if (worm.length === 0) {
	        this.segmentsArray.splice(wormIndex, 1);
	      }
	    });
	  }
	}

	// var centipedeMoveSound = new Audio('assets/sounds/centipede-move.wav');
	//     centipedeMoveSound.volume = 0.1;
	//     centipedeMoveSound.loop = true;

	// var levelUpSound = new Audio('assets/sounds/finish-level.wav');


	module.exports = CentipedeWhole;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	class CentipedeSegment {
	  constructor(x, h, w) {
	    this.x = x;
	    this.y = 0;
	    this.h = h;
	    this.w = w;
	    this.animationState = 0;
	    this.tempAnimationState = Math.floor(Math.random() * 5);
	    this.isHead = false;
	    this.speed = 6;
	    this.yOffset = 24;
	  }

	  headAnimation() {
	    if (this.isHead === true) {
	      if (this.tempAnimationState >= 4.9) {
	        this.tempAnimationState = 0;
	        this.animationState = Math.floor(this.tempAnimationState) + 5;
	      } else {
	        this.tempAnimationState += 0.10;
	        this.animationState = Math.floor(this.tempAnimationState) + 5;
	      }
	    } else {
	      if (this.tempAnimationState >= 4.9) {
	        this.tempAnimationState = 0;
	        this.animationState = Math.floor(this.tempAnimationState);
	      } else {
	        this.tempAnimationState += 0.10;
	        this.animationState = Math.floor(this.tempAnimationState);
	      }
	    }
	  }
	}

	module.exports = CentipedeSegment;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var Mushrooms = __webpack_require__(1);
	var Player = __webpack_require__(5);
	var Spider = __webpack_require__(8);
	var CentipedeWhole = __webpack_require__(2);
	var Flea = __webpack_require__(10);

	class Game {
	  constructor(context, canvas) {
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
	    this.spiderScore = null;
	  }

	  initializeGame() {
	    this.centipede.createCentipede();

	    for (var i = 0; i < 45; i++) {
	      var randX = Math.floor(Math.random() * 30) * 24;
	      var randY = Math.floor(Math.random() * 27 + 1) * 24;

	      this.arrayOfMushrooms.push(new Mushrooms(randX, randY, 0));
	    }
	  }

	  playButtonAni() {
	    document.querySelector('.play-button img').removeAttribute('src');
	    document.querySelector('.play-button img').setAttribute('src', 'assets/play-down.svg');
	    setTimeout(this.playUp, 150);
	  }

	  playUp() {
	    document.querySelector('.play-button img').removeAttribute('src');
	    document.querySelector('.play-button img').setAttribute('src', 'assets/play-up.svg');
	  }

	  pauseUp() {
	    document.querySelector('.pause-button img').removeAttribute('src');
	    document.querySelector('.pause-button img').setAttribute('src', 'assets/pause-up.svg');
	  }

	  pauseDown() {
	    document.querySelector('.pause-button img').removeAttribute('src');
	    document.querySelector('.pause-button img').setAttribute('src', 'assets/pause-down.svg');
	  }

	  gameLoop() {
	    if (this.paused === 'start') {
	      document.querySelector('.pause-screen').classList.add('menu-display');
	      requestAnimationFrame(this.gameLoop.bind(this));
	    } else if (this.paused === true) {
	      document.querySelector('.pause-screen').classList.remove('menu-display');
	      this.pauseDown();
	      requestAnimationFrame(this.gameLoop.bind(this));
	    } else if (this.paused === 'next-level') {
	      document.querySelector('.next-level').classList.remove('menu-display');
	      requestAnimationFrame(this.gameLoop.bind(this));
	    } else if (this.paused === 'you-died') {
	      document.querySelector('.you-died').classList.remove('menu-display');
	      requestAnimationFrame(this.gameLoop.bind(this));
	    } else if (this.paused === 'game-over') {
	      document.querySelector('.game-over').classList.remove('menu-display');
	      requestAnimationFrame(this.gameLoop.bind(this));
	    } else {

	      this.pauseUp();
	      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
	      this.playerInitialize.gun.wormCollide(this.centipede.segmentsArray, this.arrayOfMushrooms, this.level);
	      this.playerInitialize.gun.fleaCollide(this.arrayOfFleas);
	      this.playerInitialize.draw(this.context, this.level);
	      this.playerInitialize.wormCollision(this.centipede, this);
	      this.playerInitialize.fleaCollision(this.arrayOfFleas, this);
	      this.playerInitialize.gun.move();

	      this.centipede.draw(this.context, this.arrayOfMushrooms);
	      this.centipede.move(this.arrayOfMushrooms);
	      this.centipede.checkCentipedeHealth();

	      if (this.arrayOfSpiders.length !== 0) {
	        this.playerInitialize.spiderCollision(this.arrayOfSpiders, this);
	        this.playerInitialize.gun.spiderCollide(this.arrayOfSpiders, this);
	        this.frameCounter = 0;
	      }

	      if (this.arrayOfSpiders.length !== 0) {
	        this.arrayOfSpiders[0].draw(this.context);
	        this.arrayOfSpiders[0].move(this.difficultyLevel);
	        this.arrayOfSpiders[0].pickUpShrooms(this.arrayOfMushrooms);
	        if (this.arrayOfSpiders[1]) {
	          this.arrayOfSpiders[1].draw(this.context);
	        }
	        if (this.arrayOfSpiders[0].x > 744 || this.arrayOfSpiders[0].x < -48) {
	          this.frameCounter = 0;
	          this.arrayOfSpiders.splice(0, 1);
	        }
	      }

	      if (this.spiderScore) {
	        this.spiderScore.draw(this.context);
	      }

	      if (this.frameCounter > 250) {
	        this.generateSpider();
	      }

	      this.centipede.segmentsArray.forEach((currentSeg, currentSegIndex) => {
	        currentSeg.forEach(indivSeg => {
	          this.centipede.segmentsArray.forEach((currentSeg2, currentSegIndex2) => {
	            currentSeg2.forEach((indivSeg2, indivIndex2) => {
	              if (indivSeg.x === indivSeg2.x && indivSeg.y === indivSeg2.y && indivSeg.animationState && indivSeg2.animationState && indivSeg.tempAnimationState === indivSeg2.tempAnimationState && currentSegIndex !== currentSegIndex2) {
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

	      if (this.centipede.segmentsArray.length === 0) {
	        this.levelUp();
	      }

	      if (this.difficultyLevel >= 0 && Math.floor(Math.random() * Math.max(1600 - this.difficultyLevel * 200, 700)) === 0) {
	        this.arrayOfFleas.push(new Flea(this.level));
	      }

	      this.arrayOfFleas.forEach((flea, fleaIndex) => {
	        flea.draw(this.context, this.level);
	        flea.update(this.arrayOfMushrooms, this.difficultyLevel);
	        if (flea.y > 720) {
	          this.arrayOfFleas.splice(fleaIndex, 1);
	        }
	      });

	      this.frameCounter++;
	      requestAnimationFrame(this.gameLoop.bind(this));
	    }
	  }

	  generateSpider() {
	    if (this.arrayOfSpiders.length === 0) {
	      this.arrayOfSpiders[0] = new Spider(this.level);
	      console.log(this.arrayOfSpiders[0]);
	    }
	  }

	  levelUp() {
	    this.playerInitialize.gun.increaseScore(500);
	    if (this.level === 5) {
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

	    this.arrayOfMushrooms.forEach(mushroom => {
	      mushroom.level = this.level;
	    });
	  }

	}

	module.exports = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var Gun = __webpack_require__(6);

	class Player {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.height = 32;
	    this.width = 20;
	    this.xMovement = 0;
	    this.yMovement = 0;
	    this.gun = new Gun(this);
	    this.lives = 3;
	    this.playerSpeed = 4;
	  }

	  draw(context, level) {
	    var player = document.getElementById('player');

	    if (this.gun.arrayOfBullets.length > 0) {
	      context.drawImage(player, 0, level * 120, 84, 120, this.x, this.y, this.width, this.height);
	    } else {
	      context.drawImage(player, 84, level * 120, 84, 120, this.x, this.y, this.width, this.height);
	    }
	  }

	  update(context, mushrooms) {

	    mushrooms.forEach(shroom => {

	      //left
	      if (this.x - 16 <= shroom.x && this.x - 12 >= shroom.x && this.y <= shroom.y + 8 && this.y >= shroom.y - 24 && this.xMovement === -1) {
	        this.xMovement = 0;
	      }
	      // //right
	      if (this.x + 16 >= shroom.x && this.x + 12 <= shroom.x && this.y <= shroom.y + 8 && this.y >= shroom.y - 24 && this.xMovement === 1) {
	        this.xMovement = 0;
	      }
	      // //up
	      if (this.y - 20 <= shroom.y && this.y - 16 >= shroom.y && this.x <= shroom.x + 12 && this.x >= shroom.x - 8 && this.yMovement === -1) {
	        this.yMovement = 0;
	      }
	      //down
	      if (this.y + 28 >= shroom.y && this.y + 24 <= shroom.y && this.x <= shroom.x + 12 && this.x >= shroom.x - 8 && this.yMovement === 1) {
	        this.yMovement = 0;
	      }
	    });

	    this.x = Math.min(this.x + this.xMovement * Math.min(this.playerSpeed += .2, 10), 700);
	    this.y = Math.min(this.y + this.yMovement * Math.min(this.playerSpeed += .2, 10), 688);

	    this.x = Math.max(this.x, 0);
	    this.y = Math.max(this.y, 568);

	    this.draw(context);
	  }

	  start(keyCode) {
	    switch (keyCode) {
	      case 37:
	        this.playerSpeed = 4;
	        this.xMovement = -1;
	        document.querySelector('.left-button img').removeAttribute('src');
	        document.querySelector('.left-button img').setAttribute('src', 'assets/button-down.svg');
	        break;
	      case 39:
	        this.xMovement = 1;
	        this.playerSpeed = 4;

	        document.querySelector('.right-button img').removeAttribute('src');
	        document.querySelector('.right-button img').setAttribute('src', 'assets/button-down.svg');
	        break;
	      case 38:
	        this.yMovement = -1;
	        this.playerSpeed = 4;

	        document.querySelector('.up-button img').removeAttribute('src');
	        document.querySelector('.up-button img').setAttribute('src', 'assets/button-down.svg');
	        break;
	      case 40:
	        this.yMovement = 1;
	        this.playerSpeed = 4;

	        document.querySelector('.down-button img').removeAttribute('src');
	        document.querySelector('.down-button img').setAttribute('src', 'assets/button-down.svg');
	        break;
	    }
	  }

	  stop(keyCode) {
	    switch (keyCode) {
	      case 37:
	        if (this.xMovement === -1) {
	          this.xMovement = 0;
	        }
	        document.querySelector('.left-button img').removeAttribute('src');
	        document.querySelector('.left-button img').setAttribute('src', 'assets/button-up.svg');
	        break;
	      case 39:
	        if (this.xMovement === 1) {
	          this.xMovement = 0;
	        }
	        document.querySelector('.right-button img').removeAttribute('src');
	        document.querySelector('.right-button img').setAttribute('src', 'assets/button-up.svg');
	        break;
	      case 38:
	        if (this.yMovement === -1) {
	          this.yMovement = 0;
	        }
	        document.querySelector('.up-button img').removeAttribute('src');
	        document.querySelector('.up-button img').setAttribute('src', 'assets/button-up.svg');
	        break;
	      case 40:
	        if (this.yMovement === 1) {
	          this.yMovement = 0;
	        }
	        document.querySelector('.down-button img').removeAttribute('src');
	        document.querySelector('.down-button img').setAttribute('src', 'assets/button-up.svg');
	        break;
	    }
	  }

	  wormCollision(centipedeSegments, pauseState) {
	    centipedeSegments.segmentsArray.forEach(worm => {
	      worm.forEach(indivSeg => {
	        if (indivSeg.x > this.x && indivSeg.x < this.x + 20 && indivSeg.y > this.y - 10 && indivSeg.y < this.y + 20) {
	          this.reduceLife(pauseState);
	        }
	      });
	    });
	  }

	  fleaCollision(arrayOfFleas, pauseState) {
	    arrayOfFleas.forEach((flea, fleaIndex) => {
	      if (flea.x > this.x - 18 && flea.x < this.x + 16 && flea.y > this.y - 16 && flea.y < this.y + 24) {
	        arrayOfFleas.splice(fleaIndex, 1);
	        this.reduceLife(pauseState);
	      }
	    });
	  }

	  reduceLife(pauseState) {

	    this.lives -= 1;
	    if (this.lives <= 0) {
	      pauseState.paused = 'game-over';
	    } else {
	      pauseState.paused = 'you-died';
	    }

	    var life1 = document.querySelector('.life-holder-1');
	    var life2 = document.querySelector('.life-holder-2');
	    var life3 = document.querySelector('.life-holder-3');

	    if (this.lives === 2) {
	      life3.setAttribute('hidden', true);
	    } else if (this.lives === 1) {
	      life2.setAttribute('hidden', true);
	      life3.setAttribute('hidden', true);
	    } else {
	      life1.setAttribute('hidden', true);
	      life2.setAttribute('hidden', true);
	      life3.setAttribute('hidden', true);
	    }
	  }

	  spiderCollision(spiderArray, pauseState) {
	    if (this.x - spiderArray[0].x < 41 && this.x - spiderArray[0].x > -19 && this.y - spiderArray[0].y < 10 && this.y - spiderArray[0].y > -26) {

	      this.reduceLife(pauseState);
	    }
	  }

	}

	module.exports = Player;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	
	var Bullet = __webpack_require__(7);
	var Mushrooms = __webpack_require__(1);
	var Spider = __webpack_require__(8);
	var Fivehundred = __webpack_require__(9);

	class Gun {
	  constructor(player) {
	    this.player = player;
	    this.arrayOfBullets = [];
	    this.shooting = false;
	    this.blockFrames = 0;
	    this.level = 0;
	    this.score = 0;
	  }

	  move() {
	    this.arrayOfBullets.forEach(bullet => {
	      bullet.y -= 24;
	    });
	  }

	  draw(context) {
	    this.arrayOfBullets.forEach((bullet, index) => {
	      if (bullet.y < 0) {
	        this.arrayOfBullets.splice(index, 1);
	      }
	      bullet.draw(context);
	    });
	  }

	  collide(arrayOfMushrooms) {
	    this.arrayOfBullets.forEach((bullet, bulletIndex) => {
	      arrayOfMushrooms.forEach((mushroom, mushroomIndex) => {
	        if (bullet.x >= mushroom.x && bullet.x <= mushroom.x + 24 && bullet.y >= mushroom.y && bullet.y <= mushroom.y + 30) {
	          this.arrayOfBullets.splice(bulletIndex, 1);
	          mushroom.health--;
	          this.increaseScore(1);
	          if (mushroom.health === 0) {
	            arrayOfMushrooms.splice(mushroomIndex, 1);
	            this.increaseScore(4);
	          }
	        }
	      });
	    });
	  }

	  fleaCollide(arrayOfFleas) {
	    this.arrayOfBullets.forEach((bullet, bulletIndex) => {
	      arrayOfFleas.forEach((flea, fleaIndex) => {
	        if (bullet.x >= flea.x && bullet.x <= flea.x + 27 && bullet.y >= flea.y & bullet.y <= flea.y + 30) {
	          this.arrayOfBullets.splice(bulletIndex, 1);
	          flea.health--;
	          this.increaseScore(10);

	          if (flea.health === 0) {
	            arrayOfFleas.splice(fleaIndex, 1);
	            this.increaseScore(190);
	          }
	        }
	      });
	    });
	  }

	  wormCollide(centipedeSegments, arrayOfMushrooms, gameLevel) {
	    this.arrayOfBullets.forEach((bullet, bulletIndex) => {
	      centipedeSegments.forEach((worm, wormIndex) => {
	        worm.forEach((centipede, centipedeIndex) => {
	          if (bullet.x <= centipede.x + 26 && bullet.x >= centipede.x - 2 && bullet.y < centipede.y + 30 && bullet.y > centipede.y) {
	            var currentWorm = centipedeSegments[wormIndex][centipedeIndex];
	            if (currentWorm !== undefined) {
	              arrayOfMushrooms.push(new Mushrooms(currentWorm.x - currentWorm.x % 24, currentWorm.y - currentWorm.y % 24, gameLevel));
	            }
	            centipedeSegments.push(worm.slice(0, centipedeIndex));
	            centipedeSegments.push(worm.slice(centipedeIndex + 1, centipede.length));
	            centipedeSegments.splice(wormIndex, 1);
	            this.arrayOfBullets.splice(bulletIndex, 1);

	            this.increaseScore(10);
	          }
	        });
	      });
	    });
	  }

	  spiderCollide(spiderArray, game) {
	    this.arrayOfBullets.forEach((bullet, bulletIndex) => {
	      if (bullet.x <= spiderArray[0].x + 45 && bullet.x >= spiderArray[0].x && bullet.y < spiderArray[0].y + 30 && bullet.y > spiderArray[0].y) {
	        this.arrayOfBullets.splice(bulletIndex, 1);
	        game.spiderScore = new Fivehundred(spiderArray[0].x, spiderArray[0].y, game.level);

	        spiderArray[0].x = -500;
	        spiderArray[0].y = -500;
	        spiderArray[0].dX = 0;
	        spiderArray[0].dY = 0;

	        setTimeout(function () {
	          game.spiderScore = null;
	        }, 1000);

	        spiderArray = [];

	        this.increaseScore(500);
	      }
	    });
	  }

	  update(context) {
	    if (this.shooting) {
	      this.fire();
	    }
	    this.draw(context);
	  }

	  fire() {
	    if (this.arrayOfBullets.length === 0) {
	      this.arrayOfBullets.push(new Bullet(this.player.x + 12, this.player.y + 8, this.level));
	    }
	  }

	  startFiring(keyCode) {
	    if (keyCode === 32) {
	      this.shooting = true;
	      document.querySelector('.fire-button img').removeAttribute('src');
	      document.querySelector('.fire-button img').setAttribute('src', 'assets/button-down.svg');
	    }
	  }

	  stopFiring(keyCode) {
	    if (keyCode === 32) {
	      this.shooting = false;
	      document.querySelector('.fire-button img').removeAttribute('src');
	      document.querySelector('.fire-button img').setAttribute('src', 'assets/button-up.svg');
	    }
	  }

	  increaseScore(points) {
	    this.score = parseInt(document.querySelector('.points-span').innerText);
	    let updatedScore = this.score + points;
	    document.querySelector('.points-span').innerText = updatedScore;
	  }

	}

	module.exports = Gun;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	class Bullet {
	  constructor(x, y, level) {
	    this.x = x - 3;
	    this.y = y + 6;
	    this.height = 12;
	    this.width = 3;
	    this.level = level;
	  }

	  draw(context) {
	    var bulletColorArray = ['#ed3323', '#71f98d', '#fffd54', '#0027f5', '#eb41f7', '#f18533'];
	    context.fillStyle = bulletColorArray[this.level];
	    context.fillRect(this.x, this.y, this.width, this.height);
	  }

	}

	module.exports = Bullet;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	class Spider {
	  constructor(level) {
	    this.randomState = Math.random();
	    this.x = this.randomState > 0.5 ? -24 : 720;
	    this.y = 432;
	    this.width = 45;
	    this.height = 24;
	    this.animationState = 0;
	    this.dX = this.randomState > 0.5 ? 4 : -4;
	    this.dY = 4;
	    this.level = level;
	    this.isDead = false;
	    this.leftSpider = this.randomState > 0.5 ? true : false;
	    this.moveInc = 0;
	  }

	  draw(context) {
	    var spider = document.getElementById('spider');
	    if (this.isDead === false) {
	      context.drawImage(spider, Math.floor(this.animationState) * 180, this.level * 96, 180, 96, this.x, this.y, this.width, this.height);
	    } else {
	      context.drawImage(spider, 540, this.level * 96, 180, 96, this.x, this.y, this.width, this.height);
	    }

	    if (this.animationState >= 2.9) {
	      this.animationState = 0;
	    } else {
	      this.animationState += 0.15;
	    }
	  }

	  move(difficultyLevel) {
	    var spiderSpeed = Math.min(3 + difficultyLevel * .2, 8);
	    this.x += this.dX;
	    this.y += this.dY;

	    this.moveInc++;

	    let randomMove = Math.random();

	    if (this.y > 696 || this.y < 360) {
	      this.moveInc = 0;
	      this.dY *= -1;
	    }

	    if (this.leftSpider === true) {
	      if (randomMove > 0.985 && this.moveInc > 15) {
	        this.moveInc = 0;
	        let rand2 = Math.random();
	        if (rand2 > 0.5) {
	          this.dX = 0;
	          this.dY *= -1;
	        } else {
	          this.dX = 4;
	          this.dY *= -1;
	        }
	      }
	    } else {
	      if (randomMove > 0.985 && this.moveInc > 15) {
	        this.moveInc = 0;
	        let rand2 = Math.random();
	        if (rand2 > 0.5) {
	          this.dX = 0;
	          this.dY *= -1;
	        } else {
	          this.dX = -4;
	          this.dY *= -1;
	        }
	      }
	    }
	  }

	  pickUpShrooms(mushroomArray) {
	    mushroomArray.forEach((shroom, index) => {
	      if (shroom.x >= this.x && shroom.x <= this.x + this.width && shroom.y <= this.y + 24 && shroom.y >= this.y) {
	        mushroomArray.splice(index, 1);
	      }
	    });
	  }
	}

	module.exports = Spider;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	class Fivehundred {
	  constructor(x, y, level) {
	    this.x = x;
	    this.y = y;
	    this.level = level;
	    this.width = 45;
	    this.height = 24;
	  }

	  draw(context) {
	    var spider = document.getElementById('spider');
	    context.drawImage(spider, 540, this.level * 96, 180, 96, this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = Fivehundred;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var Mushrooms = __webpack_require__(1);

	class Flea {
	  constructor(level) {
	    this.x = Math.floor(Math.random() * 28 + 1) * 24;
	    this.y = 24;
	    this.width = 27;
	    this.height = 24;
	    this.level = level;
	    this.health = 2;
	  }

	  draw(context) {
	    var flea = document.getElementById('flea');
	    context.drawImage(flea, 0, this.level * 96, 108, 96, this.x, this.y, this.width, this.height);
	  }

	  update(mushrooms, difficultyLevel) {
	    var fleaMinSpeed = Math.min(3 + difficultyLevel * .2, 5);
	    if (this.health === 1) {
	      this.y += fleaMinSpeed * 2;
	    } else {
	      this.y += fleaMinSpeed;
	    }
	    this.dropShrooms(mushrooms, difficultyLevel);
	  }

	  dropShrooms(mushroomArray, difficultyLevel) {
	    var shroomDropper = Math.floor(Math.random() * Math.max(30 - difficultyLevel * 2, 12));
	    if (shroomDropper === 1 && this.y < 672) {
	      mushroomArray.push(new Mushrooms(this.x - this.x % 24, this.y - this.y % 24, this.level));
	    }
	  }

	}

	module.exports = Flea;

/***/ })
/******/ ]);