class Player {
  //paso el id y la lista de jugadores como parametros
  constructor(id, playerList) {
    this.x = 512;
    this.y = 250;
    this.id = id;
    this.number = "" + Math.floor(Math.random() * 10);
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingLeft = false;
    this.pressingRight = false;
    this.maxSpeed = 10;

    //guarda el jugador en la lista de jugadores cada que se crea un jugador
    playerList[this.id] = this;
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
