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
		this.y += 6;
		this.draw(context);
	}

}


module.exports = Flea;