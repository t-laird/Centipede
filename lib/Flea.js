var Mushrooms = require('./Mushrooms.js');

class Flea {
	constructor(level) {
		this.x = (Math.floor(Math.random() * 28 + 1)) * 24;
		this.y = 24;
		this.width = 27;
		this.height = 24;
		this.level = level;
		this.health = 2;
	}

	draw(context, level) {
		var flea = document.getElementById('flea');
		context.drawImage(flea, 0, this.level*96, 108, 96, this.x, this.y, this.width, this.height);
	}

	update(mushrooms, difficultyLevel) {
		var fleaMinSpeed = Math.min((3 + difficultyLevel * .2), 5)
		if (this.health === 1) {
			this.y += fleaMinSpeed * 2;
		} else {
			this.y += fleaMinSpeed;
		}
		this.dropShrooms(mushrooms, difficultyLevel);
		// this.draw(context);
	}

	dropShrooms(mushroomArray, difficultyLevel) {
		// var shroomDropper = Math.min((Math.floor(Math.random() * 30) - (difficultyLevel * 2)), 15);
	  	// var shroomDropper = (Math.floor(Math.random() * 20));

	  	var shroomDropper = (Math.floor(Math.random() * Math.max((30 - difficultyLevel * 2), 12)));

	  	if (shroomDropper === 1 && this.y < 672) {
	  		mushroomArray.push(new Mushrooms(this.x - this.x % 24,this.y - this.y % 24, this.level));
	  	}
	}


}


module.exports = Flea;