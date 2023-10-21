// Get references to various HTML elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const messageElement = document.getElementById('message');
const messageTextElement = document.getElementById('message-text');
const okButton = document.getElementById('ok-button');
const customMessageInput = document.getElementById('custom-message');
const startButton = document.getElementById('start');
const dateInput = document.getElementById('date');
const setTimerDiv = document.querySelector('.set-timer');

// Event listener for OK button
okButton.addEventListener('click', function () {
    // Hide the message element and OK button
    messageElement.style.display = 'none';
    okButton.style.display = 'none';

    // Enable the date input and show the custom message input
    dateInput.disabled = false;
    customMessageInput.style.display = 'inline-block';
    setTimerDiv.style.display = 'block';

    // Stop the audio when OK is clicked
    const audio = document.getElementById('countdown-expire-audio');
    audio.pause();
    audio.currentTime = 0;
});

// Event listener for the start button
startButton.addEventListener('click', function () {
    // Check if a valid date is entered
    if (!dateInput.value) {
        alert('Please enter a valid date and time.');
        return;
    }

    // Check if custom message is empty
    if (customMessageInput.value.trim() === '') {
        const confirmEmptyMessage = confirm('You have not entered a message. Do you want to proceed without a message?');

        if (!confirmEmptyMessage) {
            return;
        }
    }

    // Calculate time difference between input date and current date
    const inputDate = new Date(dateInput.value);
    const currentDate = new Date();
    const timeDifference = inputDate - currentDate;
    document.querySelector('.countdown-timer').classList.add('zoomed');

    // If the time is in past (timeDifference is less than or equal to 0)
    if (timeDifference <= 0) {
        alert('Please enter a future date and time.');
        return;
    }

    // Disable the start button and date input
    startButton.disabled = true;
    dateInput.disabled = true;
    setTimerDiv.style.display = 'none';
    customMessageInput.style.display = 'none';

    // Set up an interval to update the countdown
    const interval = setInterval(function () {
        const timeLeft = timeDifference - (Date.now() - currentDate);

        if (timeLeft <= 0) {
            clearInterval(interval);
            // Display message and ok button
            const customMessage = customMessageInput.value;
            messageTextElement.textContent = customMessage;
            messageElement.style.display = 'block';
            okButton.style.display = 'inline-block';
            document.querySelector('.countdown-timer').classList.remove('zoomed');
            // Audio
            const audio = document.getElementById('countdown-expire-audio');
            audio.play();
            return;
        }

        // Calculate days, hours, minutes, and seconds remaining
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Update the countdown display
        daysElement.textContent = formatTime(days);
        hoursElement.textContent = formatTime(hours);
        minutesElement.textContent = formatTime(minutes);
        secondsElement.textContent = formatTime(seconds);
    }, 1000);
});

// Function to format time to ensure double digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}