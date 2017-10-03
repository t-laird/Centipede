class Player {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.height = 24;
    this.width = 24;
    this.xMovement = 0;
    this.yMovement = 0;
  }

  draw (context) {
    var player = document.getElementById('player');
    context.drawImage(player,this.x,this.y,this.width,this.height);
  }

  update (context, mushrooms) {

    mushrooms.forEach((shroom) => {
      if (this.x - 24 === shroom.x && (this.y <= shroom.y + 8 && this.y >= shroom.y - 19) && this.xMovement === -1) {
        this.xMovement = 0;
      }
      if (this.x + 24 === shroom.x && (this.y <= shroom.y + 8 && this.y >= shroom.y - 19) && this.xMovement === 1) {
        this.xMovement = 0;
      }
      if (this.y - 24 === shroom.y && (this.x <= shroom.x + 17 && this.x >= shroom.x - 16) && this.yMovement === -1) {
        this.yMovement = 0;
      }
      if (this.y + 24 === shroom.y && (this.x <= shroom.x + 17 && this.x >= shroom.x - 16) && this.yMovement === 1) {
        this.yMovement = 0;
      }

    });

    this.x = Math.min(this.x + this.xMovement * 8, 696)
    this.y = Math.min(this.y + this.yMovement * 8, 696)

    this.x = Math.max(this.x, 0)
    this.y = Math.max(this.y, 600)

    this.draw(context);
  }

  start (keyCode) {
    switch(keyCode) {
      case 37:
        this.xMovement = -1;
        break;
      case 39:
        this.xMovement = 1;
        break;
      case 38:
        this.yMovement = -1;
        break;
      case 40:
        this.yMovement = 1;
        break;
    }
  }

  stop (keyCode) {
      switch(keyCode) {
      case 37:
        if (this.xMovement === -1) {
          this.xMovement = 0;
        }
        break;
      case 39:
        if (this.xMovement === 1) {
          this.xMovement = 0;
        }
        break;
      case 38:
        if (this.yMovement === -1) {
          this.yMovement = 0;
        }
        break;
      case 40:
        if (this.yMovement === 1) {
          this.yMovement = 0;
        }
        break;
    }
  }

}

module.exports = Player;