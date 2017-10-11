class Spider {
  constructor (level, spiderSpeed) {
    this.x = 24;
    this.y = 432;
    this.width = 45;
    this.height = 24;
    this.animationState = 0;
    this.dX = 4;
    this.dY = 4;
    this.alreadyDown = false;
    this.level = level;
  }

  draw(context, level) {
    var spider = document.getElementById('spider');
    context.drawImage(spider, (Math.floor(this.animationState))* 180, this.level*96, 180, 96, this.x, this.y, this.width, this.height);
    // context.drawImage(player, 0, level*120, 84, 120, this.x, this.y, this.width, this.height); 

    if (this.animationState >= 2.9){
      this.animationState = 0;
    } else {
      this.animationState += 0.15;
    }
  }

  move(difficultyLevel) {
    var spiderSpeed = Math.min((3 + difficultyLevel * .2), 8)
    console.log(spiderSpeed + '=spiderspeed')
      this.x += this.dX;
      this.y += this.dY;
    if (this.y > 696) {
      this.dX = 0;
      this.dY = -spiderSpeed;
    } else if (this.x > 288 && this.y < 504){
      this.dX = spiderSpeed;
      this.dY = spiderSpeed;
    } else if (this.x > 480 && this.y < 504){
      if (Math.random() > 0.5 && !this.alreadyDown){
        this.dY = spiderSpeed;
        this.alreadyDown = true;
      }
    } else if (this.x === 480 && this.y === 432){
      this.dX = 4;
      this.dY = 4;
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