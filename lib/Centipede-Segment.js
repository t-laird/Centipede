class CentipedeSegment {
  constructor (h,w) {
    this.x = -288;
    this.y = 0;
    this.h = h;
    this.w = w;
    this.animationState = Math.floor(Math.random() * 5);
    this.relativePos = 1;
    this.isHead = false;
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