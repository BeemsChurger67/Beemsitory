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
    ["https://beemschurger67.github.io/Poika-Custom-Night/", "assets/games/PoikaCustomNight.png"],
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
let pageAmount = 4;
let page = 1;
let pageDisplay = 1;
document.getElementById("pageButtons").addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
        if (page == pageDisplay)
            page = e.target.dataset.page;
    }
})
let money = 0;
let multiplier = 1;
let beemsclickerCompleted = false;
let multiplierButtons = [
    {
        name: "basicMultiplier",
        cost: 10,
        costMultiplier: 1.25,
        multiplierAmount: 1.1,
        description: "Basic multiplier | Costs: $   "
    },
    {
        name: "goodMultiplier",
        cost: 50,
        costMultiplier: 1.4,
        multiplierAmount: 1.2,
        description: "Good multiplier | Costs: $"
    },
    {
        name: "greatMultiplier",
        cost: 150,
        costMultiplier: 1.65,
        multiplierAmount: 1.3,
        description: "Great multiplier | Costs: $"
    },
    {
        name: "amazingMultiplier",
        cost: 500,
        costMultiplier: 1.80,
        multiplierAmount: 1.4,
        description: "Amazing multiplier | Costs: $"
    },
]
function updateBeemsclicker() {
    document.getElementById("moneyAmount").innerText = "$" + money.toFixed(2);
    document.getElementById("multiplierAmount").innerText = "Multiplier: x" + multiplier.toFixed(2);
}
let saveData = {}
document.getElementById("saveProgressButton").addEventListener("click", () => {
    document.getElementById("progressSaved").classList.remove("fade");
    void document.getElementById("progressSaved").offsetWidth;
    document.getElementById("progressSaved").classList.add("fade");
    saveData = {};
    saveData = {
        money: money,
        multiplier: multiplier,
        multiplierButtons: multiplierButtons,
        beemsclickerCompleted: beemsclickerCompleted,
    };
    localStorage.setItem("data", JSON.stringify(saveData));
});
function loadData() {
    let data = localStorage.getItem("data");
    if (data == null) return;
    data = JSON.parse(data);
    money = data.money;
    multiplier = data.multiplier;
    multiplierButtons = data.multiplierButtons;
    beemsclickerCompleted = data.beemsclickerCompleted;
    console.log(data);
    document.getElementById("moneyAmount").innerText = "$" + money.toFixed(2);
    document.getElementById("multiplierAmount").innerText = "Multiplier: x" + multiplier.toFixed(2);
    for (let i = 0; i<multiplierButtons.length; i++) {
        document.getElementById(multiplierButtons[i].name).innerText = multiplierButtons[i].description + multiplierButtons[i].cost.toFixed(2);
    }
}
loadData();
document.getElementById("beemsclickerDiv").addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
        if (e.target.id == "addMoney") {
            money += multiplier;
        }
        for (let i = 0; i<multiplierButtons.length; i++) {
            if (multiplierButtons[i].name == e.target.id && money >= multiplierButtons[i].cost) {
                money -= multiplierButtons[i].cost;
                multiplierButtons[i].cost *= multiplierButtons[i].costMultiplier;
                multiplier *= multiplierButtons[i].multiplierAmount;
                document.getElementById(multiplierButtons[i].name).innerText = multiplierButtons[i].description + multiplierButtons[i].cost.toFixed(2);
            }
        }
        if (e.target.id == "beemsclickerWin" && money >= 1000000) {
            document.getElementById("beemsclickerText").innerText = "Beemsclicker ✅"
            money -= 1000000;
            beemsclickerCompleted = true;
        }
        updateBeemsclicker();
    }
});
document.getElementById("resetData").addEventListener("click", (e) => {
    localStorage.clear();
    location.reload();
});
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
            fade[0] -= dt*4;
            if (fade[0] <= 0) {
                fade[0] = 0;
                fade[1] = true;
                for (let i = 1; i<pageAmount+1; i++) {
                    document.getElementById("page" + i).style.display = "none";
                }
            }
        } else {
            if (!fadeFrame) {
                document.getElementById("page" + page).style.display = "block";
                fadeFrame = true;
            }
            document.getElementById("page" + page).style.opacity = fade[0];
            fade[0] += dt*4;
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