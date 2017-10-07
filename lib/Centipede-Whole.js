const CentipedeSeg = require('./Centipede-Segment.js');

class CentipedeWhole {
  constructor() {
    this.segmentsArray = [[]];
    this.y = 0;
    this.segmentFrames = 0;
    this.yOffset = 24;
    this.yMin = 0;
  }

  createCentipede() {
    for (var i = 0; i < 13; i++) {
      this.segmentsArray[0].push(new CentipedeSeg(i*24,21,24));
    }
  }



  draw (context) {
    this.segmentsArray.forEach((centipede) => {
      centipede.forEach((segment, index, segments) => {
        var centipedeImg = document.getElementById('centipede');
        if (index === segments.length - 1) {
          segment.isHead = true;
        } else {
          segment.isHead = false;
        }
        segment.headAnimation();
        if (segment.speed < 0 ){
          context.drawImage(centipedeImg, segment.animationState * 84 + 840, 0, 84, 96, segment.x, segment.y, segment.h, segment.w);
        } else {
          context.drawImage(centipedeImg, segment.animationState * 84, 0, 84, 96, segment.x, segment.y, segment.h, segment.w);
        }
      });
    });
  }

  move (mushrooms) {
    this.segmentsArray.forEach((centipede) => { 
      centipede.forEach((segment) => { 
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
        
        segment.x += segment.speed;
        if (segment.y === 696 && (segment.x === 0 || segment.x === 696)){
          segment.yOffset = -24;
          this.yMin = 552;
        } else if (segment.y === this.yMin){
          segment.yOffset = 24;
        }
      });
    });
  }
}
module.exports = CentipedeWhole;