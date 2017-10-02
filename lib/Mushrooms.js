class Mushrooms {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 24;
  }

  draw (context) {
    // var mushroom = document.getElementById("mushroom");
    
    // context.drawImage(mushroom, this.x, this.y, this.width, this.height);

    context.fillStyle = 'white';  
    context.fillRect(this.x,this.y,this.width,this.height);
    // context.drawImage()
  }
}

//3 shots to destroy
//45 mushrooms


module.exports = Mushrooms;