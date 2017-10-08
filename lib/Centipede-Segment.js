class CentipedeSegment {
  constructor (x,h,w) {
    this.x = x;
    this.y = 0;
    this.h = h;
    this.w = w;
    this.animationState = Math.floor(Math.random() * 5);
    this.isHead = false;
    this.speed = 8;
    this.yOffset = 24;
  }

  headAnimation() {
    if (this.isHead === true) {
      this.animationState = Math.floor(Math.random() * 5) + 5;
    } else {
      this.animationState = Math.floor(Math.random() * 5);
    }
  }

}

module.exports = CentipedeSegment;