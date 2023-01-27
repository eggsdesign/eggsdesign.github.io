let path = [];
let steps = [];
let f = 150;
let g;
let prevV;
let side = 10;
let stepImg;
let freq = 20;
let totalHeight = document.body.offsetHeight;

console.log(totalHeight);
function preload() {
  stepImg = loadImage("./assets/footstep.png");
}

function setup() {
  createCanvas(windowWidth, totalHeight);
  g = createGraphics(800, 800);
  imageMode(CENTER);
}

function draw() {
  background(250, 240, 200);
  clear();
  g.clear();
  let r = map(noise(frameCount / 300), 0, 1, 0, 400);

  let v = createVector(
    g.width / 2 + r * cos(frameCount / f),
    g.height / 2 + r * sin(frameCount / f)
  );

  if (prevV) {
    const step = p5.Vector.sub(v, prevV);
    const ang = step.heading();

    if (frameCount % freq == 0) {
      side *= -1;
      steps.push(new footStep(v, ang, side));
      // console.log(steps.length);
    }
  }

  steps.forEach((s) => {
    s.display(g);
    s.fade();
  });
  if (frameCount % freq == 0) {
    prevV = v;
  }

  image(g, width / 2, height / 2, 800, 800);
}

function windowResized() {
  totalHeight = document.body.offsetHeight;
  resizeCanvas(windowWidth, totalHeight);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

class footStep {
  constructor(pos, rot, side) {
    this.al = 255;
    this.p = pos;
    this.ang = rot;
    this.s = side;
    this.show = true;
  }

  display(g) {
    g.push();
    g.translate(this.p.x, this.p.y);
    g.rotate(this.ang + HALF_PI);
    g.tint(255, this.al);
    if (this.show) {
      g.image(stepImg, this.s, 0, 30, 30);
    }
    //g.ellipse(0, this.s, 20, 10);
    g.pop();
  }

  fade() {
    if (this.al > 0) {
      this.al *= 0.98;
    } else {
      this.show = false;
      steps.splice(steps.indexOf(this), 1);
    }
  }
}
