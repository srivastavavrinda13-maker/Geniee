let totalTime = 25 * 60;
let time = totalTime;
let interval = null;

const circle = document.getElementById("progressCircle");
const timerText = document.getElementById("timerText");

const radius = 70;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0;

function updateTimer() {
    let min = Math.floor(time / 60);
    let sec = time % 60;

    timerText.innerText =
        `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;

    let progress = time / totalTime;
    circle.style.strokeDashoffset =
        circumference * (1 - progress);
}

function startTimer() {
    if(interval) return;

    interval = setInterval(() => {
        if(time > 0){
            time--;
            updateTimer();
        } else {
            clearInterval(interval);
            interval = null;
            alert("Session complete!");
        }
    }, 1000);
}

updateTimer();
