const FULL_DASH = 2 * Math.PI * 70;
const circle = document.getElementById("progressCircle");
const timerText = document.getElementById("timerText");

circle.style.strokeDasharray = FULL_DASH;

/* ---------- SETTINGS ---------- */
let settings =
    JSON.parse(localStorage.getItem("timerSettings")) || {};

let studyMinutes = Number(settings.study) || 25;
let breakMinutes = Number(settings.break) || 5;
let totalSessions = Number(settings.sessions) || 1;

/* ---------- STATE ---------- */
let currentSession = 1;
let isBreak = false;

let totalTime = studyMinutes * 60;
let timeLeft = totalTime;

let timerRunning = false;
let interval;

/* ---------- TIMER DISPLAY ---------- */
function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timerText.textContent =
        `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const progress =
        FULL_DASH * (1 - timeLeft / totalTime);

    circle.style.strokeDashoffset = progress;

    if (timeLeft <= 0) {
        clearInterval(interval);
        timerRunning = false;

        if (!isBreak) {
            saveSession(studyMinutes);
        }

        nextPhase();
        return;
    }

    timeLeft--;
}

/* ---------- PHASE CONTROL ---------- */
function nextPhase() {

    if (!isBreak) {
        /* Study finished → Break */
        isBreak = true;
        totalTime = breakMinutes * 60;
        timeLeft = totalTime;

        alert("Break time!");

    } else {
        /* Break finished → Next session */
        isBreak = false;
        currentSession++;

        if (currentSession > totalSessions) {
            alert("All sessions completed!");
            return;
        }

        totalTime = studyMinutes * 60;
        timeLeft = totalTime;

        alert(
          "Session " + currentSession +
          " of " + totalSessions
        );
    }

    startSession();
}

/* ---------- CONTROLS ---------- */
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

    isBreak = false;
    currentSession = 1;

    totalTime = studyMinutes * 60;
    timeLeft = totalTime;

    updateTimer();
}

updateTimer();
