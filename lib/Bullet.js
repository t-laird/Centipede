class Bullet {
  constructor(x,y) {
    this.x = x-1.5;
    this.y = y;
    this.height = 12;
    this.width = 4;
  }
  draw(context) {
    context.fillStyle = 'red';
    context.fillRect(this.x,this.y,this.width,this.height);
  }
}

module.exports = Bullet;