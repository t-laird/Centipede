class Player {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.height = 24;
    this.width = 24;
  }

  draw (context) {
    var player = document.getElementById('player');

    context.drawImage(player,this.x,this.y,this.width,this.height);
    // context.fillStyle = 'white';
    // context.fillRect(this.x, this.y, this.width, this.height);
  }

  move (keycode,mushrooms) {
    // switch(keycode){
    //   case 37:
    //     this.x-=1/5*2;
    //     break;
    //   case 39:
    //     this.x +=1/5*2;
    //     break;
    //   case 38:
    //     this.y -=1/5*2;
    //     break;
    //   case 40:
    //     this.y +=1/5*2;
    //     break;
    // }
    // }
    var player = this;

    var canMovePosX = true;
    var canMoveNegX = true;
    var canMovePosY = true;
    var canMoveNegY = true;

    mushrooms.forEach(function(shroom) {
      if (player.x - 24 === shroom.x && player.y === shroom.y) {
        canMoveNegX = false;
      } 
      if (player.x + 24 === shroom.x && player.y === shroom.y) {
        canMovePosX = false;
      }
      if (player.y - 24 === shroom.y && player.x === shroom.x) {
        canMoveNegY = false;
      } 
      if (player.y + 24 === shroom.y && player.x === shroom.x) {
        canMovePosY = false;
      }
    });
    
    if (keycode === 37 && this.x !== 0 && canMoveNegX) {
      this.x -= 24;
    } else if (keycode === 39 && this.x !== 696 && canMovePosX) {
      this.x += 24;
    } else if (keycode === 38 && this.y > 528 && canMoveNegY) {
      this.y -= 24;
    } else if (keycode === 40 && this.y < 696 && canMovePosY) {
      this.y += 24;
    }
  }
}

module.exports = Player;