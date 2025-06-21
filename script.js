// Typewriter effect
const text = `Welcome.
You’ve found my curious collection of ghosts and glitches!
These are experiments in sound, image, and interaction. Some are rough. Most are unfinished. All of them are mine.

I’m Nelson Serrano, an artist and psych graduate drawn to the ephemeral and uncanny. My work lives in the in-between the dreams of Appalachian cryptids and the signal of a deep space sattelite: films, games, music, and ideas that cover isolation, friendship, magical realism, and the quality of being alien. 
These are things I’d want to find by accident and things I've always wanted someone to make.

For those who create because they have to...

Take what you need :)`;

let i = 0;
const speed = 50;
const target = document.getElementById("typewriter");

function typeWriter() {
  if (i < text.length) {
    target.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
typeWriter();

// Ghost movement: smooth horizontal float with gentle vertical bob
const ghost = document.querySelector('.ghost');

function animateGhost() {
    const ghostWidth = ghost.offsetWidth || 80;
    const screenWidth = window.innerWidth;
    const startLeft = screenWidth;
    const endLeft = -ghostWidth;
    const duration = 20000; // 20 seconds for a full pass

    let startTime = null;

    // Pick a random vertical position between 15% and 65% of the viewport height
    const minY = 0.15;
    const maxY = 0.65;
    const randomY = Math.random() * (maxY - minY) + minY;
    const baseTop = window.innerHeight * randomY;

    function frame(now) {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Horizontal movement
        const left = startLeft + (endLeft - startLeft) * progress;
        ghost.style.left = `${left}px`;

        // Gentle vertical bobbing
        const bob = Math.sin(progress * Math.PI * 2) * 20; // 20px up/down
        ghost.style.top = `${baseTop + bob}px`;

        // Fade in/out at edges
        if (progress < 0.05) {
            ghost.style.opacity = progress / 0.05;
        } else if (progress > 0.95) {
            ghost.style.opacity = (1 - progress) / 0.05;
        } else {
            ghost.style.opacity = 1;
        }

        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            // Restart animation with a new random Y
            animateGhost();
        }
    }

    requestAnimationFrame(frame);
}

// Start animation
animateGhost();

// Optional: restart animation on resize for responsiveness
window.addEventListener('resize', () => {
    ghost.style.left = `${window.innerWidth}px`;
    animateGhost();
});
