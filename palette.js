const palettes = {
  base: {
    bg1: "#F8DFC4",
    bg2: "#F08C5A",
    accent1: "#005F69",
    accent2: "#FF6F00",
    text: "#2A1205"
  },
  superstar: {
    bg1: "#1A1A33",
    bg2: "#FF1C8E",
    accent1: "#00E2C5",
    accent2: "#FFB400",
    text: "#1F0F0F"
  },
  thecold: {
    bg1: "#253341",
    bg2: "#3F5568",
    accent1: "#8FA6B7",
    accent2: "#ADB8C4",
    text: "#142024"
  },
  higherliving: {
    bg1: "#CFFFD5",
    bg2: "#66FF99",
    accent1: "#00E38A",
    accent2: "#00A8A0",
    text: "#172B1E"
  },
  lingering: {
    bg1: "#2C1E1A",
    bg2: "#5A3E31",
    accent1: "#B7744F",
    accent2: "#D0B24E",
    text: "#20110E"
  },
  hinterland: {
    bg1: "#181A1A",
    bg2: "#343634",
    accent1: "#6B6E67",
    accent2: "#8A7F5A",
    text: "#C1C1B7"
  }
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
  document.documentElement.style.setProperty('--text-main', pal.text || '#222');
}

export function paletteScrollObserver() {
  const sections = Array.from(document.querySelectorAll('[data-palette]'));
  if (sections.length === 1) {
    setPaletteVars(palettes[sections[0].getAttribute('data-palette')]);
    return;
  }
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
      accent2: lerpColor(prevPal.accent2, nextPal.accent2, t),
      text: t < 0.5 ? prevPal.text : nextPal.text
    });
  }

  window.addEventListener('scroll', updatePalette, { passive: true });
  window.addEventListener('resize', updatePalette);
  updatePalette();
}