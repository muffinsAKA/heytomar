const dialogueBox = document.getElementById('tomar-text');
const button = document.querySelector('.die');
let loading = true;
let timeouts = [];

// Function to stop the animation and clear the pending timeouts
function stopAnimation() {
  loading = false;
  // Clear any pending timeouts
  timeouts.forEach(timeoutId => clearTimeout(timeoutId));
  timeouts = [];
}

function animateLoading() {
  if (loading === true) {
    dialogueBox.textContent = 'INCOMING TRANSMISSION';
    
    // Clear any previously stored timeouts
    timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    timeouts = [];

    // Schedule new timeouts and store their IDs
    const timeout1 = setTimeout(() => {
      dialogueBox.textContent = 'INCOMING TRANSMISSION.';
    }, 500);
    const timeout2 = setTimeout(() => {
      dialogueBox.textContent = 'INCOMING TRANSMISSION..';
    }, 1000);
    const timeout3 = setTimeout(() => {
      dialogueBox.textContent = 'INCOMING TRANSMISSION...';
    }, 1500);
    const timeout4 = setTimeout(() => {
      dialogueBox.textContent = 'INCOMING TRANSMISSION';
      animateLoading();
    }, 2000);

    // Store the timeout IDs in the array
    timeouts.push(timeout1, timeout2, timeout3, timeout4);
  }
}

async function getHypothetical() {
  try {
    const response = await fetch('https://xvl6g9g9xk.execute-api.us-east-1.amazonaws.com/dev/hypothetical', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    const data = await response.text();
    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

function typeText(text, container) {
  const typingSpeed = 40;
  let currentIndex = 0;

  function typeNextLetter() {
    if (currentIndex < text.length) {
      container.textContent += text[currentIndex];
      currentIndex++;
      setTimeout(typeNextLetter, typingSpeed);
    } else {
      button.style.opacity = 1;
    }

  }

  typeNextLetter();
}

document.addEventListener('DOMContentLoaded', async function() {
  animateLoading();
  const text = await getHypothetical();
  loading = false;
  stopAnimation();
  dialogueBox.textContent = '';
  typeText(text, dialogueBox )
});

button.addEventListener('click', async function() {
  button.style.opacity = 0;
  loading = true;
  animateLoading();
  const text = await getHypothetical();
  loading = false;
  stopAnimation();
  dialogueBox.textContent = '';
  typeText(text, dialogueBox )
});


