const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.querySelector('.progress');

// Add envelope functionality
const envelope = document.querySelector('.envelope');
const front = document.querySelector('.front');

envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');
    envelope.style.cursor = envelope.classList.contains('open') ? 'default' : 'pointer';
});

// Play/Pause functionality
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

// Reset controls when song ends
audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    progress.style.width = '0%';
});

// Previous and Next buttons (for future implementation)
prevBtn.addEventListener('click', () => {
    audio.currentTime = 0;
});

nextBtn.addEventListener('click', () => {
    audio.currentTime = 0;
});
