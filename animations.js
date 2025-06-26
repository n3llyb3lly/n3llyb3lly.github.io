// --- Mobile-Friendly Animated Ghost ---
let ghostAnimId, ufoAnimId;
let ghostBaseTop, ufoBaseTop;
let ghostFrameCount = 0, ufoFrameCount = 0;

function getGhostWidth() {
  const el = document.querySelector('.ghost');
  return Math.min(el?.offsetWidth || window.innerWidth * 0.18, window.innerWidth * 0.2);
}
function getUfoWidth() {
  const el = document.querySelector('.ufo');
  return Math.min(el?.offsetWidth || window.innerWidth * 0.22, window.innerWidth * 0.22);
}
function getBobAmplitude() {
  return window.innerWidth < 600 ? window.innerHeight * 0.015 : window.innerHeight * 0.025;
}
function getUfoBobAmplitude() {
  return window.innerWidth < 600 ? window.innerHeight * 0.01 : window.innerHeight * 0.018;
}

export function animateGhost(speed = 1) {
  const ghost = document.querySelector('.ghost');
  if (!ghost) return;
  const ghostWidth = getGhostWidth();
  const screenWidth = window.innerWidth;
  const startLeft = screenWidth;
  const endLeft = -ghostWidth;
  const duration = 20000 * speed;
  let startTime = null;
  const minY = 0.15, maxY = 0.65;
  const randomY = Math.random() * (maxY - minY) + minY;
  ghostBaseTop = window.innerHeight * randomY;

  function frame(now) {
    ghostFrameCount++;
    // Throttle on mobile: skip every other frame
    if (window.innerWidth < 600 && ghostFrameCount % 2 === 0) {
      ghostAnimId = requestAnimationFrame(frame);
      return;
    }
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const left = startLeft + (endLeft - startLeft) * progress;
    ghost.style.left = `${(left / window.innerWidth) * 100}vw`;
    const bob = Math.sin(progress * Math.PI * 2) * getBobAmplitude();
    ghost.style.top = `calc(${(ghostBaseTop / window.innerHeight) * 100}vh + ${bob}px)`;
    if (progress < 0.05) ghost.style.opacity = progress / 0.05;
    else if (progress > 0.95) ghost.style.opacity = (1 - progress) / 0.05;
    else ghost.style.opacity = 1;
    if (progress < 1 && !document.hidden) ghostAnimId = requestAnimationFrame(frame);
    else setTimeout(() => animateGhost(), 10000);
  }
  ghostAnimId = requestAnimationFrame(frame);
}

// --- Mobile-Friendly Animated UFO ---
export function animateUfo(speed = 1) {
  const ufo = document.querySelector('.ufo');
  if (!ufo) return;
  const ufoWidth = getUfoWidth();
  const screenWidth = window.innerWidth;
  const startLeft = -ufoWidth;
  const endLeft = screenWidth;
  const duration = 20000 * speed;
  let startTime = null;
  const minY = 0.10, maxY = 0.50;
  const randomY = Math.random() * (maxY - minY) + minY;
  ufoBaseTop = window.innerHeight * randomY;

  function frame(now) {
    ufoFrameCount++;
    if (window.innerWidth < 600 && ufoFrameCount % 2 === 0) {
      ufoAnimId = requestAnimationFrame(frame);
      return;
    }
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const left = startLeft + (endLeft - startLeft) * progress;
    ufo.style.left = `${(left / window.innerWidth) * 100}vw`;
    const bob = Math.cos(progress * Math.PI * 2) * getUfoBobAmplitude();
    ufo.style.top = `calc(${(ufoBaseTop / window.innerHeight) * 100}vh + ${bob}px)`;
    if (progress < 0.05) ufo.style.opacity = progress / 0.05;
    else if (progress > 0.95) ufo.style.opacity = (1 - progress) / 0.05;
    else ufo.style.opacity = 1;
    if (progress < 1 && !document.hidden) ufoAnimId = requestAnimationFrame(frame);
    else setTimeout(() => animateUfo(), 10000);
  }
  ufoAnimId = requestAnimationFrame(frame);
}

// --- Responsive Particles ---
export function createParticles() {
  const bg = document.getElementById('animated-bg');
  if (bg && !bg.hasParticles) {
    const particleCount = window.innerWidth < 500 ? 6 : 12;
    const maxParticleSize = window.innerWidth < 500 ? 8 : 14;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'animated-particle';
      const size = 6 + Math.random() * (maxParticleSize - 6); // 6vw to maxParticleSize vw
      p.style.width = `${size}vw`;
      p.style.height = `${size}vw`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 16}s`;
      p.style.background = `radial-gradient(circle at 30% 30%, var(--accent1) 0%, transparent 80%)`;
      bg.appendChild(p);
    }
    bg.hasParticles = true;
  }
}

// --- Animated hue shift ---
export function animateHue() {
  const bg = document.getElementById('animated-bg');
  let start = performance.now();
  function frame(now) {
    const seconds = ((now - start) / 1000) % 60;
    const hue = (seconds / 60) * 60;
    if (bg) bg.style.filter = `hue-rotate(${hue}deg)`;
    if (!document.hidden) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// --- Handle orientation/resize ---
window.addEventListener('resize', () => {
  // Optionally: restart or recalc positions for ghost/ufo
  // For simplicity, just restart both animations if present
  if (ghostAnimId) cancelAnimationFrame(ghostAnimId);
  if (ufoAnimId) cancelAnimationFrame(ufoAnimId);
  animateGhost();
  animateUfo();
});

// --- Pause animations on tab inactivity ---
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (ghostAnimId) cancelAnimationFrame(ghostAnimId);
    if (ufoAnimId) cancelAnimationFrame(ufoAnimId);
  } else {
    animateGhost();
    animateUfo();
  }
});