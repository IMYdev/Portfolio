const navTiles = [...document.querySelectorAll('.nav-tile[href^="#"]')];
const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
        if (!e.isIntersecting) continue;
        const hash = '#' + e.target.id;
        navTiles.forEach((t) => {
            t.classList.toggle('is-active', t.getAttribute('href') === hash);
        });
    }
}, { rootMargin: '-40% 0px -55% 0px' });

for (const t of navTiles) spy.observe(document.querySelector(t.getAttribute('href')));
