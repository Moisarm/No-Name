const playerModel = require("../Model/Player");

let socketList = {};
let playerList = {};

module.exports = (io) => {
  io.sockets.on("connection", (socket) => {
    socket.id = Math.random();
    socketList[socket.id] = socket;

    let Player = playerModel(socket.id);
    playerList[socket.id] = Player;

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

    socket.on("disconnect", () => {
      delete socketList[socket.id];
      delete playerList[socket.id];
    });
  });

  // Actualiza las posiciones de los jugadores
  setInterval(() => {
    let pack = [];
    for (let i in playerList) {
      let player = playerList[i];
      player.updatePosition();
      pack.push({
        x: player.x,
        y: player.y,
        number: player.number,
      });
    }

    for (let i in socketList) {
      let socket = socketList[i];
      socket.emit("newPosition", pack);
    }
  }, 1000 / 55);
};
