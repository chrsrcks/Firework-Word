
function Particle_font(x,y, hu, firework, font_point) {

  this.pos = createVector(x,y);
  this.firework = firework;
  this.lifespan = 1.6;
  this.hu = hu;
  this.font_point = font_point;

  if (this.firework) {
    this.vel = createVector(0, random(-18, -10));
  } else {
    this.vel = createVector(this.font_point.x * 0.04, this.font_point.y * 0.04);//p5.Vector.random2D();
  }
  this.acc = createVector(0,0);

  //gravity
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 0.01;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    if (!this.firework) {
      strokeWeight(random(4,6));
      stroke(hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(10);
      stroke(hu, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  }
}
