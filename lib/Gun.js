
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
		  bullet.y -= 22;
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
		      increaseScore(1);
		      mushroomHitSound.play();
		      if (mushroom.health === 0) {
		        arrayOfMushrooms.splice(mushroomIndex,1)
		        increaseScore(4);
			      mushroomGoneSound.play();
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
						console.log(gameLevel);
						var currentWorm = centipedeSegments[wormIndex][centipedeIndex];
						arrayOfMushrooms.push(new Mushrooms(currentWorm.x - currentWorm.x % 24,currentWorm.y - currentWorm.y % 24,gameLevel));
						this.arrayOfBullets.splice(bulletIndex,1);
						centipedeSegments.push(worm.slice(0,centipedeIndex));
						centipedeSegments.push(worm.slice(centipedeIndex+1,centipede.length));
						centipedeSegments.splice(wormIndex,1);
						
						increaseScore(10);
						centipedeHitSound.currentTime = 0;
						centipedeHitSound.play();
					}
				});	
			});
		})
	}

	update(context) {
		// this.blockFrames--;
		// if (this.shooting && this.blockFrames <= 0) {
		// 	this.fire();
		// }
		if (this.shooting && this.arrayOfBullets.length === 0) {
			this.fire();
		}

		this.draw(context);
	}

	fire() {
		
		this.arrayOfBullets.push(new Bullet(this.player.x+12, this.player.y));
		


		laserSound.currentTime = 0;
		laserSound.play();

		// this.blockFrames = 10;  //sets firing rate --> 15 = 4 bullets/sec

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

function increaseScore(points) {
	let score = parseInt(document.querySelector('.points-span').innerText);
	let updatedScore = score + points;
	document.querySelector('.points-span').innerText = updatedScore;

}

var laserSound = new Audio('assets/sounds/laser.wav');  //decent
var centipedeHitSound = new Audio('assets/sounds/centipede-hit-2.wav'); //good
var mushroomGoneSound = new Audio('assets/sounds/mushroom-gone.wav');  //doesn't exist in real game
var mushroomHitSound = new Audio('assets/sounds/mushroom-hit-2.wav');  //doesn't exist in real game
// var centipedeMoveSound = new Audio('assets/sounds/centipede-move.wav');
//     centipedeMoveSound.volume = 0.2;
//     centipedeMoveSound.loop = true;
//  if (centipedeSegments.length > 0) {
// 			          centipedeMoveSound.play();
// 			        } else {
// 			          centipedeMoveSound.pause();
// 			        }




module.exports = Gun;