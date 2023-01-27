let path = [];
let f = 200;
let g;
function setup() {
  createCanvas(windowWidth, windowHeight);
  g = createGraphics(800, 800);
  imageMode(CENTER);
}

function draw() {
  background(250, 240, 200);
  clear();
  let r = map(noise(frameCount / 300), 0, 1, 0, 400);

  let v = createVector(
    g.width / 2 + r * cos(frameCount / f),
    g.height / 2 + r * sin(frameCount / f)
  );
  if (frameCount % 10 == 0) {
    path.push(v);
  }
  if (path.length > 50) {
    path.splice(0, 2);
  }

  g.clear();
  g.noFill();
  g.strokeWeight(10);
  g.stroke("#F1DBAC");
  setLineDash([10, 15]);
  //g.beginShape();
  for (let p of path) {
    const i = path.indexOf(p);
    if (i % 2 == 0 && i != 0) {
      const a = path[i];
      const b = path[i - 1];

      g.line(a.x, a.y, b.x, b.y);
    }
    //g.vertex(p.x, p.y);
  }
  //g.endShape();

  image(g, width / 2, height / 2, 800, 800);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}
