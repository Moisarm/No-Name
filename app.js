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

/*Inicio el listening de socket.io */
io.sockets.on("connection", function (socket) {
  console.log("socket connection");

  /*Sigue siendo listening de lo que envia el cliente, aunque se usa un emit*/
  socket.on("XD", function (data) {
    console.log(`Oye ${data.info}`);
  });

  /*Para emitir mensajes se  utiliza el metodo emit y como en el listening se pasa un nombre de evento, el cual se utiliza para identificar el socket que se quiere notificar*/
  socket.emit("serverMsg", {
    msg: "Esto es un mensaje enviado desde el servidor",
  });
});

module.exports = app;
