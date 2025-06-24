const palettes = {
  base:    { bg1: "#FCECDD", bg2: "#F3A26D", accent1: "#00809D", accent2: "#FF7601" }, // Orange
  superstar: { bg1: "#2B2B4F", bg2: "#FF00CC", accent1: "#00FFD0", accent2: "#FFD700" }, // Neon Disco
  thecold: { bg1: "#22304A", bg2: "#3A4A6B", accent1: "#5A6D8C", accent2: "#7A8BA3" }, // Winter Blues
  higherliving: { bg1: "#D0FFD6", bg2: "#6EFF7B", accent1: "#00FF6A", accent2: "#00C9A7" } // Green Alien
};

// Helper: hex to rgb
function hexToRgb(hex) {
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(x=>x+x).join('');
  const num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

// Helper: rgb to hex
function rgbToHex([r,g,b]) {
  return '#' + [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('');
}

// Helper: interpolate between two hex colors
function lerpColor(a, b, t) {
  const ar = hexToRgb(a), br = hexToRgb(b);
  return rgbToHex([
    Math.round(ar[0] + (br[0] - ar[0]) * t),
    Math.round(ar[1] + (br[1] - ar[1]) * t),
    Math.round(ar[2] + (br[2] - ar[2]) * t)
  ]);
}

function setPaletteVars(pal) {
  document.documentElement.style.setProperty('--bg1', pal.bg1);
  document.documentElement.style.setProperty('--bg2', pal.bg2);
  document.documentElement.style.setProperty('--accent1', pal.accent1);
  document.documentElement.style.setProperty('--accent2', pal.accent2);
}

export function paletteScrollObserver() {
  const sections = Array.from(document.querySelectorAll('[data-palette]'));
  if (sections.length < 2) return;

  function updatePalette() {
    const scroll = window.scrollY + window.innerHeight / 2;
    let prev = sections[0], next = sections[0];
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      const top = window.scrollY + rect.top;
      if (scroll >= top) prev = sections[i];
      if (scroll < top) { next = sections[i]; break; }
    }
    if (prev === next) {
      setPaletteVars(palettes[prev.getAttribute('data-palette')]);
      return;
    }
    // Interpolate between prev and next
    const prevRect = prev.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();
    const prevTop = window.scrollY + prevRect.top;
    const nextTop = window.scrollY + nextRect.top;
    const t = Math.min(1, Math.max(0, (scroll - prevTop) / (nextTop - prevTop)));

    const prevPal = palettes[prev.getAttribute('data-palette')];
    const nextPal = palettes[next.getAttribute('data-palette')];
    setPaletteVars({
      bg1: lerpColor(prevPal.bg1, nextPal.bg1, t),
      bg2: lerpColor(prevPal.bg2, nextPal.bg2, t),
      accent1: lerpColor(prevPal.accent1, nextPal.accent1, t),
      accent2: lerpColor(prevPal.accent2, nextPal.accent2, t)
    });
  }

  window.addEventListener('scroll', updatePalette, { passive: true });
  window.addEventListener('resize', updatePalette);
  updatePalette();
}