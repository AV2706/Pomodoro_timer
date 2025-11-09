

// basic pomodoro timer made by me :)

let workMinutes = 25;
let breakMinutes = 5;
let timeLeft = workMinutes * 60;
let timerRunning = false;
let onWork = true;
let timer;

const display = document.getElementById("display");
const modeText = document.getElementById("mode");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;

    if (secs < 10) secs = "0" + secs;
    display.textContent = `${mins}:${secs}`;
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(timer);
                onWork = !onWork;

                if (onWork) {
                    timeLeft = workMinutes * 60;
                    modeText.textContent = "Focus Time 🍓";
                    document.body.style.background = "linear-gradient(135deg, #ffd6e0, #ffe3e3)";
                } else {
                    timeLeft = breakMinutes * 60;
                    modeText.textContent = "Break Time ☕";
                    document.body.style.background = "linear-gradient(135deg, #c7f0ff, #d9faff)";
                }

                timerRunning = false;
                startTimer(); // start next round automatically
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    onWork = true;
    timeLeft = workMinutes * 60;
    document.body.style.background = "linear-gradient(135deg, #ffd6e0, #ffe3e3)";
    modeText.textContent = "Focus Time 🍓";
    updateDisplay();
}

// button clicks
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// initial time
updateDisplay();
