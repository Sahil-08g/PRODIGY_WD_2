document.addEventListener('DOMContentLoaded', () => {
    let startTime, updatedTime, difference, tInterval;
    let running = false, lapCounter = 1;
    let minutes = 0, seconds = 0, milliseconds = 0;

    const displayMinutes = document.getElementById('minutes');
    const displaySeconds = document.getElementById('seconds');
    const displayMilliseconds = document.getElementById('milliseconds');
    const lapList = document.getElementById('lap-list');

    const formatTime = (value) => (value < 10 ? '0' : '') + value;

    const updateDisplay = () => {
        displayMinutes.textContent = formatTime(minutes);
        displaySeconds.textContent = formatTime(seconds);
        displayMilliseconds.textContent = formatTime(milliseconds);
    };

    const startTimer = () => {
        if (!running) {
            running = true;
            startTime = Date.now();
            tInterval = setInterval(() => {
                updatedTime = Date.now();
                difference = updatedTime - startTime;
                minutes = Math.floor((difference / (1000 * 60)) % 60);
                seconds = Math.floor((difference / 1000) % 60);
                milliseconds = Math.floor((difference % 1000) / 10);
                updateDisplay();
            }, 10);
        }
    };

    const pauseTimer = () => {
        running = false;
        clearInterval(tInterval);
    };

    const resetTimer = () => {
        running = false;
        clearInterval(tInterval);
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
        lapList.innerHTML = '';
        lapCounter = 1;
    };

    const recordLap = () => {
        if (running) {
            const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
            lapList.appendChild(lapItem);
        }
    };

    document.getElementById('start').addEventListener('click', startTimer);
    document.getElementById('pause').addEventListener('click', pauseTimer);
    document.getElementById('reset').addEventListener('click', resetTimer);
    document.getElementById('lap').addEventListener('click', recordLap);
});
