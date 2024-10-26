/*-----------------Librerias------------*/
const express = require("express");
const app = express();

const serv = require("http").Server(app);
const io = require("socket.io")(serv, {});
const path = require("path");

//const Phaser = require("phaser");
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

/*Inicio el listening de socket.io */
io.sockets.on("connection", function (socket) {
  //Declaro Variables
  socket.id = Math.random();
  socket.x = 0;
  socket.y = 0;
  socket.number = "" + Math.floor(Math.random() * 10);

  socketList[socket.id] = socket;

  console.log(`socket connection ${socket.id}`);

  /*Escucha si la persona se desconecta del server  */
  socket.on("disconnect", function () {
    delete socketList[socket.id];
  });
});

setInterval(function () {
  let pack = []; //Contiene la informacion de todos los jugadores

  for (let i in socketList) {
    let socket = socketList[i];
    socket.x++;
    socket.y++;
    pack.push({
      x: socket.x,
      y: socket.y,
      number: socket.number,
    });
  }

  for (let i in socketList) {
    let socket = socketList[i];
    socket.emit("newPosition", pack);
  }
}, 1000 / 55);

module.exports = app;
