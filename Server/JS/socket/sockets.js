//Importa Modelo del jugador
const player = require("../Model/Player");

//Crea lista de conexiones y jugadores
let socketList = {};
let playerList = {};

//Funcion principal de socket.io
module.exports = (io) => {
  //Detecta cuando alguien se conecta, no necesita un emit
  io.sockets.on("connection", (socket) => {
    //Da un id
    socket.id = Math.round(Math.random() * 10);

    //guarda en el array el socket(conexion) mediante el id
    socketList[socket.id] = socket;

    //Declara que Player es una nueva instancia de la clase player
    let Player = new player(socket.id, playerList);

    //Funcion que detecta el presionamiento de flechas para dar movilidad
    socket.on("keyPress", (data) => {
      if (data.inputId === "left") {
        Player.pressingLeft = data.state;
      } else if (data.inputId === "right") {
        Player.pressingRight = data.state;
      } else if (data.inputId === "up") {
        Player.pressingUp = data.state;
      } else if (data.inputId === "down") {
        Player.pressingDown = data.state;
      }
    });

    console.log(`socket connection ${socket.id}`);

    //Funcion que detecta cuando se desconecta un jugador, no necesita emit
    socket.on("disconnect", () => {
      //elimina la conexion de la lista
      delete socketList[socket.id];

      //elimina al jugador de la lista
      delete playerList[socket.id];
    });
  });

  // Actualiza las posiciones de los jugadores
  setInterval(() => {
    //se hace un array que guardará las posiciones de los jugadores
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

    //Por cada conexion en la lista de socket
    for (let i in socketList) {
      //iguala socket a su correspondiente
      let socket = socketList[i];

      //emite la nueva posicion de cada jugador
      socket.emit("newPosition", pack);
    }
  }, 1000 / 55); //1000/60 = cada 60 frames por segundo
};
