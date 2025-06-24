// Global audio player logic (move from global-audio.js here if you want)
// ...copy your global-audio.js code here...

// Highlight currently playing audio block
export function highlightPlayingAudio() {
  document.querySelectorAll('.audio-block audio').forEach(audio => {
    audio.addEventListener('play', function() {
      document.querySelectorAll('.audio-block').forEach(block => block.classList.remove('playing'));
      this.closest('.audio-block').classList.add('playing');
    });
    audio.addEventListener('pause', function() {
      this.closest('.audio-block').classList.remove('playing');
    });
    audio.addEventListener('ended', function() {
      this.closest('.audio-block').classList.remove('playing');
    });
  });
}

// Page-specific audio visualizer (add your visualizer code here if needed)