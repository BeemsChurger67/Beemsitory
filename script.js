windowSize = [window.innerWidth, window.innerHeight];
document.body.style.backgroundSize = `${windowSize[0]}px ${windowSize[1]}px`;
window.addEventListener('resize', function() {
    windowSize = [window.innerWidth, window.innerHeight];
    document.body.style.backgroundSize = `${windowSize[0]}px ${windowSize[1]}px`;
});
const gamesList = [
    ["https://beemschurger67.github.io/Beemsrooms/", "assets/games/beemsrooms.png",], 
    ["https://beemschurger67.github.io/Talking-Retro/", "assets/games/talkingRetro.png"],
    ["https://scratch.mit.edu/projects/1118928827/", "assets/games/FNaB1.png"],
    ["https://beemschurger67.github.io/Five-Nights-at-Beems-2/", "assets/games/FNaB2.png"],
];
for (let i = 0; i<gamesList.length; i++) {
    const a = document.createElement("a");
    a.href = gamesList[i][0];
    document.getElementById("gamesList").appendChild(a);

    const thumbnail = document.createElement("img");
    thumbnail.classList.add("thumbnail");
    thumbnail.src = gamesList[i][1];
    a.appendChild(thumbnail);

}
let pageAmount = 3;
let page = 1;
let pageDisplay = 1;
function changePage(pageAdd) {
    if (page == pageDisplay)
        page = pageAdd;
}
let bgX = 0;
let bgY = 0;
let lastUpdate = performance.now();
let firstFrame = false;
let timer = 0;
let fade = [1, false];
let fadeFrame = false;
function backgroundLoop(now) {
    const dt = (now - lastUpdate) / 1000; 
    lastUpdate = now;
    timer += dt;
    if (timer >= 1) {
        if (!firstFrame) {
            firstFrame = true;
        }
    }
    if (page !== pageDisplay) {
        if (!fade[1]) {
            document.getElementById("page" + pageDisplay).style.opacity = fade[0];
            fadeFrame = false;
            fade[0] -= dt*3;
            if (fade[0] <= 0) {
                fade[0] = 0;
                fade[1] = true;
                for (let i = 1; i<pageAmount+1; i++) {
                    console.log(i);
                    document.getElementById("page" + i).style.display = "none";
                }
            }
        } else {
            if (!fadeFrame) {
                document.getElementById("page" + page).style.display = "block";
                fadeFrame = true;
            }
            document.getElementById("page" + page).style.opacity = fade[0];
            fade[0] += dt*3;
            if (fade[0] >= 1) {
                fade[0] = 1;
                fade[1] = false;
                pageDisplay = page;
            }
        }
    }
    bgX += dt * 100;
    bgY += dt * 100;
    document.body.style.backgroundPosition = bgX + "px " + bgY + "px";
    requestAnimationFrame(backgroundLoop);
}
requestAnimationFrame(backgroundLoop);