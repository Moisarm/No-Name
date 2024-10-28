class Player {
  constructor(id) {
    this.x = 512;
    this.y = 250;
    this.id = id;
    this.number = "" + Math.floor(Math.random() * 10);
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingLeft = false;
    this.pressingRight = false;
    this.maxSpeed = 10;
  }

  updatePosition() {
    if (this.pressingUp) {
      this.y -= this.maxSpeed;
    }
    if (this.pressingDown) {
      this.y += this.maxSpeed;
    }
    if (this.pressingLeft) {
      this.x -= this.maxSpeed;
    }
    if (this.pressingRight) {
      this.x += this.maxSpeed;
    }
  }
}

module.exports = Player;
