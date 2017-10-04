class Bullet {
  constructor(x,y) {
    this.x = x-3      ;
    this.y = y+6;
    this.height = 12;
    this.width = 3;
  }
  draw(context) {
    context.fillStyle = '#ED3323';
    context.fillRect(this.x,this.y,this.width,this.height);
  }
}

module.exports = Bullet;