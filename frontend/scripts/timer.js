let time = 25 * 60; // default 25 min
let timerInterval = null;

const timerDisplay = document.getElementById("timer");

function updateDisplay() {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    timerDisplay.innerText =
        `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            saveFocusSession();
            alert("Session complete!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

updateDisplay();
