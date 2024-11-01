class Player {
  //paso el id y la lista de jugadores como parametros
  constructor(id, playerList) {
    this.x = 512;
    this.y = 250;
    this.id = id;
    this.gravity = 0.8;
    this.velocityY = 0;
    this.velocityX = 0;
    this.maxSpeed = 10;
    this.atackBox = {
      light: {
        x: this.x,
        y: this.y,
        width: 100,
        height: 50,
      },
    };
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

  atack(id) {
    // Puedes agregar lógica para definir el ataque específico
    this.atackBox[id] = {
      x: this.x + 50, // Posición del ataque (ajusta según tu lógica)
      y: this.y,
      width: 100, // Ajusta el tamaño del ataque
      height: 50,
    };
    return this.atackBox[id];
  }

  checkCollision(otherPlayer) {
    // Check if the bounding boxes overlap on the x-axis
    const xOverlap = this.x + 50 > otherPlayer.x && this.x < otherPlayer.x + 50;

    // Check if the bounding boxes overlap on the y-axis
    const yOverlap = this.y + 50 > otherPlayer.y && this.y < otherPlayer.y + 50;

    // If there is overlap on both axes, a collision has occurred
    return xOverlap && yOverlap;
  }

  handleCollision(otherPlayer) {
    // Determine the direction of the collision based on player positions
    const dx = this.x - otherPlayer.x;
    const dy = this.y - otherPlayer.y;

    // Move players apart based on the direction of the collision
    if (Math.abs(dx) > Math.abs(dy)) {
      // Collision is primarily horizontal
      if (dx > 0) {
        this.x += 5;
        otherPlayer.x -= 5;
      } else {
        this.x -= 5;
        otherPlayer.x += 5;
      }
    } else {
      // Collision is primarily vertical
      if (dy > 0) {
        this.y += 5;
        otherPlayer.y -= 5;
      } else {
        this.y -= 5;
        otherPlayer.y += 5;
      }
    }
  }

  //Funcion que actualiza las posiciones de los jugadores
  static updateAll(playerList) {
    const pack = [];
    for (const id in playerList) {
      const player = playerList[id];
      player.updatePosition();

      // Check for collisions with other players
      for (const otherId in playerList) {
        if (id !== otherId) {
          if (player.checkCollision(playerList[otherId])) {
            player.handleCollision(playerList[otherId]);
          }
        }
      }

      pack.push({ x: player.x, y: player.y });
    }
    return pack;
  }

  //Funcion que desconecta al jugador
  disconect() {
    delete playerList[this.id];
  }
}

module.exports = Player;
