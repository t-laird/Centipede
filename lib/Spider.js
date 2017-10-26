class Spider {
  constructor (level) {
    this.randomState = Math.random();
    this.x = this.randomState > 0.5 ? -24 : 720;
    this.y = 432;
    this.width = 45;
    this.height = 24;
    this.animationState = 0;
    this.dX = this.randomState > 0.5 ? 4 : -4;
    this.dY = 4;
    this.level = level;
    this.isDead = false;
    this.leftSpider = this.randomState > 0.5 ? true : false;
    this.moveInc = 0;
  }

  draw(context) {
    var spider = document.getElementById('spider');
    if (this.isDead === false){
      context.drawImage(spider, (Math.floor(this.animationState))* 180, this.level*96, 180, 96, this.x, this.y, this.width, this.height);
    } else {
      context.drawImage(spider, 540, this.level*96, 180, 96, this.x, this.y, this.width, this.height);
    }

    if (this.animationState >= 2.9){
      this.animationState = 0;
    } else {
      this.animationState += 0.15;
    }
  }

  move(difficultyLevel) {
    var spiderSpeed = Math.min((3 + difficultyLevel * .2), 8);
    this.x += this.dX;
    this.y += this.dY;

    this.moveInc++;

    let randomMove = Math.random();
    
    if (this.y > 696 || this.y < 360){
      this.moveInc = 0;
      this.dY *= -1;
    }
    
    if (this.leftSpider === true) {
      if (randomMove > 0.985 && this.moveInc > 15) {
        this.moveInc = 0;
        let rand2 = Math.random();
        if (rand2 > 0.5){
          this.dX = 0;
          this.dY *= -1;
        } else {
          this.dX = 4;
          this.dY *= -1;
        }
      }
    } else {
      if (randomMove > 0.985 && this.moveInc > 15) {
        this.moveInc = 0;
        let rand2 = Math.random();
        if (rand2 > 0.5){
          this.dX = 0;
          this.dY *= -1;
        } else {
          this.dX = -4;
          this.dY *= -1;
        }
      }
    }
  }

  pickUpShrooms(mushroomArray) {
    mushroomArray.forEach((shroom,index) => {
      if (shroom.x >= this.x && shroom.x <= this.x + this.width && shroom.y <= this.y + 24 && shroom.y >= this.y){
        mushroomArray.splice(index,1);
      }
    });
  }
}

  

module.exports = Spider;