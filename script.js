const pc   = document.getElementById('particles');
const cols = ['#f9c8d4','#f4a7bb','#e07f97','#c4607b','#ffeef3','#ffd4de'];


for (let i = 0; i < 36; i++) {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.cssText = `
    left:               ${Math.random() * 100}%;
    top:                ${Math.random() * -20}%;
    background:         ${cols[Math.floor(Math.random() * cols.length)]};
    animation-duration: ${5 + Math.random() * 10}s;
    animation-delay:    ${Math.random() * 12}s;
    width:              ${6 + Math.random() * 9}px;
    height:             ${9 + Math.random() * 11}px;
    transform:          rotate(${Math.random() * 360}deg);
  `;
  pc.appendChild(p);
}

for (let i = 0; i < 60; i++) {
  const s = document.createElement('div');
  s.className = 'sparkle';
  s.style.cssText = `
    left:               ${Math.random() * 100}%;
    top:                ${Math.random() * 100}%;
    animation-duration: ${1.8 + Math.random() * 3.5}s;
    animation-delay:    ${Math.random() * 7}s;
    width:              ${2 + Math.random() * 4}px;
    height:             ${2 + Math.random() * 4}px;
  `;
  pc.appendChild(s);
}

['💕','💗','🌸','✨','💓','💖'].forEach(e => {
  for (let j = 0; j < 2; j++) {
    const h = document.createElement('div');
    h.className = 'fheart';
    h.textContent = e;
    h.style.cssText = `
      left:               ${Math.random() * 100}%;
      animation-duration: ${10 + Math.random() * 14}s;
      animation-delay:    ${Math.random() * 20}s;
      font-size:          ${.85 + Math.random() * .95}rem;
    `;
    document.body.appendChild(h);
  }
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

const tlObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const idx = parseInt(e.target.id.replace('tli', ''));
      setTimeout(() => e.target.classList.add('visible'), idx * 150);
    }
  });
}, { threshold: .12 });

for (let i = 0; i < 11; i++)  {
  const el = document.getElementById('tli' + i);
  if (el) tlObs.observe(el);
}

const spineObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) document.getElementById('tlSpine').classList.add('grow');
  });
}, { threshold: .04 });

spineObs.observe(document.getElementById('tlWrap'));


const TARGET = 17;
let count = 0;
const s1 = document.getElementById('s1');

function animCount() {
  if (count < TARGET) {
    count++;
    s1.textContent = count;
    setTimeout(animCount, 60);
  }
}
setTimeout(animCount, 1400);

const canvas = document.getElementById('cc');
const ctx    = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

let pieces = [];

function spawnConfetti(x, y, n = 90) {
  for (let i = 0; i < n; i++) {
    pieces.push({
      x, y,
      vx:    (Math.random() - .5) * 11,
      vy:    -7 - Math.random() * 7,
      r:     3 + Math.random() * 5,
      color: cols[Math.floor(Math.random() * cols.length)],
      alpha: 1,
      g:     .22,
      rot:   Math.random() * 360,
      rv:    (Math.random() - .5) * 10,
    });
  }
  if (pieces.length <= n) requestAnimationFrame(drawC);
}

function drawC() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter(p => p.alpha > .01);
  pieces.forEach(p => {
    p.x   += p.vx;
    p.y   += p.vy;
    p.vy  += p.g;
    p.alpha -= .013;
    p.rot += p.rv;
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r, p.r * .5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  if (pieces.length > 0) requestAnimationFrame(drawC);
}

function cakeClick(e) {
  const svg = document.getElementById('cakeSvg');
  const r   = svg.getBoundingClientRect();

  spawnConfetti(r.left + r.width / 2, r.top + r.height / 2, 90);

  svg.style.transition = 'transform .15s ease';
  svg.style.transform  = 'scale(1.14)';
  setTimeout(() => { svg.style.transform = 'scale(.95)';  }, 150);
  setTimeout(() => { svg.style.transform = 'scale(1.06)'; }, 280);
  setTimeout(() => {
    svg.style.transform  = 'scale(1)';
    svg.style.transition = 'transform .35s ease';
  }, 400);
}
