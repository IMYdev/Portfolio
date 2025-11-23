const contentData = {
    about: {
        title: "About",
        html: "I am IMY a.k.a IMYdev, I'm an AI Engineering major, my hobbies include video editing, and game development."
    },
    projects: {
        title: "Projects",
        html: "You can explore my open-source projects and contributions on <a target='_blank' href='https://github.com/IMYdev'>GitHub</a>."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    triggerFlash(() => {
      document.body.style.visibility = 'visible';
    });
});

const sfxForward = new Audio('audio/forward.ogg'); 
const sfxBack = new Audio('audio/back.ogg'); 

sfxForward.volume = 0.5;
sfxBack.volume = 0.5;

function playForwardSound() {
    sfxForward.currentTime = 0;
    sfxForward.play().catch(e => console.log("Error playing audio."));
}

function playBackSound() {
    sfxBack.currentTime = 0;
    sfxBack.play().catch(e => console.log("Error playing audio."));
}

const flash = document.getElementById('flash');
const viewMenu = document.getElementById('view-menu');
const viewContent = document.getElementById('view-content');
const contentTitle = document.getElementById('content-title');
const contentText = document.getElementById('content-text');

function triggerFlash(callback) {
    flash.classList.add('flash-active');

    setTimeout(() => {
        if(callback) callback();
        flash.classList.remove('flash-active');
    }, 300); 
}


function switchView(key) {
    playForwardSound();
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
    playBackSound();
    triggerFlash(() => {
        viewContent.classList.add('hidden');
        viewMenu.classList.remove('hidden');
    });
}

function exitGame() {
    playBackSound();
    triggerFlash(() => {
       document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#000;color:#fff;'>SIGNAL LOST</div>";
    });
}

document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX) / 90;
    const y = (window.innerHeight - e.pageY) / 90;

    document.querySelectorAll('.shard').forEach(shard => {
        const speed = shard.classList.contains('shard-1') ? 2 : 1;
        shard.style.transform = `skewX(-20deg) translateX(${x * speed}px) translateY(${y * speed}px)`;
    });
});