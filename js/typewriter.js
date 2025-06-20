const text = `
Welcome.\n
You’ve found my curious collection of ghosts and glitches!\n
These are experiments in sound, image, and interaction. Some are rough. Most are unfinished. All of them are mine.\n\n
I’m Nelson Serrano, an artist and psych graduate drawn to the ephemeral, the uncanny, and the things that don’t quite fit. My work lives in the overlap between story and signal: films, games, music, and ideas that trace isolation, friendship, magical realism, and the quality of being alien.\n
I make things I’d want to find by accident. And things I haven't seen before.\n\n
For those who make because they want to feel something—or let others feel them back.\n
Take what you need.
`;

let i = 0;
function typeWriter() {
  if (i < text.length) {
    const target = document.getElementById("typewriter-text");
    const char = text.charAt(i);
    target.innerHTML += (char === "\n") ? "<br>" : char;
    i++;
    setTimeout(typeWriter, 35);
  }
}

document.addEventListener("DOMContentLoaded", typeWriter);
