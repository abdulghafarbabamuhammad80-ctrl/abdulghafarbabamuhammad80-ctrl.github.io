const coin = document.getElementById("coin");
const result = document.getElementById("result");

const flipBtn = document.getElementById("flipBtn");
const resetBtn = document.getElementById("resetBtn");
const copyBtn = document.getElementById("copyBtn");

const heads = document.getElementById("heads");
const tails = document.getElementById("tails");
const total = document.getElementById("total");

const headsPercent = document.getElementById("headsPercent");
const tailsPercent = document.getElementById("tailsPercent");

const headsBar = document.getElementById("headsBar");
const balanceText = document.getElementById("balanceText");

const currentStreak = document.getElementById("currentStreak");
const bestStreak = document.getElementById("bestStreak");
const mostFrequent = document.getElementById("mostFrequent");

const history = document.getElementById("history");

const STORAGE_KEY = "toolhub_coin_flip_stats";

let headsCount = 0;
let tailsCount = 0;
let totalCount = 0;

let flipHistory = [];

let currentStreakCount = 0;
let bestStreakCount = 0;
let streakSide = null;

let lastResult = "Press Flip";

/* ============================================================
LOAD SAVED DATA
============================================================ */

function loadStats() {

try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const data = JSON.parse(saved);

    headsCount = Number(data.headsCount) || 0;
    tailsCount = Number(data.tailsCount) || 0;
    totalCount = Number(data.totalCount) || 0;

    flipHistory = Array.isArray(data.flipHistory)
        ? data.flipHistory
        : [];

    currentStreakCount = Number(data.currentStreakCount) || 0;
    bestStreakCount = Number(data.bestStreakCount) || 0;

    streakSide = data.streakSide || null;

    lastResult = data.lastResult || "Press Flip";

} catch (error) {

    console.log("Could not load saved coin statistics.");

}

}

/* ============================================================
SAVE DATA
============================================================ */

function saveStats() {

const data = {

    headsCount,
    tailsCount,
    totalCount,

    flipHistory,

    currentStreakCount,
    bestStreakCount,
    streakSide,

    lastResult

};

localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
);

}

/* ============================================================
UPDATE DISPLAY
============================================================ */

function updateDisplay() {

heads.textContent = headsCount;
tails.textContent = tailsCount;
total.textContent = totalCount;

currentStreak.textContent = currentStreakCount;
bestStreak.textContent = bestStreakCount;

if (totalCount === 0) {

    headsPercent.textContent = "0%";
    tailsPercent.textContent = "0%";

    headsBar.style.width = "50%";

    balanceText.textContent = "Waiting for flips...";

    mostFrequent.textContent = "—";

} else {

    const headsPercentage =
        (headsCount / totalCount) * 100;

    const tailsPercentage =
        (tailsCount / totalCount) * 100;

    headsPercent.textContent =
        `${headsPercentage.toFixed(1)}%`;

    tailsPercent.textContent =
        `${tailsPercentage.toFixed(1)}%`;

    headsBar.style.width =
        `${headsPercentage}%`;

    if (headsCount > tailsCount) {

        mostFrequent.textContent = "Heads";

    } else if (tailsCount > headsCount) {

        mostFrequent.textContent = "Tails";

    } else {

        mostFrequent.textContent = "Tie";

    }

    const difference =
        Math.abs(headsPercentage - tailsPercentage);

    if (difference < 5) {

        balanceText.textContent =
            "⚖️ Very balanced";

    } else if (headsCount > tailsCount) {

        balanceText.textContent =
            `🙂 Heads are ahead by ${headsCount - tailsCount}`;

    } else {

        balanceText.textContent =
            `🦅 Tails are ahead by ${tailsCount - headsCount}`;

    }

}

renderHistory();

}

/* ============================================================
HISTORY
============================================================ */

function renderHistory() {

history.innerHTML = "";

if (flipHistory.length === 0) {

    const li = document.createElement("li");

    li.textContent = "No flips yet.";

    history.appendChild(li);

    return;

}

flipHistory.forEach((item, index) => {

    const li = document.createElement("li");

    const icon =
        item === "Heads" ? "🙂" : "🦅";

    li.textContent =
        `${icon} ${item}`;

    li.setAttribute(
        "data-index",
        index + 1
    );

    history.appendChild(li);

});

}

/* ============================================================
MOST FREQUENT / STREAK
============================================================ */

function updateStreak(flip) {

if (flip === streakSide) {

    currentStreakCount++;

} else {

    streakSide = flip;
    currentStreakCount = 1;

}

if (currentStreakCount > bestStreakCount) {

    bestStreakCount = currentStreakCount;

}

}

/* ============================================================
FLIP COIN
============================================================ */

flipBtn.addEventListener("click", () => {

flipBtn.disabled = true;

coin.classList.remove("flipping");

void coin.offsetWidth;

coin.classList.add("flipping");

const flip =
    Math.random() < 0.5
        ? "Heads"
        : "Tails";

setTimeout(() => {

    if (flip === "Heads") {

        coin.textContent = "🙂";

        result.textContent = "Heads";

        headsCount++;

    } else {

        coin.textContent = "🦅";

        result.textContent = "Tails";

        tailsCount++;

    }

    totalCount++;

    lastResult = flip;

    updateStreak(flip);

    flipHistory.unshift(flip);

    if (flipHistory.length > 10) {

        flipHistory.pop();

    }

    updateDisplay();

    saveStats();

    flipBtn.disabled = false;

}, 650);

});

/* ============================================================
COPY RESULT
============================================================ */

copyBtn.addEventListener("click", async () => {

if (totalCount === 0) {

    alert("Flip the coin first!");

    return;

}

const text =
    `ToolHub Coin Flip Result: ${lastResult}`;

try {

    await navigator.clipboard.writeText(text);

    const originalText =
        copyBtn.textContent;

    copyBtn.textContent =
        "✅ Copied!";

    setTimeout(() => {

        copyBtn.textContent =
            originalText;

    }, 2000);

} catch (error) {

    alert("Unable to copy the result.");

}

});

/* ============================================================
RESET
============================================================ */

resetBtn.addEventListener("click", () => {

const confirmed =
    confirm("Reset all coin flip statistics?");

if (!confirmed) return;

headsCount = 0;
tailsCount = 0;
totalCount = 0;

flipHistory = [];

currentStreakCount = 0;
bestStreakCount = 0;

streakSide = null;

lastResult = "Press Flip";

coin.textContent = "🪙";

result.textContent = "Press Flip";

localStorage.removeItem(STORAGE_KEY);

updateDisplay();

});

/* ============================================================
START
============================================================ */

loadStats();
updateDisplay();
