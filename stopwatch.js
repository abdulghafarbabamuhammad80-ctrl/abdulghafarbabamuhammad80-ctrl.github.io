const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

const timerBtn = document.getElementById("timerBtn");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const timerDisplay = document.getElementById("timerDisplay");

// STOPWATCH
let seconds = 0;
let timer = null;

function updateStopwatch() {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    display.textContent =
        String(hrs).padStart(2, "0") + ":" +
        String(mins).padStart(2, "0") + ":" +
        String(secs).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
    if (timer) return;

    timer = setInterval(() => {
        seconds++;
        updateStopwatch();
    }, 1000);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    updateStopwatch();

    laps.innerHTML = "<li>No laps yet.</li>";
});

lapBtn.addEventListener("click", () => {

    if (seconds === 0) return;

    if (laps.innerHTML.includes("No laps")) {
        laps.innerHTML = "";
    }

    const li = document.createElement("li");
    li.textContent = display.textContent;
    laps.prepend(li);

});

// TIMER
let countdown = null;

timerBtn.addEventListener("click", () => {

    clearInterval(countdown);

    let total =
        (parseInt(minutesInput.value) || 0) * 60 +
        (parseInt(secondsInput.value) || 0);

    if (total <= 0) {
        alert("Enter a valid time.");
        return;
    }

    function updateTimer() {

        const mins = Math.floor(total / 60);
        const secs = total % 60;

        timerDisplay.textContent =
            String(mins).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0");

    }

    updateTimer();

    countdown = setInterval(() => {

        total--;

        updateTimer();

        if (total <= 0) {

            clearInterval(countdown);

            alert("⏰ Time's Up!");

        }

    }, 1000);

});

updateStopwatch();
timerDisplay.textContent = "00:00";