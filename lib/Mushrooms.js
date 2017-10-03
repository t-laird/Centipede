class Mushrooms {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 24;
    this.health = 4;
  }

  draw (context) {
    var mushroom = document.getElementById("mushroom");
    

    context.drawImage(mushroom, (this.health-1)*96, 0, 96 , 96, this.x, this.y, 24, 24);
    // context.drawImage(mushroom, this.x, this.y, this.width, this.height);
  }
}

//3 shots to destroy
//45 mushrooms


module.exports = Mushrooms;