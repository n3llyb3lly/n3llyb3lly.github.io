// Ghost movement
export function animateGhost(speed = 1) {
  const ghost = document.querySelector('.ghost');
  if (!ghost) return;
  const ghostWidth = ghost.offsetWidth || 80;
  const screenWidth = window.innerWidth;
  const startLeft = screenWidth;
  const endLeft = -ghostWidth;
  const duration = 20000 * speed;
  let startTime = null;
  const minY = 0.15, maxY = 0.65;
  const randomY = Math.random() * (maxY - minY) + minY;
  const baseTop = window.innerHeight * randomY;
  function frame(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const left = startLeft + (endLeft - startLeft) * progress;
    ghost.style.left = `${left}px`;
    const bob = Math.sin(progress * Math.PI * 2) * 20;
    ghost.style.top = `${baseTop + bob}px`;
    if (progress < 0.05) ghost.style.opacity = progress / 0.05;
    else if (progress > 0.95) ghost.style.opacity = (1 - progress) / 0.05;
    else ghost.style.opacity = 1;
    if (progress < 1) requestAnimationFrame(frame);
    else setTimeout(() => animateGhost(), 10000);
  }
  requestAnimationFrame(frame);
}

// UFO movement
export function animateUfo(speed = 1) {
  const ufo = document.querySelector('.ufo');
  if (!ufo) return;
  const ufoWidth = ufo.offsetWidth || 100;
  const screenWidth = window.innerWidth;
  const startLeft = -ufoWidth;
  const endLeft = screenWidth;
  const duration = 20000 * speed;
  let startTime = null;
  const minY = 0.10, maxY = 0.50;
  const randomY = Math.random() * (maxY - minY) + minY;
  const baseTop = window.innerHeight * randomY;
  function frame(now) {
    if (!startTime) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const left = startLeft + (endLeft - startLeft) * progress;
    ufo.style.left = `${left}px`;
    const bob = Math.cos(progress * Math.PI * 2) * 15;
    ufo.style.top = `${baseTop + bob}px`;
    if (progress < 0.05) ufo.style.opacity = progress / 0.05;
    else if (progress > 0.95) ufo.style.opacity = (1 - progress) / 0.05;
    else ufo.style.opacity = 1;
    if (progress < 1) requestAnimationFrame(frame);
    else setTimeout(() => animateUfo(), 10000);
  }
  requestAnimationFrame(frame);
}

// Background particles
export function createParticles() {
  const bg = document.getElementById('animated-bg');
  if (bg && !bg.hasParticles) {
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('div');
      p.className = 'animated-particle';
      p.style.width = `${24 + Math.random() * 32}px`;
      p.style.height = p.style.width;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 16}s`;
      p.style.background = `radial-gradient(circle at 30% 30%, var(--accent1) 0%, transparent 80%)`;
      bg.appendChild(p);
    }
    bg.hasParticles = true;
  }
}

// Animated hue shift
export function animateHue() {
  const bg = document.getElementById('animated-bg');
  let start = performance.now();
  function frame(now) {
    const seconds = ((now - start) / 1000) % 60;
    const hue = (seconds / 60) * 60;
    if (bg) bg.style.filter = `hue-rotate(${hue}deg)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}