class Bullet {
  constructor(x,y) {
    this.x = x;
    this.y = y-12;
    this.height = 12;
    this.width = 1;
  }
  draw(context) {
    context.fillStyle = 'red';
    context.fillRect(this.x,this.y,this.width,this.height);
  }
}

module.exports = Bullet;