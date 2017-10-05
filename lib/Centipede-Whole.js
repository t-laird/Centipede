const CentipedeSeg = require('./Centipede-Segment.js');

class CentipedeWhole {
  constructor() {
    this.segments = [];
    this.y = 0;
    this.segmentFrames = 0;
    this.yOffset = 24;
  }

  createCentipede() {
    for (var i = 0; i < 13; i++) {
      this.segments.push(new CentipedeSeg(i*24,21,24));
    }
    console.log(this.segments);
  }



  draw (context) {
    this.segments.forEach((segment, index, segments) => {
      var centipede = document.getElementById('centipede');
      if (index === segments.length - 1) {
        segment.isHead = true;
      } else {
        segment.isHead = false;
      }
      segment.headAnimation();
      if (segment.speed < 0 ){
        context.drawImage(centipede, segment.animationState * 84 + 840, 0, 84, 96, segment.x, segment.y, segment.h, segment.w);
      } else {
        context.drawImage(centipede, segment.animationState * 84, 0, 84, 96, segment.x, segment.y, segment.h, segment.w);
      }
    });
  }

  animate () {
    this.segments.forEach(function(segment) {
      if (segment.animationState === 4) {
        segment.animationState = 0;
      } else if (segment.animationState === 9) {
        segment.animationState = 5;
      } else {
        segment.animationState++;
      }
    });
  }
  
  move (mushrooms) {
    this.segments.forEach((segment) => { 
      mushrooms.forEach((mushroom) => {
        if (segment.speed > 0 && (segment.x === 712 || (segment.x + 24 === mushroom.x && segment.y === mushroom.y))) {
          segment.y += segment.yOffset;
          var changeDir = (-1);
          mushrooms.forEach((shroomTwo) => {
            if (shroomTwo.x === (segment.x - 24) && shroomTwo.y === segment.y){
              changeDir *= -1;
            } 
          });
          segment.speed *= changeDir;
        } else if (segment.speed < 0 && (segment.x < 0 || (segment.x - 24 === mushroom.x && segment.y === mushroom.y))) {
          var changeDir2 = (-1);
          segment.y += segment.yOffset;
          mushrooms.forEach((shroomThree) => {
            if (shroomThree.x === (segment.x + 24) && shroomThree.y === segment.y){
              changeDir2 *= -1;
            }
          });
          segment.speed *= changeDir2;
        }
      });
      if (segment.y > 700){
        segment.yOffset *= -1;
      } else if (segment.y < -24){
        segment.yOffset *= -1;
      }
      
      segment.x += segment.speed;

    });
  }
}
module.exports = CentipedeWhole;