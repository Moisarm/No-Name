/*-----------------Librerias------------*/
const express = require("express");
const app = express();

const serv = require("http").Server(app);
const io = require("socket.io")(serv, {});
const path = require("path");

//const Phaser = require("phaser");
//let game = new Phaser.Game(config);
//const { Server } = require("http");

/*---------------Rutas---------------*/
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/Client/Public/HTML/index.html"));
});

app.use("/Client", express.static(__dirname + "/Client"));
app.use("/", express.static("./node_modules/phaser/dist"));

console.log("Se inicia el servidor");

/*Puerto que en el cual se ejecutara el servidor*/
serv.listen(2000);

//creo una lista de sockets para las posiciones de los jugadores
let socketList = {};
let playerList = {};

let player = function (id) {
  let self = {
    x: 250,
    y: 250,
    id: id,
    number: "" + Math.floor(Math.random() * 10),
    //agrego propiedades que indiquen si está moviendose o no
    pressingUp: false,
    pressingDown: false,
    pressingLeft: false,
    pressingRight: false,
    //agrego propiedades para el movimiento
    maxSpeed: 10,
  };

  self.updatePosition = () => {
    if (self.pressingUp) {
      self.y -= self.maxSpeed;
    }
    if (self.pressingDown) {
      self.y += self.maxSpeed;
    }
    if (self.pressingLeft) {
      self.x -= self.maxSpeed;
    }
    if (self.pressingRight) {
      self.x += self.maxSpeed;
    }
  };

  return self;
};

/*Inicio el listening de socket.io */
io.sockets.on("connection", function (socket) {
  //Declaro Variables
  socket.id = Math.random();
  socketList[socket.id] = socket;

  //Crea el jugador mediante la conexion al servidor

  let Player = player(socket.id);
  playerList[socket.id] = Player;

  socket.on("keyPress", function (data) {
    if (data.inputId === "left") {
      playerList[socket.id].pressingLeft = data.state;
    } else if (data.inputId === "right") {
      playerList[socket.id].pressingRight = data.state;
    } else if (data.inputId === "up") {
      playerList[socket.id].pressingUp = data.state;
    } else if (data.inputId === "down") {
      playerList[socket.id].pressingDown = data.state;
    }
  });
  console.log(`socket connection ${socket.id}`);

  /*Escucha si la persona se desconecta del server  */
  socket.on("disconnect", function () {
    delete socketList[socket.id];
    delete playerList[socket.id];
  });
});

try {
  setInterval(function () {
    let pack = []; //Contiene la informacion de todos los jugadores

    //se  recorre la lista de jugadores

    for (let i in playerList) {
      let player = playerList[i];
      player.updatePosition();
      pack.push({
        x: player.x,
        y: player.y,
        number: player.number,
      });
    }

    //Se recorre la lista de conexiones
    for (let i in socketList) {
      let socket = socketList[i];
      socket.emit("newPosition", pack);
    }
  }, 1000 / 55);
} catch (error) {
  console.error("Error en el servidor ", error);
}

module.exports = app;
