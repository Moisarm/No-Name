//const Phaser = require("phaser");

//const { Physics } = require("phaser");

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  Physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

//precarga recursos
function preload() {
  //Assets here
  this.load.image("fondo", "/Client/Public/Assets/Background/example.png");
}

//Los añade al navegador
function create() {
  this.add.image(400, 300, "fondo"); //se coloca la posicion x/y y el nombre del asset
}

function update() {
  // Your game logic here
}

console.log("Working");
