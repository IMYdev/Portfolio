const contentData = {
    about: {
        title: "About",
        html: "I am IMY a.k.a IMYdev, I'm an AI Engineering major. My hobbies include video editing and game development."
    },
    projects: {
        title: "Projects",
        html: "You can explore my open-source projects and contributions on <a target='_blank' style='color:var(--me-red); font-weight:bold;' href='https://github.com/IMYdev'>GitHub</a>."
    }
};

const flash = document.getElementById('flash');
const viewMenu = document.getElementById('view-menu');
const viewContent = document.getElementById('view-content');
const contentTitle = document.getElementById('content-title');
const contentText = document.getElementById('content-text');
const unmuteBtn = document.getElementById('unmute-btn');

const sfxForward = new Audio();
const sfxBack = new Audio();
const music = new Audio();

sfxForward.src = 'audio/forward.ogg';
sfxBack.src = 'audio/back.ogg';
music.src = 'audio/bgm.mp3';

music.loop = true;
sfxForward.volume = 0.5;
sfxBack.volume = 0.5;
music.volume = 0.1;

let isMuted = true;

window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

function triggerFlash(callback) {
    flash.classList.remove('flash-active');
    void flash.offsetWidth;
    flash.classList.add('flash-active');
    if (callback) setTimeout(callback, 100);
}

unmuteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    sfxForward.muted = isMuted;
    sfxBack.muted = isMuted;
    music.muted = isMuted;
    if (!isMuted && music.paused) music.play().catch(() => { });
    unmuteBtn.innerText = isMuted ? "🔇" : "🔊";
});

function switchView(key) {
    if (!isMuted) {
        sfxForward.currentTime = 0;
        sfxForward.play().catch(() => { });
    }

    triggerFlash(() => {
        const data = contentData[key];
        if (data) {
            contentTitle.innerText = data.title;
            contentText.innerHTML = data.html;
        }
        viewMenu.classList.add('hidden');
        viewContent.classList.remove('hidden');
    });
}

function returnToMenu() {
    if (!isMuted) {
        sfxBack.currentTime = 0;
        sfxBack.play().catch(() => { });
    }

    triggerFlash(() => {
        viewContent.classList.add('hidden');
        viewMenu.classList.remove('hidden');
    });
}

function exitGame() {
    triggerFlash(() => {
        document.body.innerHTML = `
                <div style='display:flex;justify-content:center;align-items:center;height:100vh;
                     font-family:sans-serif;background:#000;color:#fff;letter-spacing:5px;'>
                    SIGNAL LOST
                </div>`;
    });
}

let lastX = 0, lastY = 0;
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;

    if (Math.abs(lastX - x) > 0.1 || Math.abs(lastY - y) > 0.1) {
        document.documentElement.style.setProperty('--shard-x', `${x}px`);
        document.documentElement.style.setProperty('--shard-y', `${y}px`);
        lastX = x;
        lastY = y;
    }
});