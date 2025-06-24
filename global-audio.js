const tracks = [
  { title: "Superstar", src: "assets/Superstar.mp3" },
  { title: "The Cold", src: "assets/The Cold.mp3" }
];

const playerDiv = document.getElementById('global-audio-player');
const audio = document.getElementById('global-audio');
const title = document.getElementById('global-audio-title');

// Restore state from localStorage
const saved = JSON.parse(localStorage.getItem('globalAudio') || '{}');
let current = saved.track || 0;
let position = saved.position || 0;
let playing = saved.playing || false;

function loadTrack(idx) {
  audio.src = tracks[idx].src;
  title.textContent = tracks[idx].title;
  playerDiv.style.display = 'block';
}
loadTrack(current);

audio.currentTime = position;
if (playing) audio.play();

audio.addEventListener('play', () => {
  localStorage.setItem('globalAudio', JSON.stringify({
    track: current, position: audio.currentTime, playing: true
  }));
});
audio.addEventListener('pause', () => {
  localStorage.setItem('globalAudio', JSON.stringify({
    track: current, position: audio.currentTime, playing: false
  }));
});
audio.addEventListener('timeupdate', () => {
  localStorage.setItem('globalAudio', JSON.stringify({
    track: current, position: audio.currentTime, playing: !audio.paused
  }));
});

// Optional: Add next/prev track controls if you want