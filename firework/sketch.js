var canvas;
var fireworks=[], gravity, rate=5;
var font, font_points = [];
var a_explosion; // audio

function preload() {
  a_explosion = loadSound("firework/a_explosion.mp3");
  font = loadFont('firework/AvenirNextLTPro-Demi.otf');
}

function setup() {
  noCanvas();
  colorMode(HSB);
  gravity = createVector(0, 0.2);

}

function draw() {
  if (frameCount % (60 * rate) === 1) createFirework(rate);
  document.getElementById('inputWord').style.borderColor = 'rgb(100,0,'+ (50+(frameCount%200)) + ')';
  background(0, 0, 0, 0.15);

  for(var i = fireworks.length-1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  //console.log(fireworks.length);
}

function createFirework(dur) {
  let duration = dur * 1000;
  console.log('createFirework - dur: '+ dur +' sec.');

  canvas = createCanvas(window.innerWidth-20, window.innerHeight-4);
  canvas.style('visibility', 'visible');
  background(0);
  a_explosion.setVolume(1);

  fireworks.push(new Firework('font', document.getElementById('inputWord').value));

  for (let i = 0; i < 6; i++) {
    setTimeout( ()=> { fireworks.push(new Firework()); }, random(50, duration * 0.5));
  }

  setTimeout( ()=> { canvas.remove(); a_explosion.setVolume(0); }, duration);
}
