module.exports = function (id) {
  let self = {
    x: 250,
    y: 250,
    id: id,
    number: "" + Math.floor(Math.random() * 10),
    pressingUp: false,
    pressingDown: false,
    pressingLeft: false,
    pressingRight: false,
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
