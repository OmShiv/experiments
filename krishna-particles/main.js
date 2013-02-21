var MAX_PARTICLES = 700,
    MAX_PARTICLE_RADIUS = 7,
    CHAR = 'Krishna';
    //CHAR = 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare !';


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function( callback ){
      window.setTimeout(callback, 1000 / 60);
    };
})();


var canvas = document.querySelector('#c'),
    ctx = canvas.getContext('2d'),
    cWidth = canvas.width,
    cHeight = canvas.height;

ctx.fillStyle = 'white';


var buffer = document.createElement('canvas'),
    bctx = buffer.getContext('2d');

buffer.width = cWidth;
buffer.height = cHeight;
bctx.font = 'bold 230px/1 Arial, sans-serif';
bctx.fillText(CHAR, 100, 350);



var particles = [],
    particlesCount = 0,
    colorMap = {
        map: [
            '#f66',
            '#ffa366',
            '#ff6',
            '#66c266',
            '#85e0ff',
            '#66a3ff',
            '#a366ff'
        ],
        rnd: function() {
            var key = Math.floor(Math.random() * (6 + 1));
            return this.map[key];
        }
    }

function Particle( x, y ) {
  this.x = x;
  this.y = y;
  this.radius = 0;
  this.lifetime = 0;
}

Particle.prototype.update = function() {
  this.lifetime += 0.1;
  this.radius = ~~(Math.abs(Math.sin(this.lifetime) * MAX_PARTICLE_RADIUS));
};

function update() {
  particles.forEach(function( p ) {
    p.update();
  });

  if (particlesCount === MAX_PARTICLES) return;

  var x = ~~(Math.random() * cWidth),
    y = ~~(Math.random() * cHeight);

  if ( bctx.getImageData( x, y, 1, 1 ).data[3] ) {
    particles.push( new Particle( x, y ) );
    particlesCount += 1;
  }

}


function render() {
  ctx.clearRect(0, 0, cWidth, cHeight);

  particles.forEach(function( p ) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = colorMap.rnd();
    ctx.fill();
  });
}


(function loop() {
  update();
  render();
  requestAnimFrame(loop);
}());