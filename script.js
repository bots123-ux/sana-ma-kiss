const correctAnswer = "rez de la cruz";
let timerInterval;

function checkAnswer() {
    const userInput = document.getElementById('nameInput').value.toLowerCase().trim();
    
    if (userInput === correctAnswer) {
        // Correct answer - show success
        document.querySelector('.question').style.display = 'none';
        document.querySelector('.input-container').style.display = 'none';
        document.querySelector('.submit-btn').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Start heart animation
        createHearts();
        
        // Change background to celebration
        document.querySelector('.quiz-container').style.background = 'linear-gradient(45deg, #ff69b4, #ffb6c1, #ffc0cb)';
        document.querySelector('.quiz-container').style.animation = 'celebration 1s ease-in-out infinite';
        
        // Show envelope after a short delay
        setTimeout(() => {
            document.getElementById('envelopeSection').style.display = 'block';
        }, 2000);
        
    } else {
        // Wrong answer - show error popup
        document.getElementById('errorPopup').style.display = 'flex';
    }
}

function tryAgain() {
    // Hide error popup
    document.getElementById('errorPopup').style.display = 'none';
    
    // Clear input and focus
    document.getElementById('nameInput').value = '';
    document.getElementById('nameInput').focus();
    
    // Add a little shake animation to the container
    const container = document.querySelector('.quiz-container');
    container.style.animation = 'shake 0.5s ease-in-out, float 3s ease-in-out infinite';
    
    setTimeout(() => {
        container.style.animation = 'float 3s ease-in-out infinite';
    }, 500);
}

function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

function openLetter() {
    document.getElementById('letterPopup').style.display = 'flex';
    
    // Add envelope opening animation
    const envelope = document.getElementById('envelope');
    envelope.style.transform = 'scale(0.8)';
    envelope.style.opacity = '0.5';
    
    // Start the 15-second timer
    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    const countdownElement = document.getElementById('countdownTimer');
    const timerMessage = document.getElementById('timerMessage');
    const videoContainer = document.getElementById('videoContainer');
    
    // Show countdown
    countdownElement.style.display = 'block';
    countdownElement.textContent = `Timer: ${timeLeft}s`;
    
    timerInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = `Timer: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            countdownElement.style.display = 'none';
            
            // Show the special message
            timerMessage.style.display = 'block';
            
            // Show video after message appears
            setTimeout(() => {
                videoContainer.style.display = 'block';
            }, 1000);
        }
    }, 1000);
}

function closeLetter() {
    document.getElementById('letterPopup').style.display = 'none';
    
    // Reset envelope
    const envelope = document.getElementById('envelope');
    envelope.style.transform = 'scale(1)';
    envelope.style.opacity = '1';
    
    // Clear timer and reset elements
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    document.getElementById('countdownTimer').style.display = 'none';
    document.getElementById('timerMessage').style.display = 'none';
    document.getElementById('videoContainer').style.display = 'none';
}

// Allow pressing Enter to submit
document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Focus on input when page loads
window.onload = function() {
    document.getElementById('nameInput').focus();
};

// Add some floating hearts in background occasionally
setInterval(() => {
    if (document.getElementById('successMessage').style.display !== 'block') {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.color = '#ff69b4';
        heart.style.fontSize = '16px';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'fall 4s linear forwards';
        heart.innerHTML = '💕';
        heart.style.opacity = '0.7';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}, 2000);