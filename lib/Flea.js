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

	update(context, mushrooms) {
		if (this.health === 1) {
			this.y += 6;
		} else {
			this.y += 3
		}
		this.dropShrooms(context, mushrooms);
		this.draw(context);
	}

	dropShrooms(context, mushroomArray) {
	  var shroomDropper = Math.floor(Math.random() * 30);
	  	if (shroomDropper === 1 && this.y < 672) {
	  		mushroomArray.push(new Mushrooms(this.x - this.x % 24,this.y - this.y % 24, this.level));
	  	}
	}


}


module.exports = Flea;