
var Bullet = require('./Bullet.js');
var Mushrooms = require('./Mushrooms.js');

class Gun {
	constructor (player) {
		this.player = player;
		this.arrayOfBullets = [];
		this.shooting = false;
		this.blockFrames = 0;
	}

	draw(context) {
		this.arrayOfBullets.forEach ((bullet,index) => {
		  bullet.y -= 12;
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
		      if (mushroom.health === 0) {
		        arrayOfMushrooms.splice(mushroomIndex,1)
		      }
		      console.log('bullet hit mushroom');
		    }
			});
		});
	}

	wormCollide(centipedeSegments,arrayOfMushrooms) {
		this.arrayOfBullets.forEach((bullet, bulletIndex) => {
			centipedeSegments.forEach((worm,wormIndex) => {
				worm.forEach((centipede,centipedeIndex) => {
					if (bullet.x <= (centipede.x + 24) && bullet.x >= centipede.x && bullet.y <  (centipede.y + 21) && bullet.y > centipede.y){
						var currentWorm = centipedeSegments[wormIndex][centipedeIndex];
						arrayOfMushrooms.push(new Mushrooms(currentWorm.x - currentWorm.x % 24,currentWorm.y - currentWorm.y % 24));
						this.arrayOfBullets.splice(bulletIndex,1);
						centipedeSegments.push(worm.slice(0,centipedeIndex));
						centipedeSegments.push(worm.slice(centipedeIndex+1,centipede.length));
						centipedeSegments.splice(wormIndex,1);
					}
				});
			});
		})
	}

	update(context) {
		this.blockFrames--;
		if (this.shooting && this.blockFrames <= 0) {
			this.fire();
		}
		this.draw(context);
	}

	fire() {
		this.arrayOfBullets.push(new Bullet(this.player.x+12, this.player.y));
		this.blockFrames = 15;  //sets firing rate --> 15 = 4 bullets/sec

	}

	startFiring(keyCode) {
		if (keyCode === 32) {
			this.shooting = true;
			document.querySelector('.fire-button img').removeAttribute('src')
			document.querySelector('.fire-button img').setAttribute('src', 'assets/button-down.svg');
		}

	}

	stopFiring(keyCode) {
		if (keyCode === 32) {
			this.shooting = false;
			document.querySelector('.fire-button img').removeAttribute('src')
			document.querySelector('.fire-button img').setAttribute('src', 'assets/button-up.svg');
		}

	}

}


module.exports = Gun;