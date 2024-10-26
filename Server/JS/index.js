//const Phaser = require("phaser");

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let game = new Phaser.Game(config);

//precarga recursos
function preload() {
  //Assets here
  this.load.img("fondo", "/Client/Public/HTML/example.png");
}

//Los añade al navegador
function create() {
  this.add.img(400, 300, "fondo"); //se coloca la posicion x/y y el nombre del asset
}

function update() {
  // Your game logic here
}

console.log("Working");
