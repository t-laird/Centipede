class Player {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 20;
    this.xMovement = 0;
    this.yMovement = 0;
  }

  draw (context) {
    var player = document.getElementById('player');

    context.drawImage(player, 84, 0, 84, 120, this.x, this.y, this.width, this.height);
  }

  update (context, mushrooms) {

    mushrooms.forEach((shroom) => {
      if (this.x - 20 === shroom.x && (this.y <= shroom.y + 8 && this.y >= shroom.y - 19) && this.xMovement === -1) {
        this.xMovement = 0;
      }
      if (this.x + 20 === shroom.x && (this.y <= shroom.y + 8 && this.y >= shroom.y - 19) && this.xMovement === 1) {
        this.xMovement = 0;
      }
      if (this - 24 === shroom.y && (this.x <= shroom.x + 17 && this.x >= shroom.x - 16) && this.yMovement === -1) {
        this.yMovement = 0;
      }
      if (this.y + 32 === shroom.y && (this.x <= shroom.x + 17 && this.x >= shroom.x - 16) && this.yMovement === 1) {
        this.yMovement = 0;
      }

    });

    this.x = Math.min(this.x + this.xMovement * 8, 700)
    this.y = Math.min(this.y + this.yMovement * 8, 688)

    this.x = Math.max(this.x, 0)
    this.y = Math.max(this.y, 568)

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