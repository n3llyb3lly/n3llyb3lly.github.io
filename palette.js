const palettes = {
  base: {
    bg1: "#F7DCC0",  // Muted clay
    bg2: "#EE8552",  // Warm terracotta
    accent1: "#007A82",  // Unified teal pop
    accent2: "#FF6F00",  // Shared warm signal
    text: "#2C1A10"  // Deep brown, readable but earthy
  },
  superstar: {
    bg1: "#1A1A33",  // Dark violet base
    bg2: "#FF1C8E",  // Neon magenta (keeps the personality)
    accent1: "#00CFC0",  // Teal pop, cohesive with base
    accent2: "#FFAA00",  // Gold warmth for consistency
    text: "#1A0E0E"  // Very dark maroon, keeps Superstar’s boldness
  },
  thecold: {
    bg1: "#24323F",  // Desaturated navy
    bg2: "#3A5264",  // Muted steel blue
    accent1: "#8BA5B6",  // Frosty blue, cohesive with others
    accent2: "#A9B5C2",  // Pale icy silver
    text: "#162126"  // Deep, cold slate for mood
  },
  higherliving: {
    bg1: "#C9FFD1",  // Misty mint green
    bg2: "#60FF99",  // Bright leaf green
    accent1: "#00CFA6",  // Cohesive teal accent
    accent2: "#00A88F",  // Deep sea green for warmth inversion
    text: "#152A1D"  // Forest earth tone, darker than original
  },
  lingering: {
    bg1: "#291D19",  // Deep soil brown
    bg2: "#543A2E",  // Rich, muddy clay
    accent1: "#B26F4C",  // Warm burnt copper
    accent2: "#CFAC4A",  // Soft gold for signal
    text: "#1D100D"  // Rich dark brown, still readable
  },
  hinterland: {
    bg1: "#161818",  // Shadowed evergreen
    bg2: "#313431",  // Damp forest stone
    accent1: "#6B6E67",  // Lichen grey-green
    accent2: "#8A7F5A",  // Woodland gold
    text: "#D6D6CE"  // Bone white for strong contrast
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