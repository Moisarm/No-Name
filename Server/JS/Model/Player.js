class Player {
  //paso el id y la lista de jugadores como parametros
  constructor(id, playerList) {
    this.x = 512;
    this.y = 250;
    this.id = id;
    this.gravity = 0.5;
    this.velocityY = 0;
    this.velocityX = 0;
    this.maxSpeed = 10;
    this.number = "" + Math.floor(Math.random() * 10);
    this.onGround = false;
    this.pressingUp = false;
    this.pressingDown = false;
    this.pressingLeft = false;
    this.pressingRight = false;

    //guarda el jugador en la lista de jugadores cada que se crea un jugador
    playerList[this.id] = this;
  }

  //Funcion que aplica gravedad
  Gravity() {
    if (!this.onGround) {
      this.velocityY += this.gravity; // Aumenta la velocidad debido a la gravedad
    } else {
      this.velocityY = 0; // Resetea la velocidad vertical si está en el suelo
    }
    this.y += this.velocityY; // Aplica la velocidad vertical a la posición y

    // Verifica si el jugador ha tocado el suelo
    if (this.y >= 575 - 50) {
      this.y = 575 - 50;
      this.onGround = true; // Indica que está en el suelo
    } else {
      this.onGround = false; // No está en el suelo
    }

    //Limite de los muros
    if (this.x < 0) this.x = 0; // Límite izquierdo
    if (this.x > 1024 - 50) this.x = 1024 - 50; // Límite derecho
  }

  //Funcion que detecta el presionamiento de flechas para dar movilidad
  KeyPress(data) {
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
    this.Gravity();

    if (this.pressingUp) {
      this.y -= this.maxSpeed + 5;
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

  //Funcion estatica que actualiza a todos los jugadores
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
        //number: player.number,
      });
    }
    return pack;
  }

  //Funcion que desconecta al jugador
  disconect() {
    delete playerList[this.id];
  }
}

module.exports = Player;
