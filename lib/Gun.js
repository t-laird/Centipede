
var Bullet = require('./Bullet.js');

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
		  })
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
		}

	}

	stopFiring(keyCode) {
		if (keyCode === 32) {
			this.shooting = false;
			
		}

	}

}


module.exports = Gun;