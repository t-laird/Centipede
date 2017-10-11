class CentipedeSegment {
  constructor (x,h,w) {
    this.x = x;
    this.y = 0;
    this.h = h;
    this.w = w;
    this.animationState = 0;
    this.tempAnimationState = Math.floor(Math.random()* 5);
    this.isHead = false;
    this.speed = 6;
    this.yOffset = 24;
  }

  headAnimation() {
    if (this.isHead === true) {
      if (this.tempAnimationState >= 4.9){
        this.tempAnimationState = 0;
        this.animationState = Math.floor(this.tempAnimationState) + 5;
      } else {
        this.tempAnimationState += 0.10;
        this.animationState = Math.floor(this.tempAnimationState) + 5;
      }
    } else {  
      if (this.tempAnimationState >= 4.9){
        this.tempAnimationState = 0;
        this.animationState = Math.floor(this.tempAnimationState);
      } else {
        this.tempAnimationState += 0.10;
        this.animationState = Math.floor(this.tempAnimationState);

      // if (this.tempAnimationState === 5){
      //   this.tempAnimationState = 0;
      //   this.animationState = this.tempAnimationState;
      // } else {
      //   this.tempAnimationState++;
      //   this.animationState = this.tempAnimationState;
      // }
    }
  }}
}

module.exports = CentipedeSegment;