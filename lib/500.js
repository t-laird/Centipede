class Fivehundred {
  constructor (x, y, level) {
    this.x = x;
    this.y = y;
    this.level = level;
    this.width = 45;
    this.height = 24;
  }
  
  draw(context) {
    var spider = document.getElementById('spider');
    context.drawImage(spider, 540, this.level*96, 180, 96, this.x, this.y, this.width, this.height);    
  }
}

module.exports = Fivehundred;

