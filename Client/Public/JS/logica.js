// main.js
const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

socket.on("newPosition", (data) => {
  ctx.clearRect(0, 0, 1024, 576);
  data.forEach((player) => {
    ctx.fillStyle = player.collision ? "red" : "blue";
    ctx.fillRect(player.x, player.y, 50, -150);
  });
});

socket.on("newAttack", (data) => {
  ctx.fillStyle = "red";
  ctx.fillRect(data.x, data.y - 150, data.width, data.height);
});

window.addEventListener("keydown", (event) => {
  const keyMap = { a: "left", d: "right", w: "up", s: "down", j: "attack" };
  if (keyMap[event.key])
    socket.emit("keyPress", { inputId: keyMap[event.key], state: true });
});

window.addEventListener("keyup", (event) => {
  const keyMap = { a: "left", d: "right", w: "up", s: "down" };
  if (keyMap[event.key])
    socket.emit("keyPress", { inputId: keyMap[event.key], state: false });
});
