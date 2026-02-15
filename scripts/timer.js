const FULL_DASH = 2 * Math.PI * 70;
const circle = document.getElementById("progressCircle");
const timerText = document.getElementById("timerText");

circle.style.strokeDasharray = FULL_DASH;

let settings =
    JSON.parse(localStorage.getItem("timerSettings")) || {};

let studyMinutes = settings.study || 25;

let totalTime = studyMinutes * 60;
let timeLeft = totalTime;
let timerRunning = false;
let interval;

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerText.textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const progress = FULL_DASH * (1 - timeLeft / totalTime);
    circle.style.strokeDashoffset = progress;

    if (timeLeft <= 0) {
        clearInterval(interval);
        timerRunning = false;

        saveSession(25); // save session
        alert("Session Complete!");

        return; // STOP TIMER
    }

    timeLeft--;
}

function startSession() {
    if (!timerRunning) {
        timerRunning = true;
        interval = setInterval(updateTimer, 1000);
    }
}
function pauseSession() {
    clearInterval(interval);
    timerRunning = false;
}

function resetSession() {
    clearInterval(interval);
    timerRunning = false;

    timeLeft = totalTime;
    updateTimer();
}
