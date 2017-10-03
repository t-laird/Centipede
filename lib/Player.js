class Player {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.height = 24;
    this.width = 24;
  }

  draw (context) {
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  move (keycode) {
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
    
    if (keycode === 37) {
      this.x-=24;
    } else if (keycode === 39) {
      this.x += 24;
    } else if (keycode === 38) {
      this.y -= 24;
    } else if (keycode === 40) {
      this.y += 24;
    }
  }
}

module.exports = Player;