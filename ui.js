export function paletteSwitcher() {
  const palettes = [
    { bg1: "#FCECDD", bg2: "#F3A26D", accent1: "#00809D", accent2: "#FF7601" },
    { bg1: "#6EFF7B", bg2: "#B2D8CE", accent1: "#3EC96B", accent2: "#7FFFD4" },
    { bg1: "#FFFF80", bg2: "#FFAA80", accent1: "#FF5580", accent2: "#FF0080" },
    { bg1: "#52357B", bg2: "#5459AC", accent1: "#648DB3", accent2: "#B2D8CE" }
  ];
  let paletteIndex = 0;
  const saved = localStorage.getItem('paletteIndex');
  if (saved) {
    paletteIndex = parseInt(saved, 10) || 0;
    setPalette(palettes[paletteIndex]);
  }
  function setPalette(pal) {
    document.documentElement.style.setProperty('--bg1', pal.bg1);
    document.documentElement.style.setProperty('--bg2', pal.bg2);
    document.documentElement.style.setProperty('--accent1', pal.accent1);
    document.documentElement.style.setProperty('--accent2', pal.accent2);
  }
  const switcher = document.getElementById('palette-switcher');
  if (switcher) {
    switcher.addEventListener('click', () => {
      paletteIndex = (paletteIndex + 1) % palettes.length;
      setPalette(palettes[paletteIndex]);
      localStorage.setItem('paletteIndex', paletteIndex);
    });
  }
}

export function hoverDialogue() {
  const ghostImg = document.querySelector('.ghost');
  const ghostDialogue = document.getElementById('ghost-dialogue');
  if (ghostImg && ghostDialogue) {
    ghostImg.addEventListener('mouseenter', () => {
      const rect = ghostImg.getBoundingClientRect();
      ghostDialogue.style.left = `${rect.right + 10}px`;
      ghostDialogue.style.top = `${rect.top + 10}px`;
      ghostDialogue.style.opacity = 1;
    });
    ghostImg.addEventListener('mouseleave', () => {
      ghostDialogue.style.opacity = 0;
    });
  }
  const ufoImg = document.querySelector('.ufo');
  const ufoDialogue = document.getElementById('ufo-dialogue');
  if (ufoImg && ufoDialogue) {
    ufoImg.addEventListener('mouseenter', () => {
      const rect = ufoImg.getBoundingClientRect();
      ufoDialogue.style.left = `${rect.right + 10}px`;
      ufoDialogue.style.top = `${rect.top + 10}px`;
      ufoDialogue.style.opacity = 1;
    });
    ufoImg.addEventListener('mouseleave', () => {
      ufoDialogue.style.opacity = 0;
    });
  }
}

// Typewriter effect
export function typewriterEffect() {
  const text = `Welcome to my curious collection of ghosts and glitches!
These are experiments in sound and image. Some are rough, many are unfinished, but all of them are mine!

I’m Nelson Serrano, a psych graduate and artist drawn to the ephemeral and uncanny. My work lives in between the dreams of Appalachian cryptids and the signal of a deep space sattelite: films, games, music, and ideas that cover isolation, friendship, magical realism, and the quality of being alien. 
These are things I’d want to find by accident and things I've always wanted someone else to make.

For those who create because they have to...

Take what you need :)`;
  let i = 0;
  const speed = 25;
  const target = document.getElementById("typewriter");
  if (target) {
    function typeWriter() {
      if (i < text.length) {
        target.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    typeWriter();
  }
}

export function ghostAndUfoNavigation() {
  const ghost = document.querySelector('.ghost');
  if (ghost) {
    ghost.style.cursor = "pointer";
    ghost.addEventListener('click', () => {
      localStorage.setItem('musicAutoplay', 'cold');
      localStorage.setItem('paletteIndex', 1); // blue palette
      window.location.href = 'music.html';
    });
  }
  const ufo = document.querySelector('.ufo');
  if (ufo) {
    ufo.style.cursor = "pointer";
    ufo.addEventListener('click', () => {
      localStorage.setItem('filmAutoplay', 'higher-living');
      localStorage.setItem('paletteIndex', 0); // green palette
      window.location.href = 'films.html';
    });
  }
}