
var Bullet = require('./Bullet.js');
var Mushrooms = require('./Mushrooms.js');

class Gun {
  constructor (player) {
    this.player = player;
    this.arrayOfBullets = [];
    this.shooting = false;
    this.blockFrames = 0;
    this.level = 0;
    this.score = 0;
  }

  move() {
    this.arrayOfBullets.forEach ((bullet) => {
      bullet.y -= 22;
    });
  }

  draw(context) {
    this.arrayOfBullets.forEach ((bullet,index) => {
      if (bullet.y < 0) {
        this.arrayOfBullets.splice(index,1);
      }
      bullet.draw(context);
    });
  }

  collide(arrayOfMushrooms) {
    this.arrayOfBullets.forEach((bullet, bulletIndex) => {
      arrayOfMushrooms.forEach((mushroom,mushroomIndex) => {
        if (bullet.x >= mushroom.x && bullet.x <= mushroom.x+24 && bullet.y >= mushroom.y && bullet.y <= mushroom.y+24) {
          this.arrayOfBullets.splice(bulletIndex,1);
          mushroom.health--;
          this.increaseScore(1);
          if (mushroom.health === 0) {
            arrayOfMushrooms.splice(mushroomIndex,1);
            this.increaseScore(4);
          }
        }
      });
    });
  }

  fleaCollide(arrayOfFleas) {
    this.arrayOfBullets.forEach((bullet, bulletIndex) => {
      arrayOfFleas.forEach((flea, fleaIndex) => {
        if (bullet.x >= flea.x && bullet.x <= flea.x+27 && bullet.y >= flea.y & bullet.y <= flea.y+24) {
          this.arrayOfBullets.splice(bulletIndex, 1);
          flea.health--;
          this.increaseScore(10);

          if (flea.health === 0) {
            arrayOfFleas.splice(fleaIndex,1);
            this.increaseScore(190);

          }
        }
      });
    });
  }


  wormCollide(centipedeSegments,arrayOfMushrooms,gameLevel) {
    this.arrayOfBullets.forEach((bullet, bulletIndex) => {
      centipedeSegments.forEach((worm,wormIndex) => {
        worm.forEach((centipede,centipedeIndex) => {
          if (bullet.x <= (centipede.x + 26) && bullet.x >= centipede.x - 2 && bullet.y <  (centipede.y + 21) && bullet.y > centipede.y){
            var currentWorm = centipedeSegments[wormIndex][centipedeIndex];
            if (currentWorm !== undefined) {
              arrayOfMushrooms.push(new Mushrooms(currentWorm.x - currentWorm.x % 24,currentWorm.y - currentWorm.y % 24,gameLevel));
            }
            centipedeSegments.push(worm.slice(0,centipedeIndex));
            centipedeSegments.push(worm.slice(centipedeIndex+1,centipede.length));
            centipedeSegments.splice(wormIndex,1);
            this.arrayOfBullets.splice(bulletIndex,1);
						
            this.increaseScore(10);
          }
        });	
      });
    });
  }

  spiderCollide(spiderArray) {
    this.arrayOfBullets.forEach((bullet,bulletIndex) => {
      if (bullet.x <= (spiderArray[0].x + 45) && bullet.x >= spiderArray[0].x && bullet.y < (spiderArray[0].y + 21) && bullet.y > spiderArray[0].y){
        this.arrayOfBullets.splice(bulletIndex,1);
        spiderArray.splice(0,1);
        this.increaseScore(700);
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
      this.arrayOfBullets.push(new Bullet(this.player.x+12, this.player.y+8, this.level));
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