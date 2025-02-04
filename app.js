const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.querySelector('.progress');

// Add envelope functionality
const envelope = document.querySelector('.envelope');
const front = document.querySelector('.front');

const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.close-modal');

envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    modalOverlay.classList.add('active');
});

closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
        envelope.classList.remove('open');
    }, 300);
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal.click();
    }
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

const progressBar = document.querySelector('.progress-bar');
let isDragging = false;

// Progress bar click functionality
progressBar.addEventListener('click', (e) => {
    const progressBarRect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - progressBarRect.left) / progressBarRect.width;
    audio.currentTime = percent * audio.duration;
    updateTimeDisplay(percent);
});

// Progress bar drag functionality
progressBar.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const progressBarRect = progressBar.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - progressBarRect.left) / progressBarRect.width, 0), 1);
        audio.currentTime = percent * audio.duration;
        updateTimeDisplay(percent);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Add touch support for mobile devices
progressBar.addEventListener('touchstart', (e) => {
    isDragging = true;
});

progressBar.addEventListener('touchmove', (e) => {
    if (isDragging) {
        const progressBarRect = progressBar.getBoundingClientRect();
        const percent = Math.min(Math.max((e.touches[0].clientX - progressBarRect.left) / progressBarRect.width, 0), 1);
        audio.currentTime = percent * audio.duration;
    }
});

progressBar.addEventListener('touchend', () => {
    isDragging = false;
});

const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Update timer display
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

// Update timer when progress bar is clicked or dragged
function updateTimeDisplay(percent) {
    const time = percent * audio.duration;
    currentTimeEl.textContent = formatTime(time);
}
