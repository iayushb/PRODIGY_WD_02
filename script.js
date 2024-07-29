let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let lapCounter = 0;

const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        startPauseButton.innerText = 'Pause';
        running = true;
        paused = false;
    } else if (!paused) {
        clearInterval(tInterval);
        startPauseButton.innerText = 'Start';
        paused = true;
    } else {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        startPauseButton.innerText = 'Pause';
        paused = false;
    }
}

function reset() {
    clearInterval(tInterval);
    startPauseButton.innerText = 'Start';
    display.innerText = '00:00:00.000';
    running = false;
    paused = false;
    difference = 0;
    lapsContainer.innerHTML = '';
    lapCounter = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerText;
        const lapDiv = document.createElement('div');
        lapDiv.className = 'lap';
        lapDiv.innerText = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapDiv);
    }
}
