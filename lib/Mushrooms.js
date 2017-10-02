class Mushrooms {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
  }

  draw (context) {
    context.fillRect(this.x,this.y,this.width,this.height);
  }
}

//3 shots to destroy
//45 mushrooms


module.exports = Mushrooms;