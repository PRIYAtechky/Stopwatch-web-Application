let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById("display");
const lapsList = document.getElementById("laps-list");
let previousLapTime = 0;

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        running = true;
        toggleButtonState();
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        toggleButtonState();
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    previousLapTime = 0;
    toggleButtonState();
}

function lap() {
    if (running) {
        const currentLapTime = difference || new Date().getTime() - startTime;
        const lapTime = formatTime(currentLapTime);
        const lapDifference = formatTime(currentLapTime - previousLapTime);
        const li = document.createElement("li");
        li.innerHTML = `<span>${lapTime}</span><span>+${lapDifference}</span>`;
        lapsList.appendChild(li);
        previousLapTime = currentLapTime;
        li.animate([
            { transform: 'scale(0.5)', opacity: 0.5 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: 300,
            fill: 'forwards'
        });
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(ms) {
    let hours = Math.floor(ms / (1000 * 60 * 60));
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((ms % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function toggleButtonState() {
    document.getElementById("start").disabled = running;
    document.getElementById("pause").disabled = !running;
}
