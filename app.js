/*-----------------Librerias------------*/
const express = require("express");
const app = express();

//const Phaser = require("phaser");
const path = require("path");
//const { Server } = require("http");

const serv = require("http").Server(app);

/*---------------Rutas---------------*/
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/Client/Public/HTML/index.html"));
});

app.use("/Client", express.static(__dirname + "/Client"));
app.use("/", express.static("./node_modules/phaser/dist"));

console.log("Se inicia el servidor");

serv.listen(2000);

const io = require("socket.io")(serv, {});

io.sockets.on("connection", function (socket) {
  console.log("socket connection");
});
module.exports = app;
