//Importa Modelo del jugador
const player = require("../Model/Player");

//Crea lista de conexiones y jugadores
socketList = {};
playerList = {};

//Funcion principal de socket.io
module.exports = (io) => {
  //Detecta cuando alguien se conecta, no necesita un emit
  io.sockets.on("connection", (socket) => {
    //Da un id
    socket.id = Math.round(Math.random() * 10);

    //guarda en el array el socket(conexion) mediante el id
    socketList[socket.id] = socket;

    //Declara que Player es una nueva instancia de la clase player
    var Player = new player(socket.id, playerList);

    //Funcion que detecta el presionamiento de flechas para dar movilidad
    socket.on("keyPress", (data) => {
      Player.KeyPress(data);
    });

    socket.on("attack", () => {
      const attackData = [];
      for (let otherId in playerList) {
        if (socket.id !== otherId) {
          const otherPlayer = playerList[otherId];
          const attack = Player.atack(otherPlayer);
          attackData.push({ attack, target: otherPlayer.id });
        }
      }
      io.sockets.emit("newAttack", attackData);
    });

    console.log(`socket connection ${socket.id}`);

    //Funcion que detecta cuando se desconecta un jugador, no necesita emit
    socket.on("disconnect", () => {
      //elimina la conexion de la lista
      delete socketList[socket.id];

      //elimina al jugador de la lista
      Player.disconect(socket.id);
    });
  });

  // Actualiza las posiciones de los jugadores
  setInterval(() => {
    //Iguala pack al retorno de updateAll, el cual es un array de los datos
    let pack = player.updateAll(playerList);

    //Por cada conexion en la lista de socket
    for (let i in socketList) {
      //iguala socket a su correspondiente
      let socket = socketList[i];

      //emite la nueva posicion de cada jugador
      socket.emit("newPosition", pack);
    }
  }, 1000 / 60); //1000/60 = cada 60 frames por segundo
};
