const CentipedeSeg = require('./Centipede-Segment.js');

class CentipedeWho {
  constructor() {
    this.segments = [];
    this.direction = 1;
  }

  createCentipede() {
    for (var i = 0; i < 13; i++) {
      this.segments.push(new CentipedeSeg(24,24));
    }
  }
  draw (context) {
    var positionOffset = 24;

    this.segments.forEach(function(segment) {
      context.strokeStyle = 'white';
      context.strokeRect(segment.x + positionOffset, segment.y, segment.h, segment.w);
      positionOffset += 24;
    });
  }
  move () {
    this.segments.forEach(function(segment) { 
      segment.x++;
    })
  }
}

module.exports = CentipedeWho;