let dots = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('hero-canvas');
  noStroke();

  for (let i = 0; i < 40; i++) {
    dots.push({
      x: random(width),
      y: random(height),
      r: random(40, 100), // Bigger Figma-style blobs
      dx: random(-0.3, 0.3),
      dy: random(-0.3, 0.3),
      opacity: random(50, 120),
      color: color(random(160, 255), random(100, 180), random(200, 255))
    });
  }
}

function draw() {
  clear();

  for (let dot of dots) {
    // Fade pulse
    dot.opacity += random(-1, 1);
    dot.opacity = constrain(dot.opacity, 40, 150);

    // Mouse interaction (gently attract)
    let d = dist(mouseX, mouseY, dot.x, dot.y);
    let attract = map(d, 0, width / 2, 2, 0);
    dot.x += dot.dx + (mouseX - dot.x) * 0.0005 * attract;
    dot.y += dot.dy + (mouseY - dot.y) * 0.0005 * attract;

    // Bounce on edges
    if (dot.x < 0 || dot.x > width) dot.dx *= -1;
    if (dot.y < 0 || dot.y > height) dot.dy *= -1;

    fill(dot.color.levels[0], dot.color.levels[1], dot.color.levels[2], dot.opacity);
    ellipse(dot.x, dot.y, dot.r);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
