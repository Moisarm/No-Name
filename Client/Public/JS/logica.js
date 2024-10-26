const socket = io();

let ctx = document.getElementById("ctx").getContext("2d");

ctx.font = "30px Arial";

socket.on("newPosition", function (data) {
  ctx.clearRect(0, 0, 500, 500);
  for (let i = 0; i < data.length; i++) {
    ctx.fillText(data[i].number, data[i].x, data[i].y);
  }
});

document.onkeydown = function (event) {
  if (event.keyCode === 68) {
    //d
    socket.emit("keyPress", { inputId: "right", state: true });
  } else if (event.keyCode === 83) {
    //s
    socket.emit("keyPress", { inputId: "down", state: true });
  } else if (event.keyCode === 65) {
    //s
    socket.emit("keyPress", { inputId: "left", state: true });
  } else if (event.keyCode === 87) {
    //s
    socket.emit("keyPress", { inputId: "up", state: true });
  }
};

document.onkeyup = function (event) {
  if (event.keyCode === 68) {
    //d
    socket.emit("keyPress", { inputId: "right", state: false });
  } else if (event.keyCode === 83) {
    //s
    socket.emit("keyPress", { inputId: "down", state: false });
  } else if (event.keyCode === 65) {
    //s
    socket.emit("keyPress", { inputId: "left", state: false });
  } else if (event.keyCode === 87) {
    //s
    socket.emit("keyPress", { inputId: "up", state: false });
  }
};