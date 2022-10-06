var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

canvas.width = 1500;
canvas.height = 700;


var numStars = 2500;
var stars = [];
var size = 0.4;
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;

var VitesseMin = 2;
var VitesseMax = 10;

for (var i = 0; i < numStars; i++) {
  stars[i] = new Star();
}

function Star() {
  this.x = rnd(canvas.width);
  this.y = rnd(canvas.height);
  this.z = rnd(canvas.width);
  this.v = VitesseMin + rnd(VitesseMax);
  this.fx = 0;
  let colR = 90 + rnd(255-90);
  let colV = rnd(255);
  let colB = rnd(255);
  console.log(colR, colV, colB)
  this.c = `rgb(${colR},${colR},${colR})`

  this.move = function() {
    this.z = this.z - this.v;
    if (this.z <= 0) {
      this.x = rnd(canvas.width);
      this.y = rnd(canvas.height);
      this.z = rnd(canvas.width);
      this.v = VitesseMin + rnd(VitesseMax);
      this.fx ++
      let colR = 90 + rnd(255-90);
      let colV = rnd(255);
      let colB = rnd(255);
      console.log(colR, colV, colB)
      this.c = `rgb(${colR},${colR},${colR})`
      // this.z = canvas.width;
    }
  };

  this.show = function() {
    var x, y, s, d;

    d = 15

    this.fx = this.fx + 0.05
    if (this.fx > 3000) {this.fx = 0}

    x = (this.x - centerX) * (canvas.width / this.z);
    x = x + centerX;

    x = x + d * Math.cos(this.fx)

    y = (this.y - centerY) * (canvas.width / this.z);
    y = y + centerY;

    y = y + d * Math.sin(this.fx)

    s = size * (canvas.width / this.z);

    c.beginPath();
    c.fillStyle = this.c;
    c.arc(x, y, s, 0, Math.PI * 2);
    c.fill();

  // c.fillStyle = pattern;
  // c.fillRect(x, y, s, s);
  // c.fill();

    // c.globalAlpha = (canvas.width / this.z) / 5;
  };
}

function draw() {
  var colFond = 0;
  c.fillStyle = `rgb(${colFond},${colFond},${colFond})`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < numStars; i++) {
    stars[i].show();
    stars[i].move();
  }
}

function update() {
  draw();
  window.requestAnimationFrame(update);
}

update();

function rnd(val) {
  return Math.floor(Math.random() * val);
}
