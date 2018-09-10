
function Firework(type, word) {

  this.hu = random(360);
  this.firework = new Particle_original(random(50,width-50), height, this.hu, true);
  this.exploded = false;
  this.particles = [];
  this.type = type || 'original';
  this.word = word || 'WINNER';
  this.word = this.word.trim();
  this.word = this.word.replace(/ /g,"_");
  if (this.type == 'font') {
    this.firework.pos.x = width/2;
    this.font_points = font.textToPoints(this.word, -500, -500, 300, { // ('text', x, y, fontSize, options)
      sampleFactor: 0.04 // default .25
    });
  }
  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {

    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    for(var i=this.particles.length-1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
      //console.log(this.particles.length);
    }
  }

  this.explode = function() {

    a_explosion.play();

    switch (this.type) {

      case 'font':
        for (var i = this.font_points.length-1; i > 0; i--) {
          //var pt = font_points[i];
          var p = new Particle_font(this.firework.pos.x, this.firework.pos.y, this.hu, false, this.font_points[i]);
          this.particles.push(p);
          // stroke(255);
          // strokeWeight(8);
          // point(pt.x, pt.y);
        }
      break;

      default: // original
        for(var i=0; i < 100; i++) {
          var p = new Particle_original(this.firework.pos.x, this.firework.pos.y, this.hu, false);
          this.particles.push(p);
        }

    }
  }//end explode

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    for(var i=0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }

}
