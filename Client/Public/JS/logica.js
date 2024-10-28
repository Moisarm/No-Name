const socket = io();

const ctx = document.getElementById("canvas").getContext("2d");

ctx.font = "30px Arial";

//(0,0,1024,576)"0,0 = pos x,y" 1024,576 = tamaño x,y o width y height
socket.on("newPosition", function (data) {
  ctx.clearRect(0, 0, 1024, 576);
  for (let i = 0; i < data.length; i++) {
    ctx.fillText(data[i].number, data[i].x, data[i].y);
  }
});

document.onkeydown = function (event) {
  if (event.key == "d") {
    //d
    socket.emit("keyPress", { inputId: "right", state: true });
  } else if (event.key === "s") {
    //s
    socket.emit("keyPress", { inputId: "down", state: true });
  } else if (event.key == "a") {
    //s
    socket.emit("keyPress", { inputId: "left", state: true });
  } else if (event.key == "w") {
    //s
    socket.emit("keyPress", { inputId: "up", state: true });
  }
};

document.onkeyup = function (event) {
  if (event.key == "d") {
    //d
    socket.emit("keyPress", { inputId: "right", state: false });
  } else if (event.key === "s") {
    //s
    socket.emit("keyPress", { inputId: "down", state: false });
  } else if (event.key == "a") {
    //s
    socket.emit("keyPress", { inputId: "left", state: false });
  } else if (event.key == "w") {
    //s
    socket.emit("keyPress", { inputId: "up", state: false });
  }
};
