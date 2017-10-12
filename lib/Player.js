var Gun = require('./Gun.js');

class Player {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 20;
    this.xMovement = 0;
    this.yMovement = 0;
    this.gun = new Gun(this);
    this.lives = 3;
  }
 
  draw (context, level) {
    var player = document.getElementById('player');

    if (this.gun.arrayOfBullets.length > 0) {
      context.drawImage(player, 0, level*120, 84, 120, this.x, this.y, this.width, this.height);
    } else {
      context.drawImage(player, 84, level*120, 84, 120, this.x, this.y, this.width, this.height);
    }
  }

  update (context, mushrooms) {

    mushrooms.forEach((shroom) => {

      //left
      if ((this.x - 16 <= shroom.x && this.x - 12 >= shroom.x) && (this.y <= shroom.y + 8 && this.y >= shroom.y - 24) && this.xMovement === -1) {
        this.xMovement = 0;
      }
      // //right
      if ((this.x + 16 >= shroom.x && this.x + 12 <= shroom.x) && (this.y <= shroom.y + 8 && this.y >= shroom.y - 24) && this.xMovement === 1) {
        this.xMovement = 0;
      }
      // //up
      if ((this.y - 20 <= shroom.y && this.y - 16 >= shroom.y) && (this.x <= shroom.x + 12 && this.x >= shroom.x - 8) && this.yMovement === -1) {
        this.yMovement = 0;
      }
      //down
      if ((this.y + 28 >= shroom.y && this.y + 24 <= shroom.y) && (this.x <= shroom.x + 12 && this.x >= shroom.x - 8) && this.yMovement === 1) {
        this.yMovement = 0;
      }

    });

    this.x = Math.min(this.x + this.xMovement * 10, 700);
    this.y = Math.min(this.y + this.yMovement * 10, 688);

    this.x = Math.max(this.x, 0);
    this.y = Math.max(this.y, 568);

    this.draw(context);
  }

  start (keyCode) {
    switch(keyCode) {
    case 37:
      this.xMovement = -1;
      document.querySelector('.left-button img').removeAttribute('src');
      document.querySelector('.left-button img').setAttribute('src', 'assets/button-down.svg');
      break;
    case 39:
      this.xMovement = 1;
      document.querySelector('.right-button img').removeAttribute('src');
      document.querySelector('.right-button img').setAttribute('src', 'assets/button-down.svg');
      break;
    case 38:
      this.yMovement = -1;
      document.querySelector('.up-button img').removeAttribute('src');
      document.querySelector('.up-button img').setAttribute('src', 'assets/button-down.svg');
      break;
    case 40:
      this.yMovement = 1;
      document.querySelector('.down-button img').removeAttribute('src');
      document.querySelector('.down-button img').setAttribute('src', 'assets/button-down.svg');
      break;
    }
  }

  stop (keyCode) {
    switch(keyCode) {
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

  wormCollision (centipedeSegments,pauseState) {
    centipedeSegments.segmentsArray.forEach((worm) => {
      worm.forEach(indivSeg => {
        if (indivSeg.x > this.x && indivSeg.x < this.x + 20 && indivSeg.y > this.y - 10 && indivSeg.y < this.y + 20){
          this.reduceLife(pauseState);
        }
      });
    });
  }
          
  fleaCollision (arrayOfFleas, pauseState) {
    arrayOfFleas.forEach((flea, fleaIndex) => {
      if (flea.x > this.x -18 && flea.x < this.x + 16 && flea.y > this.y - 16 && flea.y < this.y + 24) {
        arrayOfFleas.splice(fleaIndex,1);
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

    if (this.lives === 2){
      life3.setAttribute('hidden', true);
    } else if (this.lives === 1){
      life2.setAttribute('hidden', true);
      life3.setAttribute('hidden', true);
    }else {
      life1.setAttribute('hidden', true);
      life2.setAttribute('hidden', true);
      life3.setAttribute('hidden', true);
    }
  }
  
  spiderCollision (spiderArray,pauseState) {
    if (
      this.x - spiderArray[0].x < 41 && 
      this.x - spiderArray[0].x > -19 &&
      this.y - spiderArray[0].y < 10 &&
      this.y - spiderArray[0].y > - 26
    ){

      this.reduceLife(pauseState);
    }
  }

}



module.exports = Player;