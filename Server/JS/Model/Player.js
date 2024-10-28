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

  //Funcion que detecta el presionamiento de flechas para dar movilidad
  handleKeyPress(data) {
    if (data.inputId === "left") {
      this.pressingLeft = data.state;
    } else if (data.inputId === "right") {
      this.pressingRight = data.state;
    } else if (data.inputId === "up") {
      this.pressingUp = data.state;
    } else if (data.inputId === "down") {
      this.pressingDown = data.state;
    }
  }

  //Funcion que actualiza las posiciones de los jugadores
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

  static updateAll(playerList) {
    let pack = [];

    //Por cada jugador en la lista de jugadores
    for (let i in playerList) {
      //declara al jugador = jugador en la pos i de la lista
      let player = playerList[i];

      //llama a la funcion que actualiza las posiciones de los jugadores
      player.updatePosition();

      //Guarda las posiciones en la lista de posiciones
      pack.push({
        x: player.x,
        y: player.y,
        number: player.number,
      });
    }
    return pack;
  }

  disconect() {
    delete playerList[this.id];
  }
}

module.exports = Player;
