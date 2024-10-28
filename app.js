/*-----------------Librerias------------*/
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const routes = require("./Server/routes/root");
const socketManager = require("./Server/JS/socket/sockets");

const app = express();
const serv = http.Server(app);
const io = socketIo(serv);

// Rutas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/Client/Public/HTML/index.html"));
});

app.use("/Client", express.static(path.join(__dirname, "Client")));
app.use("/", express.static("./node_modules/phaser/dist"));

// Inicializar el socket
socketManager(io);

console.log("Se inicia el servidor");
serv.listen(2000);
