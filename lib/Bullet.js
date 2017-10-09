class Bullet {
  constructor(x,y, level) {
    this.x = x-3      ;
    this.y = y+6;
    this.height = 12;
    this.width = 3;
    this.level = level;
  }


  draw(context, level) {
    var bulletColorArray = ['#ed3323', '#71f98d', '#fffd54', '#0027f5', '#eb41f7', '#f18533']
    context.fillStyle = bulletColorArray[this.level];
    context.fillRect(this.x,this.y,this.width,this.height);
  }


}

module.exports = Bullet;