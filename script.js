const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
let drops = [];
let w = 0, h = 0;

function resize(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  drops = Array.from({length: Math.min(110, Math.floor(w/7))}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    len: 8 + Math.random()*18,
    speed: 5 + Math.random()*8,
    drift: 1 + Math.random()*2
  }));
}

function rain(){
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle = 'rgba(210,220,235,.28)';
  ctx.lineWidth = .7;
  ctx.beginPath();
  for(const d of drops){
    ctx.moveTo(d.x,d.y);
    ctx.lineTo(d.x-drift(d),d.y+d.len);
    d.y += d.speed;
    d.x -= d.drift;
    if(d.y > h+30){ d.y = -30; d.x = Math.random()*w; }
    if(d.x < -30) d.x = w+30;
  }
  ctx.stroke();
  requestAnimationFrame(rain);
}
function drift(d){ return d.drift * 1.5; }
resize();
window.addEventListener('resize', resize);
rain();

document.getElementById('story').addEventListener('click', () => {
  document.body.classList.toggle('quiet');
});
