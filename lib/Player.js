var Gun = require('./Gun.js');

class Player {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.height = 32;
    this.width = 20;
    this.xMovement = 0;
    this.yMovement = 0;
    this.gun = new Gun(this);
  }

  draw (context) {
    var player = document.getElementById('player');

    context.drawImage(player, 84, 0, 84, 120, this.x, this.y, this.width, this.height);
  }

  update (context, mushrooms) {

    mushrooms.forEach((shroom) => {

      //left
      if ((this.x - 16 <= shroom.x && this.x - 12 >= shroom.x) && (this.y <= shroom.y + 8 && this.y >= shroom.y - 24) && this.xMovement === -1) {
        this.xMovement = 0;
      }
      // //right
      if ((this.x + 16 >= shroom.x && this.x + 12 <= shroom.x) && (this.y <= shroom.y + 8 && this.y >= shroom.y - 24) && this.xMovement === 1) {
        this.xMovement = 0;
      }
      // //up
      if ((this.y - 20 <= shroom.y && this.y - 16 >= shroom.y) && (this.x <= shroom.x + 12 && this.x >= shroom.x - 8) && this.yMovement === -1) {
        this.yMovement = 0;
      }
      //down
      if ((this.y + 28 >= shroom.y && this.y + 24 <= shroom.y) && (this.x <= shroom.x + 12 && this.x >= shroom.x - 8) && this.yMovement === 1) {
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