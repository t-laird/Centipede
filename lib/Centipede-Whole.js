const CentipedeSeg = require('./Centipede-Segment.js');

class CentipedeWhole {
  constructor() {
    this.segments = [];
    this.y = 0;
    this.speed = 8;
  }

  createCentipede() {
    for (var i = 0; i < 13; i++) {
      this.segments.push(new CentipedeSeg(24,24));
    }
  }

  draw (context) {
    var positionOffset = 24;
    var centipede = document.getElementById('centipede');

    this.segments.forEach((segment, index, segments) => {
      if (index === segments.length - 1 && this.speed > 0) {
        segment.isHead = true;
      } else if (index === 0 && this.speed < 0) {
        segment.isHead = true;
      } else {
        segment.isHead = false;
      }
      segment.headAnimation();
      if (this.speed > 0) {
        context.drawImage(centipede, Math.floor(segment.animationState) * 84, 0, 84, 96, segment.x + positionOffset, this.y, segment.h, segment.w);
        positionOffset += 24;
      } else {
        // context.rotate(Math.PI);
        context.drawImage(centipede, Math.floor(segment.animationState) * 84, 0, 84, 96, segment.x + positionOffset, this.y, segment.h, segment.w);
        positionOffset += 24;
        // context.setTransform(1, 0, 0, 1, 0, 0);
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
  
  move () {
    this.move.bind(this);
    this.segments.forEach((segment, index, segments) => { 
      if (index === segments.length - 1 && this.speed > 0 && segment.x > 400) {
        this.speed *= -1;
        this.y += 24;
      } else if (index === segments.length - 1 && this.speed < 0 && segment.x < -50) {
        this.speed *= -1;
        this.y += 24;
      }
      segment.x += this.speed;
    });
  }
}
module.exports = CentipedeWhole;