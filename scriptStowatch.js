let startTime, updatedTime, difference, tInterval;
let running = false;

const display = document.querySelector('.display');
const lapsList = document.querySelector('.laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
    return (num < 10 ? '0' : '') + num;
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00:00";
    lapsList.innerHTML = '';
}

function lapTimer() {
    const lapTime = display.innerHTML;
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.pause').addEventListener('click', pauseTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', lapTimer);
