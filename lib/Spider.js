class Spider {
  constructor () {
    this.x = 24;
    this.y = 432;
    this.width = 45;
    this.height = 20;
    this.animationState = 0;
    this.dX = 3;
    this.dY = 3;
    this.alreadyDown = false;

  }

  draw(context) {
    var spider = document.getElementById('spider');
    context.drawImage(spider, (Math.floor(this.animationState))* 180, 0, 180, 96, this.x, this.y, 45, 24);
    // context.drawImage(player, 0, level*120, 84, 120, this.x, this.y, this.width, this.height); 

    if (this.animationState >= 2.9){
      this.animationState = 0;
    } else {
      this.animationState += 0.15;
    }
  }

  move() {
      this.x += this.dX;
      this.y += this.dY;
    if (this.y === 696) {
      this.dX = 0;
      this.dY = -3;
    } else if (this.x === 288 && this.y === 504){
      this.dX = 3;
      this.dY = 3;
    } else if (this.x === 480 && this.y === 504){
      if (Math.random() > 0.5 && !this.alreadyDown){
        this.dY = 3;
        this.alreadyDown = true;
      }
    } else if (this.x === 480 && this.y === 432){
      this.dX = 3;
      this.dY =3;
    }
  }
}

  

module.exports = Spider;