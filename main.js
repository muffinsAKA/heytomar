const dialogueBox = document.getElementById('tomar-text');
const button = document.querySelector('.die');


dialogueBox.textContent = 'INCOMING TRANSMISSION...'
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
  const text = await getHypothetical();
  dialogueBox.textContent = '';
  typeText(text, dialogueBox )
});

button.addEventListener('click', async function() {
  button.style.opacity = 0;
dialogueBox.textContent = 'INCOMING TRANSMISSION...';
  const text = await getHypothetical();
  dialogueBox.textContent = '';
  typeText(text, dialogueBox )
});


